import { Breadcrumb, Breadcrumbs } from '@exoshell/ui';

export default function Page() {
  return (
    <div className='flex min-h-full flex-col items-center justify-center'>
      <Breadcrumbs separator='_'>
        <Breadcrumb href='/' separator='?'>
          Home
        </Breadcrumb>
        <Breadcrumb href='/docs'>Docs</Breadcrumb>
        <Breadcrumb>App</Breadcrumb>
      </Breadcrumbs>
    </div>
  );
}
