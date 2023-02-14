<script lang="ts">
	import { addTask, deleteTask, modifyTask, tasks } from '../../services/taskService';
	import { onMount } from 'svelte';
	import Modal from './modal.svelte';
	import { Task } from '../../models/task';
	import ModalStore from '../../services/modalService';
	import ProgressBarView from './progressBarView.svelte';
	import TaskView from './taskView.svelte';
	import Tags from './tags.svelte';

	let currentTask: Task = new Task('', '', '', []);
	let currentId: number;
	let mode: 'Creating' | 'Editing';

	const handleAddTask = () => {
		mode = 'Creating';
		currentTask = new Task('', '', '', []);
		ModalStore.open();
	};

	const handleDeleteTask = (index: number) => {
		deleteTask(index);
	};

	const handleEditTask = (index: number) => {
		mode = 'Editing';
		currentId = index;
		currentTask = $tasks[index];
		ModalStore.open();
	};

	const handleOkButton = () => {
		if (mode == 'Creating') addTask(currentTask);
		if (mode == 'Editing') modifyTask(currentId, currentTask);
	};

	onMount(() => {
		loadTasks();
	});

	const loadTasks = () => {
		tasks.set(JSON.parse(localStorage.getItem('tasks') || '[]'));
	};
</script>

<Modal on:close={handleOkButton}>
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
		<Tags bind:selectedTags={currentTask.tags} />
		<div style="height: 10px" />
	{/if}
</Modal>

<div>
	<div style="display:flex; flex-direction: row">
		<h1>Tasks</h1>
		<div style="width: 10px" />
		<div style="display:flex; justify-content: center; align-items: center; cursor: pointer">
			<div
				on:click={handleAddTask}
				style="background-color: #ececec; display:flex; justify-content: center; align-items: center; width: 20px; height:20px"
			>
				<b>&#x2b;</b>
			</div>
		</div>
	</div>

	{#each $tasks as task, i}
		<TaskView bind:task on:delete={() => handleDeleteTask(i)} on:edit={() => handleEditTask(i)} />
	{/each}
</div>
