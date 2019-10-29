/**
 * @flow
 */
import { useEffect, useState } from 'react';
import createConnection from './happychat';

import type { ConnectionStatus, DeliveryAttempt, ChatStatus } from './connection/transport-api';

export type { ConnectionStatus, DeliveryAttempt, ChatStatus };

type Api = {|
	connectionStatus: ConnectionStatus,
	chatStatus: ChatStatus,
	sendMessage: (message: string) => DeliveryAttempt,
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
		sendMessage: message => connection.sendMessage({ text: message }),
	}));

	/**
	 * Initialization of listeners and side effect-full features.
	 */
	useEffect(() => {
		// TODO: register connection listeners
		const connectionStatusListener = connectionStatus =>
			updateApi({ ...api, connectionStatus });
		const chatStatusListener = chatStatus =>
			updateApi({ ...api, chatStatus });

		connection.addConnectionStatusListener(connectionStatusListener);
		connection.addChatStatusListener(chatStatusListener);

		connection.connect(token);
		return () => {
			connection.removeConnectionStatusListener(connectionStatusListener);
			connection.removeChatStatusListener(chatStatusListener);
		}
	}, []);

	return api;
}
