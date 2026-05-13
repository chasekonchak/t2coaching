const NAV_LINKS = [
  { label: 'Programs', href: '#programs' },
  { label: 'About', href: '#about' },
  { label: 'Testimonials', href: '#testimonials' },
]

export default function Footer() {
  return (
    <footer style={{ background: '#0D2B3E', padding: '56px 0 32px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>

        {/* Main row */}
        <div
          className="footer-row"
          style={{
            display: 'flex', flexDirection: 'column',
            gap: 32, paddingBottom: 36,
            borderBottom: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
              background: 'linear-gradient(135deg, #7EC8E3, #1A6B8A)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ color: '#fff', fontWeight: 700, fontSize: 12 }}>T2</span>
            </div>
            <span style={{
              fontFamily: "'DM Serif Display', Georgia, serif",
              fontSize: 20, color: '#ffffff',
            }}>T2 Coaching</span>
          </div>

          {/* Nav links */}
          <nav style={{ display: 'flex', flexWrap: 'wrap', gap: '10px 32px' }}>
            {NAV_LINKS.map(l => (
              <a key={l.label} href={l.href} style={{
                fontSize: 14, color: 'rgba(255,255,255,0.46)',
                textDecoration: 'none', fontWeight: 400,
              }}>{l.label}</a>
            ))}
            <a
              href="https://t2coaching.com/calendar/"
              target="_blank" rel="noopener noreferrer"
              style={{ fontSize: 14, color: '#F5A623', textDecoration: 'none', fontWeight: 600 }}
            >Book a Call</a>
          </nav>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/t2coaching/"
            target="_blank" rel="noopener noreferrer"
            style={{
              display: 'flex', alignItems: 'center', gap: 10,
              color: 'rgba(255,255,255,0.46)', textDecoration: 'none',
            }}
          >
            <div style={{
              width: 36, height: 36, borderRadius: 8,
              border: '1px solid rgba(255,255,255,0.12)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </div>
            <span style={{ fontSize: 13 }}>@t2coaching</span>
          </a>
        </div>

        {/* Bottom row */}
        <div style={{
          display: 'flex', flexDirection: 'column',
          gap: 10, paddingTop: 28,
        }}>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.27)' }}>
            © {new Date().getFullYear()} T2 Coaching. All rights reserved.
          </p>
          <a
            href="https://t2coaching.com"
            target="_blank" rel="noopener noreferrer"
            style={{ fontSize: 13, color: 'rgba(255,255,255,0.27)', textDecoration: 'none' }}
          >t2coaching.com</a>
        </div>
      </div>
    </footer>
  )
}
