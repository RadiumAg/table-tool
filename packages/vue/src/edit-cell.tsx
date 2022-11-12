import { computed, defineComponent, ref } from 'vue';
import { editCellEmits, editCellProps } from '.';

export default defineComponent({
  props: editCellProps,
  emits: editCellEmits,

  setup(props, { slots }) {
    const isFocus = ref(false);
    const content = computed(() => {
      if (isFocus.value) {
        if (slots.default) return slots.default();
        else return null;
      } else {
        return props.modelValue;
      }
    });

    const handleFocus = () => {
      isFocus.value = true;
    };

    const handleBlur = () => {
      isFocus.value = false;
    };

    return () => {
      return (
        <div onFocus={handleFocus} onBlur={handleBlur}>
          {content.value}
        </div>
      );
    };
  },
});
