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
  Skeleton,
  Stack,
  Table,
  TableTh,
  TableTr,
  Text,
  TextInput,
  Textarea,
  Tooltip,
  TypographyStylesProvider,
} from '@mantine/core';
import { isEmail, isNotEmpty, useForm } from '@mantine/form';
import { MdInfoOutline } from 'react-icons/md';
import Markdown from 'react-markdown';

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
      <Contact />
    </>
  );
}

const Hero: React.FC = () => {
  return (
    <Box h={600} ta='center' py={60}>
      <Container>
        <p className='title'>Use your devices like never before</p>
        <p className='subtitle' style={{ marginTop: 30 }}>
          Create bots and run them everywhere
        </p>
        <Skeleton height={300} width='100%' mx='auto' mt={60} />
      </Container>
    </Box>
  );
};

const Faq: React.FC = () => {
  return (
    <Container py={60}>
      <p className='title text-center'>FAQ</p>
      <Accordion multiple={true} chevronPosition='left' mt={60}>
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
  );
};

const Pricing: React.FC = () => {
  return (
    <Container py={60}>
      <p className='title text-center'>Pricing</p>
      <Table mt={60}>
        <TableTr>
          <TableTh></TableTh>
          <TableTh>
            <Text fw='bold'>Free forever</Text>
          </TableTh>
          <TableTh>
            <Text fw='bold'>Pro plan: 10$/month</Text>
          </TableTh>
        </TableTr>
        {PRICING.map((feature) => (
          <TableTr key={feature.title}>
            <TableTh>
              <Group>
                <Text fw='bold'>{feature.title}</Text>
                {feature.tooltip && (
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
                )}
              </Group>
            </TableTh>
            <td>{feature.freePlan}</td>
            <td>{feature.proPlan}</td>
          </TableTr>
        ))}
      </Table>
    </Container>
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
  return (
    <Box ta='center' py={60}>
      <Container>
        <p className='title'>Subscribe to the waitlist</p>
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
          <Group maw={500} mx='auto' mt={50} justify='stretch' align='stretch'>
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

const Contact: React.FC = () => {
  const form = useForm({
    initialValues: {
      email: '',
      message: '',
    },
    validate: {
      email: isEmail('Please enter a valid email'),
      message: isNotEmpty('Please enter a message'),
    },
  });
  return (
    <Container py={60}>
      <p className='title text-center'>Contact</p>
      <Text ta='center' fw={500} mt={24}>
        Have questions? Want to help? Send us a message!
      </Text>
      <Box mt={50} maw={600} mx='auto'>
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
          <Stack>
            <TextInput
              placeholder='Email'
              type='email'
              {...form.getInputProps('email')}
            />
            <Textarea
              placeholder='Message'
              autosize
              minRows={5}
              resize='vertical'
              {...form.getInputProps('message')}
            />
            <Button type='submit' color='black'>
              Send
            </Button>
          </Stack>
        </form>
      </Box>
    </Container>
  );
};
