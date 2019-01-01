export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', component: './User/Login' },
      { path: '/user/register', component: './User/Register' },
      { path: '/user/register-result', component: './User/RegisterResult' },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    authority: ['admin', 'user'],
    routes: [
      // dashboard
      { path: '/', redirect: '/dashboard/workspace' },
      {
        path: '/dashboard',
        name: 'dashboard',
        icon: 'dashboard',
        routes: [
          {
            path: '/dashboard/workspace',
            name: 'workspace',
            component: './Dashboard/Workspace',
          },
        ],
      },
      {
        path: '/got-app',
        name: 'got-app',
        icon: 'crown',
        routes: [
          {
            path: '/got-app/list',
            name: 'list',
            component: './GOTApp/AppList',
          },
          {
            path: '/got-app/new',
            name: 'new',
            hideInMenu: true,
            component: './GOTApp/AppForm',
          },
          {
            path: '/got-app/:id',
            name: 'edit',
            hideInMenu: true,
            component: './GOTApp/AppForm',
          },
        ],
      },
      {
        path: '/got-resource',
        name: 'got-resource',
        icon: 'compass',
        routes: [
          {
            path: '/got-resource/list',
            name: 'list',
            component: './GOTResource/ResourceList',
          },
          {
            path: '/got-resource/new',
            name: 'new',
            hideInMenu: true,
            component: './GOTResource/ResourceForm',
          },
          {
            path: '/got-resource/:id',
            name: 'edit',
            hideInMenu: true,
            component: './GOTResource/ResourceForm',
          },
        ],
      },
      {
        path: '/got-role',
        name: 'got-role',
        icon: 'shop',
        routes: [
          {
            path: '/got-role/list',
            name: 'list',
            component: './GOTRole/RoleList',
          },
          {
            path: '/got-role/new',
            name: 'new',
            hideInMenu: true,
            component: './GOTRole/RoleForm',
          },
          {
            path: '/got-role/:id',
            name: 'edit',
            hideInMenu: true,
            component: './GOTRole/RoleForm',
          },
        ],
      },
      {
        path: '/got-group',
        name: 'got-group',
        icon: 'shopping',
        routes: [
          {
            path: '/got-group/list',
            name: 'list',
            component: './GOTGroup/GroupList',
          },
          {
            path: '/got-group/new',
            name: 'new',
            hideInMenu: true,
            component: './GOTGroup/GroupForm',
          },
          {
            path: '/got-group/:id',
            name: 'edit',
            hideInMenu: true,
            component: './GOTGroup/GroupForm',
          },
        ],
      },
      {
        path: '/got-user',
        name: 'got-user',
        icon: 'rocket',
        routes: [
          {
            path: '/got-user/list',
            name: 'list',
            component: './GOTUser/UserList',
          },
          {
            path: '/got-user/new',
            name: 'new',
            hideInMenu: true,
            component: './GOTUser/UserForm',
          },
          {
            path: '/got-user/:id',
            name: 'edit',
            hideInMenu: true,
            component: './GOTUser/UserForm',
          },
        ],
      },
      {
        name: 'exception',
        icon: 'warning',
        path: '/exception',
        hideInMenu: true,
        routes: [
          // exception
          {
            path: '/exception/403',
            name: 'not-permission',
            component: './Exception/403',
          },
          {
            path: '/exception/404',
            name: 'not-find',
            component: './Exception/404',
          },
          {
            path: '/exception/500',
            name: 'server-error',
            component: './Exception/500',
          },
          {
            path: '/exception/trigger',
            name: 'trigger',
            hideInMenu: true,
            component: './Exception/TriggerException',
          },
        ],
      },
      {
        component: '404',
      },
    ],
  },
];
