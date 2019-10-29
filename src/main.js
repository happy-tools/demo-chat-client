/**
 * @flow
 */
import * as React from 'react';

import { render, Box, useInput, useStdin, useStdout, AppContext, Color } from 'ink';
import InkBox from 'ink-box';
import ConnectionStatusIndicator from './components/connection-status-indicator';
import ChatMessage from './components/chat-message';

import useChat from './use-chat';

type Size = {width: number, height: number};

const DELETE = 127;
const wordBreakCharacters = [ ' ', '_' ];

function useSize() {
	const out = useStdout();
	const [size, setSize] = React.useState<Size>({ width: out.stdout.columns, height: out.stdout.rows });
	const onResize = () => {
		setSize({
			width: out.stdout.columns,
			height: out.stdout.rows
		});
	}
	React.useEffect(() => {
		out.stdout.on('resize', onResize);
		return () => {
			out.stdout.off('resize', onResize);
			console.log('cleaning up');
		}
	}, [out]);
	return size;
}

const Line = ({ width }: {width: number}) => {
	return (
		<Box width={width}>{Array(width).fill('─').join('')}</Box>
	)
};

const Demo = () => {
	const { exit } = React.useContext(AppContext);
	const size = useSize();
	const [draft, setDraft] = React.useState("");
	const chat = useChat( 'mock-token' );

	useInput((input, key) => {
		if (key.return) {
			chat.sendMessage(draft);
			setDraft("");
			return;
		}

		switch (input.codePointAt(0)) {
			case DELETE: {
				const boundary = !key.meta ? -1 : wordBreakCharacters.reduce((b, char) => {
					return Math.max(b, draft.lastIndexOf(char));
				}, 0);
				setDraft(draft.slice(0, boundary));
				return;
			}
			default: {
				setDraft(draft + input);
			}
		}
	});
	return (
		<Box width={size.width} height={size.height-1} flexDirection="column">
			<Box flexGrow={1} flexDirection="column">
				{chat.messages.map(message =>
					<ChatMessage author={message.author} text={message.text} />)}
			</Box>
			<Line width={size.width} />
			<Box flexDirection="row" width="100%" minHeight={1}>
				<Box paddingLeft={1}>
					<ConnectionStatusIndicator status={chat.connectionStatus} />
					{' '}▶ ⎸
				</Box>
				<Box flexGrow={1} flexDirection="column">
					<Box width="100%">{draft}</Box>
				</Box>
			</Box>
		</Box>
	);
};

render(<Demo />)