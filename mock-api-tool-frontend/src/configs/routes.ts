/**
 * 路由
 * 配置参考：https://umijs.org/docs/max/layout-menu#%E6%89%A9%E5%B1%95%E7%9A%84%E8%B7%AF%E7%94%B1%E9%85%8D%E7%BD%AE
 */
export default [
  {
    name: '项目列表',
    path: '/',
    component: 'project/list',
  },
  {
    name: '项目列表',
    path: '/project/manage',
    component: 'project/manage',
    hideInMenu: true,
  },
  {
    name: '接口列表',
    path: '/index',
    component: 'index',
  },
  {
    name: '增加接口',
    path: '/add',
    component: 'add',
  },
  {
    path: '/user',
    hideInMenu: true,
    headerRender: false,
    routes: [
      {
        name: '用户登录',
        path: '/user/login',
        component: 'user/login',
      },
      {
        name: '用户注册',
        path: '/user/register',
        component: 'user/register',
      },
    ],
  },
];

const isDev = process.env.NODE_ENV === 'development';

// 查看mock接口 basePath
export const mockApiBasePath =  isDev ? "http://localhost:4000/api/mock" : '/api/mock';

// e.g.
// export const routes: IBestAFSRoute[] = [
//   {
//     path: '/welcome',
//     component: 'IndexPage',
//     name: '欢迎', // 兼容此写法
//     icon: 'testicon',
//     // 更多功能查看
//     // https://beta-pro.ant.design/docs/advanced-menu
//     // ---
//     // 新页面打开
//     target: '_blank',
//     // 不展示顶栏
//     headerRender: false,
//     // 不展示页脚
//     footerRender: false,
//     // 不展示菜单
//     menuRender: false,
//     // 不展示菜单顶栏
//     menuHeaderRender: false,
//     // 权限配置，需要与 plugin-access 插件配合使用
//     access: 'canRead',
//     // 隐藏子菜单
//     hideChildrenInMenu: true,
//     // 隐藏自己和子菜单
//     hideInMenu: true,
//     // 在面包屑中隐藏
//     hideInBreadcrumb: true,
//     // 子项往上提，仍旧展示,
//     flatMenu: true,
//   },
// ];
