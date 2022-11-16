import { defineComponent, provide, ref, watch } from 'vue';
import { editCell } from '../cell/cell';
import { Cell } from '../cell/type';
import { getSchema } from '../utils/yup';
import { TABLE_TOOL_PROVIDE_KEY, ToolProps } from './tool';
import { RootSchema, TableToolProvide } from './type';

export default defineComponent({
  props: ToolProps,
  setup(props, { slots, expose }) {
    const cellArray = ref<Cell[]>([]);
    const rootSchema = ref<RootSchema>([]);

    const cellValidate = () => {
      if (!editCell.value?.exposed) return;
      editCell.value.exposed.focus();
      editCell.value.exposed.validate();
    };

    const validate = () => {
      if (!editCell.value) return;

      return Promise.resolve().then(cellValidate);
    };

    provide<TableToolProvide>(TABLE_TOOL_PROVIDE_KEY, {
      cellArray,
      rootSchema,
    });

    expose({
      validate,
    });

    watch(
      () => props.editRules,
      () => {
        // eslint-disable-next-line no-restricted-syntax
        for (const field in rootSchema.value) {
          const rule = rootSchema.value[field];
          const schema = getSchema(rule.field, rule.schemas);
          rule.schemas.push(schema.schemas);
        }
      },
      { immediate: true },
    );

    return () => {
      return <div>{{ ...slots }}</div>;
    };
  },
});
