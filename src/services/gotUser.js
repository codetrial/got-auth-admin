import request from '@/utils/request';
import { getQueryPath } from '@/utils/utils';
import { parseSearchResult } from '@/utils/search';

export async function searchUser(params = {}) {
  return request(getQueryPath('/got-api/user', params)).then(res => parseSearchResult(res));
}

export async function getUser(id) {
  return request(`/got-api/user/${id}`);
}

export async function saveUser(user) {
  if (user.id) {
    return request(`/got-api/user/${user.id}`, {
      method: 'PUT',
      body: user,
    });
  }
  return request(`/got-api/user`, {
    method: 'POST',
    body: user,
  });
}
