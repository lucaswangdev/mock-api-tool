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
  baseURL: isDev ? '/api' : '/api',
  timeout: 10000,
  withCredentials: true,
  // other axios options you want
  errorConfig: {
    errorHandler() {},
    errorThrower() {},
  },
  requestInterceptors: [
    (request: any) => {
      const _request = {
        ...request,
        headers: {
          ...request.headers,
          Authorization: localStorage.getItem("Authorization"),
        }
      }
      return _request;
    }
  ],
  responseInterceptors: [
    (response) => {
      // 不再需要异步处理读取返回体内容，可直接在 data 中读出，部分字段可在 config 中找到
      const data: any = response.data;
      const path = response.request.responseURL;
      if (!data) {
        throw new Error('服务异常');
      }
      const code = data.code ?? 50000;
      // 未登录，且不为获取用户登录信息接口
      if (code === 401 &&
        !path.includes('/user/login') &&
        !location.pathname.includes('/user/login')) {
        // 跳转至登录页
        window.location.href = `/user/login`;
        throw new Error('请先登录');
      }
      // if (code !== 0) {
      //   console.error(`request error, path = ${path}`, data);
      //   throw new Error(data.message ?? '服务器错误');
      // }
      // do something
      return response;
    },
  ],
};
