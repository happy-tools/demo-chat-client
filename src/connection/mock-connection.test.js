/**
 * @flow
 */
import MockConnection from './mock-connection';

describe( 'mock-connection', () => {
	it('connects',  (done) => {
		const conn = new MockConnection();
		conn.addConnectionStatusListener(() => {
			done();
		});
		conn.connect('token');
	});
});