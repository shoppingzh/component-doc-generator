import { template } from 'lodash'

export default template(`

![](<%= image %>)


## 使用方法

\`\`\`
<%= exampleCode %>
\`\`\`



## 属性

名称 | 说明 | 类型 | 是否必须 | 可选值 | 默认值
-- | -- | -- | -- | -- | --
<% _.forEach(props, function(item) { %> <%= item.name %> | <%= item.description %> | <%= item.type %> | <%= item.required ? '是' : '否' %> | <%= item.optionValue %> | <%= item.defaultValue %><% }); %>



## 方法

名称 | 说明 | 参数 | 返回值
-- | -- | -- | --
<% _.forEach(methods, function(item) { %><%= item.name %> | <%= item.description %> | <%= item.args %> | <%= item.returnValue %><% }); %>


## 事件

名称 | 说明 | 回调参数
-- | -- | --
<% _.forEach(events, function(item) { %><%= item.name %> | <%= item.description %> | <%= item.args %><% }); %>



## 插槽

名称 | 说明 | 参数
-- | -- | --
<% _.forEach(slots, function(item) { %><%= item.name %> | <%= item.description %> | <%= item.args %><% }); %>




> by <%= author || '?' %>

`)
