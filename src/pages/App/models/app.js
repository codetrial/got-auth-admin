import { searchApp } from '@/services/app';

export default {
  namespace: 'app',

  state: {
    data: [
      {
        list: [],
        pagination: {},
      },
    ],
  },

  effects: {
    *search({ payload }, { call, put }) {
      const response = yield call(searchApp, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload.data,
      };
    },
  },
};
