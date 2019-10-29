/**
 * @flow
 */
import Observable from './observable';
import { createMessageId, createTimestamp } from './transport-api';

import type {
	TransportAPI,
	ConnectionStatus,
	ChatStatus,
	OutboundMessage,
	DeliveryAttempt
} from './transport-api';

/**
 * Implementation of API.md for completly fake chats.
 */
export class MockConnection implements TransportAPI {

	connectionStatus: Observable<ConnectionStatus>;
	chatStatus: Observable<ChatStatus>;

	constructor() {
		this.connectionStatus = new Observable('disconnected');
		this.chatStatus = new Observable('unassigned');
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
					reject( new Error( 'not implemented' ) );
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