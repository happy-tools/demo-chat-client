/**
 * @flow
 */

export interface NotifierInterface<T> {
	addListener(T => void): () => void,
	removeListener(T => void): void,
}

export class Notifier<T> implements NotifierInterface<T> {
	listeners: Array<T => void>;

	constructor() {
		this.listeners = [];
	}

	notify(value: T) {
		this.listeners.forEach(listener => {
			listener(value);
		});
	}

	addListener(listener: T => void): () => void {
		this.listeners.push(listener);
		return () => this.removeListener(listener);
	}

	removeListener(listener: T => void) {
		this.listeners = this.listeners.filter(
			existing => existing === listener
		);
	}
}

export class Observable<T> extends Notifier<T> {

	currentValue: T;

	constructor(current: T) {
		super();
		this.currentValue = current;
	}

	update(change: T) {
		if (change !== this.currentValue) {
			this.currentValue = change;
			this.notify(this.currentValue);
		}
	}
}

