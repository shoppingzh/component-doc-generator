<template>
  <el-config-provider :locale="zhCn">
    <div>
      <div class="title">组件文档生成器</div>
      <el-row type="flex">
        <el-col :lg="{ span: 18, offset: 3 }" :md="{ span: 20, offset: 2 }" :sm="{ span: 24, offset: 0 }">
          <Generator @update="handleGenerate" />
        </el-col>
      </el-row>
      <el-drawer
        v-model="showViewer"
        title="效果预览"
        size="70%"
        append-to-body>
        <template #title>
          <div>
            组件文档效果预览 <el-button type="warning" size="mini" @click="handleDownload"><i class="el-icon-download" /> 下载</el-button>
          </div>
        </template>
        <Viewer v-if="showViewer" :markdown="markdownSource" />  
      </el-drawer>
      <el-button
        type="primary"
        class="go-button"
        @click="showViewer = true">GO！</el-button>
    </div>
  </el-config-provider>
</template>

<script>
import { computed, nextTick, ref, watch } from 'vue'
import { ElNotification } from 'element-plus'
import { downloadText } from '@/utils/file'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'

export default {
  setup() {
    const markdownSource = ref(null)
    const markdownData = ref(null)
    const showViewer = ref(false)

    const handleGenerate = (md, data) => {
      markdownSource.value = md
      markdownData.value = data
    }

    // TODO: 待做
    // watch(showViewer, newVal => {
    //   if (newVal) {
    //     nextTick(() => {
    //       ElNotification({
    //         message: '已复制到剪切板',
    //         type: 'success',
    //         position: 'top-left'
    //       })
    //     })
    //   }
    // })

    const handleDownload = () => {
      downloadText(`${markdownData.value.name || '未命名组件'}.md`, markdownSource.value)
    }

    return {
      zhCn,
      markdownSource,
      showViewer,

      handleGenerate,
      handleDownload
    }
  }
}
</script>

<style lang="less" scped>
  .title {
    margin-bottom: 12px;
    padding: 10px;
    font-weight: 700;
    font-size: 24px;
    text-align: center;
  }
  .go-button {
    position: fixed;
    z-index: 1000;
    bottom: 30px;
    right: 30px;
    width: 60px;
    height: 60px;
    border-radius: 50%!important;
    padding: 0!important;
    box-shadow: 0 0 10px rgba(100, 100, 100, .3), 5px 5px 12px rgba(100, 100, 100, .2);
  }
</style>
