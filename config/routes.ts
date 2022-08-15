export default [
  { path: '/home', name: '首页', icon: 'smile', component: './home' },
  {
    path: '/vip',
    name: '会员卡管理',
    icon: 'crown',
    routes: [
      { path: '/vip/list', name: '会员列表', icon: 'smile', component: './vip/list' },
      { path: '/vip/config', name: '等级配置', icon: 'smile', component: './vip/config' },
    ],
  },
  {
    path: '/payment',
    name: '支付管理',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      { path: '/payment/recharge', name: '充值', icon: 'smile', component: './Welcome' },
      { path: '/payment/recharge-list', name: '充值记录', icon: 'smile', component: './payment/recharge-list' },
      {
        path: '/payment/consumption-list',
        name: '消费记录',
        icon: 'smile',
        component: './Welcome',
      },
    ],
  },
  {
    path: '/room',
    name: '订房管理',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      { path: '/room/arrange', name: '排房', icon: 'smile', component: './Welcome' },
      { path: '/room/config', name: '客房配置', icon: 'smile', component: './Welcome' },
      { path: '/room/order', name: '订房记录', icon: 'smile', component: './Welcome' },
      { path: '/room/refund', name: '退款申请', icon: 'smile', component: './Welcome' },
    ],
  },
  {
    path: '/store',
    name: '店铺管理',
    icon: 'crown',
    access: 'canAdmin',
    routes: [{ path: '/store/config', name: '店铺配置', icon: 'smile', component: './store/config' }],
  },
  {
    path: '/user',
    layout: false,
    routes: [{ path: '/user/login', component: './user/Login' }, { component: './404' }],
  },
  { path: '/', redirect: '/payment/recharge-list' },
  { component: './404' },
];
