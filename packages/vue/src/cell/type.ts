import { ComponentInternalInstance } from 'vue';

type Validate = () => Promise<void>;

export type Cell = {
  row: unknown;
  focus: () => void;
  validate: Validate;
};

export type CellInstance = Omit<ComponentInternalInstance, 'exposed'> & {
  exposed: {
    focus: () => void;
    validate: Validate;
  };
};
