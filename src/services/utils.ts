import { writable } from 'svelte/store';

export let isMobile = writable(false);

export async function onInit() {
	isMobile.set(window.screen.height > window.screen.width);
	console.log(isMobile);
}

export function evalInContext(js: string, context: any) {
	return function () {
		return eval(js);
	}.call(context);
}

export function getTotalMinutes(time: string) {
	let totalMinutes = 0;
	let timeUnits = time.split(/(\d+[wdhms])/);

	for (let i = 0; i < timeUnits.length; i++) {
		let unit = timeUnits[i];
		let unitValue = parseInt(unit.match(/\d+/)![0]);
		switch (unit.slice(-1)) {
			case 'w':
				totalMinutes += unitValue * 7 * 24 * 60;
				break;
			case 'd':
				totalMinutes += unitValue * 24 * 60;
				break;
			case 'h':
				totalMinutes += unitValue * 60;
				break;
			case 'm':
				totalMinutes += unitValue;
				break;
			case 's':
				totalMinutes += unitValue / 60;
				break;
		}
	}
	return totalMinutes;
}
