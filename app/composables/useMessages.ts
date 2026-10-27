import type { ChatMessage } from '~/types/chat'

type MessagesByChat = Record<string, ChatMessage[]>

export function useMessages() {
  const messagesByChat = useState<MessagesByChat>(
    'messagesByChat',
    () => ({})
  )

  function getMessages(chatId: string): ChatMessage[] {
    return messagesByChat.value[chatId] ?? []
  }

  function addMessage(
    chatId: string,
    content: string,
    images: File[]
  ) {
    if (!messagesByChat.value[chatId]) {
      messagesByChat.value[chatId] = []
    }

    messagesByChat.value[chatId].push({
      id: crypto.randomUUID(),
      role: 'user',
      content,
      images
    })
  }

  return {
    messagesByChat,
    getMessages,
    addMessage
  }
}