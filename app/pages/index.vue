<script setup lang="ts">
import ChatInput from '~/components/chat/ChatInput.vue'

const { createChat } = useChats()
const { addMessage } = useMessages()

async function handleSend(message: string, images: File[]) {
  const title = message.trim().slice(0, 40) || 'Nova conversa'

  const chatId = createChat(title)

  addMessage(chatId, message, images)

  await navigateTo(`/chat/${chatId}`)
}
</script>

<template>
  <div class="flex h-full min-h-0 flex-col">

    <div class="flex-1 overflow-y-auto px-6">
      <div class="flex h-full items-center justify-center">
        <h1 class="text-3xl font-semibold tracking-tight">
          Como posso ajudar?
        </h1>
      </div>
    </div>

    <div class="flex justify-center px-6 pb-6 pt-3">
      <ChatInput @send="handleSend" />
    </div>

  </div>
</template>