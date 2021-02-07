
/**
 * 用户自定义配置
 */
export interface IConfig {
  /**
   * 模型声明的引入名称
   */
  decName: string;
  /**
   * API定义的引入名称
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
