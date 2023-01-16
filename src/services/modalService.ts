import { writable } from 'svelte/store';

class ModalStore {
	isOpen = writable(false);

	constructor() {}

	open() {
		this.isOpen.set(true);
	}

	close() {
		this.isOpen.set(false);
	}
}

export default new ModalStore();
