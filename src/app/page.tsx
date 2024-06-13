import React, { Suspense } from 'react';
import { headers } from 'next/headers';

import { login } from '@/modules/Auction/api';
import PageContainer from '@/modules/Auction/containers/PageContainer';

async function getData() {
  try {
    const referer = headers().get('referer');
    const xForwardedProto = headers().get('x-forwarded-proto');
    const host = headers().get('host');
    const apiUrl = referer || `${xForwardedProto}://${host}/`;

    if (!apiUrl || apiUrl.includes('null')) {
      throw new Error('Unable to find referer in headers');
    }

    const res = await login(apiUrl);

    return res?.data?.token;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export default async function Page() {
  const token = await getData();

  return (
    <main>
      <Suspense>
        <PageContainer token={token} />
      </Suspense>
    </main>
  );
}
