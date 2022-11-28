import { Ref } from 'vue';
import { RootSchema, ValidateRule } from '@table-tool/utils';
import { Cell } from './../cell/type';

export type TableToolProvide = {
  cellArray: Ref<Cell[]>;
  rootSchema: Ref<RootSchema>;
};

export type EditRules = { [key: string]: ValidateRule[] };
