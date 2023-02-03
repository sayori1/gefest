<script lang="ts">
	import type { ProgressBar } from '../../models/progressBar';
	export let progressBar: ProgressBar;

	$: angle = progressBar.occupancy * 360;
</script>

<div
	id="progress-circle"
	style="background:radial-gradient(white 50%, transparent 51%),
    conic-gradient(transparent 0deg {angle}deg, gainsboro {angle}deg 360deg),
    conic-gradient(#8BC34A 0deg, #8BC34A 90deg, #8BC34A 180deg, #8BC34A);"
>
	{(progressBar.occupancy * 100).toString().substring(0, 3)}%
</div>

<style>
	#progress-circle {
		border-radius: 50%;
		width: 50px;
		height: 50px;
		transition: all 500ms ease-in;
		will-change: transform;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
