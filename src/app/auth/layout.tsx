import { ReactNode } from 'react';

import { AuthLayout as AuthLayoutComponent } from '../../components/layouts/auth-layout';

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return <AuthLayoutComponent>{children}</AuthLayoutComponent>;
};

export default AuthLayout;
