/**
 * MockService
 */
import { request } from '@umijs/max';

/**
 * api列表
 * @param params
 */
export async function findAll(params: MockType.MockQueryRequest) {
  return request<BaseResponse<boolean>>(`/findAll`, {
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
 * 增加
 * @param params
 */
export async function insert(params: MockType.MockUpdateRequest) {
  return request<BaseResponse<boolean>>(`/insert`, {
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

