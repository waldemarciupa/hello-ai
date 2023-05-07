import React from 'react';
import { Inter } from 'next/font/google';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import styles from '@/styles/Home.module.css';

const inter = Inter({ subsets: ['latin'] });

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <main className={`${styles.main} ${inter.className}`}>{children}</main>
    </ThemeProvider>
  );
};
