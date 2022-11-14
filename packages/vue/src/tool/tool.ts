import { PropType } from 'vue';
import { EditRules } from './type';

export const TABLE_TOOL_PROVIDE_KEY = Symbol();

export const ToolProps = {
  editRules: {
    type: Object as PropType<EditRules>,
  },
};
