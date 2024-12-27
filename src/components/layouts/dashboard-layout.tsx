"use client";
import CoverImage from "components/ui/CoverImage";
import { Spinner } from "components/ui/spinner";
import { Home, ListVideo, LogOut, MessageCircleMore, MonitorPlay, Search, ThumbsUp, UserRound, UserRoundCheck } from "lucide-react";
import NextLink from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Suspense, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Tooltip, IconButton, MenuItem, Menu } from '@mui/material';
import { cn } from "utils/cn";
import Cookies from 'js-cookie';
import { getUser, logoutUser } from "features/userapi/get-users";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Link from "next/link";
import { verifyToken } from "utils/verifyToken";

type SideNavigationItem = {
  name: string;
  to: string;
  icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
};

const Logo = () => {
  return (
    // <Link className="flex items-center text-white" href="/">
    // <img className="h-8 w-auto" src="/logo.svg" alt="Workflow" />
    <span className="text-sm font-semibold text-white">Logo</span>
    // </Link>
  );
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('');
  const { data, error } = useQuery({ queryKey: ['currentUser'], queryFn: () => verifyToken(Cookies.get('accessToken') || "") })
  const { username } = data || {};
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const pathname = usePathname();
  const navigation = [
    { name: "Dashboard", to: "/", icon: Home },
    { name: "Subscriptions", to: "/subscriptions", icon: UserRoundCheck },
  ].filter(Boolean) as SideNavigationItem[];

  const youNavigation = [
    { name: "Playlists", to: "/playlists", icon: ListVideo },
    // { name: "Your videos", to: "/yourvideos", icon: MonitorPlay },
    // { name: "Liked videos", to: "/likedvideos", icon: ThumbsUp },
    // { name: "Tweets", to: "/tweets", icon: MessageCircleMore },
  ].filter(Boolean) as SideNavigationItem[];

  const handleSearchChange = (event: any) => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const userLogoutMutation = useMutation({
    mutationFn: logoutUser,
    onSuccess: (res: any) => {
      Cookies.remove('accessToken')
      handleClose()
      router.push("/auth/login")
      toast.success(res.message);
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  const { isLoading, isError, data: userData  , error: userError } = useQuery({
    queryKey: ['current-user'],
    queryFn: getUser,
  })

  if (isLoading) return <div><Spinner size='md' variant="light" /></div>;
  if (isError) return <div>Error: {userError instanceof Error ? userError.message : 'Unknown error'}</div>;
  // console.log("userData", userData?.data)
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-60 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 py-4">
          <div className="flex h-16 shrink-0 items-center px-4">
            <Logo />
          </div>
          {navigation?.map((item) => {
            const isActive = pathname === item.to;
            return (
              <NextLink key={item.name} href={item.to} className={cn(
                'text-gray-300 hover:bg-gray-700 hover:text-white',
                'group flex flex-1 w-full items-center rounded-md p-2 text-base font-medium gap-2',
                isActive && 'bg-gray-700 text-white',
              )}>
                <item.icon aria-hidden="true" />
                {item.name}
              </NextLink>
            );
          })}
          <p className='border-t border-text/50 w-full p-2 text-base font-medium gap-2 text-text'>You</p>
          {youNavigation?.map((item) => {
            const isActive = pathname === item.to;
            return (
              <NextLink key={item.name} href={item.to} className={cn(
                'text-gray-300 hover:bg-gray-700 hover:text-white',
                'group flex flex-1 w-full items-center rounded-md p-2 text-base font-medium gap-2',
                isActive && 'bg-gray-700 text-white',
              )}>
                <item.icon aria-hidden="true" />
                {item.name}
              </NextLink>
            );
          })}
        </nav>
      </aside>
      {/* -----header------ */}
      <div className="flex flex-col sm:pl-60 ">
        <header className="bg-background sticky top-0 z-30 flex h-14 items-center justify-between gap-4 p-4 sm:h-auto sm:justify-end shadow-[0_25px_34px_-23px_rgba(255,255,255,0.3)]">
          <form className="w-1/3 mx-auto" onSubmit={handleSubmit}>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-2 pointer-events-none">
                <Search className="w-6 h-6 text-gray-500" />
              </div>
              <input
                type="search"
                id="default-search"
                value={searchQuery}
                onChange={handleSearchChange}
                className="block w-full p-4 ps-10 pe-24 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none"
                placeholder="Search..."
                required
              />
              <button
                type="submit"
                className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Search
              </button>
            </div>
          </form>
          <Tooltip title="Profile" arrow>
            <IconButton onClick={handleClick}>
              <CoverImage
                src=""
                alt="Cover Image"
                userFirstName={userData?.data?.username}
                size="w-12 h-12"
                rounded="rounded-full"
              />
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            slotProps={{
              paper: {
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  backgroundColor: '#212121',
                  '& .MuiMenuItem-root': {
                    color: 'white',
                    '&:hover': {
                      backgroundColor: '#444',
                    },
                  },
                  '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem onClick={handleClose}>
              <UserRound className="me-2" />
              <Link href={`user/${username}`} replace>
                Your Profile
              </Link>
            </MenuItem>
            <MenuItem onClick={() => userLogoutMutation.mutate()}>
              <LogOut className="me-2" />
              Sign Out
            </MenuItem>
          </Menu>
        </header>

        <main className="h-[calc(100vh-96px)] bg-background flex items-start justify-between">
          {children}
        </main>
      </div>
    </div>
  );
};

export const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const pathname = usePathname();
  return (
    <Layout>
      <Suspense
        fallback={
          <div className="flex size-full items-center justify-center">
            <Spinner size="xl" />
          </div>
        }
      >
        <ErrorBoundary
          key={pathname}
          fallback={<div>Something went wrong!</div>}
        >
          {/* <AuthLoader
            renderLoading={() => (
              <div className="flex size-full items-center justify-center">
                <Spinner size="xl" />
              </div>
            )}
          >
            {children}
          </AuthLoader> */}
          {children}
        </ErrorBoundary>
      </Suspense>
    </Layout>
  );
};
