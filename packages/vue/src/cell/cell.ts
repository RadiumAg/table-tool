import { PropType, ref } from 'vue';
import { ValidateRule } from './type';

export const editCellProps = {
  modelValue: {
    type: [Number, String],
    required: true,
  },
  editRender: {
    type: Object as PropType<{
      autofocus?: string;
      autoselect?: string;
    }>,
  },
  editRules: {
    type: Array as PropType<ValidateRule[]>,
  },
  field: {
    type: String,
  },
};

export const editCellEmits = ['update:modelValue'];

export const activeCell = ref<HTMLDivElement | null>();

export const otherAreaClick = () => {
  if (!activeCell.value) return;
  activeCell.value = null;
};
