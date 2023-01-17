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
    }
  ]
};

export default userSys;
