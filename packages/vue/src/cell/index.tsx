import {
  computed,
  defineComponent,
  nextTick,
  onMounted,
  ref,
  watch,
} from 'vue';
import { editCellEmits, editCellProps } from '..';
import Style from './index.module.scss';

const activeCell = ref<HTMLDivElement | null>();

export default defineComponent({
  props: editCellProps,
  emits: editCellEmits,

  setup(props, { slots }) {
    const containerRef = ref<HTMLDivElement>();

    const isFocus = computed(() => {
      return activeCell.value === containerRef.value;
    });

    const content = computed(() => {
      if (isFocus.value) {
        if (slots.default) {
          return slots.default();
        } else return null;
      } else {
        return props.modelValue;
      }
    });

    const setAutofocus = async () => {
      await nextTick();
      if (!props.editRender?.autofocus) return;
      const autofocusElement = containerRef.value?.querySelector(
        props.editRender?.autofocus,
      ) as HTMLElement;

      if (autofocusElement.focus === undefined) {
        console.warn(
          `选择器${props.editRender.autofocus}选中的元素没有focus方法`,
        );
        return;
      }
      autofocusElement.focus();
    };

    const setAutoselect = async () => {
      await nextTick();
      if (!props.editRender?.autoselect) return;
      const autoselectElement = containerRef.value?.querySelector(
        props.editRender?.autoselect,
      ) as HTMLInputElement;

      if (autoselectElement.focus === undefined) {
        console.warn(
          `选择器${props.editRender.autofocus}选中的元素没有focus方法`,
        );
        return;
      }
      autoselectElement.select();
    };

    onMounted(() => {
      document.addEventListener('click', () => {
        if (!activeCell.value) return;
        activeCell.value = null;
      });
    });

    watch(isFocus, () => {
      if (!isFocus.value) return;
      setAutofocus();
      setAutoselect();
    });

    return () => {
      return (
        <div
          class={Style.editCell}
          ref={containerRef}
          onClick={event => {
            event.stopPropagation();
            activeCell.value = containerRef.value;
          }}
        >
          {content.value}
        </div>
      );
    };
  },
});
