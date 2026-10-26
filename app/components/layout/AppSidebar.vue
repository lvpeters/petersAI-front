<script setup lang="ts">
import {
  Plus,
  Images,
  UserRound,
  Ellipsis,
  Pencil,
  Trash2
} from 'lucide-vue-next'
import { ref, onMounted, onUnmounted } from 'vue'

const chats = [
  { id: '1', title: 'Retrato cinematográfico' },
  { id: '2', title: 'Ajuda com programação' },
  { id: '3', title: 'Edição de fotografia' }
]

const openMenuId = ref<string | null>(null)
const menuPosition = ref({ top: 0, left: 0 })

function toggleMenu(chatId: string, event: MouseEvent) {
  if (openMenuId.value === chatId) {
    openMenuId.value = null
    return
  }

  const button = event.currentTarget as HTMLElement
  const rect = button.getBoundingClientRect()

  const menuWidth = 144
  const menuHeight = 90
  const margin = 8

  menuPosition.value = {
    top: rect.bottom + menuHeight + margin > window.innerHeight
      ? rect.top - menuHeight - 4
      : rect.bottom + 4,
    left: Math.max(
      margin,
      Math.min(rect.right - menuWidth, window.innerWidth - menuWidth - margin)
    )
  }

  openMenuId.value = chatId
}

function closeMenu(event: MouseEvent) {
  const target = event.target as HTMLElement

  if (
    target.closest('[data-chat-menu]') ||
    target.closest('[data-chat-menu-trigger]')
  ) {
    return
  }

  openMenuId.value = null
}

function handleEscape(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    openMenuId.value = null
  }
}

onMounted(() => {
  document.addEventListener('click', closeMenu)
  document.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  document.removeEventListener('click', closeMenu)
  document.removeEventListener('keydown', handleEscape)
})
</script>

<template>
  <aside
    class="flex h-full w-64 shrink-0 flex-col border-r border-zinc-800 bg-zinc-950 p-1 text-zinc-100"
  >
    <!-- Logo -->
    <div class="mb-8 mt-2 px-3">
      <h1 class="text-xl font-semibold tracking-tight">
        PetersAI
      </h1>
    </div>

    <!-- Navegação -->
    <nav class="space-y-1">
      <NuxtLink
        to="/"
        class="flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-zinc-800"
      >
        <Plus :size="18" />
        Novo chat
      </NuxtLink>

      <NuxtLink
        to="/library"
        class="flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-zinc-800"
      >
        <Images :size="18" />
        Biblioteca
      </NuxtLink>
    </nav>

    <!-- Histórico -->
    <div class="mt-8 flex min-h-0 flex-1 flex-col">
      <h2 class="mb-3 px-3 text-xs font-medium text-zinc-500">
        Chats
      </h2>

      <div class="space-y-1 overflow-y-auto">
        <div
          v-for="chat in chats"
          :key="chat.id"
          class="group flex items-center rounded-lg text-sm text-zinc-300 transition-colors hover:bg-zinc-800"
        >
          <NuxtLink
            :to="`/chat/${chat.id}`"
            class="min-w-0 flex-1 truncate px-3 py-2"
            @click="openMenuId = null"
          >
            {{ chat.title }}
          </NuxtLink>

          <button
            type="button"
            data-chat-menu-trigger
            class="mr-2 rounded-md p-1 opacity-0 transition-opacity hover:bg-zinc-700 group-hover:opacity-100 focus:opacity-100"
            :class="{ '!opacity-100': openMenuId === chat.id }"
            :aria-expanded="openMenuId === chat.id"
            :aria-label="`Opções do chat ${chat.title}`"
            @click="toggleMenu(chat.id, $event)"
          >
            <Ellipsis :size="18" />
          </button>
        </div>
      </div>
    </div>

    <!-- Usuário -->
    <div class="mt-4 border-t border-zinc-800 pt-4">
      <div class="flex items-center gap-3 rounded-lg px-3 py-2">
        <div
          class="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-800"
        >
          <UserRound :size="18" />
        </div>

        <span class="truncate text-sm font-medium">
          Lucas Peters
        </span>
      </div>
    </div>
  </aside>

  <!-- Menu flutuante dos chats -->
  <Teleport to="body">
    <div
      v-if="openMenuId"
      data-chat-menu
      class="fixed z-50 w-36 rounded-lg border border-zinc-700 bg-zinc-900 p-1 text-sm text-zinc-300 shadow-lg"
      :style="{
        top: `${menuPosition.top}px`,
        left: `${menuPosition.left}px`
      }"
    >
      <button
        type="button"
        class="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left hover:bg-zinc-800"
      >
        <Pencil :size="16" />
        Renomear
      </button>

      <button
        type="button"
        class="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-red-400 hover:bg-zinc-800"
      >
        <Trash2 :size="16" />
        Excluir
      </button>
    </div>
  </Teleport>
</template>