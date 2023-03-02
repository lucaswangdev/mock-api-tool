/**
 * MockService
 */
import { request } from '@umijs/max';

/**
 * 更新
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


