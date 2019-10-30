/**
 * @flow
 */
import * as React from 'react';
import { Box } from 'ink';

import type { Message } from '../connection/transport-api';

type AuthorType = $PropertyType<Message, 'author'>;

type Props = {|
	author: AuthorType,
	children: React.Node,
|}

export default function ChatMessageContainer(props: Props) {
	switch (props.author) {
		case 'customer': {
			return (
				<Box justifyContent="flex-end" marginRight={1} marginLeft={10}>
					{props.children}
				</Box>
			)
		}
		case 'agent': {
			return (
				<Box justifyContent="flex-start" marginRight={10} marginLeft={1}>
					{props.children}
				</Box>
			)
		}
		default: {
			(props.author: empty)
			return null;
		}
	}
}