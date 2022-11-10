import { defineComponent } from 'vue';
import { editCellProps } from './edit-cell';

export default defineComponent({
  props: editCellProps,
  emits: ['update:modelValue'],

  setup(props, { slots, attrs }) {
    return () => {
      return <div>{attrs}</div>;
    };
  },
});
