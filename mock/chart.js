import moment from 'moment';

// mock data
const beginDay = new Date().getTime();

const visitData = [];

const fakeX = [
  27310,
  15200,
  24200,
  32200,
  14200,
  27200,
  25200,
  16200,
  35200,
  29200,
  16200,
  23200,
  31200,
  15200,
  33200,
  36200,
  15000,
];
for (let i = 0; i < fakeX.length; i += 1) {
  visitData.push({
    x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD'),
    y: fakeX[i],
  });
}

const resourceData = [];

const fakeY = [258, 510, 410, 210, 410, 710, 510, 610, 510, 910, 610, 310, 110, 510, 310, 610, 520];
for (let i = 0; i < fakeY.length; i += 1) {
  resourceData.push({
    x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD'),
    y: fakeY[i],
  });
}

const authorizeData = [];
for (let i = 0; i < 12; i += 1) {
  authorizeData.push({
    x: `${i + 1}月`,
    y: Math.floor(Math.random() * 1000) + 200,
  });
}

const getFakeChartData = {
  visitData,
  resourceData,
  authorizeData,
};

export default {
  'GET /api/fake_chart_data': getFakeChartData,
};
