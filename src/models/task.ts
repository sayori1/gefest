import { evalInContext, getTotalMinutes } from '../services/utils';
import { ProgressBar } from './progressBar';

export class Task {
	name: string;
	description: string;
	creationDate: Date;
	script: string;

	functions: { [key: string]: Function } = {};

	progressBar: ProgressBar = new ProgressBar();

	constructor(name: string, description: string, script: string) {
		this.name = name;
		this.description = description;
		this.creationDate = new Date();
		this.script = script || 'function onCreate(){\nthis.startCompleting(30);\n}';
	}

	startCompleting(time: number) {}

	parseScript() {
		let regExp = /function\s*(\w*)\s*\(([^)]*)\)\s*\{([\s\S]*?)\}/g;
		let match: string[];
		while ((match = regExp.exec(this.script)!) !== null) {
			this.functions[match[1]] = () => evalInContext(match[3], this);
			evalInContext(match[3], this);
		}
	}
}
