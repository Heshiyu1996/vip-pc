import { Request, Response } from 'express';
import { parse } from 'url';

// mock tableListDataSource
const genList = (current: number, pageSize: number) => {
  const tableListDataSource: API.RoomRefundListItem[] = [];

  for (let i = 0; i < pageSize; i += 1) {
    const index = (current - 1) * 10 + i;
    tableListDataSource.push(
      {
        "orderId": `${index}`,
        "amount": Math.floor(Math.random() * 1000),
        "cardNo": `${Math.floor(Math.random() * 1000)}`,
        "name": "直东层个原种资",
        "days": 71,
        "orderChannel": `${i % 2}`,
        "createTime": 87475989040,
        "orderEndTime": 951551805853,
        "orderStartTime": 1017168017684,
        "statusRefund": `${i % 3}`
      }
    );
  }
  tableListDataSource.reverse();
  return tableListDataSource;
};

let tableListDataSource = genList(1, 100);

function getRoomRefundList(req: Request, res: Response, u: string) {
  let realUrl = u;
  if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
    realUrl = req.url;
  }
  const { current = 1, pageSize = 10 } = req.query;
  const params = parse(realUrl, true).query as unknown as API.PageParams &
    API.RuleListItem & {
      sorter: any;
      filter: any;
    };

  let dataSource = [...tableListDataSource].slice(
    ((current as number) - 1) * (pageSize as number),
    (current as number) * (pageSize as number),
  );
  if (params.sorter) {
    const sorter = JSON.parse(params.sorter);
    dataSource = dataSource.sort((prev, next) => {
      let sortNumber = 0;
      Object.keys(sorter).forEach((key) => {
        if (sorter[key] === 'descend') {
          if (prev[key] - next[key] > 0) {
            sortNumber += -1;
          } else {
            sortNumber += 1;
          }
          return;
        }
        if (prev[key] - next[key] > 0) {
          sortNumber += 1;
        } else {
          sortNumber += -1;
        }
      });
      return sortNumber;
    });
  }
  if (params.filter) {
    const filter = JSON.parse(params.filter as any) as {
      [key: string]: string[];
    };
    if (Object.keys(filter).length > 0) {
      dataSource = dataSource.filter((item) => {
        return Object.keys(filter).some((key) => {
          if (!filter[key]) {
            return true;
          }
          if (filter[key].includes(`${item[key]}`)) {
            return true;
          }
          return false;
        });
      });
    }
  }

  if (params.name) {
    dataSource = dataSource.filter((data) => data?.name?.includes(params.name || ''));
  }
  const result = {
    data: dataSource,
    total: tableListDataSource.length,
    success: true,
    pageSize,
    current: parseInt(`${params.current}`, 10) || 1,
  };

  return res.json(result);
}

function acceptRoomRefund(req: Request, res: Response, u: string, b: Request) {
  const result = {
    success: true,
    message: '同意成功',
    data: {}
  };

  res.json(result);
}

function rejectRoomRefund(req: Request, res: Response, u: string, b: Request) {
  const result = {
    success: true,
    message: '拒绝成功',
    data: {}
  };

  res.json(result);
}

function exportRoomRefund(req: Request, res: Response, u: string, b: Request) {
  const result = {
    success: true,
    message: '导出成功',
    data: "http://www.xlsx"
  };

  res.json(result);
}

export default {
  'GET /api/room/refund/list': getRoomRefundList,
  'PUT /api/room/refund/accept/*': acceptRoomRefund,
  'PUT /api/room/refund/reject/*': rejectRoomRefund,
  'POST /api/room/refund/export': exportRoomRefund,
};
