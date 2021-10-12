<template>
  <div class="viewer markdown-body">
    <div v-html="html" />
  </div>
</template>

<script>
import marked from 'marked'
import { ref, watch } from 'vue'

export default {
  name: 'Viewer',
  props: {
    markdown: { type: String, default: null }
  },
  setup(props, ctx) {
    const html = ref(null)
    watch(() => props.markdown, (newVal) => {
      if (!newVal) return
      html.value = marked(newVal)
    }, {
      immediate: true
    })
    return {
      html
    }
  }
}
</script>

<style>

</style>
