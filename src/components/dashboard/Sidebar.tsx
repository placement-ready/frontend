'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';
import { authClient } from '@/lib/auth-client';

interface SidebarMenuItem {
  id: string;
  name: string;
  icon: React.ReactElement;
  href?: string;
  type: 'link' | 'heading';
  children?: SidebarMenuItem[];
  badge?: string | number;
  onClick?: () => void;
}

interface SidebarConfig {
  logo: { src: string; alt: string; title: string };
  menuItems: SidebarMenuItem[];
  showProfile?: boolean;
  showLogout?: boolean;
}

interface SidebarProps {
  config: SidebarConfig;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  className?: string;
}

export default function Sidebar({ config, isOpen, setIsOpen, className = '' }: SidebarProps) {
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (mobile) setIsOpen(false);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [setIsOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isMobile && isOpen) {
        const sidebar = document.getElementById('sidebar');
        if (sidebar && !sidebar.contains(e.target as Node)) setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobile, isOpen, setIsOpen]);

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push('/');
  };

  const isActive = (href: string) =>
    href === '/dashboard' ? pathname === '/dashboard' : pathname.startsWith(href);

  const getInitials = (name?: string | null) => {
    if (!name) return 'U';
    const parts = name.split(' ');
    return parts.length > 1 ? parts[0][0] + parts[1][0] : parts[0][0].toUpperCase();
  };

  const renderItem = (item: SidebarMenuItem) => {
    const active = item.href ? isActive(item.href) : false;
    const hasChildren = item.children && item.children.length > 0;

    if (item.type === 'heading' && hasChildren) {
      return (
        <li key={item.id} className="w-full">
          {isOpen && (
            <div className="mb-2 mt-4 px-3">
              <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <span className="text-emerald-600 dark:text-emerald-400">{item.icon}</span>
                {item.name}
              </span>
            </div>
          )}
          <ul className="space-y-1">{item.children?.map(renderItem)}</ul>
        </li>
      );
    }

    return (
      <li key={item.id} className="w-full px-2">
        {item.href ? (
          <Link
            href={item.href}
            onClick={() => isMobile && setIsOpen(false)}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              active ? 'bg-emerald-600 text-white shadow-sm' : 'text-foreground hover:bg-muted'
            } ${!isOpen ? 'justify-center' : ''}`}
          >
            <span className={active ? 'text-white' : 'text-emerald-600 dark:text-emerald-400'}>
              {item.icon}
            </span>
            {isOpen && <span className="truncate">{item.name}</span>}
            {isOpen && item.badge && (
              <span className="ml-auto rounded-full bg-emerald-100 px-2 py-0.5 text-xs text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300">
                {item.badge}
              </span>
            )}
          </Link>
        ) : (
          <button
            onClick={() => {
              item.onClick?.();
              if (isMobile) setIsOpen(false);
            }}
            className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted ${!isOpen ? 'justify-center' : ''}`}
          >
            <span className="text-emerald-600 dark:text-emerald-400">{item.icon}</span>
            {isOpen && <span className="truncate">{item.name}</span>}
          </button>
        )}
      </li>
    );
  };

  return (
    <>
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        id="sidebar"
        className={`
          ${isOpen ? 'w-60' : isMobile ? 'w-0 overflow-hidden' : 'w-16'}
          ${isMobile ? 'fixed' : 'sticky'}
          top-0 left-0 z-40 flex h-screen flex-col border-r border-border/50 bg-background transition-all duration-200
          ${className}
        `}
      >
        {/* Logo */}
        <div
          className={`flex h-16 items-center gap-3 border-b border-border/50 px-4 ${!isOpen && 'justify-center'}`}
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-600 shadow">
            <Image src={config.logo.src} alt={config.logo.alt} width={22} height={22} />
          </div>
          {isOpen && <span className="text-lg font-bold text-foreground">{config.logo.title}</span>}
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1">{config.menuItems.map(renderItem)}</ul>
        </nav>

        {/* Footer */}
        {(config.showProfile || config.showLogout) && (
          <div
            className={`border-t border-border/50 p-3 ${!isOpen && 'flex flex-col items-center gap-2'}`}
          >
            {config.showProfile && isOpen && (
              <Link
                href="/dashboard/profile"
                onClick={() => isMobile && setIsOpen(false)}
                className="mb-2 flex items-center gap-3 rounded-lg px-2 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-sm font-medium text-white">
                  {getInitials(user?.name)}
                </div>
                <div className="flex-1 truncate">
                  <p className="truncate font-semibold">{user?.name ?? 'User'}</p>
                </div>
              </Link>
            )}

            {config.showProfile && !isOpen && (
              <Link href="/dashboard/profile" onClick={() => isMobile && setIsOpen(false)}>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-sm font-medium text-white">
                  {getInitials(user?.name)}
                </div>
              </Link>
            )}

            {config.showLogout && (
              <button
                onClick={handleSignOut}
                className={`flex items-center gap-2 rounded-lg text-sm font-medium text-destructive transition-colors hover:bg-destructive/10 ${isOpen ? 'w-full px-3 py-2' : 'p-2'}`}
              >
                <LogOut className="h-4 w-4" />
                {isOpen && 'Sign out'}
              </button>
            )}
          </div>
        )}
      </aside>
    </>
  );
}

export type { SidebarMenuItem, SidebarConfig, SidebarProps };
