import { Ref } from 'vue';
import { Cell, ValidateRule } from './../cell/type';
export declare type RootSchema = {
    field: string;
    schemas: any[];
}[];
export declare type TableToolProvide = {
    cellArray: Ref<Cell[]>;
    rootSchema: Ref<RootSchema>;
};
export declare type EditRules = {
    [key: string]: ValidateRule[];
};
