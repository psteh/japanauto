'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';

interface IUseParamRouterReturn {
  [key: string]:
    | string
    | number
    | ((params: { [key: string]: string | number }) => void);
  page: number;
  search: string;
  sort: string;
  brandName: string;
  modelName: string;
  providerId: string;
  set: (params: { [key: string]: string | number }) => void;
}

const useParamRouter = (): IUseParamRouterReturn => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlSearchParams = new URLSearchParams(searchParams.toString());

  const page = Number(searchParams.get('page')) || 1;
  const search = searchParams.get('search') || '';
  const sort = searchParams.get('sort') || '';
  const brandName = searchParams.get('brandName') || '';
  const modelName = searchParams.get('modelName') || '';
  const providerId = searchParams.get('providerId') || '';

  const set = (params: { [key: string]: string | number }) => {
    Object.entries(params).forEach(([key, value]) => {
      urlSearchParams.set(key, String(value));
    });

    const queryParams = urlSearchParams.toString();
    const query = queryParams ? `?${queryParams}` : '';

    router.push(`${pathname}${query}`);
  };

  return {
    page,
    search,
    sort,
    brandName,
    modelName,
    providerId,
    set,
  };
};

export default useParamRouter;
