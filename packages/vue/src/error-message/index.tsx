import { defineComponent } from 'vue';
import { errorMessageProps } from './error-message';
import Style from './index.module.scss';

export default defineComponent({
  props: errorMessageProps,
  setup(props) {
    return () => {
      return (
        props.message && <div class={Style.messageBox}>{props.message}</div>
      );
    };
  },
});
