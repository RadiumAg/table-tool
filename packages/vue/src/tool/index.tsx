import { defineComponent, onMounted, provide, ref, toRef, watch } from 'vue';
import {
  RootSchema,
  ValidateCallback,
  getSchema,
  isObject,
} from 'table-tool-utils';
import { ValidateError, editCell, otherAreaClick } from '../cell/cell';
import { Cell } from '../cell/type';
import { TABLE_TOOL_PROVIDE_KEY, ToolProps } from './tool';
import { TableToolProvide } from './type';

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
              console.warn('请设置field字段，否则无法进行校验');
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
              const targetCell = cellArray.value
                .filter(_ => _.row === rows)
                .find(cell => cell.field === error.field);
              if (!targetCell) return;
              if (error) {
                errorMap[error.field] = [error];
                targetCell.focus();
                callback && callback(error);
              }
            } else if (Array.isArray(rows)) {
              //选中校验
              for (const row of rows) {
                const targetCell = cellArray.value
                  .filter(_ => _.row === row)
                  .find(cell => cell.field === error.field);

                if (!targetCell) return;
                if (error) {
                  if (!errorMap[error.field]) {
                    errorMap[error.field] = [];
                  } else {
                    errorMap[error.field].push(error);
                  }
                  targetCell.focus();
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
        for (const field in props.editRules) {
          const newRules = props.editRules[field];
          const newSchemas = getSchema(field, newRules);
          const currentSchema = rootSchema.value.find(
            schema => schema.field === field,
          );
          if (currentSchema) {
            currentSchema.schemas = newSchemas.schemas;
          } else {
            rootSchema.value.push(newSchemas);
          }
        }
      },
      { immediate: true },
    );

    onMounted(() => {
      document.removeEventListener('mousedown', otherAreaClick);
      document.addEventListener('mousedown', otherAreaClick);
    });

    return () => {
      return <div>{{ ...slots }}</div>;
    };
  },
});
