/**
 * @flow
 */
import EventEmitter from 'events';

class Connection extends EventEmitter {

}

export default function createClient() {
	return new Connection();
}