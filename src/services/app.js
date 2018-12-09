import request from '@/utils/request';
import { getQueryPath } from '@/utils/utils';
import { parseSearchResult } from '@/utils/search';

export async function searchApp(params = {}) {
  return request(getQueryPath('/api/app', params)).then(res => parseSearchResult(res));
}

export async function getApp(id) {
  return request(`/api/app/${id}`);
}

export async function saveApp(app) {
  if (app.id) {
    return request(`/api/app/${app.id}`, {
      method: 'PUT',
      body: app,
    });
  }
  return request(`/api/app`, {
    method: 'POST',
    body: app,
  });
}
