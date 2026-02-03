import { api } from './api';

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

export interface ChatResponse {
  conversation_id: string;
  message: string;
  role: 'model';
  title?: string;
}

export const sendChatMessage = async (message: string, conversationId?: string): Promise<ChatResponse> => {
  const response = await api.post<ChatResponse>('/chat/message', {
    message,
    conversation_id: conversationId,
  });
  return response.data;
};

export const deleteChatHistory = async (): Promise<void> => {
  await api.delete('/chat/history');
};
