import { defineComponent } from 'vue';
import { errorMessageProps } from './error-message';

export default defineComponent({
  props: errorMessageProps,
  setup(props) {
    return () => {
      return (
        props.message && (
          <div class="table-tool-message-box">{props.message}</div>
        )
      );
    };
  },
});
