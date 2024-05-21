'use client';

import './page.css';

import dynamic from 'next/dynamic';

const NoSsr = dynamic(() => import('./NoSsr').then((m) => m.NoSsr), {
  ssr: false,
});

export default function Page() {
  return <NoSsr />;
}
