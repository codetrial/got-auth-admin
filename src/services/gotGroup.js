import request from '@/utils/request';
import { getQueryPath } from '@/utils/utils';
import { parseSearchResult } from '@/utils/search';

export async function searchGroup(params = {}) {
  return request(getQueryPath('/api/group', params)).then(res => parseSearchResult(res));
}

export async function getGroup(id) {
  return request(`/api/group/${id}`);
}

export async function saveGroup(group) {
  if (group.id) {
    return request(`/api/group/${group.id}`, {
      method: 'PUT',
      body: group,
    });
  }
  return request(`/api/group`, {
    method: 'POST',
    body: group,
  });
}
