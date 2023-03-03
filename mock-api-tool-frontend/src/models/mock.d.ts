/**
 * Mock类型定义
 */
declare namespace MockType {
  /**
   * 实体
   */
  interface Mock {
    id: number;
    apiPath: string;
    apiContent: string;
    delay: number;
    createTime: Date;
    updateTime: Date;
  }

  /**
   * 查询请求
   */
  interface MockQueryRequest {
    id?: number;
  }

  /**
   * 更新请求
   */
  interface MockUpdateRequest {
    id?: number;
    apiPath?: string;
    apiContent?: string;
    delay?: number;
  }

  

}
