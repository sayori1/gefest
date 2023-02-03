import { evalInContext, getTotalMinutes } from '../services/utils';
import { ProgressBar } from './progressBar';

export class Task {
	name: string;
	description: string;
	creationDate: Date;
	script: string;
	functions: { [key: string]: Function } = {};
	progressBar: ProgressBar = new ProgressBar();

	onRefresh: Function = new Function();

	constructor(name: string, description: string, script: string) {
		this.name = name;
		this.description = description;
		this.creationDate = new Date();
		this.script = script || 'function onStart(){await this.wait(30)}';
		this.parseScript();
	}

	async wait(duration: number) {
		let alpha = 0;
		let t = setInterval(() => {
			alpha += 1;
			this.progressBar.occupancy = alpha / duration;
			this.onRefresh();
			if (alpha >= duration) clearInterval(t);
		}, 1000);
		return new Promise((resolve) => setTimeout(resolve, duration * 1000));
	}

	parseScript() {
		let regExp = /function\s*(\w*)\s*\(([^)]*)\)\s*\{([\s\S]*?)\}/g;
		let match: string[];
		while ((match = regExp.exec(this.script)!) !== null) {
			let currentMatch = match;
			this.functions[currentMatch[1]] = async () => {
				evalInContext(currentMatch[3], this);
			};
		}
	}
}
