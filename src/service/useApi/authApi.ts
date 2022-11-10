import { useNormalHttpUtils } from '@/service/http/useNormalHttp';

const { doBaseApiRequest } = useNormalHttpUtils();
export function doLoginReq() {
  return doBaseApiRequest('/api/login', { username: 'superAdmin', password: '123456' }, {});
}
