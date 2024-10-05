export default [
  { path: '/home', name: '首页', icon: 'smile', component: './home' },
  { path: '/landing', name: '', component: './landing', layout: false },
  {
    path: '/vip',
    name: '会员卡管理',
    icon: 'user',
    routes: [
      { path: '/vip/list', name: '会员列表', icon: 'smile', component: './vip/list' },
      { path: '/vip/config', name: '等级配置', icon: 'smile', component: './vip/config' },
    ],
  },
  {
    path: '/payment',
    name: '支付管理',
    icon: 'transaction',
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
    icon: 'calendar',
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
    icon: 'home',
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
    icon: 'setting',
    access: 'canAdmin',
    routes: [
      { path: '/distribution/reward', name: '营销奖励配置', icon: 'smile', component: './distribution/reward' },
    ],
  },
  {
    path: '/score',
    name: '积分管理',
    icon: 'gift',
    access: 'canAdmin',
    routes: [
      { path: '/score/search-list', name: '积分查询', icon: 'smile', component: './score/search-list' },
      { path: '/score/exchange-list', name: '兑换记录', icon: 'smile', component: './score/exchange-list' },
      { path: '/score/gift-list', name: '兑换品配置', icon: 'smile', component: './score/gift-list' },
      { path: '/score/rule', name: '积分规则配置', icon: 'smile', component: './score/rule' },
      { path: '/score/consumpt', name: '人工核销', icon: 'smile', component: './score/consumpt' },
    ],
  },{
    path: '/report',
    name: '报表系统',
    icon: 'hdd',
    access: 'canAdmin',
    routes: [
      {
        path: '/report/store',
        name: '店铺数据',
        icon: 'crown',
        access: 'canAdmin',
        routes: [
          { path: '/report/store/merchant-list', name: '商户数据汇总报表', icon: 'smile', component: './report/store/merchant-list' },
          { path: '/report/store/distribution-list', name: '分销卖货报表', icon: 'smile', component: './report/store/distribution-list' },
          // TODO: delay
          { path: '/report/store/sale-list', name: '销量日报表', icon: 'smile', component: './report/store/sale-list' },
          { path: '/report/store/reward-list', name: '员工奖励报表', icon: 'smile', component: './report/store/reward-list' },
          { path: '/report/store/room-list', name: '客房报表', icon: 'smile', component: './report/store/room-list' },
        ],
      },
      {
        path: '/report/vip',
        name: '会员数据',
        icon: 'crown',
        access: 'canAdmin',
        routes: [
          { path: '/report/vip/value-analysis', name: '会员价值分析', icon: 'smile', component: './report/vip/value-analysis' },
          { path: '/report/vip/financial-analysis', name: '会员充值与消费分析', icon: 'smile', component: './report/vip/financial-analysis' },
        ],
      }
    ],
  },
  {
    path: '/finance',
    name: '财务中心',
    icon: 'dollarCircle',
    access: 'canAdmin',
    routes: [
      { path: '/finance/account-balance-list', name: '账户余额', icon: 'smile', component: './finance/account-balance-list' },
      { path: '/finance/card-balance-list', name: '会员卡余额总览', icon: 'smile', component: './finance/card-balance-list' },
      { path: '/finance/room-order-list', name: '客房订单对账', icon: 'smile', component: './finance/room-order-list' },
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
