<script setup lang="ts">

const props = defineProps<{
    title: string,
    description: string,
    open: boolean
}>()

const emit = defineEmits<{
    close: [confirmed: boolean]
}>()

</script>

<template>
    <UModal :open="open" :close="false">
        <template #title>
            {{ title }}
        </template>

        <template #description>
            {{ description }}
        </template>

        <template #footer>
            <div class="flex w-full gap-3 justify-end">
                <UButton
                    variant="soft"
                    class="cursor-pointer"
                    color="neutral"
                    @click="emit('close', false)"
                    >
                    Cancelar
                </UButton>
                <UButton
                    variant="solid"
                    class="cursor-pointer"
                    color="success"
                    @click="emit('close', true)"
                    >
                    Confirmar
                </UButton>
            </div>
        </template>
    </UModal>
</template>