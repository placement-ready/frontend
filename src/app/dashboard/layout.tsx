import Layout from '@/components/dashboard/DashboardLayout';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen bg-slate-50 font-sans dark:bg-slate-950">
      <Layout>{children}</Layout>
    </div>
  );
}
