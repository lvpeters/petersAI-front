<script setup lang="ts">
import { computed } from 'vue'
import ChatInput from '~/components/chat/ChatInput.vue'
import ChatMessage from '~/components/chat/ChatMessage.vue'

const route = useRoute()

const { chats } = useChats()
const { getMessages, addMessage } = useMessages()

const chatId = computed(() => String(route.params.id))

const chat = computed(() =>
  chats.value.find(chat => chat.id === chatId.value)
)

const messages = computed(() =>
  getMessages(chatId.value)
)

function handleSend(message: string, images: File[]) {
  if (!chat.value) return

  addMessage(chatId.value, message, images)
}
</script>

<template>
  <div class="flex h-full min-h-0 flex-col">

    <!-- Área das mensagens -->
    <div class="flex-1 overflow-y-auto px-6">
      <div
        v-if="!chat"
        class="flex h-full items-center justify-center"
      >
        <p class="text-zinc-400">
          Conversa não encontrada.
        </p>
      </div>

      <div
        v-else
        class="mx-auto flex w-full max-w-3xl flex-col gap-4 py-8"
      >
        <ChatMessage
          v-for="message in messages"
          :key="message.id"
          :message="message"
        />
      </div>
    </div>

    <!-- Campo de entrada -->
    <div
      v-if="chat"
      class="flex justify-center px-6 pb-6 pt-3"
    >
      <ChatInput @send="handleSend" />
    </div>

  </div>
</template>