<script lang="ts">
	export let selectedTags: string[] = [];
	let newTag = '';

	function addTag(tag: string) {
		if (!selectedTags.includes(tag)) {
			selectedTags = [...selectedTags, tag];
		}
	}

	function removeTag(tag: string) {
		selectedTags = selectedTags.filter((t) => t !== tag);
	}

	function onSumbitTag(): any {
		console.log(newTag);
		selectedTags = [...selectedTags, newTag];
		newTag = '';
	}
</script>

<div>
	<div>
		{#each selectedTags as tag}
			<span
				>{tag}
				<b style="cursor:pointer; margin-right:10px" on:click={() => removeTag(tag)}>x</b></span
			>
		{/each}
	</div>
	<form on:submit={() => onSumbitTag()}>
		<input width="50px" bind:value={newTag} />
	</form>
</div>
