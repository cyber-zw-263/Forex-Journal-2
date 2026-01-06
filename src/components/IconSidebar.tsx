'use client';

import Link from 'next/link';
import { FiHome, FiBarChart2, FiCalendar, FiCheckSquare, FiZap, FiBookOpen } from 'react-icons/fi';
import { usePathname } from 'next/navigation';

const items = [
  { href: '/', label: 'Dashboard', icon: FiHome },
  { href: '/analytics', label: 'Analytics', icon: FiBarChart2 },
  { href: '/calendar', label: 'Calendar', icon: FiCalendar },
  { href: '/planning', label: 'Planning', icon: FiCheckSquare },
  { href: '/insights', label: 'Insights', icon: FiZap },
  { href: '/review', label: 'Review', icon: FiBookOpen },
];

export default function IconSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex flex-col gap-3 w-20 p-3 h-screen sticky top-0">
      <div className="flex items-center justify-center h-12 mb-3">
        <div className="w-10 h-10 rounded-lg btn-gradient flex items-center justify-center text-white shadow-md">YM</div>
      </div>

      <nav className="flex flex-col gap-2 items-center">
        {items.map((it) => {
          const ActiveIcon = it.icon;
          const isActive = pathname === it.href;
          return (
            <Link key={it.href} href={it.href} className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all ${isActive ? 'bg-gradient-to-r from-ym-blue to-ym-purple text-white shadow-lg' : 'glass text-gray-300 hover:bg-slate-800'}`} title={it.label}>
              <ActiveIcon className="w-5 h-5" />
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto text-xs text-gray-400 text-center">v0.1</div>
    </aside>
  );
}
