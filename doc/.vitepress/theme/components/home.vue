<template>
  <div class="table-tool-wrapper">
    <div class="title">Table Tool</div>
    <div class="small-title">表格增强工具，强化表格功能</div>

    <div class="demo">
      <edit-cell></edit-cell>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { EditCell } from '@demo/vue';
</script>

<style lang="scss" scoped>
.table-tool-wrapper {
  margin-top: 50px;
  line-height: 1.2;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .small-title {
    color: #476582;
    font-size: 1rem;
  }

  .title {
    color: #2c3e50;
    font-weight: bold;
    font-size: 3rem;
  }

  .demo {
    margin-top: 100px;
  }
}
</style>
