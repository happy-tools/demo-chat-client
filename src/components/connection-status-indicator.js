/**
 * @flow
 */
import * as React from 'react';
import { Color } from 'ink';

import type { ConnectionStatus } from '../use-chat';

const YELLOW = [50, 100, 50];
const GREEN  = [100, 100, 50];
const RED    = [0, 100, 50];

type Props = {|
	status: ConnectionStatus,
	indicatorCharacter: string,
|}

export default function ConnectionStatusIndicator(props: Props) {
	return (
		<Color hsl={hslColorForStatus(props.status)}>{props.indicatorCharacter}</Color>
	);
}

ConnectionStatusIndicator.defaultProps = {
	indicatorCharacter: '○',
};

function hslColorForStatus(connectionStatus: ConnectionStatus) {
	switch( connectionStatus ) {
		case 'connected': {
			return GREEN;
		}
		case 'disconnected': {
			return YELLOW;
		}
		case 'connecting': {
			return YELLOW;
		}
		case 'unauthorized': {
			return RED;
		}
		default: {
			(connectionStatus: empty);
		}
	}
}