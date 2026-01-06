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
    <aside
      style={{
        display: 'none',
        flexDirection: 'column',
        gap: '12px',
        width: '80px',
        padding: '12px',
        height: '100vh',
        position: 'sticky',
        top: 0,
        backgroundColor: 'var(--card-bg)',
        borderRight: '1px solid var(--card-border)',
        '@media (min-width: 768px)': {
          display: 'flex',
        },
      } as any}
      className="hidden md:flex"
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '48px',
          marginBottom: '12px',
        }}
      >
        <div
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, var(--purple-base) 0%, var(--purple-dark) 100%)',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '14px',
            boxShadow: '0 4px 15px rgba(139, 92, 246, 0.4)',
          }}
        >
          YM
        </div>
      </div>

      <nav style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        alignItems: 'center',
        flex: 1,
      }}>
        {items.map((it) => {
          const ActiveIcon = it.icon;
          const isActive = pathname === it.href;
          return (
            <Link
              key={it.href}
              href={it.href}
              title={it.label}
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease',
                background: isActive
                  ? 'linear-gradient(135deg, var(--purple-base) 0%, var(--purple-dark) 100%)'
                  : 'transparent',
                color: isActive ? 'white' : 'var(--purple-light)',
                border: isActive ? 'none' : `1px solid var(--card-border)`,
                boxShadow: isActive ? '0 4px 15px rgba(139, 92, 246, 0.3)' : 'none',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.borderColor = 'var(--purple-base)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(139, 92, 246, 0.15)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.borderColor = 'var(--card-border)';
                  e.currentTarget.style.boxShadow = 'none';
                }
              }}
            >
              <ActiveIcon style={{ width: '20px', height: '20px' }} />
            </Link>
          );
        })}
      </nav>

      <div
        style={{
          marginTop: 'auto',
          fontSize: '12px',
          color: 'var(--neutral-color)',
          textAlign: 'center',
          paddingBottom: '12px',
        }}
      >
        v0.1
      </div>
    </aside>
  );
}
