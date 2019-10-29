/**
 * @flow
 */
import type { Message } from './transport-api';

function whenFrom(author: $PropertyType<Message, 'author'>): Message => ?Message {
	return message => message.author === author ? message : null;
}

function reply<T>(detect: Message => ?T, response: T => ?string): Message => ?string {
	return message => {
		const detected = detect(message);
		if (detected == null) {
			return null;
		}
		return response(detected);
	}
}

function all(...actions: Array<Message => ?string>): Message => Array<string> {
	return message => {
		return actions.reduce((responses, action) => {
			const response = action(message);
			if (response == null) {
				return responses;
			}
			return [...responses, response];
		}, []);
	}
}

export default all(
	reply(whenFrom('customer'), () => 'Right back atcha')
)
