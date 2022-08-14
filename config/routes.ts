export default [
  // 首页
  {
    path: '/home',
    name: 'home',
    icon: 'smile',
    component: './Welcome',
  },
  // 会员卡管理
  {
    path: '/vip',
    name: 'vip',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      {
        path: '/vip/list',
        name: 'list',
        icon: 'smile',
        component: './TableList',
      },
      {
        path: '/vip/config',
        name: 'config',
        icon: 'smile',
        component: './TableList',
      },
    ],
  },
  // 支付管理
  {
    path: '/payment',
    name: 'payment',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      {
        path: '/payment/recharge',
        name: 'recharge',
        icon: 'smile',
        component: './TableList',
      },
      {
        path: '/payment/recharge-list',
        name: 'recharge-list',
        icon: 'smile',
        component: './TableList',
      },
      {
        path: '/payment/consumption-list',
        name: 'consumption-list',
        icon: 'smile',
        component: './TableList',
      },
    ],
  },
  // 订房管理
  {
    path: '/room',
    name: 'room',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      {
        path: '/room/arrange',
        name: 'arrange',
        icon: 'smile',
        component: './TableList',
      },
      {
        path: '/room/config',
        name: 'config',
        icon: 'smile',
        component: './TableList',
      },
      {
        path: '/room/order',
        name: 'order',
        icon: 'smile',
        component: './TableList',
      },
      {
        path: '/room/refund',
        name: 'refund',
        icon: 'smile',
        component: './TableList',
      },
    ],
  },
  // 店铺管理
  {
    path: '/store',
    name: 'store',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      {
        path: '/store/config',
        name: 'config',
        icon: 'smile',
        component: './TableList',
      },
    ],
  },
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/Login',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
