import _pageRoute from '@soybeanjs/vite-plugin-vue-page-route';
export default function pageRoute() {
  // return _pageRoute();
  return _pageRoute({
    pageDir: 'src/views', // 默认
    pageGlobs: [
      '**/*.{vue,tsx,jsx}',
      '**/*Vidx.{vue,tsx,jsx}',
      '**/*.{vue,tsx,jsx}',
      '!**/components/**',
      '!**/inner/**'
    ], // 默认
    routeDts: 'src/typings/page-route.d.ts', // 默认
    routeModuleDir: 'src/router/modules', // 默认
    routeModuleExt: 'ts', // 默认
    routeModuleType: 'AuthRoute.Route', // 默认
    /**
     * @example _builtin_login => login
     */
    routeNameTansformer: name => name.replace(/^_([a-zA-Z]|[0-9]|$)+_*/, ''), // 默认
    /**
     * 路由懒加载
     * @param name 路由名称
     * @example
     * - 直接导入
     * ```ts
     * import Home from './views/home/aboutIndex.vue';
     * ```
     * - 懒加载导入
     * ```ts
     * const Home = import('./views/home/aboutIndex.vue');
     * ```
     */
    lazyImport: _name => true, // 默认
    /**
     * 是否生成路由模块
     * @param name 未转换过的路由名称(没有调用函数routeNameTansformer)
     * @returns 是否生成路由模块的代码
     */
    onRouteModuleGenerate: name => !name.includes('_builtin') // 对于系统内置路由不生成路由模块, 其他的都生成
  });
}
