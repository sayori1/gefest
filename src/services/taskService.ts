import { Task } from '../models/task';
import { writable } from 'svelte/store';

export let tasks = writable<Task[]>([]);

export function addTask(name: string, description: string, script: string): void {
	tasks.update((tasks) => {
		tasks.push(new Task(name, description, script));
		return tasks;
	});
	saveTasks();
}

export function deleteTask(index: number): void {
	tasks.update((tasks) => {
		tasks.splice(index, 1);
		return tasks;
	});
	saveTasks();
}

export function modifyTask(index: number, name: string, description: string, script: string): void {
	tasks.update((tasks) => {
		tasks[index].name = name;
		tasks[index].description = description;
		tasks[index].script = script;
		return tasks;
	});
	saveTasks();
}

export function saveTasks(): void {
	tasks.subscribe((tasks) => {
		localStorage.setItem('tasks', JSON.stringify(tasks));
	});
}

export function loadTasks(): void {
	const tasks = JSON.parse(localStorage.getItem('tasks')!);
	if (tasks) {
		tasks.set(tasks);
	}
}
