'use client';

import { Spinner } from 'components/ui/spinner';
import { usePathname } from 'next/navigation';
import { ReactNode, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';


type LayoutProps = {
  children: ReactNode;
};

export const AuthLayout = ({ children }: LayoutProps) => {
  const pathname = usePathname();
  return (
    <Suspense
      fallback={
        <div className="flex size-full items-center justify-center">
          <Spinner size="xl" />
        </div>
      }
    >
      <ErrorBoundary key={pathname} fallback={<div>Something went wrong!</div>}>
        <div className="flex min-h-screen flex-col justify-center bg-background py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            {/* <div className="flex justify-center">
              <Link className="flex items-center text-white" href="/">
                <img className="h-24 w-auto" src="/logo.svg" alt="Workflow" />
              </Link>
              <p>Auth-Layout</p>
            </div> */}
          </div>

          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg">
            {/* <div className="bg-white shadow sm:rounded-lg"> */}
            {children}
            {/* </div> */}
          </div>
        </div>
      </ErrorBoundary>
    </Suspense>
  );
};
