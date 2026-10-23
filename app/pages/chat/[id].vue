<script setup lang="ts">
    const route = useRoute()
</script>

<template>
  <div class="p-8">
    <h1 class="text-2xl font-semibold">
      Conversa {{ route.params.id }}
    </h1>
  </div>
</template>