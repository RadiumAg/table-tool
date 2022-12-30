import { PropType } from 'vue';
import { CellInstance, Rule } from './type';
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
            matches: string | RegExp;
            validator: import("table-tool-utils").ValidatorFunction;
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
export declare class ValidateError {
    /**
     * 行数据
     *
     * @type {object}
     * @memberof ValidateError
     */
    row: object | undefined;
    /**
     *字段名称
     *
     * @type {string}
     * @memberof ValidateError
     */
    field: string | undefined;
    /**
     * 校验规则和信息
     *
     * @type {Rule}
     * @memberof ValidateError
     */
    rule: Rule;
    /**
     * 行号
     *
     * @type {number}
     * @memberof ValidateError
     */
    rowIndex: number | undefined;
    constructor(row: object | undefined, field: string | undefined, rule: Rule, rowIndex: number | undefined);
}
