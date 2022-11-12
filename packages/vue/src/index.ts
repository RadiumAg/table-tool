export const editCellProps = {
  modelValue: {
    type: [Number, String],
    required: true,
  },
};

export const editCellEmits = ['update:modelValue'];
