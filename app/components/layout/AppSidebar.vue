<script setup lang="ts">
import {
  Plus,
  Images,
  MessageSquare,
  UserRound
} from 'lucide-vue-next'

const chats = [
  { id: '1', title: 'Retrato cinematográfico' },
  { id: '2', title: 'Ajuda com programação' },
  { id: '3', title: 'Edição de fotografia' }
]
</script>

<template>
  <aside
    class="flex h-full w-64 shrink-0 flex-col border-r border-zinc-800 bg-zinc-950 p-4 text-zinc-100"
  >
    <!-- Logo -->
    <div class="mb-8 px-3">
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
        <NuxtLink
          v-for="chat in chats"
          :key="chat.id"
          :to="`/chat/${chat.id}`"
          class="flex items-center gap-3 truncate rounded-lg px-3 py-2 text-sm text-zinc-300 transition-colors hover:bg-zinc-800"
        >
          <MessageSquare :size="16" class="shrink-0" />

          <span class="truncate">
            {{ chat.title }}
          </span>
        </NuxtLink>
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
</template>