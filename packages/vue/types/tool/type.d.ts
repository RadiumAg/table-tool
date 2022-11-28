import { Ref } from 'vue';
import { RootSchema, ValidateRule } from '@table-tool/utils';
import { Cell } from './../cell/type';
export declare type TableToolProvide = {
    cellArray: Ref<Cell[]>;
    rootSchema: Ref<RootSchema>;
};
export declare type EditRules = {
    [key: string]: ValidateRule[];
};
