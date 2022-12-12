import { ValidateRule } from 'table-tool-utils';
import { ComponentInternalInstance } from 'vue';

type Validate = () => Promise<void>;

export type Cell = {
  row: unknown;
  field: string;
  focus: () => void;
  validate: Validate;
};

export type CellInstance = Omit<ComponentInternalInstance, 'exposed'> & {
  exposed: {
    focus: () => void;
    validate: Validate;
  };
};

export type Rule = ValidateRule & { message: string };
