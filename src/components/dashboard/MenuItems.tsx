import {
  Eye,
  LayoutDashboard,
  Clock,
  FileText,
  Flashlight,
  Archive,
  Airplay,
  User,
  BarChart3,
  Target,
  TrendingUp,
} from 'lucide-react';
import { SidebarConfig } from './Sidebar';

const menuItems: SidebarConfig = {
  logo: {
    src: '/logo.png',
    alt: 'HireMind Logo',
    title: 'HireMind',
  },
  showProfile: false,
  showLogout: false,
  menuItems: [
    {
      id: 'dashboard',
      name: 'Dashboard',
      icon: <LayoutDashboard />,
      type: 'heading',
      children: [
        {
          id: 'overview',
          name: 'Overview',
          icon: <Eye />,
          href: '/dashboard',
          type: 'link',
        },
      ],
    },
    {
      id: 'analytics',
      name: 'Analytics',
      icon: <BarChart3 />,
      type: 'heading',
      children: [
        {
          id: 'learning-dashboard',
          name: 'Learning Dashboard',
          icon: <LayoutDashboard />,
          href: '/dashboard/learning-dashboard',
          type: 'link',
        },
        {
          id: 'skill-progress',
          name: 'Skill Progress',
          icon: <TrendingUp />,
          href: '/dashboard/skill-progress',
          type: 'link',
        },
        {
          id: 'goal-tracking',
          name: 'Goal Tracking',
          icon: <Target />,
          href: '/dashboard/goal-tracking',
          type: 'link',
        },
      ],
    },
    {
      id: 'interview',
      name: 'Interview',
      icon: <Airplay />,
      type: 'heading',
      children: [
        {
          id: 'schedule-interview',
          name: 'Schedule Interview',
          icon: <Clock />,
          href: '/dashboard/interview/schedule',
          type: 'link',
        },
        {
          id: 'interview-results',
          name: 'Interview Results',
          icon: <Archive />,
          href: '/dashboard/interview/result',
          type: 'link',
        },
        {
          id: 'practice-questions',
          name: 'Practice Questions',
          icon: <FileText />,
          href: '/dashboard/interview/prepare',
          type: 'link',
        },
      ],
    },
    {
      id: 'resume-builder',
      name: 'Resume Builder',
      icon: <Flashlight />,
      type: 'heading',
      children: [
        {
          id: 'builder',
          name: 'Open Builder',
          icon: <User />,
          href: '/resume',
          type: 'link',
        },
      ],
    },
  ],
};

export default menuItems;
