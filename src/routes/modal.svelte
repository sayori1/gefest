<script>
	import { onMount } from 'svelte';
	import { createEventDispatcher } from 'svelte';
	import ModalStore from '../services/modalService';
	let isOpen = false;

	onMount(() => {
		ModalStore.isOpen.subscribe((value) => {
			isOpen = value;
		});
	});

	let dispatch = createEventDispatcher();
</script>

<div class="modal" on:click={() => ModalStore.close()} style="display: {isOpen ? 'block' : 'none'}">
	<div class="modal-content" on:click={(e) => e.stopPropagation()}>
		<slot />
		<button
			on:click={() => {
				ModalStore.close();
				dispatch('close');
			}}>OK</button
		>
	</div>
</div>

<style>
	/* Some CSS styles for nice design */
	.modal {
		position: fixed;
		z-index: 1;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		overflow: auto;
		background-color: rgba(0, 0, 0, 0.4);
	}

	.modal-content {
		background-color: white;
		padding: 20px;
		border-radius: 5px;
		margin: 15% auto;
		width: 50%;
	}
</style>
