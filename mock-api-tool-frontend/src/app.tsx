// 全局运行时配置
import Logo from '@/assets/logo.png';
import GlobalFooter from '@/components/GlobalFooter';
import { RunTimeLayoutConfig } from '@@/plugin-layout/types';
import type { RequestConfig } from 'umi';
import './global.less';
import RightContent from '@/components/GlobalHeader/RightContent';

/**
 * 全局初始化数据配置，用于 Layout 用户信息和权限初始化
 * 更多信息见文档：https://next.umijs.org/docs/api/runtime-config#getinitialstate
 */
export async function getInitialState(): Promise<InitialState> {
  return {};
}

/**
 * 全局布局配置
 */
export const layout: RunTimeLayoutConfig = () => {
  return {
    title: 'Mock-api-tool',
    logo: Logo,
    menu: {
      locale: false,
    },
    fixedHeader: false,
    layout: 'top',
    contentStyle: {
      paddingBottom: 120,
    },
    rightContentRender: () => <RightContent />,
    footerRender: () => <GlobalFooter />,
  };
};

const isDev = process.env.NODE_ENV === 'development';

/**
 * 全局请求配置
 * https://umijs.org/docs/max/request
 */
export const request: RequestConfig = {
  baseURL: isDev ? '/api' : '你的线上接口地址',
  timeout: 10000,
  withCredentials: true,
  // other axios options you want
  errorConfig: {
    errorHandler() {},
    errorThrower() {},
  },
  requestInterceptors: [],
  responseInterceptors: [
    (response) => {
      // if (code !== 0) {
      //   console.error(`request error, path = ${path}`, data);
      //   throw new Error(data.message ?? '服务器错误');
      // }
      // do something
      return response;
    },
  ],
};
