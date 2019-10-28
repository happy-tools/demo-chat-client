# Happy Tools Chat - Customer

A library to get your customers chatting.

## Installation

Use `npm`  to install the dependency:

```
npm install @happytools/chat-client
```

Get a customer identity token (no instructions yet).

## Usage

Use a customer token to connect the client to the chat service.

```js

const startChat = require( '@happytools/chat-client' );

const client = startChat( 'MY TOKEN' );
```

At this point the client will attempt to connect and to the chat service, authenticate the user, and open a chat session.

### Observing Connection Satus

The `client` instance can report its current connection status at any time.

```
client.getConnectionStatus();
```

```js
type ConnectionStatus = 'disconnect' | 'connecting' | 'connected' | 'unauthorized';
function getConnectionStatus(): ConnectionStatus
```

To observe when the connection status changes use the `connectionStatusChanged` event:

```js
client.on('connectionStatusChanged', ( connectionStatus: ConnectionStatus) => {

})
```

### Observing Chat Status

A chat has a chat status that determines it's state in the chat service.

```js
type ChatStatus = 'unassigned' | 'assigned';
```

The chat status is available at any time:

```js
function getChatStatus(): ChatStatus
```
```
client.getChatStatus();
```

A change in chat status can be observed through the `chatStatusChanged` event:

```js
client.on( 'chatStatusChanged', ( chatStatus: ChatStatus ) => {

});
```

### Sending Messages

To send a chat message use the `sendMessage` method. It returns a promise when the chat message has been successfully handled by the service.

```js
type Message = { text: string };
type MessageSentResult = {
	message: { uuid: string, text: string, timestamp: Timestamp },
}
function sendMessage(Message): Promise<MessageSendResult>;

const message = await client.sendMessage({ text: 'hello wordl'});
```

TODO: Error handling, timeouts, buffering.

### Receiving Messages

Messages can be observed via the `messageReceived` event:

```js
type ChatMessage = {
	uuid: string,
	text: string,
	author: 'customer' | 'agent'
};

client.on('messageReceived', (chatMessage: ChatMessage) => {

});
```

Messages are not guaranteed to be received in the correct order. Timestamps should be used to sort the messages as they are recorded by the chat service.

### Typing Indicators

The client can send typing activity indicators. It is bufferred so it can be called as often as needed.

```js
function sendIsTyping(draft: ?string): void;
client.sendIsTyping();
```

The `draft` can be provided that can be used to show the agent what the user is currently typing.

The client can also be notified when the agent is typing.

```js
client.on('receiveTypingActivity', () => {

});
```

This event will fire at most twice a second.

## Reference

### Status Methods

```js
type ConnectionStatus = 'connected' | 'connecting' | 'disconnected' | 'unathorized';
function getConnectionStatus(): ChatStatus;
```

```js
type ChatStatus = 'assigned' | 'unassigned';
function getChatStatus(): ChatStatus
```

### IO Methods

```js
type Message = { text: string };
function sendMessage(message: Message): Promise<MessageRequest>;
```

```js
function sendIsTyping(draft: ?string): void;
```

### Events

```js
client.on('messageReceived',         ChatMessage => void);
client.on('typingActivityReceived',  () => void);
client.on('chatStatusChanged',       ChatStatus => void);
client.on('connectionStatusChanged', ConnectionStatus => void);
```
