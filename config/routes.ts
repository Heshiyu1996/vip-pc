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
      { path: '/payment/recharge', name: '充值', icon: 'smile', component: './payment/recharge' },
      { path: '/payment/consumpt', name: '核销', icon: 'smile', component: './payment/consumpt' },
      { path: '/payment/recharge-config', name: '充值配置', icon: 'smile', component: './payment/recharge-config' },
      { path: '/payment/recharge-list', name: '充值记录', icon: 'smile', component: './payment/recharge-list' },
      {
        path: '/payment/consumption-list',
        name: '消费记录',
        icon: 'smile',
        component: './payment/consumption-list',
      },
    ],
  },
  {
    path: '/room',
    name: '订房管理',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      { path: '/room/arrange', name: '房态房价配置', icon: 'smile', component: './room/arrange' },
      { path: '/room/config', name: '客房配置', icon: 'smile', component: './room/config' },
      { path: '/room/order', name: '订单记录', icon: 'smile', component: './room/order' },
      { path: '/room/refund', name: '退款申请', icon: 'smile', component: './room/refund' },
    ],
  },
  {
    path: '/store',
    name: '店铺管理',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      { path: '/store/config', name: '店铺配置', icon: 'smile', component: './store/config' },
      { path: '/store/activity-config', name: '活动配置', icon: 'smile', component: './store/activity-config' }
    ],
  },
  {
    path: '/user',
    layout: false,
    routes: [{ path: '/user/login', component: './user/Login' }, { component: './404' }],
  },
  { path: '/', redirect: '/home' },
  { component: './404' },
];
