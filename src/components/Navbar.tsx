"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  DropdownRoot,
  DropdownTrigger,
  DropdownContent,
  DropdownMenu,
  DropdownItem,
} from "./ui/Dropdown";
import {
  SunIcon,
  BellIcon,
  ChartBarIcon,
  BookOpenIcon,
  HomeIcon,
  BoltIcon,
  BriefcaseIcon,
  MagnifyingGlassIcon,
  Bars3Icon,
  XMarkIcon,
  SparklesIcon,
  DocumentTextIcon,
  AcademicCapIcon,
  BuildingOfficeIcon,
  CalendarIcon,
  ArrowRightIcon,
  UserIcon,
  ArrowRightStartOnRectangleIcon,
  MoonIcon,
} from "@heroicons/react/24/outline";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useTheme } from "../providers/ThemeContext";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const userImage = user?.avatar || "/brain.png";

  const handleSignOut = async () => {
    try {
      await logout.mutate();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  useEffect(() => setMobileMenuOpen(false), [pathname]);

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", mobileMenuOpen);
    return () => document.body.classList.remove("overflow-hidden");
  }, [mobileMenuOpen]);

  const dropdownTriggerClass =
    "flex items-center gap-2 px-4 py-2.5 rounded-xl text-foreground hover:text-green-600 hover:bg-green-50/80 dark:hover:bg-slate-800 dark:hover:text-green-500 transition-all duration-200 group";

  return (
    <>
      <nav className="bg-background/90 dark:bg-background/90 backdrop-blur-lg shadow-sm border-b border-green-100/50 dark:border-slate-800/50 fixed top-0 w-full z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo + Brand */}
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-emerald-400 via-green-400 to-green-500 rounded-xl p-2.5 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 hover:rotate-3">
                <Image
                  src="/brain.png"
                  alt="Brain Logo"
                  width={24}
                  height={24}
                  className="object-contain cursor-pointer"
                />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-green-700 bg-clip-text text-transparent hover:from-green-700 hover:via-emerald-700 hover:to-green-800 transition-all duration-300 cursor-pointer">
                Hire<span className="text-emerald-600">Mind</span>
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-1">
              <Link
                href="/"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-foreground hover:text-green-600 hover:bg-green-50/80 dark:hover:bg-slate-800 dark:hover:text-green-500 transition-all duration-200 group"
              >
                <HomeIcon className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                <span className="font-medium">Home</span>
              </Link>
              <Link
                href="/dashboard/dsa"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-foreground hover:text-green-600 hover:bg-green-50/80 dark:hover:bg-slate-800 dark:hover:text-green-500 transition-all duration-200 group"
              >
                <ChartBarIcon className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                <span className="font-medium">Practice</span>
              </Link>
              <Link
                href="/dashboard/studyPlan"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-foreground hover:text-green-600 hover:bg-green-50/80 dark:hover:bg-slate-800 dark:hover:text-green-500 transition-all duration-200 group"
              >
                <BookOpenIcon className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                <span className="font-medium">Study Plan</span>
              </Link>

              {/* AI Tools Dropdown */}
              <DropdownRoot>
                <DropdownTrigger
                  icon={<BoltIcon className="h-5 w-5" />}
                  label="AI Tools"
                  className={dropdownTriggerClass}
                />
                <DropdownContent width="w-64">
                  <DropdownMenu>
                    <DropdownItem
                      icon={<SparklesIcon className="h-5 w-5" />}
                      label="Resume Builder"
                      description="AI-powered resume creation"
                      href="/dashboard/resume"
                    />
                    <DropdownItem
                      icon={<DocumentTextIcon className="h-5 w-5" />}
                      label="Cover Letter"
                      description="Generate personalized letters"
                      href="#"
                    />
                    <DropdownItem
                      icon={<AcademicCapIcon className="h-5 w-5" />}
                      label="Interview Prep"
                      description="AI interview simulation"
                      href="#"
                    />
                  </DropdownMenu>
                </DropdownContent>
              </DropdownRoot>

              {/* Job Tools Dropdown */}
              <DropdownRoot>
                <DropdownTrigger
                  icon={<BriefcaseIcon className="h-5 w-5" />}
                  label="Job Tools"
                  className={dropdownTriggerClass}
                />
                <DropdownContent width="w-64">
                  <DropdownMenu>
                    <DropdownItem
                      icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                      label="Job Search"
                      description="Find relevant opportunities"
                      href="#"
                    />
                    <DropdownItem
                      icon={<BuildingOfficeIcon className="h-5 w-5" />}
                      label="Company Research"
                      description="Deep dive into companies"
                      href="#"
                    />
                    <DropdownItem
                      icon={<CalendarIcon className="h-5 w-5" />}
                      label="Application Tracker"
                      description="Track your applications"
                      href="#"
                    />
                  </DropdownMenu>
                </DropdownContent>
              </DropdownRoot>
            </div>

            {/* Right Side Actions */}
            <div className="hidden md:flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <button className="p-2.5 hover:bg-green-50/80 dark:hover:bg-slate-800 rounded-xl transition-all duration-200 group hover:shadow-md">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-500 dark:text-gray-400 group-hover:text-green-600 dark:group-hover:text-green-500 group-hover:scale-110 transition-all duration-200" />
                </button>
                <button className="p-2.5 hover:bg-green-50/80 dark:hover:bg-slate-800 rounded-xl transition-all duration-200 group hover:shadow-md relative">
                  <BellIcon className="h-5 w-5 text-gray-500 dark:text-gray-400 group-hover:text-green-600 dark:group-hover:text-green-500 group-hover:scale-110 transition-all duration-200" />
                  <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-gradient-to-r from-red-400 to-red-500 rounded-full animate-pulse shadow-sm"></div>
                </button>

                {/* Theme Toggler */}
                <button
                  className="p-2.5 hover:bg-green-50/80 dark:hover:bg-slate-800 rounded-xl transition-all duration-200 group hover:shadow-md"
                  onClick={toggleTheme}
                >
                  {theme === "light" ? (
                    <SunIcon className="h-5 w-5 text-emerald-500 group-hover:text-emerald-600 group-hover:scale-110 group-hover:rotate-12 transition-all duration-200" />
                  ) : (
                    <MoonIcon className="h-5 w-5 text-gray-400 group-hover:text-green-500 group-hover:scale-110 group-hover:rotate-12 transition-all duration-200" />
                  )}
                </button>
              </div>

              {isAuthenticated ? (
                <DropdownRoot>
                  <DropdownTrigger
                    icon={
                      <span className="relative flex items-center">
                        <Image
                          src={userImage}
                          alt={user?.name || "User"}
                          width={32}
                          height={32}
                          className="rounded-full object-cover shadow"
                        />
                      </span>
                    }
                    label={user?.name || "User"}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105"
                  />
                  <DropdownContent width="w-64" position="right">
                    <DropdownMenu>
                      <DropdownItem
                        icon={<UserIcon className="h-5 w-5" />}
                        label="Profile"
                        href="/dashboard/profile"
                      />
                      <DropdownItem
                        icon={<ArrowRightStartOnRectangleIcon className="h-5 w-5" />}
                        label="Logout"
                        onClick={handleSignOut}
                      />
                    </DropdownMenu>
                  </DropdownContent>
                </DropdownRoot>
              ) : (
                <button
                  onClick={() => router.push("/dashboard")}
                  className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 group ml-2"
                >
                  <span>Get Started</span>
                  <ArrowRightIcon className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                </button>
              )}
            </div>

            {/* Mobile Hamburger */}
            <div className="lg:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 rounded-xl hover:bg-green-50/80 dark:hover:bg-slate-800 transition-all duration-200"
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-menu"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? (
                  <XMarkIcon className="h-6 w-6 text-foreground transform rotate-180 transition-transform duration-300" />
                ) : (
                  <Bars3Icon className="h-6 w-6 text-foreground hover:text-green-600 dark:hover:text-green-500 transition-colors duration-200" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="h-16" aria-hidden="true" />
    </>
  );
};

export default Navbar;
