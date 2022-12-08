<script setup>
import Validate from '@demo/vue/validate.vue'
</script>


### 基本使用
<Validate/>

```typescript
 <div class="button-group">
    <el-button @click="handleValidate">快速校验</el-button>
    <el-button @click="handleSelectionValidate">选中行校验</el-button>
  </div>

  <tool ref="toolRef" :data="tableData">
    <el-table
      border
      height="400"
      :data="tableData"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection"></el-table-column>

      <el-table-column type="index" label="序号" width="60px"></el-table-column>

      <el-table-column
        prop="name"
        label="名称"
        width="180px"
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

      <el-table-column prop="email" label="联系方式" width="200">
        <template #default="{ row }">
          <edit-cell :row="row" field="email">
            <el-input v-model="row.email"></el-input>
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

      <el-table-column prop="address" label="地址" width="150">
        <template #default="{ row }">
          <edit-cell :row="row" field="address">
            <el-input v-model="row.address"></el-input>
          </edit-cell>
        </template>
      </el-table-column>
    </el-table>
  </tool>
```