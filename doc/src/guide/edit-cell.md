<script setup>
import EditCell from '@demo/vue/edit-cell.vue'
</script>


### 基本使用
<EditCell/>

```typescript
<template>
  <el-table v-loading="isLoading" border height="400" :data="tableData">
    <el-table-column type="index" label="序号" width="60px"></el-table-column>

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

    <el-table-column prop="phone" label="联系方式" width="100">
      <template #default="{ row }">
        <edit-cell :row="row" field="phone">
          <el-input v-model="row.phone"></el-input>
        </edit-cell>
      </template>
    </el-table-column>

    <el-table-column prop="favorite" label="爱好">
      <template #default="{ row }">
        <edit-cell :row="row" field="favorite">
          <el-input v-model="row.favorite"></el-input>
        </edit-cell>
      </template>
    </el-table-column>

    <el-table-column prop="job" label="职业">
      <template #default="{ row }">
        <edit-cell :row="row" field="job">
          <el-input v-model="row.job"></el-input>
        </edit-cell>
      </template>
    </el-table-column>

    <el-table-column prop="age" label="年龄">
      <template #default="{ row }">
        <edit-cell :row="row" field="age">
          <el-input v-model="row.age"></el-input>
        </edit-cell>
      </template>
    </el-table-column>

    <el-table-column prop="address" label="地址">
      <template #default="{ row }">
        <edit-cell :row="row" field="address">
          <el-input v-model="row.address"></el-input>
        </edit-cell>
      </template>
    </el-table-column>
  </el-table>
</template>
```

### 编辑时默认选中
