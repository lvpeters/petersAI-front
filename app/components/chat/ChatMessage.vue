<script setup lang="ts">
    import { ref, onMounted, onUnmounted } from 'vue'
    import type { ChatMessage } from '~/types/chat'

   const props = defineProps<{
        message: ChatMessage
    }>()

    const imageUrls = ref<string[]>([])

    onMounted(() => {
      imageUrls.value = props.message.images.map(image =>
        URL.createObjectURL(image)
      )
    })

    onUnmounted(() => {
      imageUrls.value.forEach(url =>
        URL.revokeObjectURL(url)
      )
    })
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
      <!-- Texto -->
      <p 
        v-if="message.content"
        class="whitespace-pre-wrap text-sm"
      >
        {{ message.content }}
      </p>

      <!-- Imagens -->
      <div
        v-if="imageUrls.length"
        class="mt-2 flex flex-wrap gap-2"
      >
        <img
          v-for="(url, index) in imageUrls"
          :key="url"
          :src="url"
          :alt="message.images[index]?.name || 'Imagem anexada'" 
          class="h-32 w-32 rounded-lg object-cover"
        />
      </div>
    </div>
  </div>
</template>