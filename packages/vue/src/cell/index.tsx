import {
  computed,
  defineComponent,
  inject,
  nextTick,
  onMounted,
  ref,
  watch,
} from 'vue';
import * as yup from 'yup';
import { TABLE_TOOL_PROVIDE_KEY } from '../tool/tool';
import { TableToolProvide } from '../tool/type';
import { getSchema } from '../utils/yup';
import { editCellEmits, editCellProps } from './cell';
import Style from './index.module.scss';

const activeCell = ref<HTMLDivElement | null>();

export default defineComponent({
  props: editCellProps,
  emits: editCellEmits,

  setup(props, { slots }) {
    const { cellArray, rootSchema } = inject<TableToolProvide>(
      TABLE_TOOL_PROVIDE_KEY,
      {
        cellArray: ref([]),
        rootSchema: ref(yup.object()) as any,
      },
    );
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
        console.warn(`${autofocusElement}没有focus方法`);
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
        console.warn(`${autoselectElement}节点select方法`);
        return;
      }
      autoselectElement.select();
    };

    const validate = () => {};

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

    watch(
      () => props.editRules,
      () => {
        if (!props.editRules) {
          return;
        }

        if (!props.field) {
          console.warn('请设置filed');
          return;
        }
        rootSchema.value.push(getSchema(props.field, props.editRules));
      },
      { immediate: true },
    );

    cellArray.value.push({
      validate,
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
