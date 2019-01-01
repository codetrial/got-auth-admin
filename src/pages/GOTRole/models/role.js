import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { searchRole, getRole, saveRole } from '@/services/gotRole';

export default {
  namespace: 'gotRole',

  state: {
    roleEntity: {},
    roleList: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *getRole({ payload }, { call, put }) {
      try {
        const response = yield call(getRole, payload);
        yield put({
          type: 'updateEntity',
          payload: response.data,
        });
      } catch (err) {
        message.error('获取详情失败');
      }
    },
    *saveRole({ payload }, { call, put }) {
      try {
        yield call(saveRole, payload);

        message.success('保存成功');
        yield put(routerRedux.push('/got-role/list'));
      } catch (err) {
        message.error('保存失败');
      }
    },
    *search({ payload }, { call, put }) {
      try {
        const response = yield call(searchRole, payload);
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
        roleEntity: action.payload,
      };
    },
    updateList(state, action) {
      return {
        ...state,
        roleList: action.payload,
      };
    },
  },
};
