<script setup lang="ts">
  import { ref, watch, onUnmounted } from 'vue'
  import { Plus, ArrowUp, X } from 'lucide-vue-next'

  const emit = defineEmits<{
    send: [message: string, images: File[]]
  }>()

  const message = ref('')
  const images = ref<File[]>([])
  const imageUrls = ref<string[]>([])
  const fileInput = ref<HTMLInputElement | null>(null)

  function openFilePicker() {
    fileInput.value?.click()
  }

  function handleFiles(event: Event) {
    const input = event.target as HTMLInputElement

    if (!input.files) 
          return

    const selectedFiles = Array.from(input.files)

    images.value = [
      ...images.value,
      ...selectedFiles.filter(file =>
        file.type.startsWith('image/')
      )
    ]
    input.value = ''
  }

  function removeImage(index: number) {
    images.value = images.value.filter((_, i) => i !== index)
  }

  function sendMessage() {
    const text = message.value.trim()

    if (!text && images.value.length === 0) return

    emit('send', text, [...images.value])

    message.value = ''
    images.value = []
  }

  watch(images, (files) => {
    imageUrls.value.forEach(url => URL.revokeObjectURL(url))
    imageUrls.value = files.map(file => 
      URL.createObjectURL(file)
    )
  })

  onUnmounted(() => {
    imageUrls.value.forEach(url => URL.revokeObjectURL(url))
  })
</script>

<template>
  <div class="w-full max-w-3xl rounded-2xl border border-zinc-700 bg-zinc-800 p-3">

    <!-- Prévia dos arquivos -->
    <div
      v-if="imageUrls.length"
      class="mb-3 flex flex-wrap gap-3"
    >
      <div
        v-for="(url, index) in imageUrls"
        :key="url"
        class="relative"
      >
        <img
          :src="url"
          :alt="images[index]?.name || 'Imagem anexada'"
          class="h-24 w-24 rounded-xl object-cover"
        />

        <button
          type="button"
          aria-label="Remover imagem"
          class="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-zinc-600 text-white hover:bg-zinc-500"
          @click="removeImage(index)"
        >
          <X :size="14" />
        </button>
      </div>
    </div>

    <!-- Campo de mensagem -->
    <textarea
      v-model="message"
      placeholder="Envie uma mensagem..."
      rows="2"
      class="w-full resize-none bg-transparent text-sm text-white outline-none placeholder:text-zinc-500"
      @keydown.enter.exact.prevent="sendMessage"
    />

    <!-- Ações -->
    <div class="flex items-center justify-between">

      <!-- Upload -->
      <div>
        <input
          ref="fileInput"
          type="file"
          accept="image/*"
          multiple
          class="hidden"
          @change="handleFiles"
        />

        <button
          type="button"
          aria-label="Anexar imagens"
          class="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-zinc-700"
          @click="openFilePicker"
        >
          <Plus :size="20" />
        </button>
      </div>

      <!-- Enviar -->
      <button
        type="button"
        aria-label="Enviar mensagem"
        :disabled="!message.trim() && !images.length"
        class="flex h-9 w-9 items-center justify-center rounded-full bg-white text-zinc-900 transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
        @click="sendMessage"
      >
        <ArrowUp :size="20" />
      </button>
    </div>
  </div>
</template>