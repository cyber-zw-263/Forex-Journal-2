'use client';

import Link from 'next/link';
import { FiHome, FiBarChart2, FiCalendar, FiCheckSquare, FiZap, FiBookOpen, FiTarget, FiMenu, FiX, FiEdit, FiTrendingUp } from 'react-icons/fi';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const items = [
  { href: '/', label: 'Dashboard', icon: FiHome },
  { href: '/strategies', label: 'Strategies', icon: FiTarget },
  { href: '/analytics', label: 'Analytics', icon: FiBarChart2 },
  { href: '/advanced-analytics', label: 'Advanced Analytics', icon: FiTrendingUp },
  { href: '/calendar', label: 'Calendar', icon: FiCalendar },
  { href: '/planning', label: 'Planning', icon: FiCheckSquare },
  { href: '/insights', label: 'Insights', icon: FiZap },
  { href: '/review', label: 'Review', icon: FiBookOpen },
  { href: '/journal', label: 'Journal', icon: FiEdit },
];

export default function IconSidebar() {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        style={{
          flexDirection: 'column',
          gap: '10px',
          width: '64px',
          padding: '10px',
          height: '100vh',
          position: 'sticky',
          top: 0,
          backgroundColor: 'var(--background)',
          borderRight: '1px solid var(--panel-muted)',
        }}
        className="hidden md:flex"
        role="navigation"
        aria-label="Main navigation"
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '48px',
            marginBottom: '8px',
          }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(135deg, var(--purple-base) 0%, var(--purple-dark) 100%)',
              color: 'white',
              fontWeight: '700',
              fontSize: '14px',
              boxShadow: 'var(--shadow-floating)',
            }}
          >
            YM
          </div>
        </div>

        <nav style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
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
                aria-current={isActive ? 'page' : undefined}
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s ease',
                  background: isActive ? 'linear-gradient(135deg, var(--purple-base) 0%, rgba(139,92,246,0.12) 100%)' : 'transparent',
                  color: isActive ? 'white' : 'var(--neutral-color)',
                  border: isActive ? 'none' : `1px solid var(--card-border)`,
                  boxShadow: isActive ? '0 6px 18px rgba(139, 92, 246, 0.12)' : 'none',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'visible',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor = 'rgba(139,92,246,0.12)';
                    e.currentTarget.style.boxShadow = '0 6px 18px rgba(139,92,246,0.06)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor = 'var(--card-border)';
                    e.currentTarget.style.boxShadow = 'none';
                  }
                }}
              >
                {isActive && (
                  <span style={{
                    position: 'absolute',
                    left: '-8px',
                    width: '4px',
                    height: '24px',
                    borderRadius: '4px',
                    background: 'linear-gradient(180deg, var(--purple-base), var(--purple-dark))',
                  }} aria-hidden />
                )}
                <ActiveIcon style={{ width: '18px', height: '18px' }} />
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
            paddingBottom: '8px',
          }}
        >
          v0.1
        </div>
      </aside>

      {/* Mobile Toggle Button */}
      <button
        className="md:hidden"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        style={{
          position: 'fixed',
          bottom: '20px',
          left: '20px',
          zIndex: 40,
          width: '48px',
          height: '48px',
          borderRadius: '12px',
          backgroundColor: 'var(--purple-base)',
          border: 'none',
          color: 'white',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: 'var(--shadow-floating)',
        }}
        aria-label={isMobileOpen ? 'Close navigation' : 'Open navigation'}
      >
        {isMobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Mobile Sidebar */}
      {isMobileOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 30,
          }}
          onClick={() => setIsMobileOpen(false)}
        />
      )}
      
      <aside
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: '280px',
          height: '100%',
          backgroundColor: 'var(--background)',
          borderRight: '1px solid var(--panel-muted)',
          transform: isMobileOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.3s ease',
          zIndex: 35,
          padding: '20px',
          overflowY: 'auto',
        }}
        role="navigation"
        aria-label="Mobile navigation"
        aria-hidden={!isMobileOpen}
      >
        <div style={{ marginBottom: '30px' }}>
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(135deg, var(--purple-base) 0%, var(--purple-dark) 100%)',
              color: 'white',
              fontWeight: '700',
              fontSize: '14px',
            }}
          >
            YM
          </div>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {items.map((it) => {
            const ActiveIcon = it.icon;
            const isActive = pathname === it.href;
            return (
              <Link
                key={it.href}
                href={it.href}
                onClick={() => setIsMobileOpen(false)}
                aria-current={isActive ? 'page' : undefined}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 16px',
                  borderRadius: '10px',
                  backgroundColor: isActive ? 'linear-gradient(135deg, var(--purple-base) 0%, rgba(139,92,246,0.12) 100%)' : 'transparent',
                  color: isActive ? 'white' : 'var(--neutral-color)',
                  border: isActive ? 'none' : `1px solid var(--card-border)`,
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer',
                }}
              >
                <ActiveIcon style={{ width: '20px', height: '20px' }} />
                <span style={{ fontSize: '16px', fontWeight: '500' }}>{it.label}</span>
              </Link>
            );
          })}
        </nav>

        <div
          style={{
            marginTop: 'auto',
            paddingTop: '30px',
            borderTop: '1px solid var(--card-border)',
            fontSize: '12px',
            color: 'var(--neutral-color)',
            textAlign: 'center',
          }}
        >
          Young Money FX v0.1
        </div>
      </aside>
    </>
  );
}
