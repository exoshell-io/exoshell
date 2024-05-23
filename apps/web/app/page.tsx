'use client';

import {
  Accordion,
  AccordionControl,
  AccordionItem,
  AccordionPanel,
  ActionIcon,
  Box,
  Button,
  Container,
  Group,
  Title as MantineTitle,
  Skeleton,
  Table,
  Text,
  TextInput,
  Tooltip,
  TypographyStylesProvider,
} from '@mantine/core';
import { isEmail, useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useMemo } from 'react';
import { FaCheck as IconCheck } from 'react-icons/fa';
import Markdown from 'react-markdown';
import { registerEmail } from './_db/registerEmail';
import { IconQuestionCircle } from './_ui/icons';

const FAQ: { question: string; answer: string }[] = [
  {
    question: 'What does ExoShell provide?',
    answer: `
ExoShell provides a set of free and open-source tools:
- Desktop applications for Windows, Macos and Linux
- Mobile applications for iOS and Android
- Browser extensions for Firefox and Chromium based browsers`,
  },
  {
    question: 'What can I do once I started the ExoShell desktop app?',
    answer: `
You can start to schedule scripts, which we call bots. For example, you can:
- Scrap products from a website
- Scan a website
- Send emails to a mailing list`,
  },
  {
    question: 'Where can I run ExoShell scripts?',
    answer: `You can run ExoShell scripts locally or on remote environments where an ExoShell agent is setup. We provide a managed platform where you can run scripts all other the world on major clouds. We also provide a docker and kubernetes installation that you can use to run on your own cloud infrastructure.`,
  },
  {
    question: 'What are scripts?',
    answer: `Scripts are pieces of code that can be executed/scheduler locally or remotely, immediately or in the future.`,
  },
  {
    question: 'Do I need to code?',
    answer: `Not a all because developers can share their scripts through our official hub at https://exoshell.dev/hub.`,
  },
  {
    question:
      'What is the difference between running a script locally and remotely?',
    answer: `Running a script locally means the execution of the script will happen on your computer. Executing a script remotely means you trigger the execution of it on a remote environment, such as a cloud provider, or one of your devices, such as an Android phone.`,
  },
  {
    question: 'Is it free?',
    answer:
      'Yes, ExoShell applications are 100% open source and free to use. We provide a paid cloud platform for running your scripts all other the world in a resilient manner.',
  },
];

const PRICING: {
  title: string;
  tooltip?: string;
  freePlan: React.ReactNode;
  proPlan: React.ReactNode;
}[] = [
  {
    title: 'Desktop apps',
    tooltip: `Windows, Macos and Linux`,
    freePlan: <IconCheck className='text-emerald-400' />,
    proPlan: <IconCheck className='text-emerald-400' />,
  },
  {
    title: 'Mobile apps',
    tooltip: `Android and iOS`,
    freePlan: <IconCheck className='text-emerald-400' />,
    proPlan: <IconCheck className='text-emerald-400' />,
  },
  {
    title: 'Browser extensions',
    tooltip: `Webkit, Firefox and Chromium based browsers`,
    freePlan: <IconCheck className='text-emerald-400' />,
    proPlan: <IconCheck className='text-emerald-400' />,
  },
  {
    title: 'Docker images',
    tooltip: `Run anywhere with Docker`,
    freePlan: <IconCheck className='text-emerald-400' />,
    proPlan: <IconCheck className='text-emerald-400' />,
  },
  {
    title: 'Cloud hosting',
    tooltip: 'Automate your scripts in ExoShell cloud',
    freePlan: 'Free tier',
    proPlan: 'Pay as you use',
  },
];

export default function Page() {
  return (
    <>
      <Hero />
      <Faq />
      <Features />
      <Newsletter />
    </>
  );
}

const Hero: React.FC = () => {
  return (
    <Box h={600} ta='center' pt={30} pb={60}>
      <Container size='md'>
        <h1 className='mx-auto max-w-screen-sm text-3xl font-extrabold lg:text-5xl'>
          Use your computers like never before
        </h1>
        <Skeleton height={300} width='100%' mx='auto' mt={60} />
      </Container>
    </Box>
  );
};

const Faq: React.FC = () => {
  return (
    <Box
      bg='#fafafa'
      className='border-0 border-t border-solid border-gray-200'
    >
      <Container pt={8} pb={100} size='md'>
        <h2 className='text-center text-5xl font-bold'>FAQ</h2>
        <Accordion
          multiple={true}
          chevronPosition='left'
          mt={36}
          defaultValue={FAQ.map((e) => e.question)}
        >
          {FAQ.map((e) => (
            <AccordionItem key={e.question} value={e.question}>
              <AccordionControl>
                <Text fw='bold'>{e.question}</Text>
              </AccordionControl>
              <AccordionPanel pl={32}>
                <TypographyStylesProvider>
                  <Markdown>{e.answer}</Markdown>
                </TypographyStylesProvider>
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </Box>
  );
};

const Features: React.FC = () => {
  return (
    <Box className='border-0 border-t border-solid border-gray-200'>
      <Container pt={8} pb={100}>
        <h2 className='text-center text-5xl'>Features</h2>
        <Table
          mx='auto'
          mt={60}
          highlightOnHover
          horizontalSpacing='lg'
          withRowBorders={false}
          classNames={{
            table: '!border-separate border-spacing-x-6 border-spacing-y-0',
            td: 'border-0 border-t border-solid border-zinc-200',
          }}
          data={{
            head: [
              null,
              <p key={'free'} className='text-center'>
                Free
              </p>,
              <p key={'pro'} className='text-center'>
                Pro
              </p>,
            ],
            body: PRICING.map((feature) => [
              <Group key={feature.title} gap='sm' align='center'>
                <span className='font-semibold text-[#000000]'>
                  {feature.title}
                </span>
                <Tooltip
                  label={feature.tooltip}
                  events={{ hover: true, touch: true, focus: false }}
                  withArrow
                >
                  <ActionIcon variant='transparent' radius={25} size={15}>
                    <IconQuestionCircle className='text-zinc-300 hover:text-slate-400' />
                  </ActionIcon>
                </Tooltip>
              </Group>,
              <div key={feature.title} className='text-center capitalize'>
                {feature.freePlan}
              </div>,
              <div key={feature.title} className='text-center capitalize'>
                {feature.proPlan}
              </div>,
            ]),
          }}
        />
      </Container>
    </Box>
  );
};

const Newsletter: React.FC = () => {
  const form = useForm({
    initialValues: {
      email: '',
    },
    validate: {
      email: isEmail('Please enter a valid email'),
    },
  });
  const onSubmit = useMemo(
    () =>
      form.onSubmit(async ({ email }) => {
        const notificationId = notifications.show({
          title: 'Registering to the newsletter',
          message: email,
          loading: true,
          withCloseButton: false,
          autoClose: false,
          withBorder: true,
        });
        await registerEmail(email);
        notifications.update({
          id: notificationId,
          title: 'Successfully registered to the newsletter!',
          message: email,
          icon: <IconCheck className='text-emerald-400' />,
          loading: false,
          color: 'teal',
          withCloseButton: true,
        });
      }),
    [form],
  );
  return (
    <Box
      ta='center'
      py={100}
      className='border-0 border-t border-solid border-gray-200'
      bg='#fafafa'
    >
      <Container>
        <Title>Subscribe to the newsletter</Title>
        <form onSubmit={onSubmit}>
          <Group mx='auto' maw={600} mt={50} justify='stretch' align='stretch'>
            <TextInput
              placeholder='Email'
              style={{ flexGrow: 1 }}
              type='email'
              {...form.getInputProps('email')}
            />
            <Button type='submit' color='black'>
              Subscribe
            </Button>
          </Group>
        </form>
      </Container>
    </Box>
  );
};

const Title: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <MantineTitle ta='center' size={42}>
      {children}
    </MantineTitle>
  );
};
