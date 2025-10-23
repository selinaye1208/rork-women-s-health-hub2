export interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: number;
}

export interface StoredChatMessage extends Message {
  uid: string;
}
