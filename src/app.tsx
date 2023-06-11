import Footer from '@/components/Footer';
import RightContent from '@/components/RightContent';
import type { Settings as LayoutSettings } from '@ant-design/pro-components';
import { PageLoading, 
  // SettingDrawer
} from '@ant-design/pro-components';
import type { RunTimeLayoutConfig, RequestConfig } from 'umi';
import { history } from 'umi';
import RouteWithBadge from './components/route-with-badge';
import bus, { ON_NEW_ORDER } from '@/common/bus';
import defaultSettings from '../config/defaultSettings';
import { currentUser as queryCurrentUser } from './services/ant-design-pro/api';

const loginPath = '/user/login';
const landingPath = '/landing';
const noNeedLoginPath = [loginPath, landingPath];

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.CurrentUser;
  loading?: boolean;
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
}> {


  const fetchUserInfo = async () => {
    try {
      const msg = await queryCurrentUser();
      return msg.data;
    } catch (error) {
      history.push(loginPath);
    }
    return undefined;
  };

  // 如果不是：【登录页、小程序中间页】，执行
  if (!noNeedLoginPath.includes(history.location.pathname)) {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: defaultSettings,
    };
  }
  return {
    fetchUserInfo,
    settings: defaultSettings,
  };
}

let firstHeaderRender = true;

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  // 首次获取“待确认订单”数量
  if (firstHeaderRender) {
    setTimeout(() => {
      bus.emit(ON_NEW_ORDER);
    })
    firstHeaderRender = false;
  }

  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    waterMarkProps: {
      content: initialState?.currentUser?.name,
    },
    footerRender: () => <Footer />,
    onPageChange: () => {
      // 获取“待确认订单”数量
      const { location } = history;
      // 如果没有登录，重定向到 login
      if (!initialState?.currentUser && !noNeedLoginPath.includes(location.pathname)) {
        history.push(loginPath);
      }
      // bus.emit(ON_NEW_ORDER);
    },
    links: [],
    menuHeaderRender: () => {
      return undefined;
    },
    menuItemRender: (item, defaultDom) => {
      if (['/room/order'].includes(item?.path)) {
        return <div onClick={()=> history.push(item.path) }>{defaultDom}<RouteWithBadge /></div>
      }
      
      return <div onClick={()=> history.push(item.path) }>{defaultDom}</div>
    },
    subMenuItemRender: (item, defaultDom) => {
      if (['/room'].includes(item?.path)) {
        return <div onClick={()=> history.push(item.path) }>{defaultDom}<RouteWithBadge /></div>
      }
      
      return <div onClick={()=> history.push(item.path) }>{defaultDom}</div>
    },
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    childrenRender: (children, props) => {
      // if (initialState?.loading) return <PageLoading />;
      return (
        <>
          {children}
          {/* 主题配置-右侧蓝色齿轮 */}
          {/* {!props.location?.pathname?.includes('/login') && (
            <SettingDrawer
              disableUrlParams
              enableDarkTheme
              settings={initialState?.settings}
              onSettingChange={(settings) => {
                setInitialState((preInitialState) => ({
                  ...preInitialState,
                  settings,
                }));
              }}
            />
          )} */}
        </>
      );
    },
    ...initialState?.settings,
  };
};

export const request: RequestConfig = {
  errorConfig: {
    adaptor: (resData, ctx) => {
      // 异常处理（code是兼容调用小程序接口）
      if (!resData.success && resData.code !== 200) {
        // 未登录
        if ([902, 909].includes(resData?.data?.errorType)) {
          history.push(`/user/login`);
        }
        throw ({
          ...resData,
          // 后端下发 msg 兼容为 message
          message: resData?.data?.errorMsg || resData.msg,
        });
      }

      return resData;
    },
  },
};