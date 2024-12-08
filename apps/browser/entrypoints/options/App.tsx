export const App: React.FC = () => {
  return (
    <div className='flex h-dvh max-h-dvh flex-grow flex-col'>
      <header className='min-h-[var(--header-height)] w-full bg-red-500'></header>
      <div className='flex h-[calc(100dvh-var(--header-height))]'>
        <aside className='h-full w-60 border-r border-gray-200 bg-gray-100'>
          {/* <FileTree /> */}
        </aside>
        <main className='h-full flex-1 p-4'>{/* <AppMain /> */}</main>
      </div>
    </div>
  );
};
