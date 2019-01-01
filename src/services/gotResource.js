import request from '@/utils/request';
import { getQueryPath } from '@/utils/utils';
import { parseSearchResult } from '@/utils/search';

export async function searchResource(params = {}) {
  return request(getQueryPath('/api/resource', params)).then(res => parseSearchResult(res));
}

export async function getResource(id) {
  return request(`/api/resource/${id}`);
}

export async function saveResource(resource) {
  if (resource.id) {
    return request(`/api/resource/${resource.id}`, {
      method: 'PUT',
      body: resource,
    });
  }
  return request(`/api/resource`, {
    method: 'POST',
    body: resource,
  });
}
