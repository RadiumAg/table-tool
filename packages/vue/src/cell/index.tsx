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
import { RootSchema, getSchema } from 'table-tool-utils';
import ErrorMessage from '../error-message';
import { TABLE_TOOL_PROVIDE_KEY } from '../tool/tool';
import { TableToolProvide } from '../tool/type';
import {
  ValidateError,
  activeCell,
  editCell,
  editCellEmits,
  editCellProps,
} from './cell';
import { CellInstance } from './type';

export default defineComponent({
  props: editCellProps,
  emits: editCellEmits,

  setup(props, { slots, expose }) {
    const { cellArray, rootSchema, tableData } = inject<TableToolProvide>(
      TABLE_TOOL_PROVIDE_KEY,
      {
        tableData: ref([]),
        cellArray: ref([]),
        rootSchema: ref([]),
      },
    );
    const cellValue = computed(() => {
      if (!props.field || !props.row) return;
      return props.row[props.field];
    });
    const rowIndex = computed(() => {
      if (!tableData.value) return undefined;
      else return tableData.value.indexOf(props.row);
    });
    const currentInstance = getCurrentInstance();
    const tdElement = ref<HTMLTableCellElement>();
    const errorMessage = ref('');
    const containerRef = ref<HTMLDivElement>();
    const schema = ref<RootSchema[number]>({ field: '', schemas: [] });
    const isFocus = ref(false);

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
      if (rootSchema.value.length > 0) {
        schema.value = rootSchema.value.find(_ => _.field === props.field) || {
          field: props.field,
          schemas: [],
        };
      }

      if (schema.value.schemas.length === 0) return Promise.resolve();
      errorMessage.value = '';

      if (tdElement.value) tdElement.value.style.zIndex = '';
      for (const filedSchema of schema.value.schemas) {
        try {
          await filedSchema.value.validate(cellValue.value);
          return Promise.resolve();
        } catch (e) {
          if (e instanceof ValidationError) {
            errorMessage.value = e.message;
          }
          if (tdElement.value) tdElement.value.style.zIndex = '999';

          return Promise.reject(
            new ValidateError(
              props.row,
              props.field,
              {
                ...filedSchema.rule,
                message: errorMessage.value,
              },
              rowIndex.value,
            ),
          );
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

    watch(
      isFocus,
      () => {
        if (!isFocus.value) return;
        setAutofocus();
        setAutoselect();
      },
      {
        immediate: false,
      },
    );

    watch(
      () => props.editRules,
      () => {
        if (schema.value.field || schema.value.schemas.length > 0) return;
        if (!props.editRules) {
          return;
        }

        if (!props.field) {
          console.warn('请设置filed');
          return;
        }
        const { field, schemas } = getSchema(props.field, props.editRules);
        schema.value.schemas = schemas;
        schema.value.field = field;

        rootSchema.value.push(schema.value);
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

    watch(activeCell, () => {
      isFocus.value = activeCell.value === containerRef.value;
    });

    cellArray.value.push({
      validate,
      row: props.row,
      focus: setFocus,
    });

    expose({
      validate,
      focus: setFocus,
    });

    onMounted(() => {
      setTdStyle();
    });

    return () => {
      return (
        <div
          class="table-tool-edit-cell"
          ref={containerRef}
          onMousedown={event => {
            event.stopPropagation();
            editCell.value = currentInstance as CellInstance;
            setFocus();
          }}
        >
          {content.value}
          {tdElement.value && isFocus.value && (
            <Teleport to={tdElement.value}>
              <ErrorMessage message={errorMessage.value} />
            </Teleport>
          )}

          {!isFocus.value && <div class="table-tool-edit-cell__mask"></div>}
        </div>
      );
    };
  },
});
