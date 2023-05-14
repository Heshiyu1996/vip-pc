import EventEmitter from 'event-emitter';

const bus = new EventEmitter();

export default bus;

// 更新"待确认订单数量"
export const ON_NEW_ORDER = 'ON_NEW_ORDER';