<template>
  <Dialog :open="open" @update:open="$emit('update:open', $event)" modal>
    <DialogContent class="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>{{ title }}</DialogTitle>
        <DialogDescription class="text-sm text-slate-500">{{ description }}</DialogDescription>
      </DialogHeader>

      <DialogFooter class="mt-6 gap-2">
        <DialogClose as-child>
          <Button variant="outline" class="w-full sm:w-auto cursor-pointer">{{
            cancelText
          }}</Button>
        </DialogClose>

        <Button
          variant="destructive"
          class="w-full sm:w-auto cursor-pointer"
          @click="handleConfirm"
        >
          {{ confirmText }}
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

const props = defineProps({
  open: { type: Boolean, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  confirmText: { type: String, required: true },
  cancelText: { type: String, required: true },
})

const emits = defineEmits(['update:open', 'confirm'])

const handleConfirm = () => {
  emits('confirm')
  emits('update:open', false)
}
</script>
