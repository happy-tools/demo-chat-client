/**
 * @flow
 */

export default class Observable<T> {

	listeners: Array<T => void>;
	currentValue: T;

	constructor(current: T) {
		this.listeners = [];
		this.currentValue = current;
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

	update(change: T) {
		if (change !== this.currentValue) {
			this.currentValue = change;
			this.listeners.forEach(listener => {
				listener(change);
			});
		}
	}
}
