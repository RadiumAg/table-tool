import * as yup from 'yup';
import { RootSchema } from './../tool/type';
import { ValidateRule } from './../cell/type';

export const getSchema = (field: string, rules: ValidateRule[]) => {
  const ruleMap: RootSchema[number] = { field, schemas: [] };
  for (const rule of rules) {
    // eslint-disable-next-line import/namespace
    const validateRule = yup[rule.type || 'string']();

    Object.keys(rule)
      .filter(_ => _ !== 'message')
      .forEach(key => {
        validateRule[key](rule[key], rule.message);
      });

    ruleMap.schemas.push(validateRule as any);
  }

  return ruleMap;
};
