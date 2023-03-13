/**
 * MockService
 */
import { request } from '@umijs/max';

/**
 * api列表
 * @param params
 */
export async function projectList(params: ProjectType.ProjectQueryRequest) {
  return request<BaseResponse<boolean>>(`/project/projectList`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}

/**
 * 更新
 * @param params
 */
export async function update(params: MockType.MockUpdateRequest) {
  return request<BaseResponse<boolean>>(`/update`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}

/**
 * 创建项目
 * insert
 * @param params
 */
export async function insert(params: ProjectType.ProjectQueryRequest) {
  return request<BaseResponse<boolean>>(`/project/insert`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}

/**
 * 删除
 * @param params
 */
export async function deleteApi(params: MockType.MockUpdateRequest) {
  return request<BaseResponse<boolean>>(`/deleteApi`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}