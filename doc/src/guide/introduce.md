### Why?

像`element-plus` 的 [ElTable](https://element-plus.org/zh-CN/component/table.html)这种表格，本身并没有`编辑插槽`,`校验`功能，开发时带来了很大的不便，所以如果有额外的方式可以实现这些功能，那么就可以在不更换`表格`的情况下带来更好的`开发体验`。这就是[Table Tool](https://github.com/RadiumAg/table-tool)的由来。



### How?

 [Table Tool](https://github.com/RadiumAg/table-tool) 可以简单快速的帮助表格实现`编辑` 功能，以[ElTable](https://element-plus.org/zh-CN/component/table.html)为例，只要在`<el-table-column`中插入`Cell`组件就可以实现：

```typescript
...
import { Cell } from '@table-tool/vue'
...
 <el-table-column
      prop="name"
      label="名称"
      width="200px"
      show-overflow-tooltip
    >
      <template #default="{ row }">
        <edit-cell :row="row" field="name">
          <el-input v-model="row.name"></el-input>
        </edit-cell>
      </template>
 </el-table-column>
...
```

::: tip

详情请查看[表格编辑](https://radiumag.github.io/table-tool/guide/edit-cell.html)

:::



当然，在`日常`开发中，`表格验证`也是必不可少的，[Table Tool](https://github.com/RadiumAg/table-tool) 提供了`Tool`组件，来快速的实现校验：

```typescript
...
import { Cell, Tool } from '@table-tool/vue'

<template> 
<tool>
 <el-table>
   ...
  <el-table-column
       prop="name"
       label="名称"
       width="200px"
       :edit-rules="[{ required: true, message: '名称必填' }]"
       show-overflow-tooltip
     >
       <template #default="{ row }">
         <edit-cell :row="row" field="name">
           <el-input v-model="row.name"></el-input>
         </edit-cell>
       </template>
  </el-table-column>
  ...
 </el-table>
</tool>
</template/>
```

将`Tool`组件套在`ElTable`之后，只需要获取`Tool`的实例并调用`validate`就能实现`校验`：

```typescript
 toolRef.value.validate();
```

::: tip

详情请查看[表格验证](https://radiumag.github.io/table-tool/guide/validate.html)

:::



### 



### 


