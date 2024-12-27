import { ReactNode } from 'react';
import { AppProvider } from './provider';
import '../styles/globals.css';
import { Toaster } from 'react-hot-toast';
import { DashboardLayout } from 'components/layouts/dashboard-layout';

export const metadata = {
  title: 'Video App',
  description: 'Showcasing Best Practices For Building React Applications',
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <AppProvider>
          {children}
        </AppProvider>
        <Toaster position="top-right"
          reverseOrder={false} />
      </body>
    </html>
  );
};

export default RootLayout;