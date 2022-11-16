<template>
  <div class="button-group">
    <el-button @click="handleValidate">快速校验</el-button>
  </div>

  <tool ref="toolRef" :data="tableData">
    <el-table border height="400" :data="tableData">
      <el-table-column type="index" label="序号" width="60px"></el-table-column>

      <el-table-column
        prop="name"
        label="名称"
        width="200px"
        show-overflow-tooltip
      >
        <template #default="{ row }">
          <edit-cell
            :row="row"
            field="name"
            :edit-rules="[{ required: true, message: '名称必填' }]"
          >
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
  </tool>
</template>

<script lang="ts" setup>
import 'element-plus/theme-chalk/dark/css-vars.css';
import 'element-plus/theme-chalk/index.css';
import { Cell as EditCell, Tool } from '@table-tool/vue';
import { ElButton, ElInput, ElTable, ElTableColumn } from 'element-plus';
import { ref } from 'vue';
import { UserList, useData } from '../../utils/data';

const tableData = ref<UserList>([]);

const toolRef = ref<InstanceType<typeof Tool>>();

const handleValidate = () => {
  toolRef.value.validate();
};

useData(100, tableData);
</script>

<style lang="scss" scoped>
.button-group {
  margin-bottom: 10px;
}
</style>
