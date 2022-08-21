import { Request, Response } from 'express';

function getStoreConfigList(req: Request, res: Response, u: string) {
  const result = {
    "success": false,
    "data": {
        "list": [
            {
                "id": "62",
                "label": "labore laborum dolor irure Duis",
                "value": "quis Excepteur",
                "images": [
                    "http://dummyimage.com/400x400"
                ]
            },
            {
                "id": "50",
                "label": "nulla eiusmod",
                "value": "velit consequat commodo culpa",
                "images": [
                    "http://dummyimage.com/400x400",
                    "http://dummyimage.com/400x400",
                    "http://dummyimage.com/400x400",
                    "http://dummyimage.com/400x400"
                ]
            },
            {
                "id": "31",
                "label": "amet voluptate aliquip proident sint",
                "value": "minim pariatur in commodo eiusmod",
                "images": [
                    "http://dummyimage.com/400x400"
                ]
            },
            {
                "id": "48",
                "label": "cupidatat Lorem culpa minim",
                "value": "qui eiusmod",
                "images": [
                    "http://dummyimage.com/400x400",
                    "http://dummyimage.com/400x400",
                    "http://dummyimage.com/400x400"
                ]
            },
            {
                "id": "84",
                "label": "ut mollit tempor",
                "value": "consequat esse dolore Lorem Ut",
                "images": [
                    "http://dummyimage.com/400x400",
                    "http://dummyimage.com/400x400",
                    "http://dummyimage.com/400x400",
                    "http://dummyimage.com/400x400"
                ]
            }
        ]
    },
    "msg": "获取店铺配置列表成功"
}

  return res.json(result);
}

function editStoreConfig(req: Request, res: Response, u: string, b: Request) {
  const result = {
    success: true,
    message: '编辑店铺配置成功',
    data: true,
  };

  res.json(result);
}

export default {
  'GET /api/store/config/list': getStoreConfigList,
  'PUT /api/store/config/edit/*': editStoreConfig,
};
