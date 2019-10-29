/**
 * @flow
 */
import * as React from 'react';
import { Box } from 'ink';
import ChatMessageContainer from './chat-message-container';

import type { Message } from '../connection/transport-api';

type AuthorType = $PropertyType<Message, 'author'>;

type Props = {|
	author: AuthorType,
	text: string,
|}

export default function ChatMessage(props: Props) {
	return (
		<ChatMessageContainer author={props.author}>
			{props.text}
		</ChatMessageContainer>
	);
}

