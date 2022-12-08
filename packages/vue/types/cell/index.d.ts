declare const _default: import("vue").DefineComponent<{
    row: {
        type: ObjectConstructor;
        required: boolean;
    };
    editRender: {
        type: import("vue").PropType<{
            autofocus: string;
            autoselect: string;
        }>;
    };
    editRules: {
        type: import("vue").PropType<ValidateRule[]>;
    };
    field: {
        type: StringConstructor;
        required: boolean;
    };
}, () => JSX.Element, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, string[], string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    row: {
        type: ObjectConstructor;
        required: boolean;
    };
    editRender: {
        type: import("vue").PropType<{
            autofocus: string;
            autoselect: string;
        }>;
    };
    editRules: {
        type: import("vue").PropType<ValidateRule[]>;
    };
    field: {
        type: StringConstructor;
        required: boolean;
    };
}>> & {
    [x: `on${Capitalize<string>}`]: (...args: any[]) => any;
}, {}>;
export default _default;
