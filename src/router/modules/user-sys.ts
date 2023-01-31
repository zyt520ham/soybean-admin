const userSys: AuthRoute.Route = {
  name: 'user-sys',
  path: '/user-sys',
  component: 'basic',
  meta: { title: 'user-sys', icon: 'mdi:menu' },
  children: [
    {
      name: 'user-sys_user-manager',
      path: '/user-sys/user-manager',
      component: 'self',
      meta: { title: 'user-sys_user-manager', icon: 'mdi:menu' }
    },
    {
      name: 'user-sys_about',
      path: '/user-sys/about',
      component: 'self',
      meta: { title: '复制的about', icon: 'mdi:menu', useCompName: 'about', keepAlive: true }
    }
  ]
};

export default userSys;
