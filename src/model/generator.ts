import { IFormOut } from "./formOut";
import { IConfig } from "./iConfig";
import { IFormIn } from "./iFormIn";
import Shuji from '@wrule/shuji';
import URIJS from 'urijs';
import { Struct } from "@wrule/shuji/dist/struct";

const shuji = new Shuji();

/**
 * 获取API名称
 * @param form 输入表单
 */
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

/**
 * 获取裁剪之后的API路径
 * @param form 输入表单
 * @param config 输入配置
 */
function getAPIPath(
  form: IFormIn,
  config: IConfig,
) {
  const uri = URIJS(form.apiPath);
  const segs = uri.normalizePath().segmentCoded();
  const cutSegs = segs.slice(config.apiPathTrimNum);
  if (cutSegs.length > 0) {
    return cutSegs.join('/');
  }
  return segs.join('/');
}

/**
 * 获取API定义代码
 * @param form 输入表单
 * @param config 输入配置
 * @param apiName API名称 
 * @param rspName 响应模型名称
 * @param reqName 请求模型名称
 */
function getDefCode(
  form: IFormIn,
  config: IConfig,
  apiName: string,
  rspName: string,
  reqName: string,
) {
  const pathString = '';
  const hasReq = form.reqJson.trim().length > 0;
  const isGet = form.apiMethod === 'get';
  return `
/**
 * 此文件为index.ts，indexd.ts为同目录下模型声明文件
 */
import * as ${config.decName} from './indexd';

export const ${apiName} = (params: ${hasReq ? `${config.decName}.${reqName}` : 'any'}): ${config.decName}.${rspName} =>
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
  const apiName = getName(form);
  let rspStruct!: Struct;
  let reqStruct!: Struct;
  if (form.rspJson.trim()) {
    rspStruct = shuji.Infer(`${name}Rsp`, JSON.parse(form.rspJson));
    rst.decCode += rspStruct.TsTestCode;
  }
  if (form.reqJson.trim()) {
    reqStruct = shuji.Infer(`${name}Rep`, JSON.parse(form.reqJson));
    rst.decCode += '\n\n';
    rst.decCode += reqStruct.TsTestCode;
  }
  rst.defCode = getDefCode(
    form,
    config,
    apiName,
    rspStruct?.TsName,
    reqStruct?.TsName,
  );
  return rst;
}
