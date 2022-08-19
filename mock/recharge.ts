import { Request, Response } from 'express';

function rechargeAmount(req: Request, res: Response, u: string, b: Request) {
  const result = {
    success: true,
    message: '充值成功!',
    data: ""
  };

  res.json(result);
}

export default {
  'POST /api/payment/recharge/add': rechargeAmount,
};
