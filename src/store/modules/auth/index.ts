import { unref } from 'vue';
import { defineStore } from 'pinia';
import { router } from '@/router';
import { useRouterPush } from '@/composables';
import { clearAuthStorage, getToken, getUserInfo, setRefreshToken, setToken, setUserInfo } from '@/utils';
import { doLoginReq, doGetLoginUserInfo } from '@/service/useApi/authApi';
import { useTabStore } from '../tab';
import { useRouteStore } from '../route';

interface AuthState {
  /** 用户信息 */
  userInfo: Auth.UserInfo;
  /** 用户token */
  token: string;
  /** 登录的加载状态 */
  loginLoading: boolean;
}

export const useAuthStore = defineStore('auth-store', {
  state: (): AuthState => ({
    userInfo: getUserInfo(),
    token: getToken(),
    loginLoading: false
  }),
  getters: {
    /** 是否登录 */
    isLogin(state) {
      return Boolean(state.token);
    }
  },
  actions: {
    /** 重置auth状态 */
    resetAuthStore() {
      const { toLogin } = useRouterPush(false);
      const { resetTabStore } = useTabStore();
      const { resetRouteStore } = useRouteStore();
      const route = unref(router.currentRoute);

      clearAuthStorage();
      this.$reset();

      resetTabStore();
      resetRouteStore();

      if (route.meta.requiresAuth) {
        toLogin();
      }
    },
    /**
     * 处理登录后成功或失败的逻辑
     * @param backendToken - 返回的token
     */
    async handleActionAfterLogin(backendToken: ApiAuth.ILoginData) {
      const { toLoginRedirect } = useRouterPush(false);

      const loginSuccess = await this.loginByToken(backendToken);

      if (loginSuccess) {
        // 跳转登录后的地址
        toLoginRedirect();

        // 登录成功弹出欢迎提示
        window.$notification?.success({
          title: '登录成功!',
          content: `欢迎回来，${this.userInfo.userName}!`,
          duration: 3000
        });

        return;
      }

      // 不成功则重置状态
      this.resetAuthStore();
    },
    /**
     * 根据token进行登录
     * @param backendToken - 返回的token
     */
    async loginByToken(backendToken: ApiAuth.ILoginData) {
      let successFlag = false;

      // 先把token存储到缓存中(后面接口的请求头需要token)
      const { access_token } = backendToken;
      // setToken(access_token);
      //
      //   // 更新状态

      this.token = access_token;

      // 获取用户信息
      const data = await doGetLoginUserInfo(backendToken.user_id);
      //
      if (data) {
        // 成功后把用户信息存储到缓存中
        this.userInfo = data;
        setUserInfo(data);
        setToken(access_token);
        setRefreshToken('');
        successFlag = true;
      }

      return successFlag;
    },
    /**
     * 登录
     * @param userName - 用户名
     * @param password - 密码
     */
    async login(userName: string, password: string) {
      this.loginLoading = true;

      const resData = await doLoginReq(userName, password); // await fetchLogin(userName, password);
      if (resData) {
        await this.handleActionAfterLogin(resData);
      }
      this.loginLoading = false;
    }
  }
});
