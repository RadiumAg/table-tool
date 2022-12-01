import { PropType, ref } from 'vue';
import { ValidateRule } from '@table-tool/utils';
import { CellInstance } from './type';

export const editCellProps = {
  row: {
    type: Object,
    required: true,
  },
  editRender: {
    type: Object as PropType<{
      autofocus: string;
      autoselect: string;
    }>,
  },
  editRules: {
    type: Array as PropType<ValidateRule[]>,
  },
  field: {
    type: String,
    required: true,
  },
};

export const editCellEmits = ['update:modelValue'];

export const editCell = ref<CellInstance | null>();

export const activeCell = ref<HTMLDivElement | null>();

export const otherAreaClick = () => {
  if (!activeCell.value) return;
  activeCell.value = null;
};

export class ValidateError {
  /**
   * 行数据
   *
   * @type {object}
   * @memberof ValidateError
   */
  row: object | undefined;

  /**
   *字段名称
   *
   * @type {string}
   * @memberof ValidateError
   */
  field: string | undefined;

  /**
   * 规则
   *
   * @type {*}
   * @memberof ValidateError
   */
  rules: any[];

  /**
   * 行号
   *
   * @type {number}
   * @memberof ValidateError
   */
  rowIndex: number | undefined;

  constructor(
    row: object | undefined,
    field: string | undefined,
    rules: any[],
    rowIndex: number | undefined,
  ) {
    this.field = field;
    this.row = row;
    this.rules = rules;
    this.rowIndex = rowIndex;
  }
}
