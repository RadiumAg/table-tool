import {
  Teleport,
  computed,
  defineComponent,
  inject,
  nextTick,
  onMounted,
  ref,
  watch,
} from 'vue';
import { ValidationError } from 'yup';
import ErrorMessage from '../error-message';
import { TABLE_TOOL_PROVIDE_KEY } from '../tool/tool';
import { RootSchema, TableToolProvide } from '../tool/type';
import { getSchema } from '../utils/yup';
import {
  activeCell,
  editCellEmits,
  editCellProps,
  otherAreaClick,
} from './cell';
import Style from './index.module.scss';

export default defineComponent({
  props: editCellProps,
  emits: editCellEmits,

  setup(props, { slots }) {
    const { cellArray, rootSchema } = inject<TableToolProvide>(
      TABLE_TOOL_PROVIDE_KEY,
      {
        cellArray: ref([]),
        rootSchema: ref([]),
      },
    );
    const errorMessage = ref('');
    const containerRef = ref<HTMLDivElement>();
    const clientReact = computed(() => {
      if (!containerRef.value) return [0, 0];
      const computedStyle = containerRef.value.getBoundingClientRect();
      return [computedStyle.left, computedStyle.top];
    });
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

    const validate = async () => {
      errorMessage.value = '';
      for (const filedSchema of schema.schemas) {
        try {
          await filedSchema.validate(props.modelValue);
        } catch (e) {
          if (e instanceof ValidationError) {
            errorMessage.value = e.message;
          }
          activeCell.value = containerRef.value;
          break;
        }
      }
    };

    onMounted(() => {
      document.removeEventListener('mousedown', otherAreaClick);
      document.addEventListener('mousedown', otherAreaClick);
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

    cellArray.value.push({
      validate,
    });

    return () => {
      return (
        <div
          class={Style.editCell}
          ref={containerRef}
          onMousedown={event => {
            event.stopPropagation();
            activeCell.value = containerRef.value;
          }}
        >
          {content.value}

          <Teleport to="body">
            <ErrorMessage
              message={errorMessage.value}
              offset={{
                left: clientReact.value[0],
                top: clientReact.value[1],
              }}
            />
          </Teleport>
        </div>
      );
    };
  },
});
