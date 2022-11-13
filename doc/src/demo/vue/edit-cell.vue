<template>
  <el-table border height="400" :data="tableData">
    <el-table-column type="index" label="序号" width="60px"></el-table-column>

    <el-table-column
      prop="name"
      label="名称"
      width="200px"
      show-overflow-tooltip
    >
      <template #default="{ row }">
        <edit-cell :model-value="row.name">
          <el-input v-model="row.name"></el-input>
        </edit-cell>
      </template>
    </el-table-column>

    <el-table-column prop="phone" label="联系方式" width="100">
      <template #default="{ row }">
        <edit-cell :model-value="row.phone">
          <el-input v-model="row.phone"></el-input>
        </edit-cell>
      </template>
    </el-table-column>

    <el-table-column prop="favorite" label="爱好">
      <template #default="{ row }">
        <edit-cell :model-value="row.favorite">
          <el-input v-model="row.favorite"></el-input>
        </edit-cell>
      </template>
    </el-table-column>

    <el-table-column prop="job" label="职业">
      <template #default="{ row }">
        <edit-cell :model-value="row.job">
          <el-input v-model="row.job"></el-input>
        </edit-cell>
      </template>
    </el-table-column>

    <el-table-column prop="age" label="年龄">
      <template #default="{ row }">
        <edit-cell :model-value="row.age">
          <el-input v-model="row.age"></el-input>
        </edit-cell>
      </template>
    </el-table-column>

    <el-table-column prop="address" label="地址">
      <template #default="{ row }">
        <edit-cell :model-value="row.address">
          <el-input v-model="row.address"></el-input>
        </edit-cell>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
import 'element-plus/theme-chalk/dark/css-vars.css';
import 'element-plus/theme-chalk/index.css';
import { EditCell } from '@table-tool/vue';
import { ElInput, ElTable, ElTableColumn } from 'element-plus';
import { ref } from 'vue';
import { UserList, useData } from '../../utils/data';

const tableData = ref<UserList>([]);

useData(10, tableData);
</script>
