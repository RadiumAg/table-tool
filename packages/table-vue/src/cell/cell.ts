import { ComponentInternalInstance, PropType, ref } from 'vue';
import { ValidateRule } from 'table-tool-utils';

type Validate = () => Promise<void>;

type Cell = {
  row: unknown;
  focus: () => void;
  validate: Validate;
};

type CellInstance = Omit<ComponentInternalInstance, 'exposed'> & {
  exposed: {
    focus: () => void;
    validate: Validate;
  };
};

type Rule = ValidateRule & { message: string };

const editCellProps = {
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

const editCellEmits = ['update:modelValue'];

const editCell = ref<CellInstance | null>();

const activeCell = ref<HTMLDivElement | null>();

const otherAreaClick = () => {
  if (!activeCell.value) return;
  activeCell.value = null;
};

class ValidateError {
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
   * 校验规则和信息
   *
   * @type {Rule}
   * @memberof ValidateError
   */
  rule: Rule;

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
    rule: Rule,
    rowIndex: number | undefined,
  ) {
    this.row = row;
    this.field = field;
    this.rule = rule;
    this.rowIndex = rowIndex;
  }
}

export type { Cell, Rule, CellInstance };
export {
  editCellProps,
  editCellEmits,
  editCell,
  activeCell,
  ValidateError,
  otherAreaClick,
};
