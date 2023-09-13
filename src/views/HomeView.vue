<script setup lang="ts">
import { computed, reactive } from 'vue';
import FileTree from '../components/FileTree/FileTree.vue'
import type { AbstractFileTree } from '../components/FileTree/type'

const initStructure: AbstractFileTree = {
  checked: false,
  id: 'first',
  name: 'System',
  children: [
    {
      checked: false,
      id: 'docs',
      name: 'Documents',
      children: []
    },
    {
      checked: true,
      id: 'music',
      name: 'Music',
      children: [
        {
          checked: true,
          id: 'deja-vue',
          name: 'Deja Vue',
          children: []
        },
        {
          checked: true,
          id: 'gas-gas-gas',
          name: 'Gas Gas Gas',
          children: []
        },
        {
          checked: true,
          id: 'running-in-the-90',
          name: "Running in the 90'",
          children: []
        },
        {
          checked: true,
          id: 'night-of-fire',
          name: 'Night of fire',
          children: []
        },
        {
          checked: true,
          id: 'the-top',
          name: 'The Top',
          children: []
        },
        {
          checked: true,
          id: 'adrenaline',
          name: 'Adrenaline',
          children: []
        },
        {
          checked: false,
          id: 'killing-my-love',
          name: 'Killing my love',
          children: []
        },
      ]
    },
    {
      checked: false,
      id: 'photo',
      name: 'Photos',
      children: []
    },
    {
      checked: false,
      id: 'saves',
      name: 'Game saves',
      children: [
        {
          checked: false,
          id: 'gothic1',
          name: 'Gothic',
          children: []
        },
        {
          checked: false,
          id: 'gothic2nor',
          name: 'Gothic 2 Night of Raven',
          children: []
        },
        {
          checked: false,
          id: 'gothic3',
          name: 'Gothic 3',
          children: []
        }
      ]
    }
  ]
}

let structure = reactive(initStructure);
const selectedItems = computed(() => getSelectedItems(structure))

function onUpdateSelectedItems(update: AbstractFileTree) {
  structure.checked = update.checked
  structure.children = update.children
}

function getSelectedItems(root: AbstractFileTree): AbstractFileTree[] {
  let result: AbstractFileTree[] = [];

  const {checked, name, id} = root;

  if (checked) result.push({ checked, name, id, children: []})

  for (const item of root.children) {
    getSelectedItemsInChild(item, result);
  }

  return result;
}

function getSelectedItemsInChild(node: AbstractFileTree, result: AbstractFileTree[]) {
  const {checked, name, id} = node;

  if (checked) result.push({ checked, name, id, children: []})

  for (const item of node.children) {
    getSelectedItemsInChild(item, result);
  }
}
</script>

<template>
  <FileTree :item="structure" :checked="structure.checked" @update:selectedItems="onUpdateSelectedItems" />
  <ul>
    <li v-for="item of selectedItems" :key="item.id">{{ item.name }}:{{ item.id }}</li>
  </ul>
</template>
