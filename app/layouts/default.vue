<template>
  <div class="flex h-dvh overflow-hidden bg-zinc-900 text-zinc-100">
    <LayoutAppSidebar />

    <main class="flex min-w-0 flex-1 flex-col">
      <slot />
    </main>
  </div>
</template>