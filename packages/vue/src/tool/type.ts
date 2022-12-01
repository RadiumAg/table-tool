import { Ref } from 'vue';
import { Cell, ValidateRule } from './../cell/type';

export type RootSchema = {
  field: string;
  schemas: any[];
}[];

export type TableToolProvide = {
  cellArray: Ref<Cell[]>;
  tableData: Ref<any[] | undefined>;
  rootSchema: Ref<RootSchema>;
};

export type EditRules = { [key: string]: ValidateRule[] };
