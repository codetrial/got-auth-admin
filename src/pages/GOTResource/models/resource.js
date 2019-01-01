import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { searchResource, getResource, saveResource } from '@/services/gotResource';

export default {
  namespace: 'gotResource',

  state: {
    resourceEntity: {},
    resourceList: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *getResource({ payload }, { call, put }) {
      try {
        const response = yield call(getResource, payload);
        yield put({
          type: 'updateEntity',
          payload: response.data,
        });
      } catch (err) {
        message.error('获取详情失败');
      }
    },
    *saveResource({ payload }, { call, put }) {
      try {
        yield call(saveResource, payload);

        message.success('保存成功');
        yield put(routerRedux.push('/got-resource/list'));
      } catch (err) {
        message.error('保存失败');
      }
    },
    *search({ payload }, { call, put }) {
      try {
        const response = yield call(searchResource, payload);
        yield put({
          type: 'updateList',
          payload: response.data,
        });
      } catch (err) {
        message.error('加载列表失败');
      }
    },
  },

  reducers: {
    updateEntity(state, action) {
      return {
        ...state,
        resourceEntity: action.payload,
      };
    },
    updateList(state, action) {
      return {
        ...state,
        resourceList: action.payload,
      };
    },
  },
};
