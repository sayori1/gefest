import type { Task } from '../models/task';
import { writable } from 'svelte/store';

export const tasks = writable<Task[]>([]);

export function addTask(task: Task): void {
	tasks.update((tasks) => {
		return [...tasks, task];
	});
	saveTasks();
}

export function deleteTask(index: number): void {
	tasks.update((tasks) => {
		return tasks.filter((_, i) => i !== index);
	});
	saveTasks();
}

export function modifyTask(index: number, task: Task): void {
	tasks.update((tasks) => {
		tasks[index] = task;
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
	const savedTasks = localStorage.getItem('tasks');
	if (savedTasks) {
		tasks.set(JSON.parse(savedTasks));
		tasks.update((tasks)=>tasks.map((task)=>
		{
			task.parseScript();
			return task;
		}
		));
	}
}
