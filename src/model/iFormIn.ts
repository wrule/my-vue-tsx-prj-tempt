
/**
 * 输入表单定义
 */
export interface IFormIn {
  /**
   * http请求方法
   */
  apiMethod: string;
  /**
   * 请求地址
   */
  apiPath: string;
  /**
   * 响应JSON
   */
  rspJson: string;
  /**
   * 请求JSON
   */
  reqJson: string;
  /**
   * 自定义名称
   */
  customName: string;
}
