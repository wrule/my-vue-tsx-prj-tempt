import { IFormOut } from "./formOut";
import { IConfig } from "./iConfig";
import { IFormIn } from "./iFormIn";
import Shuji from '@wrule/shuji';
import URIJS from 'urijs';

const shuji = new Shuji();

function getName(form: IFormIn) {
  let rst = '';
  try {
    if (form.customName.trim()) {
      rst = form.customName.trim();
    } else {
      rst = URIJS(form.apiPath).filename();
    }
  } catch (e) {
    console.error(e);
  }
  return rst || 'xxx';
}

function getDefCode(
  form: IFormIn,
  config: IConfig,
  rspName: string,
  reqName: string,
) {
  const name = getName(form);
  const pathString = '';
  const hasReq = form.reqJson.trim().length > 0;
  const isGet = form.apiMethod === 'get';
  return `
/**
 * 此文件为index.ts，indexd.ts为同目录下模型声明文件
 */
import * as ${config.defName} from './indexd';

export const ${name} = (params: ${hasReq ? `${config.defName}.${reqName}` : 'any'}): ${config.defName}.${rspName} =>
  ${config.axiosName}.${form.apiMethod}('${pathString}', ${isGet && '{ '}params${isGet && ' }'}) as any;
`.trim();
}

export function Generate(
  form: IFormIn,
  config: IConfig,
): IFormOut {
  let rst: IFormOut = {
    decCode: '',
    defCode: '',
    useCode: '',
    importCode: '',
  };
  const name = getName(form);

  if (form.rspJson.trim()) {
    rst.decCode += shuji.Infer(`${name}Rsp`, JSON.parse(form.rspJson));
  }
  if (form.reqJson.trim()) {
    rst.decCode += '\n\n';
    rst.decCode += shuji.Infer(`${name}Rep`, JSON.parse(form.reqJson));
  }

  return rst;
}
