export function useChats() {
  const chats = useState('chats', () => [
    { id: '1', title: 'Retrato cinematográfico' },
    { id: '2', title: 'Ajuda com programação' },
    { id: '3', title: 'Edição de fotografia' }
  ])

  function renameChat(chatId: string, title: string) {
    const chat = chats.value.find(chat => chat.id === chatId)

    if (!chat) return

    chat.title = title
  }

  function deleteChat(chatId: string) {
    chats.value = chats.value.filter(
      chat => chat.id !== chatId
    )
  }

  function createChat(title: string) {
  const chat = {
    id: crypto.randomUUID(),
    title
  }

  chats.value.unshift(chat)

  return chat.id
}
  return {
    chats,
    renameChat,
    deleteChat,
    createChat
  }
}