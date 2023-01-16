export class ProgressBar {
	color: string;
	occupancy: number;

	constructor(color: string = 'red', occupancy: number = 0) {
		this.color = color;
		this.occupancy = occupancy;
	}
}
