/**
 * @flow
 */
import { useEffect } from 'react';
import createConnection from './happychat';

export default function useConnection() {
	const connection = createConnection();
	useEffect(() => {

	}, [connection]);
	return connection;
}