<script setup lang="ts">
import { ref, watch } from 'vue'
import type { AbstractFileTree } from './type'

const props = defineProps<{ item: AbstractFileTree; checked: boolean }>()
const emits = defineEmits(['update:selectedItems'])
const checked = ref(props.checked)
watch(
  props,
  () => {
    checked.value = props.checked
  },
  { deep: true }
)

function toggleItem() {
  checked.value = !checked.value

  const updatedChildren = toggleChildren(props.item, checked.value)
  const result: AbstractFileTree = {
    id: props.item.id,
    name: props.item.name,
    checked: checked.value,
    children: updatedChildren
  }

  emits('update:selectedItems', result)
}

function toggleChildren(item: AbstractFileTree, parentState: boolean): AbstractFileTree[] {
  const updatedChildren = item.children.map((el) => {
    return {
      checked: parentState,
      id: el.id,
      name: el.name,
      children: toggleChildren(el, parentState)
    }
  })

  return updatedChildren
}

function onUpdateSelectedItems(update: AbstractFileTree) {
  let updatedChildren = props.item.children.map((el) => {
    return el.id === update.id ? update : el
  })

  const result: AbstractFileTree = {
    id: props.item.id,
    name: props.item.id,
    checked: props.item.checked,
    children: updatedChildren
  }

  emits('update:selectedItems', result)
}
</script>

<template>
  <div class="file-tree">
    <input
      type="checkbox"
      name="selected-item"
      id="selected-item"
      :value="item.name"
      @click="toggleItem"
      v-model="checked"
    />
    {{ item.name }} is checked {{ item.checked }}
    <div class="ml-6">
      <FileTree
        v-for="item in props.item.children"
        :key="item.id"
        :item="item"
        :checked="item.checked"
        @update:selectedItems="onUpdateSelectedItems"
      />
    </div>
  </div>
</template>
