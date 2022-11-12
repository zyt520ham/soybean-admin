
import { useBasicReq } from '@/service/useApi/baseApi';

export function doGetUserRoutesList(vUserId: string | number, vProjId: string | number) {
  return useBasicReq<ApiRoute.Route>('/routes/getuserroutes', { userId: vUserId, projId: vProjId });
}
