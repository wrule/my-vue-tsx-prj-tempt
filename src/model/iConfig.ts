
/**
 * 用户自定义配置
 */
export interface IConfig {
  /**
   * 引入定义名称
   */
  defName: string;
  /**
   * 引入API名称
   */
  apiName: string;
  /**
   * axios实例名称
   */
  axiosName: string;
  /**
   * API路径前部裁剪个数
   */
  apiPathTrimNum: number;
}
