import { Disclosure, Link, LinkGroup } from '@exoshell/ui';
import { BiText as IconText } from 'react-icons/bi';
import { LuLayoutGrid as IconLayout } from 'react-icons/lu';
import { MdOutlineWidgets as IconWidget } from 'react-icons/md';
import {
  TbClick as IconClick,
  TbLayersSubtract as IconOverlay,
} from 'react-icons/tb';
import { MdOutlineNotificationsActive as IconNotification } from 'react-icons/md';
import { PiNavigationArrowBold as IconNavigation } from 'react-icons/pi';
import { LuTextCursorInput as IconInput } from 'react-icons/lu';
import { BsChevronExpand as IconCombobox } from 'react-icons/bs';

export const routes: { label: string; href: string }[] = [
  { label: 'Home', href: '/' },
  { label: 'Features', href: '/features' },
  { label: 'Getting started', href: '/getting-started' },
] as const;

type ComponentRoutesByCategories = [
  category: string,
  Icon: React.ComponentType,
  components: [label: string, href: string][],
][];

export const componentRoutesByCategories: ComponentRoutesByCategories = [
  ['layout', IconLayout, [['AppShell', '/appshell']]],
  ['buttons', IconClick, [['Button', '/button']]],
  [
    'navigation',
    IconNavigation,
    [
      ['Tabs', '/tabs'],
      ['Breadcrumbs', '/breadcrumbs'],
    ],
  ],
  ['inputs', IconInput, [['TextInput', '/text-input']]],
  ['combobox', IconCombobox, []],
  ['feedback', IconNotification, []],
  ['overlays', IconOverlay, [['Tooltip', '/tooltip']]],
  ['typography', IconText, []],
  ['widgets', IconWidget, []],
];
export interface LeftBarProps {}

export const LeftBar: React.FC<Readonly<LeftBarProps>> = async () => {
  return (
    <div className='flex flex-col'>
      <LinkGroup className='p-[16px]' variant='mantine'>
        {routes.map((route) => (
          <Link
            key={route.label}
            href={route.href}
            className='h-[48px]'
            isActive
          >
            {route.label}
          </Link>
        ))}
      </LinkGroup>
      <Disclosure label='Components' className='p-[16px]' defaultExpanded>
        {componentRoutesByCategories.map(([category, Icon, components]) => (
          <LinkGroup
            variant='mantine'
            key={category}
            label={
              <>
                <Icon />
                <span className='ml-[10px] capitalize'>{category}</span>
              </>
            }
            labelProps={{ className: 'font-semibold text-xs' }}
            className='not-first:mt-[12px]'
          >
            {components.map(([label, href]) => (
              <Link key={label} href={href}>
                {label}
              </Link>
            ))}
          </LinkGroup>
        ))}
      </Disclosure>
    </div>
  );
};
