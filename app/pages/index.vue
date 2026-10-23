<script setup lang="ts">
import { ref } from 'vue'
import ChatInput from '~/components/chat/ChatInput.vue'
import ChatMessage from '~/components/chat/ChatMessage.vue'
import type { ChatMessage as ChatMessageType } from '~/types/chat'

const messages = ref<ChatMessageType[]>([])

function handleSend(message: string, images: File[]) {
  messages.value.push({
    id: crypto.randomUUID(),
    role: 'user',
    content: message,
    images
  })
}
</script>

<template>
  <div class="flex h-full min-h-0 flex-col">

    <!-- Área das mensagens -->
    <div class="flex-1 overflow-y-auto px-6">
      <div
        v-if="messages.length === 0"
        class="flex h-full items-center justify-center"
      >
        <h1 class="text-3xl font-semibold tracking-tight">
          Como posso ajudar?
        </h1>
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
    <div class="flex justify-center px-6 pb-6 pt-3">
      <ChatInput @send="handleSend" />
    </div>

  </div>
</template>