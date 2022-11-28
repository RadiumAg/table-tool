declare const _default: import("vue").DefineComponent<{
    row: {
        type: ObjectConstructor;
        required: boolean;
    };
    editRender: {
        type: import("vue").PropType<{
            autofocus?: string | undefined;
            autoselect?: string | undefined;
        }>;
    };
    editRules: {
        type: import("vue").PropType<Partial<{
            required: boolean;
            min: number;
            max: number;
            type: "string" | "number" | "array" | "date";
            pattern: string | RegExp;
            validator: import("./type").ValidatorFunction;
            message: string;
            trigger: "blur" | "change";
        }>[]>;
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
            autofocus?: string | undefined;
            autoselect?: string | undefined;
        }>;
    };
    editRules: {
        type: import("vue").PropType<Partial<{
            required: boolean;
            min: number;
            max: number;
            type: "string" | "number" | "array" | "date";
            pattern: string | RegExp;
            validator: import("./type").ValidatorFunction;
            message: string;
            trigger: "blur" | "change";
        }>[]>;
    };
    field: {
        type: StringConstructor;
        required: boolean;
    };
}>> & {
    [x: `on${Capitalize<string>}`]: ((...args: any[]) => any) | undefined;
}, {}>;
export default _default;
