import { Ref } from 'vue';
import { object } from 'yup';
import { Cell, ValidateRule } from './../cell/type';

export type RootSchema = {
  field: string;
  schemas: ReturnType<typeof object>[];
}[];

export type TableToolProvide = {
  cellArray: Ref<Cell[]>;
  rootSchema: Ref<RootSchema>;
};

export type EditRules = { [key: string]: ValidateRule[] };
