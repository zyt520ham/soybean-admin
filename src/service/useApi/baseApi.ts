import { useNormalHttpUtils } from '@/service/http/useNormalHttp';
const { doBaseApiRequest } = useNormalHttpUtils();
export function useBasicReq<T = any>(path: string, params: Record<any, any>, options = {}) {
  return doBaseApiRequest<T>(path, params, options);
}
