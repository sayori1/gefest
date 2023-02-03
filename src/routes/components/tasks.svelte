<script lang="ts">
	import { addTask, deleteTask, modifyTask, tasks } from '../../services/taskService';
	import { onMount } from 'svelte';
	import Modal from './modal.svelte';
	import { Task } from '../../models/task';
	import ModalStore from '../../services/modalService';
	import ProgressBarView from './progressBarView.svelte';
	import TaskView from './taskView.svelte';

	function OnAddTaskButtonDown() {
		mode = 'Creating';
		currentTask = new Task('', '', '');
		ModalStore.open();
	}

	function OnDeleteTaskButtonDown(index: number) {
		deleteTask(index);
	}

	function OnEditTaskButtonDown(index: number) {
		mode = 'Editing';
		currentId = index;
		currentTask = $tasks[index];
		ModalStore.open();
	}

	function OnOkButtonDown() {
		if (mode == 'Creating') addTask(currentTask.name, currentTask.description, currentTask.script);
		if (mode == 'Editing')
			modifyTask(currentId, currentTask.name, currentTask.description, currentTask.script);
	}

	let currentTask: Task;
	let currentId: number;
	let mode: 'Creating' | 'Editing';
</script>

<Modal on:close={OnOkButtonDown}>
	{#if currentTask}
		<input style="width: 98%" placeholder="Name" bind:value={currentTask.name} />
		<div style="height: 10px" />
		<textarea
			style="width: 98%; max-width: 98%"
			placeholder="Description"
			bind:value={currentTask.description}
		/>
		<div style="height: 10px" />
		<textarea
			style="width: 98%; max-width: 98%"
			placeholder="Script"
			bind:value={currentTask.script}
		/>
		<div style="height: 10px" />
	{/if}
</Modal>

<div>
	<div style="display:flex; flex-direction: row">
		<h1>Today</h1>
		<div style="width: 10px" />
		<div style="display:flex; justify-content: center; align-items: center; cursor: pointer">
			<div
				on:click={() => OnAddTaskButtonDown()}
				style=" background-color: #ececec; display:flex; justify-content: center; align-items: center; width: 20px; height:20px"
			>
				<b>&#x2b;</b>
			</div>
		</div>
	</div>

	{#each $tasks as task, i}
		<TaskView
			bind:task
			on:delete={() => OnDeleteTaskButtonDown(i)}
			on:edit={() => OnEditTaskButtonDown(i)}
		/>
	{/each}
</div>
