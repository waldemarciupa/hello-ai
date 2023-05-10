import ListItem from '@/components/ListItem';
import { List, Typography } from '@mui/material';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        <Typography>Tasks:</Typography>
        <List>
          <ListItem pathname='helloapi' />
          <ListItem pathname='moderation' />
          <ListItem pathname='inprompt' />
        </List>
      </main>
    </>
  );
}
