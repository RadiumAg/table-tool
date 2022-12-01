import { defineComponent, provide, ref, toRef, watch } from 'vue';
import { ValidateCallback, getSchema, isObject } from '@table-tool/utils';
import { ValidateError, editCell } from '../cell/cell';
import { Cell } from '../cell/type';
import { TABLE_TOOL_PROVIDE_KEY, ToolProps } from './tool';
import { RootSchema, TableToolProvide } from './type';

export default defineComponent({
  props: ToolProps,
  setup(props, { slots, expose }) {
    const cellArray = ref<Cell[]>([]);
    const rootSchema = ref<RootSchema>([]);

    const validate = (rows?: any, callback?: ValidateCallback) => {
      return Promise.resolve().then(async () => {
        if (!editCell.value) return;
        if (!editCell.value?.exposed) return;

        const errorMap: Record<string, Array<any>> = {};

        try {
          await editCell.value.exposed.validate();
          return;
        } catch (error) {
          if (error instanceof ValidateError) {
            if (!error.field) {
              console.warn('请设置filed字段，否则无法进行校验');
              return;
            }

            if (!rows) {
              // 快速校验
              if (error) {
                errorMap[error.field] = [error];
                editCell.value.exposed.focus();
                callback && callback(error);
              }
            } else if (isObject(rows)) {
              //选中校验
              const targetRow = cellArray.value.find(cell => cell.row === rows);
              if (!targetRow) return;
              if (error) {
                errorMap[error.field] = [error];
                targetRow.focus();
                callback && callback(error);
              }
            } else if (Array.isArray(rows)) {
              //选中校验
              for (const row of rows) {
                const targetRow = cellArray.value.find(
                  cell => cell.row === row,
                );
                if (!targetRow) return;
                if (error) {
                  if (!error.field) {
                    errorMap[error.field] = [];
                  } else {
                    errorMap[error.field].push(error);
                  }
                  targetRow.focus();
                  callback && callback(error);
                  break;
                }
              }
            }
            return errorMap;
          }
        }
      });
    };

    provide<TableToolProvide>(TABLE_TOOL_PROVIDE_KEY, {
      cellArray,
      rootSchema,
      tableData: toRef(props, 'data'),
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
