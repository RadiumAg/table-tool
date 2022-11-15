import { defineComponent, provide, ref } from 'vue';
import { Cell } from '../cell/type';
import { TABLE_TOOL_PROVIDE_KEY, ToolProps } from './tool';
import { RootSchema, TableToolProvide } from './type';

export default defineComponent({
  props: ToolProps,
  setup(props, { slots }) {
    const cellArray = ref<Cell[]>([]);
    const rootSchema = ref<RootSchema>([]);

    provide<TableToolProvide>(TABLE_TOOL_PROVIDE_KEY, {
      cellArray,
      rootSchema,
    });

    return () => {
      return <>{slots}</>;
    };
  },
});
