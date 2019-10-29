/**
 * @flow
 */
import { Observable, Notifier } from './notifier-interface';
import { createMessageId, createTimestamp } from './transport-api';

import type {
	TransportAPI,
	ConnectionStatus,
	ChatStatus,
	OutboundMessage,
	DeliveryAttempt,
	Message
} from './transport-api';

/**
 * Implementation of API.md for completly fake chats.
 */
export class MockConnection implements TransportAPI {

	connectionStatus: Observable<ConnectionStatus>;
	chatStatus: Observable<ChatStatus>;
	messageNotifier: Notifier<Message>;

	constructor() {
		this.connectionStatus = new Observable('disconnected');
		this.chatStatus = new Observable('unassigned');
		this.messageNotifier = new Notifier();
	}

	connect(token: string): void {
		this.connectionStatus.update('connecting');
		setTimeout(
			() => this.connectionStatus.update('connected'),
			1000
		);
	}

	addConnectionStatusListener(listener: ConnectionStatus => void) {
		this.connectionStatus.addListener(listener);
	}

	removeConnectionStatusListener(listener: ConnectionStatus => void) {
		this.connectionStatus.removeListener(listener);
	}

	getConnectionStatus(): ConnectionStatus {
		return this.connectionStatus.currentValue;
	}

	addMessageListener(listener: Message => void): void {
		this.messageNotifier.addListener(listener);
	}

	removeMessageListener(listener: Message => void): void {
		this.messageNotifier.removeListener(listener);
	}

	addChatStatusListener(listener: ChatStatus => void) {
		this.chatStatus.addListener(listener);
	}

	removeChatStatusListener(listener: ChatStatus => void) {
		this.chatStatus.removeListener(listener);
	}

	getChatStatus(): ChatStatus {
		return this.chatStatus.currentValue;
	}

	sendMessage(message: OutboundMessage): DeliveryAttempt {
		// nooped for now
		const messageId = createMessageId();
		const sentTimestamp = createTimestamp();
		return {
			messageId,
			sentTimestamp,
			receipt: new Promise((resolve, reject) => {
				setTimeout(() => {
					const inboundMessage = {
						id: messageId,
						timestamp: createTimestamp(),
						text: message.text,
						author: 'customer',
					};
					resolve({ message: inboundMessage });
					this.messageNotifier.notify(inboundMessage);
				}, 100);
			}),
		}
	}

	sendEvent(): void {

	}
}

export default function createMockConnection() {
	return new MockConnection();
}