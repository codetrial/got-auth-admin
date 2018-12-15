import mockjs from 'mockjs';

const titles = ['A Game of Thrones', 'A Clash of Kings', 'A Storm of Swords'];
const avatars = [
  'https://avatars0.githubusercontent.com/u/41424813?s=200&v=4',
  'https://avatars2.githubusercontent.com/u/36496727?s=200&v=4',
  'https://avatars1.githubusercontent.com/u/42104494?s=200&v=4',
];

const covers = [
  'https://gw.alipayobjects.com/zos/rmsportal/uMfMFlvUuceEyPpotzlq.png',
  'https://gw.alipayobjects.com/zos/rmsportal/iZBVOIhGJiAnhplqjvZW.png',
  'https://gw.alipayobjects.com/zos/rmsportal/iXjVmWVHbCJAyqvDxdtx.png',
];
const desc = [
  "The powerful have always preyed on the powerless. That's how they became powerful in the first place.",
  "If you ever call me 'sister' again, I'll have you strangled in your sleep.",
  "Stick 'em with the pointy end.",
  "That's what I do. I drink and I know things.",
  "A lion doesn't concern himself with the opinions of a sheep.",
];

const user = ['Eddard Stark', 'Jon Snow', 'Jaime Lannister'];

function fakeList(count) {
  const list = [];
  for (let i = 0; i < count; i += 1) {
    list.push({
      id: `fake-list-${i}`,
      owner: user[i % 3],
      title: titles[i % 3],
      avatar: avatars[i % 3],
      cover: covers[i % 3],
      status: ['active', 'exception', 'normal'][i % 3],
      percent: Math.ceil(Math.random() * 50) + 50,
      logo: avatars[i % 3],
      href: 'https://codetrial.github.io/',
      updatedAt: new Date(new Date().getTime() - 1000 * 60 * 60 * 2 * i),
      createdAt: new Date(new Date().getTime() - 1000 * 60 * 60 * 2 * i),
      subDescription: desc[i % 5],
      description: 'Duis aliquam urna eros, id pretium erat fermentum at.',
      activeUser: Math.ceil(Math.random() * 100000) + 100000,
      newUser: Math.ceil(Math.random() * 1000) + 1000,
      star: Math.ceil(Math.random() * 100) + 100,
      like: Math.ceil(Math.random() * 100) + 100,
      message: Math.ceil(Math.random() * 10) + 10,
      content:
        'Donec eu pellentesque massa. Maecenas vel eleifend velit. Mauris mollis fermentum tincidunt. Duis porta gravida tortor eu scelerisque. Etiam dictum suscipit nulla. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Phasellus et justo malesuada, tempus ante quis, vulputate lacus. Ut ac iaculis orci. Curabitur tempus, elit id convallis rhoncus, ligula lacus consequat leo, at auctor lectus diam non nibh. Nullam odio lectus, tempor et tortor vitae, cursus venenatis erat.',
      members: [
        {
          avatar: 'https://avatars0.githubusercontent.com/u/41424813?s=200&v=4',
          name: 'Eddard Stark',
          id: 'member1',
        },
        {
          avatar: 'https://avatars2.githubusercontent.com/u/36496727?s=200&v=4',
          name: 'Jon Snow',
          id: 'member2',
        },
        {
          avatar: 'https://avatars1.githubusercontent.com/u/42104494?s=200&v=4',
          name: 'Jaime Lannister',
          id: 'member3',
        },
      ],
    });
  }

  return list;
}

let sourceData;

function getFakeList(req, res) {
  const params = req.query;

  const count = params.count * 1 || 20;

  const result = fakeList(count);
  sourceData = result;
  return res.json(result);
}

function postFakeList(req, res) {
  const { /* url = '', */ body } = req;
  // const params = getUrlParams(url);
  const { method, id } = body;
  // const count = (params.count * 1) || 20;
  let result = sourceData;

  switch (method) {
    case 'delete':
      result = result.filter(item => item.id !== id);
      break;
    case 'update':
      result.forEach((item, i) => {
        if (item.id === id) {
          result[i] = Object.assign(item, body);
        }
      });
      break;
    case 'post':
      result.unshift({
        body,
        id: `fake-list-${result.length}`,
        createdAt: new Date().getTime(),
      });
      break;
    default:
      break;
  }

  return res.json(result);
}

const getNotice = [
  {
    id: 'notice-1',
    title: titles[0],
    logo: avatars[0],
    description: 'The next time you raise a hand to me will be the last time you have hands.',
    updatedAt: new Date(),
    member: '凛冬城',
    href: '',
    memberLink: '',
  },
  {
    id: 'notice-2',
    title: titles[1],
    logo: avatars[1],
    description:
      "It's easy to confuse 'what is' with 'what ought to be', especially when 'what is' has worked out in your favor.",
    updatedAt: new Date('2017-07-24'),
    member: '君临城',
    href: '',
    memberLink: '',
  },
  {
    id: 'notice-3',
    title: titles[2],
    logo: avatars[2],
    description: 'When you play the game of thrones, you win or you die.',
    updatedAt: new Date(),
    member: '多恩',
    href: '',
    memberLink: '',
  },
];

function getFakeCaptcha(req, res) {
  return res.json('captcha-xxx');
}

export default {
  'GET /api/project/notice': getNotice,
  'POST /api/forms': (req, res) => {
    res.send({ message: 'Ok' });
  },
  'GET /api/tags': mockjs.mock({
    'list|100': [{ name: '@city', 'value|1-100': 150, 'type|0-2': 1 }],
  }),
  'GET /api/fake_list': getFakeList,
  'POST /api/fake_list': postFakeList,
  'GET /api/captcha': getFakeCaptcha,
};
