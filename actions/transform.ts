import { reduce, get, set } from 'lodash';
import { ActionContext, ActionDefinition, ContextParams } from '../types';

export interface TransformParameters {
  [key: string]: string;
}

// Transform
export default async function transform(context: ActionContext, parameters: TransformParameters): Promise<ContextParams> {
  return reduce(parameters, (result, newPath, originalPath) => {
    if (typeof newPath !== 'string' || typeof originalPath !== 'string') {
      throw new Error(`Invalid transform input of type ${typeof newPath}/${typeof originalPath}`);
    }
    const value = get(context, originalPath);
    set(result, newPath, value);
    return result;
  }, {});
}