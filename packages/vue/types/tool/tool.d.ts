import { PropType } from 'vue';
import { EditRules } from './type';
export declare const TABLE_TOOL_PROVIDE_KEY: unique symbol;
export declare const ToolProps: {
    data: {
        type: ArrayConstructor;
        required: boolean;
    };
    editRules: {
        type: PropType<EditRules>;
    };
};
