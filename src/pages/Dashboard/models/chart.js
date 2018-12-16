import { fakeChartData } from '@/services/api';

export default {
  namespace: 'chart',

  state: {
    visitData: [],
    resourceData: [],
    authorizeData: [],
    loading: false,
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(fakeChartData);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchAuthorizeData(_, { call, put }) {
      const response = yield call(fakeChartData);
      yield put({
        type: 'save',
        payload: {
          authorizeData: response.authorizeData,
        },
      });
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    clear() {
      return {
        visitData: [],
        resourceData: [],
        authorizeData: [],
      };
    },
  },
};
