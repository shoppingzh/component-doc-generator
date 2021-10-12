<template>
  <el-select v-bind="attrs">
    <el-option
      v-for="type in types"
      :key="type"
      :label="type"
      :value="type" />
  </el-select>
</template>

<script>
import { computed } from 'vue'
export default {
  setup(props, ctx) {
    const types = [
      'boolean',
      'number',
      'string',
      'object'
    ]
    const attrs = computed(() => Object.assign({}, ctx.attrs))
    return {
      types,
      attrs
    }
  }
}
</script>

<style>

</style>
