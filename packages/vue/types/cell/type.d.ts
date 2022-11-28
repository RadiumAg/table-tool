import { ComponentInternalInstance } from 'vue';
export declare type Cell = {
    row: unknown;
    focus: () => void;
    validate: () => Promise<boolean | undefined>;
};
export declare type CellInstance = Omit<ComponentInternalInstance, 'exposed'> & {
    exposed: {
        validate: () => Promise<boolean>;
        focus: () => void;
    };
};
