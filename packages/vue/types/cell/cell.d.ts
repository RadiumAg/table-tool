import { PropType } from 'vue';
import { CellInstance } from './type';
export declare const editCellProps: {
    row: {
        type: ObjectConstructor;
        required: boolean;
    };
    editRender: {
        type: PropType<{
            autofocus: string;
            autoselect: string;
        }>;
    };
    editRules: {
        type: PropType<Partial<{
            required: boolean;
            min: number;
            max: number;
            type: "string" | "number" | "array" | "date";
            pattern: string | RegExp;
            validator: import("@table-tool/utils").ValidatorFunction;
            message: string;
            trigger: "blur" | "change";
        }>[]>;
    };
    field: {
        type: StringConstructor;
        required: boolean;
    };
};
export declare const editCellEmits: string[];
export declare const editCell: import("vue").Ref<CellInstance>;
export declare const activeCell: import("vue").Ref<HTMLDivElement>;
export declare const otherAreaClick: () => void;
