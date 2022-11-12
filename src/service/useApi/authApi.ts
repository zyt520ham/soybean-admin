import { useNormalHttpUtils } from '@/service/http/useNormalHttp';

const { doBaseApiRequest } = useNormalHttpUtils();
export function doLoginReq(userName: string, password: string) {
  return doBaseApiRequest<ApiAuth.ILoginData>('/auth/login', { username: userName, password }, {});
}

export function doGetLoginUserInfo(vUserId: string | number) {
  return doBaseApiRequest<ApiRoute.Route>('/auth/loginuserinfo', { userId: `${vUserId}` }, {});
}
