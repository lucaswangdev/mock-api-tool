/**
 * 用户类型定义
 */
declare namespace ProjectUserType {
  type UserGenderEnum = 'MALE' | 'FEMALE';

  /**
   * 实体
   */
  interface ProjectUser {
    id?: number;
    userName?: string;
    userAccount?: string;
    userAvatar?: string;
    gender?: UserGenderEnum;
    userRole?: string;
    userPassword?: string;
    createTime?: Date;
    updateTime?: Date;
  }

  /**
   * 添加项目成员
   */
  interface ProjectUserInsertRequest {
    userAccount: string;
  }

  /**
   * 删除项目成员
   */
  interface ProjectUserDeleteRequest {
    userId: number;
    projectCode: string;
  }
}