import { RootSchema, ValidateRule } from 'table-tool-utils';
import { PropType, Ref } from 'vue';
import { Cell } from './../cell/cell';

export type TableToolProvide = {
  cellArray: Ref<Cell[]>;
  tableData: Ref<any[] | undefined>;
  rootSchema: Ref<RootSchema>;
};

export type EditRules = { [key: string]: ValidateRule[] };

export const TABLE_TOOL_PROVIDE_KEY = Symbol();

export const ToolProps = {
  data: {
    type: Array as PropType<any[]>,
    required: true,
  },
  editRules: {
    type: Object as PropType<EditRules>,
  },
};
