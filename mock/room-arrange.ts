import { Request, Response } from 'express';
import { parse } from 'url';

// mock tableListDataSource
const genList = (current: number, pageSize: number) => {
  const tableListDataSource: API.RoomArrangeListItem[] = [];

  for (let i = 0; i < pageSize; i += 1) {
    const index = (current - 1) * 10 + i;
    tableListDataSource.push(
      {
        "roomId": `${index}`,
        "roomType": `0`,
        "restCount": 89,
        "totalCount": 100,
        "images": [
          "http://dummyimage.com/400x400"
        ],
      }
    );
  }
  tableListDataSource.reverse();
  return tableListDataSource;
};

let tableListDataSource = genList(1, 100);

function getRoomArrangeList(req: Request, res: Response, u: string) {
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

function getRoomArrangeDetail(req: Request, res: Response, u: string) {
  const result = {
    "roomId": `${Math.floor(Math.random() * 1000)}`,
    "roomType": '0',
    "restCount": 89,
    "totalCount": 100,
    "orderList": [
      {
        "orderId": '1',
        "startTime": 379096439872,
        "endTime": 379096439872,
      }
    ],
  }

  return res.json(result);
}

function removeRoomArrangeList(req: Request, res: Response, u: string, b: Request) {
  const result = {
    success: true,
    message: '删除成功',
    data: {}
  };

  res.json(result);
}

function exportRoomArrangeList(req: Request, res: Response, u: string, b: Request) {
  const result = {
    success: true,
    message: '导出成功',
    data: "http://www.xlsx"
  };

  res.json(result);
}

export default {
  'GET /api/room/arrange/list': getRoomArrangeList,
  'GET /api/room/arrange/detail/*': getRoomArrangeDetail,
  'DELETE /api/room/arrange/*': removeRoomArrangeList,
  'POST /api/room/arrange/export': exportRoomArrangeList,
};
