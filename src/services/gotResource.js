import request from '@/utils/request';
import { getQueryPath } from '@/utils/utils';
import { parseSearchResult } from '@/utils/search';

export async function searchResource(params = {}) {
  return request(getQueryPath('/got-api/resource', params)).then(res => parseSearchResult(res));
}

export async function getResource(id) {
  return request(`/got-api/resource/${id}`);
}

export async function saveResource(resource) {
  if (resource.id) {
    return request(`/got-api/resource/${resource.id}`, {
      method: 'PUT',
      body: resource,
    });
  }
  return request(`/got-api/resource`, {
    method: 'POST',
    body: resource,
  });
}
