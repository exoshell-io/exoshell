import { Button } from '@mantine/core';
import { useState } from 'react';

export const Auth: React.FC = () => {
  const [isAuthn] = useState(false);

  if (!isAuthn) {
    return (
      <>
        <Button variant='subtle'>Sign in</Button>
        <Button variant='outline'>Sign up</Button>
      </>
    );
  }

  return <></>;
};
