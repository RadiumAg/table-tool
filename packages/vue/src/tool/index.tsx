import { defineComponent, provide, ref } from 'vue';
import { object } from 'yup';
import { Cell } from '../cell/type';
import { TABLE_TOOL_PROVIDE_KEY, ToolProps } from './tool';
import { TableToolProvide } from './type';

export default defineComponent({
  props: ToolProps,
  setup(props, { slots }) {
    const cellArray = ref<Cell[]>([]);
    const rootSchema = ref(object());

    provide<TableToolProvide>(TABLE_TOOL_PROVIDE_KEY, {
      cellArray,
      rootSchema,
    });

    return () => {
      return <>{slots}</>;
    };
  },
});
