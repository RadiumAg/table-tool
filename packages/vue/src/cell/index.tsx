import {
  Teleport,
  computed,
  defineComponent,
  getCurrentInstance,
  inject,
  nextTick,
  onMounted,
  ref,
  watch,
} from 'vue';
import { ValidationError } from 'yup';
import { getSchema } from '@table-tool/utils';
import ErrorMessage from '../error-message';
import { TABLE_TOOL_PROVIDE_KEY } from '../tool/tool';
import { RootSchema, TableToolProvide } from '../tool/type';
import {
  activeCell,
  editCell,
  editCellEmits,
  editCellProps,
  otherAreaClick,
} from './cell';
import Style from './index.module.scss';

export default defineComponent({
  props: editCellProps,
  emits: editCellEmits,

  setup(props, { slots, expose }) {
    const { cellArray, rootSchema } = inject<TableToolProvide>(
      TABLE_TOOL_PROVIDE_KEY,
      {
        cellArray: ref([]),
        rootSchema: ref([]),
      },
    );
    const cellValue = computed(() => {
      if (!props.field || !props.row) return;
      return props.row[props.field];
    });
    const currentInstance = getCurrentInstance();
    const tdElement = ref<HTMLTableCellElement>();
    const errorMessage = ref('');
    const containerRef = ref<HTMLDivElement>();
    const schema: RootSchema[number] = { field: '', schemas: [] };

    const isFocus = computed(() => {
      return activeCell.value === containerRef.value;
    });

    const content = computed(() => {
      if (isFocus.value) {
        if (slots.default) {
          return slots.default();
        } else return null;
      } else {
        return cellValue.value;
      }
    });

    const setFocus = () => {
      if (activeCell.value === containerRef.value) return;

      activeCell.value = containerRef.value;
    };

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

    const validate = async () => {
      if (schema.schemas.length === 0) return true;

      errorMessage.value = '';
      if (tdElement.value) tdElement.value.style.zIndex = '';
      for (const filedSchema of schema.schemas) {
        try {
          await filedSchema.validate(cellValue.value);
          return true;
        } catch (e) {
          if (e instanceof ValidationError) {
            errorMessage.value = e.message;
          }
          if (tdElement.value) tdElement.value.style.zIndex = '999';
          return false;
        }
      }
    };

    const setTdStyle = () => {
      const findElement = (
        element: HTMLElement,
      ): HTMLTableCellElement | undefined => {
        if (element instanceof HTMLTableCellElement) {
          return element;
        } else if (element.parentElement) {
          return findElement(element.parentElement);
        } else {
          return;
        }
      };

      if (containerRef.value) {
        tdElement.value = findElement(containerRef.value);
        if (tdElement.value) tdElement.value.style.position = 'relative';
      }
    };

    onMounted(() => {
      document.removeEventListener('mousedown', otherAreaClick);
      document.addEventListener('mousedown', otherAreaClick);

      setTdStyle();
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
        const { field, schemas } = getSchema(props.field, props.editRules);
        schema.schemas = schemas;
        schema.field = field;
        rootSchema.value.push(schema);
      },
      { immediate: true },
    );

    watch(isFocus, () => {
      if (!isFocus.value) {
        validate();
      }
    });

    watch(cellValue, () => {
      if (!isFocus.value) {
        validate();
      }
    });

    cellArray.value.push({
      validate,
    });

    expose({
      focus: setFocus,
      validate,
    });

    return () => {
      return (
        <div
          class={Style.editCell}
          ref={containerRef}
          onMousedown={event => {
            event.stopPropagation();
            editCell.value = currentInstance;
            setFocus();
          }}
        >
          {content.value}
          {tdElement.value && isFocus.value && (
            <Teleport to={tdElement.value}>
              <ErrorMessage message={errorMessage.value} />
            </Teleport>
          )}

          {!isFocus.value && <div class={Style.mask}></div>}
        </div>
      );
    };
  },
});
