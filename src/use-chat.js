/**
 * @flow
 */
import { useEffect, useState } from 'react';
import createConnection from './happychat';

import type { ConnectionStatus, DeliveryAttempt, ChatStatus, Message } from './connection/transport-api';

export type { ConnectionStatus, DeliveryAttempt, ChatStatus };

type Api = {|
	+connectionStatus: ConnectionStatus,
	+chatStatus: ChatStatus,
	+sendMessage: (message: string) => DeliveryAttempt,
	+messages: Array<Message>,
|}

/**
 * Happy Chat Customer client as a React hook.
 */
export default function useConnection(token: string) {
	const connection = createConnection();

	/**
	 * Stateful API interface for the React component tree.
	 */
	const [api, updateApi] = useState<Api>(() => ({
		connectionStatus: connection.getConnectionStatus(),
		chatStatus: connection.getChatStatus(),
		messages: [],
		sendMessage: message => connection.sendMessage({ text: message }),
	}));

	/**
	 * Initialization of listeners and side effect-full features.
	 */
	useEffect(() => {
		const connectionStatusListener = connectionStatus =>
			updateApi(current => ({ ...current, connectionStatus }));

		const chatStatusListener = chatStatus =>
			updateApi(current => ({ ...current, chatStatus }));

		const messageListener = message =>
			updateApi(current => ({ ...current, messages: [...current.messages, message]}));

		connection.addConnectionStatusListener(connectionStatusListener);
		connection.addChatStatusListener(chatStatusListener);
		connection.addMessageListener(messageListener);

		connection.connect(token);
		return () => {
			connection.removeConnectionStatusListener(connectionStatusListener);
			connection.removeChatStatusListener(chatStatusListener);
			connection.removeMessageListener(messageListener);
		}
	}, []);

	return api;
}
