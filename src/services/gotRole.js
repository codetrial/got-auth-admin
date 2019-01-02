import request from '@/utils/request';
import { getQueryPath } from '@/utils/utils';
import { parseSearchResult } from '@/utils/search';

export async function searchRole(params = {}) {
  return request(getQueryPath('/got-api/role', params)).then(res => parseSearchResult(res));
}

export async function getRole(id) {
  return request(`/got-api/role/${id}`);
}

export async function saveRole(role) {
  if (role.id) {
    return request(`/got-api/role/${role.id}`, {
      method: 'PUT',
      body: role,
    });
  }
  return request(`/got-api/role`, {
    method: 'POST',
    body: role,
  });
}
