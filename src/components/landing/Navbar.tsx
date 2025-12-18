'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  BadgeDollarSign,
  Home,
  X,
  BookOpenText,
  Play,
  Info,
  Menu,
  BrainCircuit,
  School,
  TrendingUp,
  SunMedium,
  LogOut,
  CircleUser,
  Moon,
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { useTheme } from '@/providers/ThemeContext';
import { authClient } from '@/lib/auth-client';
import {
  DropdownContent,
  DropdownItem,
  DropdownMenu,
  DropdownRoot,
  DropdownTrigger,
} from '../ui/Dropdown';

const primaryLinks = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/how-it-works', label: 'How It Works', icon: Play },
  { href: '/pricing', label: 'Pricing', icon: BadgeDollarSign },
  { href: '/about', label: 'About Us', icon: Info },
];

const featureLinks = [
  {
    href: '/features/learning-paths',
    label: 'Learning Paths',
    description: 'Structured learning journeys',
    icon: School,
  },
  {
    href: '/features/ai-mentor',
    label: 'AI Mentor',
    description: 'Personalized interview coaching',
    icon: BrainCircuit,
  },
  {
    href: '/features/progress-tracking',
    label: 'Progress Tracking',
    description: 'See where you stand at a glance',
    icon: TrendingUp,
  },
  {
    href: '/features/resource-library',
    label: 'Resource Library',
    description: 'Curated prep materials in one place',
    icon: BookOpenText,
  },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const isAuthenticated = !!user;
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const featuresActive = pathname.startsWith('/features');

  const handleSignOut = async () => {
    try {
      await authClient.signOut();
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.classList.toggle('overflow-hidden', mobileOpen);
    return () => document.body.classList.remove('overflow-hidden');
  }, [mobileOpen]);

  const renderDesktopLink = (link: (typeof primaryLinks)[number]) => {
    const Icon = link.icon;
    return (
      <Link
        key={link.href}
        href={link.href}
        className={cn(
          'group flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200',
          isActive(link.href)
            ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300'
            : 'text-gray-600 hover:bg-emerald-50 hover:text-emerald-700 dark:text-gray-200 dark:hover:bg-emerald-500/10 dark:hover:text-emerald-300',
        )}
      >
        <Icon className="h-5 w-5 transition-transform duration-200 group-hover:scale-105" />
        <span>{link.label}</span>
      </Link>
    );
  };

  const renderMobileLink = (link: (typeof primaryLinks)[number]) => {
    const Icon = link.icon;
    return (
      <Link
        key={link.href}
        href={link.href}
        onClick={() => setMobileOpen(false)}
        className={cn(
          'group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-colors duration-200',
          isActive(link.href)
            ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300'
            : 'text-gray-600 hover:bg-emerald-50 hover:text-emerald-700 dark:text-gray-200 dark:hover:bg-emerald-500/10 dark:hover:text-emerald-300',
        )}
      >
        <Icon className="h-5 w-5" />
        <span>{link.label}</span>
      </Link>
    );
  };

  return (
    <>
      <nav className="fixed top-0 z-50 w-full border-b border-emerald-200/50 bg-white/80 backdrop-blur-md shadow-sm transition-all duration-300 dark:border-emerald-500/20 dark:bg-gray-950/80">
        <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2" aria-label="HireMind home">
            <span className="flex h-10 w-10 items-center justify-center">
              <Image
                src="/logo.png"
                alt="HireMind"
                width={28}
                height={28}
                className="object-contain"
              />
            </span>
            <span className="text-lg font-semibold text-gray-900 transition dark:text-gray-100">
              Hire
              <span className="inline-block text-emerald-600 dark:text-emerald-400">Mind</span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-2">
            {renderDesktopLink(primaryLinks[0])}

            <DropdownRoot>
              <DropdownTrigger
                label="Features"
                icon={<BookOpenText className="h-5 w-5" />}
                className={cn(
                  'rounded-full px-4 py-2 text-sm font-medium',
                  featuresActive
                    ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300'
                    : 'text-gray-600 hover:bg-emerald-50 hover:text-emerald-700 dark:text-gray-200 dark:hover:bg-emerald-500/10 dark:hover:text-emerald-300',
                )}
              />
              <DropdownContent
                width="w-72"
                position="left"
                className="border border-emerald-200/60 bg-white/95 dark:border-emerald-500/20 dark:bg-gray-900/95"
              >
                <DropdownMenu>
                  {featureLinks.map((item) => {
                    const Icon = item.icon;
                    return (
                      <DropdownItem
                        key={item.href}
                        href={item.href}
                        className="hover:bg-emerald-50 hover:text-emerald-700 dark:hover:bg-emerald-500/10 dark:hover:text-emerald-300"
                      >
                        <Icon className="h-5 w-5 text-emerald-600 dark:text-emerald-300" />
                        <div className="flex-1">
                          <div className="font-medium text-gray-800 dark:text-gray-100">
                            {item.label}
                          </div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {item.description}
                          </p>
                        </div>
                      </DropdownItem>
                    );
                  })}
                </DropdownMenu>
              </DropdownContent>
            </DropdownRoot>

            {primaryLinks.slice(1).map(renderDesktopLink)}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button
              type="button"
              onClick={toggleTheme}
              className="rounded-full border border-emerald-200 p-2.5 text-gray-600 transition hover:border-emerald-400 hover:text-emerald-700 dark:border-emerald-500/30 dark:text-gray-300 dark:hover:border-emerald-400 dark:hover:text-emerald-300"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Moon className="h-5 w-5" /> : <SunMedium className="h-5 w-5" />}
            </button>

            {isAuthenticated ? (
              <DropdownRoot>
                <DropdownTrigger
                  showChevron={false}
                  className="rounded-full border border-emerald-200 px-2 py-1 text-sm font-medium text-emerald-700 transition hover:border-emerald-400 dark:border-emerald-500/30 dark:text-emerald-300 dark:hover:border-emerald-300"
                >
                  <span className="flex items-center gap-2">
                    <Image
                      src={user?.image || '/user-icon.svg'}
                      alt={user?.name || 'Profile Image'}
                      width={28}
                      height={28}
                      className="rounded-full object-cover ring-2 ring-emerald-500/50"
                    />
                    <span className="max-w-30 truncate">{user?.name || 'Profile'}</span>
                  </span>
                </DropdownTrigger>
                <DropdownContent
                  width="w-56"
                  position="right"
                  className="border border-emerald-200/60 bg-white/95 dark:border-emerald-500/20 dark:bg-gray-900/95"
                >
                  <DropdownMenu>
                    <DropdownItem
                      href="/dashboard/profile"
                      className="hover:bg-emerald-50 hover:text-emerald-700 dark:hover:bg-emerald-500/10 dark:hover:text-emerald-300"
                    >
                      <CircleUser className="h-5 w-5" />
                      <span>Profile</span>
                    </DropdownItem>
                    <DropdownItem
                      onClick={handleSignOut}
                      className="hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-500/10 dark:hover:text-red-300"
                    >
                      <LogOut className="h-5 w-5" />
                      <span>Sign out</span>
                    </DropdownItem>
                  </DropdownMenu>
                </DropdownContent>
              </DropdownRoot>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/auth/login"
                  className="rounded-full border border-emerald-200 px-4 py-2 text-sm font-medium text-emerald-700 transition hover:border-emerald-400 hover:text-emerald-800 dark:border-emerald-500/30 dark:text-emerald-300 dark:hover:border-emerald-300 dark:hover:text-emerald-200"
                >
                  Log in
                </Link>
                <Link
                  href="/auth/signup"
                  className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-emerald-500 dark:bg-emerald-500 dark:hover:bg-emerald-400"
                >
                  Create account
                </Link>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="md:hidden rounded-full border border-emerald-200 p-2.5 text-gray-600 transition hover:border-emerald-400 hover:text-emerald-700 dark:border-emerald-500/30 dark:text-gray-200 dark:hover:border-emerald-400 dark:hover:text-emerald-300"
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <div
        id="mobile-navigation"
        className={cn(
          'fixed inset-x-0 top-16 z-40 h-[calc(100vh-4rem)] overflow-y-auto border-t border-emerald-200/50 bg-white/95 backdrop-blur-md transition-transform duration-300 dark:border-emerald-500/20 dark:bg-gray-950/95 md:hidden',
          mobileOpen ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        <div className="mx-auto flex h-full max-w-6xl flex-col gap-4 px-4 py-6 sm:px-6">
          {isAuthenticated ? (
            <div className="rounded-2xl border border-emerald-200/70 bg-emerald-50/70 p-5 dark:border-emerald-500/20 dark:bg-emerald-500/10">
              <div className="flex items-center gap-3">
                <Image
                  src={user?.image || '/user-icon.svg'}
                  alt={user?.name || 'Profile Image'}
                  width={48}
                  height={48}
                  className="rounded-full object-cover ring-2 ring-emerald-500/50"
                />
                <div>
                  <p className="text-base font-semibold text-gray-900 dark:text-gray-100">
                    {user?.name || 'Welcome back'}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{user?.email}</p>
                </div>
              </div>
              <div className="mt-4 flex flex-col gap-2">
                <Link
                  href="/dashboard/profile"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl border border-emerald-200 px-4 py-2 text-sm font-medium text-emerald-700 transition hover:border-emerald-400 hover:text-emerald-800 dark:border-emerald-500/30 dark:text-emerald-300 dark:hover:border-emerald-300 dark:hover:text-emerald-200"
                >
                  Profile
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    handleSignOut();
                  }}
                  className="rounded-xl border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition hover:border-red-300 hover:text-red-700 dark:border-red-500/20 dark:text-red-300 dark:hover:border-red-400 dark:hover:text-red-200"
                >
                  Sign out
                </button>
              </div>
            </div>
          ) : null}

          <div className="flex flex-col gap-2">{primaryLinks.map(renderMobileLink)}</div>

          <div className="space-y-2 rounded-2xl border border-emerald-200/50 p-4 dark:border-emerald-500/20">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
              Features
            </h3>
            <div className="space-y-1">
              {featureLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-gray-600 transition hover:bg-emerald-50 hover:text-emerald-700 dark:text-gray-200 dark:hover:bg-emerald-500/10 dark:hover:text-emerald-300"
                  >
                    <Icon className="h-4 w-4" />
                    <div>
                      <p className="font-medium">{item.label}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{item.description}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {!isAuthenticated ? (
            <div className="flex flex-col gap-2">
              <Link
                href="/auth/login"
                onClick={() => setMobileOpen(false)}
                className="rounded-2xl border border-emerald-200 px-4 py-3 text-center text-sm font-medium text-emerald-700 transition hover:border-emerald-400 hover:text-emerald-800 dark:border-emerald-500/30 dark:text-emerald-300 dark:hover:border-emerald-300 dark:hover:text-emerald-200"
              >
                Log in
              </Link>
              <Link
                href="/auth/signup"
                onClick={() => setMobileOpen(false)}
                className="rounded-2xl bg-emerald-600 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-emerald-700 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-emerald-500 dark:bg-emerald-500 dark:hover:bg-emerald-400"
              >
                Create account
              </Link>
            </div>
          ) : null}

          <div className="mt-auto flex items-center justify-between rounded-2xl border border-emerald-200/50 p-3 text-sm text-gray-500 dark:border-emerald-500/20 dark:text-gray-400">
            <span>Theme</span>
            <button
              type="button"
              onClick={toggleTheme}
              className="rounded-full border border-emerald-200 p-2 text-gray-600 transition hover:border-emerald-400 hover:text-emerald-700 dark:border-emerald-500/30 dark:text-gray-300 dark:hover:border-emerald-400 dark:hover:text-emerald-300"
            >
              {theme === 'dark' ? <Moon className="h-4 w-4" /> : <SunMedium className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>

      <div className="h-16" aria-hidden="true" />
    </>
  );
};

export default Navbar;
