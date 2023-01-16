<script lang="ts">
	import type { ProgressBar } from '../models/progressBar';
	export let progressBar: ProgressBar;

	const background = `radial-gradient(white 50%, transparent 51%),
    conic-gradient(transparent 0deg ${getAngle()}deg, gainsboro ${getAngle()}deg 360deg),
    conic-gradient(orange 0deg, yellow 90deg, lightgreen 180deg, green);`;

	$: cssVarStyles = `--background:${background}`;

	function getAngle() {
		return progressBar.occupancy * 360;
	}
</script>

<div id="progress-circle" style={cssVarStyles}>
	{progressBar.occupancy * 100}%
</div>

<style>
	#progress-circle {
		background: var(--background);
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
