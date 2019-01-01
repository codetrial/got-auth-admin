import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { searchUser, getUser, saveUser } from '@/services/gotUser';

export default {
  namespace: 'gotUser',

  state: {
    userEntity: {},
    userList: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *getUser({ payload }, { call, put }) {
      try {
        const response = yield call(getUser, payload);
        yield put({
          type: 'updateEntity',
          payload: response.data,
        });
      } catch (err) {
        message.error('获取详情失败');
      }
    },
    *saveUser({ payload }, { call, put }) {
      try {
        yield call(saveUser, payload);

        message.success('保存成功');
        yield put(routerRedux.push('/got-user/list'));
      } catch (err) {
        message.error('保存失败');
      }
    },
    *search({ payload }, { call, put }) {
      try {
        const response = yield call(searchUser, payload);
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
        userEntity: action.payload,
      };
    },
    updateList(state, action) {
      return {
        ...state,
        userList: action.payload,
      };
    },
  },
};
