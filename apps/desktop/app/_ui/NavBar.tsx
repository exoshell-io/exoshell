'use client';

import {
  Box,
  Collapse,
  Group,
  ScrollArea,
  Text,
  ThemeIcon,
  UnstyledButton,
  rem,
} from '@mantine/core';
import { useState } from 'react';
import { type IconType } from 'react-icons';
import { LuWorkflow as IconWorkflow } from 'react-icons/lu';
import { MdDashboard as IconDashboard } from 'react-icons/md';
import { TbChevronRight as IconChevronRight } from 'react-icons/tb';

export const NavBar: React.FC = () => {
  return (
    <Box component='nav' p='md' pb={0}>
      <ScrollArea>
        <Box>
          <LinksGroup Icon={IconWorkflow} label='Workflows' />
          <LinksGroup Icon={IconDashboard} label='Dashboards' />
        </Box>
      </ScrollArea>
    </Box>
  );
};

interface LinksGroupProps {
  Icon: IconType;
  label: string;
  links?: { label: string; link: string }[];
}

const LinksGroup: React.FC<LinksGroupProps> = ({ Icon, label, links }) => {
  const hasLinks = Array.isArray(links);
  const [opened, setOpened] = useState(false);
  const items = (hasLinks ? links : []).map((link) => (
    <Text
      component='a'
      // className={classes.link}
      href={link.link}
      key={link.label}
      onClick={(event) => event.preventDefault()}
    >
      {link.label}
    </Text>
  ));

  return (
    <>
      <UnstyledButton
        onClick={() => setOpened((o) => !o)}
        // className={classes.control}
      >
        <Group justify='space-between' gap={0}>
          <Box style={{ display: 'flex', alignItems: 'center' }}>
            <ThemeIcon variant='light' size={30}>
              <Icon style={{ width: rem(18), height: rem(18) }} />
            </ThemeIcon>
            <Box ml='md'>{label}</Box>
          </Box>
          {hasLinks && (
            <IconChevronRight
              // className={classes.chevron}
              stroke='1.5'
              style={{
                width: rem(16),
                height: rem(16),
                transform: opened ? 'rotate(-90deg)' : 'none',
              }}
            />
          )}
        </Group>
      </UnstyledButton>
      {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
    </>
  );
};
