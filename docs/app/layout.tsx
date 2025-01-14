import './tailwind.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Header, Providers } from './_layout';
import { LeftBar } from './_layout/LeftBar';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Exoshell UI kit',
};

export default async function RootLayout({
  children,
}: Readonly<React.PropsWithChildren>) {
  return (
    <html
      lang='en'
      className={`font-sans antialiased ${inter.variable} scroll-smooth scheme-light focus:scroll-auto dark:scheme-dark`}
      suppressHydrationWarning
    >
      <body className='max-w-dvw'>
        <Providers>
          <Header className='sticky top-0 z-40 h-[58px] border-b border-gray-200 bg-white' />
          <div className='relative flex min-h-[calc(100dvh-58px)] w-full max-w-full flex-row'>
            <nav className='sticky top-[58px] max-h-[calc(100dvh-58px)] w-[260px] shrink-0 flex-nowrap border-r border-gray-200 bg-white'>
              <LeftBar />
            </nav>
            <div className='grow'>
              <main className='min-h-[20dvh] bg-gray-100 shadow'>
                {children}
              </main>
              <footer className='relative -z-10 h-[400px]'>
                <div className='fixed right-0 bottom-0 left-[260px] h-[400px]'>
                  <div className='mx-auto max-w-[min(calc(100dvh-260px),1080px)]'>
                    <div className='flex h-full flex-row items-center justify-between py-[64px]'>
                      <div className='flex flex-row items-center gap-4'>
                        <p>© 2021 Exoshell</p>
                        <p>Privacy Policy</p>
                        <p>Terms of Service</p>
                      </div>
                      <div className='flex flex-row items-center gap-4'>
                        <p>Twitter</p>
                        <p>GitHub</p>
                        <p>Discord</p>
                      </div>
                    </div>
                  </div>
                </div>
              </footer>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
