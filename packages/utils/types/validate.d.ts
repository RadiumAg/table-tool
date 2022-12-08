declare type Trigger = 'blur' | 'change';
export declare type RootSchema = {
    field: string;
    schemas: {
        value: any;
        rule: ValidateRule;
    }[];
}[];
export declare type ValidatorFunction = (value: unknown) => Error | Promise<any>;
export declare type ValidateRule = Partial<{
    /**
     * 是否必填
     *
     * @type {boolean}
     */
    required: boolean;
    /**
     *  校验最小长度（如果 type=number 则比较大小）
     *
     * @type {number}
     */
    min: number;
    /**
     * 校验最大长度（如果 type=number 则比较大小）
     *
     * @type {number}
     */
    max: number;
    /**
     * 校验数据类型
     *
     * @type {('string' | 'number' | 'array' | 'date')}
     */
    type: 'string' | 'number' | 'array' | 'date';
    /**
     * 正则校验
     *
     * @type {(RegExp | string)}
     */
    pattern: RegExp | string;
    /**
     * 自定义校验方法，返回一个 Error 或者 Promise<new Error("提示消息")>
     *
     * @type {ValidatorFunction}
     */
    validator: ValidatorFunction;
    /**
     * 校验提示内容
     *
     * @type {string}
     */
    message: string;
    /**
     *触发方式
     *
     * @type {Trigger}
     */
    trigger: Trigger;
}>;
export declare const getSchema: (field: string, rules: ValidateRule[]) => {
    field: string;
    schemas: {
        value: any;
        rule: ValidateRule;
    }[];
};
export {};
