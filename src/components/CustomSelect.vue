<template>
  <div class="select">
    <div class="select-title">
      {{ title }}
    </div>
    <select class="select-area" v-model="selectedValue" @change="sortBy">
      <option 
        v-for="sort in sortList" 
        :key="`key-${sort.id}`" 
        :value="sort.id"
      >
        {{ sort.name }}
      </option>
    </select>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import Sort from '@/data/types/sortInterface'

export default defineComponent({
  name: 'CustomSelect',
  emits: ['sortBy'],
  props: {
    title: {
      required: true,
      type: String,
      default: ''
    },
    sortList: {
      required: true,
      type: Array as PropType<Array<Sort>>
    }
  },
  setup(props:any, { emit }:any) {
    const selectedValue = ref<string>('')

    const sortBy = ():void => emit('sortBy', selectedValue.value)

    return { selectedValue, sortBy }
  },
})
</script>
