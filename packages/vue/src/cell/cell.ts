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
