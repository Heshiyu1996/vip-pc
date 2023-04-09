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
      { path: '/store/activity-config', name: '活动配置', icon: 'smile', component: './store/activity-config' },
      { path: '/store/staff', name: '员工管理', icon: 'smile', component: './store/staff' },
      { path: '/store/department', name: '部门配置', icon: 'smile', component: './store/department' },
      { path: '/store/role', name: '职位配置', icon: 'smile', component: './store/role' },
    ],
  },
  {
    path: '/distribution',
    name: '分销管理',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      { path: '/distribution/reward', name: '营销奖励配置', icon: 'smile', component: './distribution/reward' },
    ],
  },
  {
    path: '/score',
    name: '积分管理',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      { path: '/score/search-list', name: '积分查询', icon: 'smile', component: './score/search-list' },
      { path: '/score/exchange-list', name: '兑换记录', icon: 'smile', component: './score/exchange-list' },
      { path: '/score/gift-list', name: '兑换品配置', icon: 'smile', component: './score/gift-list' },
      { path: '/score/rule', name: '积分规则配置', icon: 'smile', component: './score/rule' },
      { path: '/score/consumpt', name: '人工核销', icon: 'smile', component: './score/consumpt' },
    ],
  },
  {
    path: '/user',
    layout: false,
    routes: [{ path: '/user/login', component: './user/login' }, { component: './404' }],
  },
  { path: '/', redirect: '/home' },
  { component: './404' },
];
