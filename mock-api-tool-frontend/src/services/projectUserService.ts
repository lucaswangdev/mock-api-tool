import { request } from '@umijs/max';

/**
 * 添加成员
 * @param params
 */
export async function insert(params: ProjectUserType.ProjectUserInsertRequest) {
  return request<BaseResponse<number>>('/project-user/insert', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}

/**
 * 删除用户
 * @param params
 */
export async function deleteProjectUser (params: ProjectUserType.ProjectUserDeleteRequest) {
  return request<BaseResponse<UserType.UserVO>>(`/project-user/delete`, {
    method: 'POST',
    data: params,
  });
}