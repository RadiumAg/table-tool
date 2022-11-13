import { PropType } from 'vue';

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
};

export const editCellEmits = ['update:modelValue'];
