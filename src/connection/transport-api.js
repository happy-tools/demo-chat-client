/**
 * @flow
 */
import uuid from 'uuid/v4';

export type ConnectionStatus =
 | 'connected'
 | 'connecting'
 | 'disconnected'
 | 'unauthorized';

export type ChatStatus =
 | 'unassigned'
 | 'assigned';

export type OutboundMessage = {|
   +text: string,
|}

export opaque type MessageId: string = string;
export opaque type Timestamp: number = number;

export type Message = {|
   +id: MessageId,
   +timestamp: Timestamp,
   +text: string,
   +author: 'customer' | 'agent'
|}

export type DeliveryAttempt = {|
   +messageId: MessageId,
   +sentTimestamp: Timestamp,
   +receipt: Promise<Receipt>
|};

export type Receipt = {|
   message: Message,
|}

export interface TransportAPI {
   sendEvent(): void,
   connect(token: string): void,

   addMessageListener(Message => void): void;
   removeMessageListener(Message => void): void;

   addConnectionStatusListener(ConnectionStatus => void): void,
   removeConnectionStatusListener(ConnectionStatus => void): void,
   getConnectionStatus(): ConnectionStatus,

   addChatStatusListener(ChatStatus => void): void,
   removeChatStatusListener(ChatStatus => void): void,
   getChatStatus(): ChatStatus,

   sendMessage(message: OutboundMessage): DeliveryAttempt,
}

export function createMessageId(): MessageId {
   return uuid();
}

export function createTimestamp(): Timestamp {
   return Date.now();
}