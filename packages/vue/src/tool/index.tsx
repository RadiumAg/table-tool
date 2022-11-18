import { defineComponent, provide, ref, watch } from 'vue';
import { ValidateCallback, getSchema, isObject } from '@table-tool/utils';
import { editCell } from '../cell/cell';
import { Cell } from '../cell/type';
import { TABLE_TOOL_PROVIDE_KEY, ToolProps } from './tool';
import { RootSchema, TableToolProvide } from './type';

export default defineComponent({
  props: ToolProps,
  setup(props, { slots, expose }) {
    const cellArray = ref<Cell[]>([]);
    const rootSchema = ref<RootSchema>([]);

    const validate = (rows?: any, callback?: ValidateCallback) => {
      if (!rows) {
        if (!editCell.value) return;
        return Promise.resolve().then(async () => {
          if (!editCell.value?.exposed) return;
          if (!(await editCell.value.exposed.validate())) {
            editCell.value.exposed.focus();
            callback && callback();
          }
        });
      } else if (isObject(rows)) {
        const targetRow = cellArray.value.find(cell => cell.row === rows);
        if (!targetRow) return;
        return Promise.resolve().then(async () => {
          if (!(await targetRow.validate())) {
            targetRow.focus();
            callback && callback();
          }
        });
      } else if (Array.isArray(rows)) {
        return Promise.resolve().then(async () => {
          for (const row of rows) {
            const targetRow = cellArray.value.find(cell => cell.row === row);
            if (!targetRow) return;
            if (!(await targetRow.validate())) {
              targetRow.focus();
              callback && callback();

              break;
            }
          }
        });
      }
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
