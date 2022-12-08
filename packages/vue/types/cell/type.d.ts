import { ValidateRule } from '@table-tool/utils';
import { ComponentInternalInstance } from 'vue';
declare type Validate = () => Promise<void>;
export declare type Cell = {
    row: unknown;
    focus: () => void;
    validate: Validate;
};
export declare type CellInstance = Omit<ComponentInternalInstance, 'exposed'> & {
    exposed: {
        focus: () => void;
        validate: Validate;
    };
};
export declare type Rule = ValidateRule & {
    message: string;
};
export {};
