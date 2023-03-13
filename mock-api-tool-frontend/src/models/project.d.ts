/**
 * Project类型定义
 */
declare namespace ProjectType {
  /**
   * 实体
   */
  interface Project {
    id: number;
    apiPath: string;
    apiContent: string;
    delay: number;
    createTime: Date;
    updateTime: Date;
    apiDescription: string;
  }

  /**
   * 查询请求
   */
  interface ProjectQueryRequest {
    userId?: number;
    projectCode?: string;
  }

  /**
   * 更新请求
   */
  interface MockUpdateRequest {
    id?: number;
    apiPath?: string;
    apiContent?: string;
    delay?: number;
    apiDescription?: string;
  }
}
