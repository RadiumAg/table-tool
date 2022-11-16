import * as yup from 'yup';
import { RootSchema } from './../tool/type';
import { ValidateRule } from './../cell/type';

const noParamsRule = ['required'];

export const getSchema = (field: string, rules: ValidateRule[]) => {
  const ruleMap: RootSchema[number] = { field, schemas: [] };
  for (const rule of rules) {
    // eslint-disable-next-line import/namespace
    let validateRule = yup[rule.type || 'string']();

    Object.keys(rule)
      .filter(_ => _ !== 'message')
      .forEach(key => {
        if (noParamsRule.includes(key)) {
          validateRule = validateRule[key](rule.message);
        } else validateRule = validateRule[key](rule[key], rule.message);
      });

    ruleMap.schemas.push(validateRule as any);
  }

  return ruleMap;
};
