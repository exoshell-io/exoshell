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
import { MdInfoOutline } from 'react-icons/md';
import Markdown from 'react-markdown';
import { registerEmail } from './_db';
import { useMemo } from 'react';

const FAQ: { question: string; answer: string }[] = [
  {
    question: 'What does ExoShell provide?',
    answer: `
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
  freePlan: string;
  proPlan: string;
}[] = [
  {
    title: 'Desktop apps',
    tooltip: `Windows, Macos and Linux`,
    freePlan: '✅',
    proPlan: '✅',
  },
  {
    title: 'Mobile apps',
    tooltip: `Android and iOS`,
    freePlan: '✅',
    proPlan: '✅',
  },
  {
    title: 'Browser extensions',
    tooltip: `Webkit, Firefox and Chromium based browsers`,
    freePlan: '✅',
    proPlan: '✅',
  },
  {
    title: 'Docker images',
    tooltip: `Run anywhere with Docker`,
    freePlan: '✅',
    proPlan: '✅',
  },
  {
    title: 'Cloud hosting',
    tooltip: 'Automate your scripts in ExoShell cloud',
    freePlan: '✅ Limited free tier',
    proPlan: '✅ Unlimited pay as you use',
  },
];

export default function Page() {
  return (
    <>
      <Hero />
      <Faq />
      <Pricing />
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
        <h2 className='text-center text-5xl font-bold'>FAQs</h2>
        <Accordion multiple={true} chevronPosition='left' mt={36}>
          {FAQ.map((e) => (
            <AccordionItem key={e.question} value={e.question}>
              <AccordionControl>
                <Text fw='bold'>{e.question}</Text>
              </AccordionControl>
              <AccordionPanel>
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

const Pricing: React.FC = () => {
  return (
    <Box className='border-0 border-t border-solid border-gray-200'>
      <Container pt={8} pb={100}>
        <h2 className='text-center text-5xl'>Pricing</h2>
        <Table
          mt={60}
          highlightOnHover
          data={{
            head: [
              null,
              null,
              <b key={'free'}>Free forever</b>,
              <b key={'pro'}>Pro plan: 10$/month</b>,
            ],
            body: PRICING.map((feature) => [
              <b key={feature.title}>{feature.title}</b>,
              feature.tooltip && (
                <Tooltip
                  label={feature.tooltip}
                  events={{ hover: true, touch: true, focus: false }}
                >
                  <ActionIcon
                    variant='light'
                    radius={25}
                    color='blue'
                    size={20}
                  >
                    <MdInfoOutline />
                  </ActionIcon>
                </Tooltip>
              ),
              feature.freePlan,
              feature.proPlan,
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
      form.onSubmit(async (values) => {
        registerEmail(values.email);
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
        <Title>Subscribe to the waitlist</Title>
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
