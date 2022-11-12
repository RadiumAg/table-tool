import { defineComponent } from 'vue';
import { editCellEmits, editCellProps } from './edit-cell';

export default defineComponent({
  props: editCellProps,
  emits: editCellEmits,
  setup(props, { slots, attrs }) {
    return () => {
      return <div>{slots}</div>;
    };
  },
});
