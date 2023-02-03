<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Task } from '../../models/task';
	import ProgressBarView from './progressBarView.svelte';

	export let task: Task;

	task.onRefresh = () => {
		task = task;
	};

	let dispatch = createEventDispatcher();
</script>

<div class="task-card">
	<div style="display:flex; flex-direction:row; justify-content:space-between">
		<div>
			<div class="task-title">{task.name}</div>
			<div class="task-script">{task.description}</div>
		</div>
		<ProgressBarView progressBar={task.progressBar} />
	</div>

	<div class="task-actions">
		<span class="task-action" on:click={() => dispatch('edit')}>&#x270E;</span>
		<span class="task-action" on:click={() => dispatch('delete')}>&#x2718;</span>
		<span class="task-action" on:click={() => task.functions.onStart()}>&#9658;</span>
	</div>
</div>

<style>
	.task-card {
		padding: 10px;
		border-radius: 5px;
		margin-bottom: 10px;
		background-color: #f2f2f2;
	}

	.task-title {
		font-size: 18px;
		font-weight: bold;
	}

	.task-script {
		font-size: 14px;
	}

	.task-actions {
		text-align: right;
	}

	.task-action {
		cursor: pointer;
		margin-left: 10px;
	}
</style>
