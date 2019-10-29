/**
 * @flow
 */
import EventEmitter from 'events';
import createMockConnection from './connection/mock-connection';

import type { TransportAPI } from './connection/transport-api';

/**
 * Creates a Happy Chat client with `token` used to authenticate the customer chat. Supports
 * alternate ServerAPI implementations with `defaultMockServer()` to simulate a successfully
 * authenticated chat.
 *
 * Example:
 *
 *   const client = createClient();
 */
export default function createClient(createTransport:() => TransportAPI = createMockConnection) {
	return createTransport();
}
