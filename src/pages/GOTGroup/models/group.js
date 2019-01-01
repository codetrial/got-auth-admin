import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { searchGroup, getGroup, saveGroup } from '@/services/gotGroup';

export default {
  namespace: 'gotGroup',

  state: {
    groupEntity: {},
    groupList: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *getGroup({ payload }, { call, put }) {
      try {
        const response = yield call(getGroup, payload);
        yield put({
          type: 'updateEntity',
          payload: response.data,
        });
      } catch (err) {
        message.error('获取详情失败');
      }
    },
    *saveGroup({ payload }, { call, put }) {
      try {
        yield call(saveGroup, payload);

        message.success('保存成功');
        yield put(routerRedux.push('/got-group/list'));
      } catch (err) {
        message.error('保存失败');
      }
    },
    *search({ payload }, { call, put }) {
      try {
        const response = yield call(searchGroup, payload);
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
        groupEntity: action.payload,
      };
    },
    updateList(state, action) {
      return {
        ...state,
        groupList: action.payload,
      };
    },
  },
};
