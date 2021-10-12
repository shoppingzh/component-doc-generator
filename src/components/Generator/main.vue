<template>
  <div class="generator">
    <el-form
      :model="form"
      label-width="150px"
      label-position="left"
      label-suffix="：">
      <el-form-item label="组件名" prop="name">
        <el-input v-model="form.name" placeholder="如：富文本编辑器" />
      </el-form-item>
      <el-form-item label="作者" prop="author">
        <el-input v-model="form.author" placeholder="如：张三" />
      </el-form-item>
      <el-form-item label="示例图" prop="image">
        <el-input v-model="form.image" placeholder="如：../images/component.png" />
      </el-form-item>
      <el-form-item label="使用方法" prop="exampleCode">
        <el-input v-model="form.exampleCode" type="textarea" :autosize="{ minRows: 5, maxRows: 10 }" placeholder="如：<component />" />
      </el-form-item>
      <el-form-item label="属性" prop="props">
        <el-table
          :data="form.props">
          <el-table-column label="名称">
            <template #default="{ row }">
              <el-input v-model="row.name" />
            </template>
          </el-table-column>
          <el-table-column label="说明">
            <template #default="{ row }">
              <el-input v-model="row.description" />
            </template>
          </el-table-column>
          <el-table-column label="类型">
            <template #default="{ row }">
              <type-select v-model="row.type" />
            </template>
          </el-table-column>
          <el-table-column label="是否必须">
            <template #default="{ row }">
              <el-select v-model="row.required">
                <el-option label="是" :value="true" />
                <el-option label="否" :value="false" />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="可选值">
            <template #default="{ row }">
              <el-input v-model="row.optionValue" />
            </template>
          </el-table-column>
          <el-table-column label="默认值">
            <template #default="{ row }">
              <el-input v-model="row.defaultValue" />
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100px" align="center">
            <template #default="{ $index }">
              <el-link type="danger" :underline="false" @click="handleRemoveProp($index)">删除</el-link>
            </template>
          </el-table-column>
        </el-table>
        <el-link type="primary" :underline="false" @click="handleAddProp"><i class="el-icon-plus" /> 添加新属性</el-link>
      </el-form-item>
      <el-form-item label="方法">
        <el-table
          :data="form.methods">
          <el-table-column label="名称">
            <template #default="{ row }">
              <el-input v-model="row.name" />
            </template>
          </el-table-column>
          <el-table-column label="说明">
            <template #default="{ row }">
              <el-input v-model="row.description" />
            </template>
          </el-table-column>
          <el-table-column label="参数">
            <template #default="{ row }">
              <el-input v-model="row.args" />
            </template>
          </el-table-column>
          <el-table-column label="返回值">
            <template #default="{ row }">
              <el-input v-model="row.returnValue" />
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100px" align="center">
            <template #default="{ $index }">
              <el-link type="danger" :underline="false" @click="handleRemoveMethod($index)">删除</el-link>
            </template>
          </el-table-column>
        </el-table>
        <el-link type="primary" :underline="false" @click="handleAddMethod"><i class="el-icon-plus" /> 添加新方法</el-link>
      </el-form-item>
      <el-form-item label="事件">
        <el-table
          :data="form.events">
          <el-table-column label="名称">
            <template #default="{ row }">
              <el-input v-model="row.name" />
            </template>
          </el-table-column>
          <el-table-column label="说明">
            <template #default="{ row }">
              <el-input v-model="row.description" />
            </template>
          </el-table-column>
          <el-table-column label="回调参数">
            <template #default="{ row }">
              <el-input v-model="row.args" />
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100px" align="center">
            <template #default="{ $index }">
              <el-link type="danger" :underline="false" @click="handleRemoveEvent($index)">删除</el-link>
            </template>
          </el-table-column>
        </el-table>
        <el-link type="primary" :underline="false" @click="handleAddEvent"><i class="el-icon-plus" /> 添加新事件</el-link>
      </el-form-item>
      <el-form-item label="插槽">
        <el-table
          :data="form.slots">
          <el-table-column label="名称">
            <template #default="{ row }">
              <el-input v-model="row.name" />
            </template>
          </el-table-column>
          <el-table-column label="说明">
            <template #default="{ row }">
              <el-input v-model="row.description" />
            </template>
          </el-table-column>
          <el-table-column label="参数">
            <template #default="{ row }">
              <el-input v-model="row.args" />
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100px" align="center">
            <template #default="{ $index }">
              <el-link type="danger" :underline="false" @click="handleRemoveSlot($index)">删除</el-link>
            </template>
          </el-table-column>
        </el-table>
        <el-link type="primary" :underline="false" @click="handleAddSlot"><i class="el-icon-plus" /> 添加新插槽</el-link>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { computed, reactive, watch } from 'vue'
import TypeSelect from './TypeSelect.vue'
import prop from './template/prop'
import method from './template/method'
import event from './template/event'
import slot from './template/slot'
import useItems from './useItems'
import compile from '@/template/doc'

export default {
  name: 'Generator',
  components: { TypeSelect },
  setup(props, ctx) {
    const form = reactive({
      name: '',
      image: '',
      exampleCode: '',
      props: [],
      methods: [],
      events: [],
      slots: [],
      author: '',
      time: ''
    })
    const handleAddProp = () => {
      form.props.push(prop())
    }
    const handleRemoveProp = (index) => {
      form.props.splice(index, 1)
    }
    const handleAddMethod = () => {
      form.methods.push(method())
    }
    const handleRemoveMethod = (index) => {
      form.methods.splice(index, 1)
    }
    const handleAddEvent = () => {
      form.events.push(event())
    }
    const handleRemoveEvent = (index) => {
      form.events.splice(index, 1)
    }
    const handleAddSlot = () => {
      form.slots.push(slot())
    }
    const handleRemoveSlot = (index) => {
      form.slots.splice(index, 1)
    }

    watch(form, (newVal) => {
      ctx.emit('update', compile(newVal), newVal)
    }, { deep: true, immediate: true })

    return {
      form,

      handleAddProp,
      handleRemoveProp,
      handleAddMethod,
      handleRemoveMethod,
      handleAddEvent,
      handleRemoveEvent,
      handleAddSlot,
      handleRemoveSlot
    }
  }
}
</script>

<style scoped>
  .generator {
    padding: 10px;
  }
</style>
