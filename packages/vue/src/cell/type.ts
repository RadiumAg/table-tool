import { ComponentInternalInstance } from 'vue';

export type Cell = {
  row: unknown;
  focus: () => void;
  validate: () => Promise<boolean | undefined>;
};

export type CellInstance = Omit<ComponentInternalInstance, 'exposed'> & {
  exposed: {
    validate: () => Promise<boolean>;
    focus: () => void;
  };
};
