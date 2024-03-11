import {
  Accordion,
  AccordionControl,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Container,
  Group,
  TextInput,
} from '@mantine/core';

const FAQ: { question: string; answer: string }[] = [
  {
    question: 'What does ExoShell provide?',
    answer: `ExoShell provides:
  - Desktop applications for Windows, Macos and Linux
  - Mobile applications for iOS and Android
  - Browser extensions for Firefox and Chromium based browsers`,
  },
];

export default function Page() {
  return (
    <>
      <Box h={600} ta='center' pt={164}>
        <Container>
          <p className='title'>ExoShell is a program to run other programs</p>
          <p className='subtitle' style={{ marginTop: 30 }}>
            Create bots and run them everywhere
          </p>
        </Container>
      </Box>
      <Box ta='center' py={100} bg='lightblue'>
        <Container>
          <p className='title'>Subscribe to get notified on release</p>
          <Group w={400} mx='auto' mt={30}>
            <TextInput placeholder='Email' style={{ flexGrow: 1 }} />
            <Button color='black'>Subscribe</Button>
          </Group>
        </Container>
      </Box>
      <Container py={32}>
        <p className='title'>FAQ</p>
        <Accordion multiple={true} chevronPosition='left'>
          {FAQ.map((e) => (
            <AccordionItem key={e.question} value={e.question}>
              <AccordionControl>{e.question}</AccordionControl>
              <AccordionPanel>{e.answer}</AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
      <Container>
        <p className='title'>PaaS Pricing</p>
      </Container>
      <Container>
        <p className='title'>Marketplace Pricing</p>
      </Container>
      <Container>
        <p className='title'>Contact</p>
        <TextInput placeholder='email' />
        <TextInput placeholder='Message' />
        <Button>Send</Button>
      </Container>
    </>
  );
}
