import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { searchApp, getApp, saveApp } from '@/services/gotApp';

export default {
  namespace: 'gotApp',

  state: {
    appEntity: {},
    appList: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *getApplication({ payload }, { call, put }) {
      try {
        const response = yield call(getApp, payload);
        yield put({
          type: 'updateEntity',
          payload: response.data,
        });
      } catch (err) {
        message.error('获取详情失败');
      }
    },
    *saveApplication({ payload }, { call, put }) {
      try {
        yield call(saveApp, payload);

        message.success('保存成功');
        yield put(routerRedux.push('/got-app/list'));
      } catch (err) {
        message.error('保存失败');
      }
    },
    *search({ payload }, { call, put }) {
      try {
        const response = yield call(searchApp, payload);
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
        appEntity: action.payload,
      };
    },
    updateList(state, action) {
      return {
        ...state,
        appList: action.payload,
      };
    },
  },
};
