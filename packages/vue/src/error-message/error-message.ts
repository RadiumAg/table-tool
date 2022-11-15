import { PropType } from 'vue';
import { Offset } from './type';
export const errorMessageProps = {
  message: {
    type: String,
    required: true,
  },
  offset: { type: Object as PropType<Offset>, required: true },
};
