<script setup lang="ts">
import { ref } from 'vue'
import { Plus, ArrowUp, X } from 'lucide-vue-next'

const emit = defineEmits<{
  send: [message: string, images: File[]]
}>()

const message = ref('')
const images = ref<File[]>([])

const fileInput = ref<HTMLInputElement | null>(null)

function openFilePicker() {
  fileInput.value?.click()
}

function handleFiles(event: Event) {
  const input = event.target as HTMLInputElement

  if (!input.files) 
        return

  const selectedFiles = Array.from(input.files)

  images.value.push(
    ...selectedFiles.filter(file =>
      file.type.startsWith('image/')
    )
  )

  input.value = ''
}

function removeImage(index: number) {
  images.value.splice(index, 1)
}

function sendMessage() {
  const text = message.value.trim()

  if (!text && images.value.length === 0) return

  emit('send', text, [...images.value])

  message.value = ''
  images.value = []
}
</script>

<template>
  <div class="w-full max-w-3xl rounded-2xl border border-zinc-700 bg-zinc-800 p-3">

    <!-- Prévia dos arquivos -->
    <div
      v-if="images.length"
      class="mb-3 flex flex-wrap gap-2"
    >
      <div
        v-for="(image, index) in images"
        :key="index"
        class="flex items-center gap-2 rounded-lg bg-zinc-700 px-3 py-2 text-xs"
      >
        <span class="max-w-32 truncate">
          {{ image.name }}
        </span>

        <button
          type="button"
          aria-label="Remover imagem"
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