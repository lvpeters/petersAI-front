<script setup lang="ts">
    import type { ChatMessage } from '~/types/chat'

    defineProps<{
        message: ChatMessage
    }>()
</script>

<template>
  <div
    class="flex w-full"
    :class="message.role === 'user' ? 'justify-end' : 'justify-start'"
  >
    <div
      class="max-w-[80%] rounded-2xl px-4 py-3"
      :class="message.role === 'user'
        ? 'bg-zinc-700'
        : 'bg-transparent'"
    >
      <p class="whitespace-pre-wrap text-sm">
        {{ message.content }}
      </p>

      <div
        v-if="message.images.length"
        class="mt-2 text-xs text-zinc-400"
      >
        <p
          v-for="(image, index) in message.images"
          :key="index"
        >
          📎 {{ image.name }}
        </p>
      </div>
    </div>
  </div>
</template>