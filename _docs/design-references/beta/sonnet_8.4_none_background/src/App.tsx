import { useState, useEffect, useRef } from 'react'

/* ─── Theme Hook ─────────────────────────────────────────────────────────── */
function useTheme() {
  const [dark, setDark] = useState(false)
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])
  return { dark, setDark }
}

/* ─── Intersection Observer Hook ─────────────────────────────────────────── */
function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    if (!ref.current) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(ref.current)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

/* ─── Section wrapper with scroll reveal ─────────────────────────────────── */
function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode, delay?: number, className?: string }) {
  const { ref, visible } = useInView()
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.55s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.55s cubic-bezier(0.16,1,0.3,1) ${delay}ms`
      }}
    >
      {children}
    </div>
  )
}

/* ─── SVG Icon set ───────────────────────────────────────────────────────── */
const Icons = {
  Sun: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
    </svg>
  ),
  Moon: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  ),
  Check: ({ size = 14 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
  Arrow: ({ dir = 'right' }: { dir?: string }) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      style={{ transform: dir === 'up' ? 'rotate(-90deg)' : dir === 'down' ? 'rotate(90deg)' : dir === 'left' ? 'rotate(180deg)' : '' }}>
      <path d="M5 12h14M12 5l7 7-7 7"/>
    </svg>
  ),
  Leaf: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
    </svg>
  ),
  Chart: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
    </svg>
  ),
  Zap: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  ),
  Target: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
    </svg>
  ),
  User: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
    </svg>
  ),
  X: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  ),
  Info: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
    </svg>
  ),
  Plus: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
    </svg>
  ),
  Minus: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <line x1="5" y1="12" x2="19" y2="12"/>
    </svg>
  ),
  Bell: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
    </svg>
  ),
  Grid: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
    </svg>
  ),
  Flame: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>
    </svg>
  ),
  Droplet: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
    </svg>
  ),
  TrendUp: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
    </svg>
  ),
  Shield: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  ),
}

/* ─── Nav ────────────────────────────────────────────────────────────────── */
function Nav({ dark, setDark }: { dark: boolean, setDark: (v: boolean) => void }) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <nav style={{
      position: 'fixed',
      top: 0, left: 0, right: 0,
      zIndex: 999,
      padding: '0 var(--space-6)',
      height: '60px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      background: scrolled ? 'var(--surface-base)' : 'transparent',
      borderBottom: scrolled ? '1px solid var(--surface-border-faint)' : '1px solid transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      transition: 'background 0.3s ease, border-color 0.3s ease, backdrop-filter 0.3s ease',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
        <div style={{
          width: 28, height: 28,
          background: 'var(--accent)',
          borderRadius: 'var(--radius-sm)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L4 8v8l8 6 8-6V8z" fill="var(--kd-black)" fillOpacity="0.9"/>
            <path d="M12 8v8M8 10l4-2 4 2" stroke="var(--kd-black)" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>
        <span style={{ fontWeight: 700, fontSize: '0.9375rem', letterSpacing: '-0.025em', color: 'var(--text-primary)' }}>
          Khroma<span style={{ color: 'var(--accent)' }}>Diet</span>
        </span>
        <span className="kd-badge kd-badge-accent" style={{ marginLeft: 4 }}>Design System v1</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-6)' }}>
        {['Tokens', 'Typography', 'Components', 'Motion', 'Dashboard'].map((item) => (
          <a key={item} href={`#${item.toLowerCase()}`} className="kd-nav-link" style={{ display: 'none' }}
            onMouseEnter={e => { (e.target as HTMLElement).style.color = 'var(--text-primary)' }}
            onMouseLeave={e => { (e.target as HTMLElement).style.color = 'var(--text-tertiary)' }}>
            {item}
          </a>
        ))}
        <button
          onClick={() => setDark(!dark)}
          className="kd-btn-icon"
          aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
          style={{ color: dark ? 'var(--accent)' : 'var(--text-secondary)' }}
        >
          {dark ? <Icons.Sun /> : <Icons.Moon />}
        </button>
      </div>
    </nav>
  )
}

/* ─── Ticker banner ──────────────────────────────────────────────────────── */
function Ticker() {
  const items = [
    'Neo-Brutalismo Clean', '·', 'Presença tipográfica forte', '·', 'Contraste com convicção',
    '·', 'Motion com intenção', '·', 'Produto real', '·', 'Nutrição premium', '·',
    'Light & Dark nativo', '·', 'Acessibilidade desde a origem', '·', 'KhromaDiet v1', '·',
  ]
  const repeated = [...items, ...items]
  return (
    <div style={{
      borderTop: '2px solid var(--surface-border)',
      borderBottom: '2px solid var(--surface-border)',
      background: 'var(--surface-base)',
      overflow: 'hidden',
      padding: '10px 0',
    }}>
      <div className="kd-ticker-inner" style={{ display: 'flex', gap: 'var(--space-6)' }}>
        {repeated.map((item, i) => (
          <span key={i} style={{
            fontSize: '0.8125rem',
            fontWeight: 600,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            color: item === '·' ? 'var(--accent)' : 'var(--text-secondary)',
            whiteSpace: 'nowrap',
          }}>{item}</span>
        ))}
      </div>
    </div>
  )
}

/* ─── Hero Section ───────────────────────────────────────────────────────── */
function HeroSection() {
  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '120px var(--space-6) var(--space-24)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background grid */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `
          linear-gradient(var(--surface-border-faint) 1px, transparent 1px),
          linear-gradient(90deg, var(--surface-border-faint) 1px, transparent 1px)
        `,
        backgroundSize: '64px 64px',
        opacity: 0.6,
        pointerEvents: 'none',
      }} />

      {/* Accent glow */}
      <div style={{
        position: 'absolute',
        top: '20%', right: '-10%',
        width: '60vw', height: '60vw',
        background: 'radial-gradient(circle, rgba(29,219,106,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="kd-container" style={{ position: 'relative' }}>
        {/* Tag */}
        <div className="kd-animate-fade-up" style={{ marginBottom: 'var(--space-8)' }}>
          <span className="kd-label-sm" style={{ color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 20, height: 2, background: 'var(--accent)', display: 'inline-block', borderRadius: 1 }} />
            Fundação Visual Oficial
          </span>
        </div>

        {/* Headline */}
        <div className="kd-animate-fade-up kd-delay-1">
          <h1 className="kd-display-2xl" style={{ color: 'var(--text-primary)', marginBottom: 'var(--space-6)', maxWidth: '14ch' }}>
            A linguagem que o{' '}
            <span className="kd-gradient-text">KhromaDiet</span>{' '}
            fala.
          </h1>
        </div>

        {/* Sub */}
        <div className="kd-animate-fade-up kd-delay-2">
          <p className="kd-body-lg" style={{
            color: 'var(--text-secondary)',
            maxWidth: '52ch',
            marginBottom: 'var(--space-12)',
          }}>
            Sistema de design completo, maduro e coeso. Cada token, cada componente, 
            cada estado de interação — definidos com precisão industrial e acabamento de produto excelente.
          </p>
        </div>

        {/* CTA row */}
        <div className="kd-animate-fade-up kd-delay-3" style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap', alignItems: 'center' }}>
          <button className="kd-btn-primary kd-btn-primary-lg">
            Explorar o sistema <Icons.Arrow />
          </button>
          <button className="kd-btn-ghost" style={{ padding: '17px 24px', borderRadius: 'var(--radius-lg)' }}>
            Ver tokens
          </button>
        </div>

        {/* Stats row */}
        <div className="kd-animate-fade-up kd-delay-5" style={{
          display: 'flex',
          gap: 'var(--space-12)',
          marginTop: 'var(--space-20)',
          paddingTop: 'var(--space-10)',
          borderTop: '1px solid var(--surface-border-faint)',
          flexWrap: 'wrap',
        }}>
          {[
            { num: '14', label: 'Etapas de formulário', sub: 'Form system' },
            { num: '60+', label: 'Componentes documentados', sub: 'Component library' },
            { num: '2', label: 'Modos nativos', sub: 'Light & Dark' },
            { num: '∞', label: 'Escalabilidade', sub: 'Token-driven' },
          ].map((s, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
              <span className="kd-mono-lg" style={{ color: 'var(--text-primary)' }}>{s.num}</span>
              <span className="kd-body-sm" style={{ color: 'var(--text-secondary)' }}>{s.label}</span>
              <span className="kd-label-sm" style={{ color: 'var(--text-tertiary)' }}>{s.sub}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Principles Section ─────────────────────────────────────────────────── */
function PrinciplesSection() {
  const principles = [
    {
      num: '01',
      title: 'Estrutura com convicção',
      body: 'Cada elemento carrega peso visual deliberado. Borders não são decoração — são arquitetura. O sistema pensa em blocos sólidos antes de qualquer ornamento.',
      icon: <Icons.Shield />,
    },
    {
      num: '02',
      title: 'Tipografia como coração',
      body: 'Escala, ritmo e tracking são o primeiro movimento de design. A fonte é a voz do produto. Cada tamanho, cada peso tem justificativa funcional e hierárquica.',
      icon: <Icons.Target />,
    },
    {
      num: '03',
      title: 'Paleta restrita, máxima força',
      body: 'Branco, preto, verde. Sofisticação vem de contraste, temperatura e transparência — nunca de proliferação cromática. A restrição é uma decisão criativa, não uma limitação.',
      icon: <Icons.Leaf />,
    },
    {
      num: '04',
      title: 'Motion com intenção',
      body: 'Nenhuma animação existe sem propósito. Entradas coreografadas comunicam hierarquia. Microinterações confirmam estado. O sistema sabe se mover — e sabe quando parar.',
      icon: <Icons.Zap />,
    },
    {
      num: '05',
      title: 'Densidade sparse por padrão',
      body: 'Respiro generoso é confiança clínica. O espaço vazio não é desperdiçado — é o que torna cada elemento legível, digno e premium em qualquer contexto.',
      icon: <Icons.Grid />,
    },
    {
      num: '06',
      title: 'Acessibilidade desde a origem',
      body: 'Contraste, foco, estados e semântica não são camada posterior. São parte da fundação. O sistema é usável por todos, sem comprometer a expressão visual.',
      icon: <Icons.User />,
    },
  ]

  return (
    <section className="kd-section" id="principles">
      <div className="kd-container">
        <Reveal>
          <div style={{ marginBottom: 'var(--space-16)' }}>
            <span className="kd-label-sm" style={{ color: 'var(--accent)', display: 'block', marginBottom: 'var(--space-4)' }}>
              Princípios visuais
            </span>
            <h2 className="kd-display-lg" style={{ color: 'var(--text-primary)', maxWidth: '16ch' }}>
              O que define cada decisão deste sistema.
            </h2>
          </div>
        </Reveal>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: 'var(--space-4)',
        }}>
          {principles.map((p, i) => (
            <Reveal key={i} delay={i * 60}>
              <div className="kd-block kd-card-lift" style={{
                padding: 'var(--space-8)',
                background: 'var(--surface-base)',
                height: '100%',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-6)' }}>
                  <div className="kd-icon-circle" style={{ color: 'var(--accent)' }}>
                    {p.icon}
                  </div>
                  <span className="kd-mono" style={{ color: 'var(--text-tertiary)', fontSize: '0.75rem' }}>{p.num}</span>
                </div>
                <h3 className="kd-heading-md" style={{ color: 'var(--text-primary)', marginBottom: 'var(--space-3)' }}>
                  {p.title}
                </h3>
                <p className="kd-body-sm" style={{ color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                  {p.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Color Tokens Section ───────────────────────────────────────────────── */
function ColorSection() {
  const swatches = [
    { label: 'Black', value: '#080808', token: '--kd-black', text: '#ffffff' },
    { label: 'Green', value: '#1DDB6A', token: '--kd-green', text: '#080808' },
    { label: 'Green Dim', value: '#14A34E', token: '--kd-green-dim', text: '#ffffff' },
    { label: 'White', value: '#F8F8F6', token: '--surface-bg', text: '#080808', border: true },
    { label: 'Surface', value: '#F2F2EF', token: '--surface-overlay', text: '#080808', border: true },
    { label: 'Sunken', value: '#EBEBEA', token: '--surface-sunken', text: '#080808', border: true },
    { label: 'Border Sub', value: '#E0E0DC', token: '--surface-border-sub', text: '#080808', border: true },
    { label: 'Tertiary', value: '#767676', token: '--text-tertiary', text: '#ffffff' },
    { label: 'Green Glow', value: 'rgba(29,219,106,0.18)', token: '--kd-green-glow', text: '#080808', border: true },
  ]

  return (
    <section className="kd-section" id="tokens" style={{ background: 'var(--surface-base)' }}>
      <div className="kd-container">
        <Reveal>
          <div style={{ marginBottom: 'var(--space-16)' }}>
            <span className="kd-label-sm" style={{ color: 'var(--accent)', display: 'block', marginBottom: 'var(--space-4)' }}>
              Tokens de cor
            </span>
            <h2 className="kd-display-lg" style={{ color: 'var(--text-primary)' }}>
              Paleta restrita.<br />Máxima força.
            </h2>
            <p className="kd-body-lg" style={{ color: 'var(--text-secondary)', maxWidth: '48ch', marginTop: 'var(--space-4)' }}>
              Três primitivos. O sistema inteiro nasce de branco, preto e verde. 
              Sofisticação vem de contraste e temperatura, não proliferação.
            </p>
          </div>
        </Reveal>

        {/* Primary 3 */}
        <Reveal delay={60}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 'var(--space-4)',
            marginBottom: 'var(--space-8)',
          }}>
            {[
              { label: 'Preto Abissal', value: '#080808', token: '--kd-black', desc: 'Texto primário, bordas, estrutura', text: '#F4F4F4' },
              { label: 'Verde Vivo', value: '#1DDB6A', token: '--kd-green', desc: 'CTAs, foco, progresso, energia', text: '#080808' },
              { label: 'Branco Clínico', value: '#F8F8F6', token: '--surface-bg', desc: 'Base, superfície, respiro', text: '#0A0A0A', border: true },
            ].map((s, i) => (
              <div key={i} style={{
                background: s.value,
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--space-8)',
                border: s.border ? '2px solid var(--surface-border-sub)' : 'none',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: 200,
                cursor: 'default',
                transition: 'transform 0.2s ease',
              }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-4px)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
              >
                <div>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: s.text, opacity: 0.5, marginBottom: 4 }}>{s.token}</p>
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1.125rem', fontWeight: 700, color: s.text, letterSpacing: '-0.02em' }}>{s.label}</p>
                </div>
                <div>
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8125rem', color: s.text, opacity: 0.6, marginBottom: 6 }}>{s.desc}</p>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.875rem', color: s.text, fontWeight: 500 }}>{s.value}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Secondary swatches */}
        <Reveal delay={120}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
            gap: 'var(--space-3)',
          }}>
            {swatches.map((s, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                <div className="kd-swatch" style={{
                  background: s.value,
                  border: s.border ? '1px solid var(--surface-border-sub)' : '1px solid transparent',
                  minHeight: 72,
                }} />
                <div>
                  <p style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>{s.label}</p>
                  <p className="kd-mono" style={{ color: 'var(--text-tertiary)', fontSize: '0.6875rem' }}>{s.value}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Dark mode palette preview */}
        <Reveal delay={180}>
          <div style={{
            marginTop: 'var(--space-12)',
            background: '#080808',
            borderRadius: 'var(--radius-xl)',
            padding: 'var(--space-10)',
            border: '2px solid #1E1E1E',
          }}>
            <p className="kd-label-sm" style={{ color: '#666', marginBottom: 'var(--space-6)' }}>Dark Mode — Paleta nativa</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: 'var(--space-3)' }}>
              {[
                { label: 'BG', value: '#080808' },
                { label: 'Base', value: '#0F0F0F' },
                { label: 'Raised', value: '#161616' },
                { label: 'Overlay', value: '#1E1E1E' },
                { label: 'Border', value: '#2A2A2A' },
                { label: 'Tertiary', value: '#666666' },
                { label: 'Secondary', value: '#ADADAD' },
                { label: 'Primary', value: '#F4F4F4' },
                { label: 'Accent', value: '#1DDB6A' },
              ].map((s, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <div style={{
                    background: s.value,
                    borderRadius: 8,
                    height: 56,
                    border: '1px solid #1C1C1C',
                  }} />
                  <p style={{ fontSize: '0.6875rem', fontWeight: 600, color: '#666', letterSpacing: '0.03em', textTransform: 'uppercase' }}>{s.label}</p>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#444' }}>{s.value}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ─── Typography Section ─────────────────────────────────────────────────── */
function TypographySection() {
  const scale = [
    { cls: 'kd-display-2xl', label: 'Display 2XL', size: '7rem → 3.5rem', weight: '800', tracking: '-0.04em', usage: 'Hero headline' },
    { cls: 'kd-display-xl', label: 'Display XL', size: '5rem → 2.5rem', weight: '800', tracking: '-0.035em', usage: 'Section hero' },
    { cls: 'kd-display-lg', label: 'Display LG', size: '3.5rem → 2rem', weight: '700', tracking: '-0.03em', usage: 'Section title' },
    { cls: 'kd-heading-xl', label: 'Heading XL', size: '2.5rem → 1.5rem', weight: '700', tracking: '-0.025em', usage: 'Card hero' },
    { cls: 'kd-heading-lg', label: 'Heading LG', size: '1.875rem → 1.25rem', weight: '600', tracking: '-0.02em', usage: 'Module title' },
    { cls: 'kd-heading-md', label: 'Heading MD', size: '1.25rem', weight: '600', tracking: '-0.015em', usage: 'Component title' },
    { cls: 'kd-heading-sm', label: 'Heading SM', size: '1rem', weight: '600', tracking: '-0.01em', usage: 'Label heading' },
  ]

  return (
    <section className="kd-section" id="typography">
      <div className="kd-container">
        <Reveal>
          <div style={{ marginBottom: 'var(--space-16)' }}>
            <span className="kd-label-sm" style={{ color: 'var(--accent)', display: 'block', marginBottom: 'var(--space-4)' }}>
              Sistema tipográfico
            </span>
            <h2 className="kd-display-lg" style={{ color: 'var(--text-primary)' }}>
              Tipografia como<br />coração do sistema.
            </h2>
          </div>
        </Reveal>

        {/* Type specimen */}
        <Reveal delay={60}>
          <div className="kd-block" style={{
            background: 'var(--surface-base)',
            padding: 'var(--space-10)',
            marginBottom: 'var(--space-8)',
          }}>
            <p className="kd-label-sm" style={{ color: 'var(--text-tertiary)', marginBottom: 'var(--space-8)' }}>
              DM Sans — Fonte primária
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
              {scale.map((s, i) => (
                <div key={i} style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  justifyContent: 'space-between',
                  gap: 'var(--space-6)',
                  padding: 'var(--space-4) 0',
                  borderBottom: i < scale.length - 1 ? '1px solid var(--surface-border-faint)' : 'none',
                  flexWrap: 'wrap',
                }}>
                  <span className={s.cls} style={{ color: 'var(--text-primary)', flexShrink: 0 }}>
                    {s.label === 'Display 2XL' ? 'Nutrição.' :
                      s.label === 'Display XL' ? 'Precisão.' :
                        s.label === 'Display LG' ? 'Resultados.' :
                          s.label === 'Heading XL' ? 'Personalizado' :
                            s.label === 'Heading LG' ? 'Seu perfil completo' :
                              s.label === 'Heading MD' ? 'Metas semanais' :
                                'Calorias diárias'}
                  </span>
                  <div style={{ display: 'flex', gap: 'var(--space-6)', flexShrink: 0, alignItems: 'flex-start' }}>
                    <span className="kd-mono" style={{ color: 'var(--text-tertiary)', fontSize: '0.75rem', textAlign: 'right' }}>
                      {s.size}
                    </span>
                    <span className="kd-badge kd-badge-neutral">{s.usage}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Body text + Mono */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
          <Reveal delay={80}>
            <div className="kd-block" style={{ background: 'var(--surface-base)', padding: 'var(--space-8)' }}>
              <p className="kd-label-sm" style={{ color: 'var(--text-tertiary)', marginBottom: 'var(--space-5)' }}>Body — DM Sans Regular</p>
              <p className="kd-body-lg" style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-4)' }}>
                O sistema KhromaDiet processa seu perfil nutricional para gerar recomendações 
                altamente personalizadas. Cada macro é calculado com precisão baseada em dados reais.
              </p>
              <p className="kd-body-md" style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-3)' }}>
                Acompanhe seu progresso em tempo real. Ajuste metas conforme sua evolução e 
                receba insights acionáveis toda semana.
              </p>
              <p className="kd-body-sm" style={{ color: 'var(--text-tertiary)' }}>
                Dados sincronizados automaticamente. Histórico completo disponível a qualquer momento.
                Privacidade garantida por design.
              </p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="kd-block" style={{ background: 'var(--surface-base)', padding: 'var(--space-8)' }}>
              <p className="kd-label-sm" style={{ color: 'var(--text-tertiary)', marginBottom: 'var(--space-5)' }}>Mono — DM Mono</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                <div>
                  <span className="kd-mono-lg" style={{ color: 'var(--text-primary)' }}>2,847</span>
                  <span className="kd-body-sm" style={{ color: 'var(--text-tertiary)', marginLeft: 8 }}>kcal / dia</span>
                </div>
                <div className="kd-divider" />
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-4)' }}>
                  {[
                    { label: 'Proteína', val: '185g' },
                    { label: 'Carbo', val: '310g' },
                    { label: 'Gordura', val: '78g' },
                  ].map((m, i) => (
                    <div key={i}>
                      <p className="kd-mono" style={{ color: 'var(--text-primary)', fontWeight: 500, fontSize: '1.25rem' }}>{m.val}</p>
                      <p className="kd-label-sm" style={{ color: 'var(--text-tertiary)', fontSize: '0.6875rem' }}>{m.label}</p>
                    </div>
                  ))}
                </div>
                <div className="kd-divider" />
                <div>
                  <p className="kd-label-sm" style={{ color: 'var(--text-tertiary)', marginBottom: 'var(--space-2)' }}>Labels — Uppercase tracked</p>
                  <p className="kd-label-lg" style={{ color: 'var(--text-secondary)' }}>Plano Ativo · Semana 3</p>
                  <p className="kd-label-sm" style={{ color: 'var(--text-tertiary)', marginTop: 4 }}>Próxima revisão em 4 dias</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ─── Spacing & Grid Section ─────────────────────────────────────────────── */
function SpacingSection() {
  const spaces = [
    { token: '--space-1', px: '4px', label: 'XS' },
    { token: '--space-2', px: '8px', label: 'SM' },
    { token: '--space-3', px: '12px', label: '' },
    { token: '--space-4', px: '16px', label: 'Base' },
    { token: '--space-5', px: '20px', label: '' },
    { token: '--space-6', px: '24px', label: 'MD' },
    { token: '--space-8', px: '32px', label: 'LG' },
    { token: '--space-10', px: '40px', label: 'XL' },
    { token: '--space-12', px: '48px', label: '2XL' },
    { token: '--space-16', px: '64px', label: '3XL' },
    { token: '--space-20', px: '80px', label: '4XL' },
    { token: '--space-24', px: '96px', label: '5XL' },
  ]

  const radii = [
    { token: '--radius-xs', val: '4px', label: 'XS' },
    { token: '--radius-sm', val: '8px', label: 'SM' },
    { token: '--radius-md', val: '12px', label: 'MD' },
    { token: '--radius-lg', val: '16px', label: 'LG' },
    { token: '--radius-xl', val: '24px', label: 'XL' },
    { token: '--radius-2xl', val: '32px', label: '2XL' },
    { token: '--radius-full', val: '9999px', label: 'Full' },
  ]

  return (
    <section className="kd-section" style={{ background: 'var(--surface-base)' }} id="tokens">
      <div className="kd-container">
        <Reveal>
          <span className="kd-label-sm" style={{ color: 'var(--accent)', display: 'block', marginBottom: 'var(--space-4)' }}>
            Spacing & Border Radius
          </span>
          <h2 className="kd-display-lg" style={{ color: 'var(--text-primary)', marginBottom: 'var(--space-16)' }}>
            Estrutura matemática.<br />Densidade sparse.
          </h2>
        </Reveal>

        {/* Spacing scale */}
        <Reveal delay={60}>
          <div className="kd-block" style={{ background: 'var(--surface-base)', padding: 'var(--space-8)', marginBottom: 'var(--space-8)' }}>
            <p className="kd-label-sm" style={{ color: 'var(--text-tertiary)', marginBottom: 'var(--space-6)' }}>Escala de espaçamento</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              {spaces.map((s, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
                  <div style={{
                    width: s.px,
                    height: 20,
                    background: 'var(--accent-subtle)',
                    border: '1px solid var(--accent-border)',
                    borderRadius: 2,
                    flexShrink: 0,
                    minWidth: 4,
                    transition: 'width 0.3s ease',
                  }} />
                  <span className="kd-mono" style={{ color: 'var(--text-secondary)', minWidth: 48 }}>{s.px}</span>
                  <span className="kd-mono" style={{ color: 'var(--text-tertiary)', fontSize: '0.75rem' }}>{s.token}</span>
                  {s.label && <span className="kd-badge kd-badge-accent">{s.label}</span>}
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Radii */}
        <Reveal delay={120}>
          <div className="kd-block" style={{ background: 'var(--surface-base)', padding: 'var(--space-8)' }}>
            <p className="kd-label-sm" style={{ color: 'var(--text-tertiary)', marginBottom: 'var(--space-6)' }}>Border radius scale</p>
            <div style={{ display: 'flex', gap: 'var(--space-6)', flexWrap: 'wrap', alignItems: 'flex-end' }}>
              {radii.map((r, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-3)' }}>
                  <div style={{
                    width: 60, height: 60,
                    background: 'var(--surface-overlay)',
                    border: '2px solid var(--surface-border-sub)',
                    borderRadius: r.val,
                    transition: 'border-radius 0.3s ease',
                  }} />
                  <span className="kd-mono" style={{ color: 'var(--text-tertiary)', fontSize: '0.6875rem', textAlign: 'center' }}>{r.val}</span>
                  <span className="kd-label-sm" style={{ color: 'var(--text-secondary)', fontSize: '0.65rem' }}>{r.label}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ─── Elevation & Shadows ────────────────────────────────────────────────── */
function ElevationSection() {
  const elevations = [
    { token: '--shadow-xs', label: 'Elevation 0', usage: 'Subtle lift, pressed states', css: '0 1px 2px rgba(10,10,10,0.06)' },
    { token: '--shadow-sm', label: 'Elevation 1', usage: 'Cards, inputs, badges', css: '0 2px 8px rgba(10,10,10,0.08)' },
    { token: '--shadow-md', label: 'Elevation 2', usage: 'Popovers, dropdowns', css: '0 4px 20px rgba(10,10,10,0.10)' },
    { token: '--shadow-lg', label: 'Elevation 3', usage: 'Modals, sheets', css: '0 12px 40px rgba(10,10,10,0.14)' },
    { token: '--shadow-xl', label: 'Elevation 4', usage: 'Full overlays, dialogs', css: '0 24px 64px rgba(10,10,10,0.18)' },
    { token: '--shadow-accent', label: 'Accent Focus', usage: 'Focus rings, active CTA', css: '0 0 0 3px accent-border' },
  ]

  return (
    <section className="kd-section">
      <div className="kd-container">
        <Reveal>
          <span className="kd-label-sm" style={{ color: 'var(--accent)', display: 'block', marginBottom: 'var(--space-4)' }}>
            Elevação & Superfícies
          </span>
          <h2 className="kd-display-lg" style={{ color: 'var(--text-primary)', marginBottom: 'var(--space-16)' }}>
            Profundidade com<br />intenção material.
          </h2>
        </Reveal>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 'var(--space-6)',
        }}>
          {elevations.map((e, i) => (
            <Reveal key={i} delay={i * 50}>
              <div style={{
                background: 'var(--surface-base)',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--space-8)',
                boxShadow: `var(${e.token})`,
                border: '1px solid var(--surface-border-faint)',
                transition: 'transform 0.2s ease',
                cursor: 'default',
              }}
                onMouseEnter={ev => (ev.currentTarget.style.transform = 'translateY(-3px)')}
                onMouseLeave={ev => (ev.currentTarget.style.transform = 'translateY(0)')}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
                  <span className="kd-heading-sm" style={{ color: 'var(--text-primary)' }}>{e.label}</span>
                  <span className="kd-badge kd-badge-neutral">{i === 5 ? 'focus' : `z-${i}`}</span>
                </div>
                <p className="kd-body-sm" style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-4)' }}>{e.usage}</p>
                <p className="kd-mono" style={{ color: 'var(--text-tertiary)', fontSize: '0.6875rem' }}>{e.token}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Buttons Section ────────────────────────────────────────────────────── */
function ButtonsSection() {
  const [loading, setLoading] = useState(false)

  return (
    <section className="kd-section" style={{ background: 'var(--surface-base)' }} id="components">
      <div className="kd-container">
        <Reveal>
          <span className="kd-label-sm" style={{ color: 'var(--accent)', display: 'block', marginBottom: 'var(--space-4)' }}>
            Botões & CTAs
          </span>
          <h2 className="kd-display-lg" style={{ color: 'var(--text-primary)', marginBottom: 'var(--space-16)' }}>
            Ações com peso<br />e precisão.
          </h2>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
          {/* Primary variants */}
          <Reveal delay={60}>
            <div className="kd-block" style={{ background: 'var(--surface-base)', padding: 'var(--space-8)' }}>
              <p className="kd-label-sm" style={{ color: 'var(--text-tertiary)', marginBottom: 'var(--space-6)' }}>
                Primary CTA — Hierarquia máxima
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', alignItems: 'flex-start' }}>
                <button className="kd-btn-primary kd-btn-primary-lg">
                  Começar agora <Icons.Arrow />
                </button>
                <button className="kd-btn-primary">
                  Continuar <Icons.Arrow />
                </button>
                <button className="kd-btn-primary" style={{ padding: '10px 20px', fontSize: '0.875rem', borderRadius: 'var(--radius-md)' }}>
                  Salvar progresso
                </button>
                <button className="kd-btn-primary" disabled style={{ opacity: 0.4, cursor: 'not-allowed', transform: 'none', boxShadow: 'none' }}>
                  Desabilitado
                </button>
                <button
                  className="kd-btn-primary"
                  onClick={() => { setLoading(true); setTimeout(() => setLoading(false), 2000) }}
                  style={{ minWidth: 140, justifyContent: 'center' }}
                >
                  {loading ? <><div className="kd-spinner" style={{ width: 16, height: 16, borderColor: 'rgba(0,0,0,0.2)', borderTopColor: '#080808' }} />Carregando</> : <>Confirmar</>}
                </button>
              </div>
            </div>
          </Reveal>

          {/* Secondary variants */}
          <Reveal delay={100}>
            <div className="kd-block" style={{ background: 'var(--surface-base)', padding: 'var(--space-8)' }}>
              <p className="kd-label-sm" style={{ color: 'var(--text-tertiary)', marginBottom: 'var(--space-6)' }}>
                Secundários, ícone & danger
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', alignItems: 'flex-start' }}>
                <button className="kd-btn-ghost">
                  <Icons.Chart /> Ver relatório
                </button>
                <button className="kd-btn-ghost" style={{ borderRadius: 'var(--radius-full)' }}>
                  <Icons.User /> Meu perfil
                </button>
                <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                  <button className="kd-btn-icon"><Icons.Plus /></button>
                  <button className="kd-btn-icon"><Icons.Minus /></button>
                  <button className="kd-btn-icon" style={{ position: 'relative' }}>
                    <Icons.Bell />
                    <span className="kd-notif-dot" />
                  </button>
                  <button className="kd-btn-icon"><Icons.Grid /></button>
                </div>
                <button className="kd-btn-danger">
                  <Icons.X /> Cancelar plano
                </button>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '11px 20px',
                  border: '2px solid var(--surface-border)',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--text-primary)',
                  color: 'var(--text-inverse)',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.9375rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  letterSpacing: '-0.01em',
                }}>
                  Inverse solid
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Full width CTA showcase */}
        <Reveal delay={140}>
          <div style={{
            marginTop: 'var(--space-8)',
            background: 'var(--kd-black)',
            borderRadius: 'var(--radius-xl)',
            padding: 'var(--space-12) var(--space-10)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 'var(--space-8)',
            flexWrap: 'wrap',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute',
              top: -40, right: -40,
              width: 200, height: 200,
              background: 'radial-gradient(circle, rgba(29,219,106,0.15) 0%, transparent 70%)',
              pointerEvents: 'none',
            }} />
            <div>
              <p className="kd-label-sm" style={{ color: 'var(--accent)', marginBottom: 'var(--space-3)' }}>CTA em contexto escuro</p>
              <p className="kd-heading-lg" style={{ color: '#F4F4F4', marginBottom: 'var(--space-2)' }}>
                Pronto para começar?
              </p>
              <p className="kd-body-sm" style={{ color: '#666' }}>
                Seu plano nutricional personalizado em menos de 5 minutos.
              </p>
            </div>
            <button className="kd-btn-primary kd-btn-primary-lg kd-pulse-accent">
              Criar meu plano <Icons.Arrow />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ─── Form Components Section ────────────────────────────────────────────── */
function FormSection() {
  const [val, setVal] = useState('')
  const [sliderVal, setSliderVal] = useState(65)
  const [toggle1, setToggle1] = useState(true)
  const [toggle2, setToggle2] = useState(false)
  const [step, setStep] = useState(3)
  const [selected, setSelected] = useState<string[]>(['Perda de peso'])
  const goals = ['Perda de peso', 'Ganho muscular', 'Manutenção', 'Performance', 'Saúde geral', 'Recomposição']

  return (
    <section className="kd-section" id="form">
      <div className="kd-container">
        <Reveal>
          <span className="kd-label-sm" style={{ color: 'var(--accent)', display: 'block', marginBottom: 'var(--space-4)' }}>
            Componentes de formulário
          </span>
          <h2 className="kd-display-lg" style={{ color: 'var(--text-primary)', marginBottom: 'var(--space-4)' }}>
            14 etapas. Zero atrito.
          </h2>
          <p className="kd-body-lg" style={{ color: 'var(--text-secondary)', maxWidth: '48ch', marginBottom: 'var(--space-16)' }}>
            Cada componente de input é projetado para coleta precisa de dados com máxima clareza e conforto tátil.
          </p>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
          {/* Inputs */}
          <Reveal delay={60}>
            <div className="kd-block" style={{ background: 'var(--surface-base)', padding: 'var(--space-8)' }}>
              <p className="kd-label-sm" style={{ color: 'var(--text-tertiary)', marginBottom: 'var(--space-6)' }}>
                Text inputs & Select
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
                <div>
                  <label className="kd-label-sm" style={{ color: 'var(--text-secondary)', display: 'block', marginBottom: 'var(--space-2)' }}>
                    Peso atual
                  </label>
                  <input
                    className="kd-input"
                    type="number"
                    placeholder="Ex: 78.5"
                    value={val}
                    onChange={e => setVal(e.target.value)}
                  />
                  <p className="kd-body-sm" style={{ color: 'var(--text-tertiary)', marginTop: 6 }}>Em quilogramas (kg)</p>
                </div>
                <div>
                  <label className="kd-label-sm" style={{ color: 'var(--text-secondary)', display: 'block', marginBottom: 'var(--space-2)' }}>
                    Email
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input className="kd-input success" type="email" defaultValue="ana@kroma.ai" readOnly />
                    <span style={{
                      position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
                      color: 'var(--accent)', display: 'flex',
                    }}>
                      <Icons.Check size={16} />
                    </span>
                  </div>
                </div>
                <div>
                  <label className="kd-label-sm" style={{ color: 'var(--text-secondary)', display: 'block', marginBottom: 'var(--space-2)' }}>
                    Senha
                  </label>
                  <input className="kd-input error" type="password" defaultValue="pass" readOnly />
                  <p className="kd-body-sm" style={{ color: '#FF4444', marginTop: 6, display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Icons.Info /> Mínimo 8 caracteres com número
                  </p>
                </div>
                <div>
                  <label className="kd-label-sm" style={{ color: 'var(--text-secondary)', display: 'block', marginBottom: 'var(--space-2)' }}>
                    Objetivo principal
                  </label>
                  <select className="kd-select">
                    <option>Perda de peso</option>
                    <option>Ganho muscular</option>
                    <option>Manutenção</option>
                  </select>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Controls */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <Reveal delay={80}>
              <div className="kd-block" style={{ background: 'var(--surface-base)', padding: 'var(--space-8)' }}>
                <p className="kd-label-sm" style={{ color: 'var(--text-tertiary)', marginBottom: 'var(--space-6)' }}>
                  Toggles & Slider
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
                  {[
                    { label: 'Notificações de refeição', sub: 'Lembretes personalizados', state: toggle1, set: setToggle1 },
                    { label: 'Modo macros avançado', sub: 'Micronutrientes e fibras', state: toggle2, set: setToggle2 },
                  ].map((t, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
                      <div>
                        <p className="kd-body-sm" style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{t.label}</p>
                        <p className="kd-body-sm" style={{ color: 'var(--text-tertiary)' }}>{t.sub}</p>
                      </div>
                      <button
                        className={`kd-toggle ${t.state ? 'active' : ''}`}
                        onClick={() => t.set(!t.state)}
                        role="switch"
                        aria-checked={t.state}
                      />
                    </div>
                  ))}
                  <div className="kd-divider" />
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-3)' }}>
                      <label className="kd-label-sm" style={{ color: 'var(--text-secondary)' }}>Nível de atividade</label>
                      <span className="kd-mono" style={{ color: 'var(--accent)', fontWeight: 500 }}>{sliderVal}%</span>
                    </div>
                    <input
                      type="range" className="kd-slider"
                      min={0} max={100} value={sliderVal}
                      onChange={e => setSliderVal(Number(e.target.value))}
                      style={{ '--progress-width': `${sliderVal}%` } as React.CSSProperties}
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
                      <span className="kd-label-sm" style={{ color: 'var(--text-tertiary)' }}>Sedentário</span>
                      <span className="kd-label-sm" style={{ color: 'var(--text-tertiary)' }}>Atleta</span>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="kd-block" style={{ background: 'var(--surface-base)', padding: 'var(--space-6)' }}>
                <p className="kd-label-sm" style={{ color: 'var(--text-tertiary)', marginBottom: 'var(--space-4)' }}>Tag selection — Múltipla escolha</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                  {goals.map(g => (
                    <button
                      key={g}
                      className={`kd-tag ${selected.includes(g) ? 'selected' : ''}`}
                      onClick={() => setSelected(prev =>
                        prev.includes(g) ? prev.filter(x => x !== g) : [...prev, g]
                      )}
                    >
                      {selected.includes(g) && <span style={{ color: 'var(--accent)' }}><Icons.Check size={12} /></span>}
                      {g}
                    </button>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Stepper */}
        <Reveal delay={140}>
          <div className="kd-block" style={{
            background: 'var(--surface-base)',
            padding: 'var(--space-8)',
            marginTop: 'var(--space-4)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)' }}>
              <p className="kd-label-sm" style={{ color: 'var(--text-tertiary)' }}>Form stepper — 14 etapas</p>
              <span className="kd-mono" style={{ color: 'var(--text-tertiary)', fontSize: '0.75rem' }}>
                Etapa {step} / 14
              </span>
            </div>
            {/* Progress */}
            <div className="kd-progress-bar" style={{ marginBottom: 'var(--space-6)' }}>
              <div className="kd-progress-fill" style={{ '--progress-width': `${(step / 14) * 100}%` } as React.CSSProperties} />
            </div>
            {/* Dots */}
            <div style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'center', marginBottom: 'var(--space-8)' }}>
              {Array.from({ length: 14 }, (_, i) => (
                <button
                  key={i}
                  className={`kd-step-dot ${i + 1 === step ? 'active' : i + 1 < step ? 'done' : ''}`}
                  onClick={() => setStep(i + 1)}
                />
              ))}
            </div>
            {/* Nav */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button
                className="kd-btn-ghost"
                onClick={() => setStep(Math.max(1, step - 1))}
                disabled={step === 1}
                style={{ opacity: step === 1 ? 0.4 : 1 }}
              >
                <Icons.Arrow dir="left" /> Anterior
              </button>
              <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                {[step - 1, step, step + 1].filter(n => n >= 1 && n <= 14).map(n => (
                  <button key={n} onClick={() => setStep(n)} style={{
                    width: 36, height: 36, borderRadius: 'var(--radius-sm)',
                    border: n === step ? '2px solid var(--accent)' : '2px solid var(--surface-border-sub)',
                    background: n === step ? 'var(--accent-subtle)' : 'transparent',
                    color: n === step ? 'var(--accent)' : 'var(--text-secondary)',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 500,
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                  }}>{n}</button>
                ))}
              </div>
              <button
                className="kd-btn-primary"
                onClick={() => setStep(Math.min(14, step + 1))}
                disabled={step === 14}
                style={{ opacity: step === 14 ? 0.4 : 1 }}
              >
                Próxima <Icons.Arrow />
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ─── Badges & Feedback ──────────────────────────────────────────────────── */
function BadgesSection() {
  return (
    <section className="kd-section" style={{ background: 'var(--surface-base)' }}>
      <div className="kd-container">
        <Reveal>
          <span className="kd-label-sm" style={{ color: 'var(--accent)', display: 'block', marginBottom: 'var(--space-4)' }}>
            Badges, estados & feedback
          </span>
          <h2 className="kd-display-lg" style={{ color: 'var(--text-primary)', marginBottom: 'var(--space-16)' }}>
            Comunicação de<br />estado com clareza.
          </h2>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 'var(--space-4)' }}>

          {/* Badges */}
          <Reveal delay={60}>
            <div className="kd-block" style={{ background: 'var(--surface-base)', padding: 'var(--space-8)' }}>
              <p className="kd-label-sm" style={{ color: 'var(--text-tertiary)', marginBottom: 'var(--space-6)' }}>Badge variants</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                <span className="kd-badge kd-badge-accent"><span style={{ width: 6, height: 6, background: 'var(--accent)', borderRadius: '50%', display: 'inline-block' }} />Ativo</span>
                <span className="kd-badge kd-badge-neutral">Padrão</span>
                <span className="kd-badge kd-badge-inverse">Premium</span>
                <span className="kd-badge" style={{ background: 'rgba(255,68,68,0.08)', color: '#FF4444', border: '1px solid rgba(255,68,68,0.25)' }}>
                  <span style={{ width: 6, height: 6, background: '#FF4444', borderRadius: '50%', display: 'inline-block' }} />Alerta
                </span>
                <span className="kd-badge" style={{ background: 'rgba(255,180,0,0.08)', color: '#B87A00', border: '1px solid rgba(255,180,0,0.25)' }}>
                  Atenção
                </span>
                <span className="kd-badge kd-badge-accent"><Icons.TrendUp /> +12%</span>
                <span className="kd-badge kd-badge-neutral"><Icons.Flame /> 847 kcal</span>
              </div>
            </div>
          </Reveal>

          {/* Toast / Alerts */}
          <Reveal delay={80}>
            <div className="kd-block" style={{ background: 'var(--surface-base)', padding: 'var(--space-8)' }}>
              <p className="kd-label-sm" style={{ color: 'var(--text-tertiary)', marginBottom: 'var(--space-6)' }}>Feedback — inline</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                {[
                  { type: 'success', icon: '✓', msg: 'Perfil atualizado com sucesso', bg: 'rgba(29,219,106,0.06)', border: 'rgba(29,219,106,0.25)', color: 'var(--kd-green-dim)' },
                  { type: 'error', icon: '!', msg: 'Erro ao salvar. Tente novamente.', bg: 'rgba(255,68,68,0.06)', border: 'rgba(255,68,68,0.25)', color: '#FF4444' },
                  { type: 'info', icon: 'i', msg: 'Sincronizando dados nutricionais…', bg: 'var(--surface-overlay)', border: 'var(--surface-border-sub)', color: 'var(--text-secondary)' },
                ].map((a, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)',
                    padding: '12px 14px',
                    background: a.bg,
                    border: `1px solid ${a.border}`,
                    borderRadius: 'var(--radius-md)',
                  }}>
                    <span style={{
                      width: 20, height: 20, borderRadius: '50%',
                      background: a.color, color: '#fff',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '0.7rem', fontWeight: 700, flexShrink: 0,
                    }}>{a.icon}</span>
                    <p className="kd-body-sm" style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{a.msg}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Loading states */}
          <Reveal delay={100}>
            <div className="kd-block" style={{ background: 'var(--surface-base)', padding: 'var(--space-8)' }}>
              <p className="kd-label-sm" style={{ color: 'var(--text-tertiary)', marginBottom: 'var(--space-6)' }}>Loading states</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
                {/* Spinner */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                  <div className="kd-spinner" />
                  <span className="kd-body-sm" style={{ color: 'var(--text-secondary)' }}>Calculando macros…</span>
                </div>
                {/* Dots */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                  <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                    <div className="kd-dot-1" />
                    <div className="kd-dot-2" />
                    <div className="kd-dot-3" />
                  </div>
                  <span className="kd-body-sm" style={{ color: 'var(--text-secondary)' }}>Analisando perfil</span>
                </div>
                {/* Shimmer skeleton */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                  <p className="kd-label-sm" style={{ color: 'var(--text-tertiary)', marginBottom: 4 }}>Skeleton</p>
                  <div className="kd-shimmer" style={{ height: 14, borderRadius: 6, width: '80%' }} />
                  <div className="kd-shimmer" style={{ height: 14, borderRadius: 6, width: '60%' }} />
                  <div className="kd-shimmer" style={{ height: 14, borderRadius: 6, width: '70%' }} />
                  <div style={{ display: 'flex', gap: 'var(--space-2)', marginTop: 4 }}>
                    <div className="kd-shimmer" style={{ height: 40, borderRadius: 8, flex: 1 }} />
                    <div className="kd-shimmer" style={{ height: 40, borderRadius: 8, flex: 1 }} />
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Empty state */}
          <Reveal delay={120}>
            <div className="kd-block" style={{
              background: 'var(--surface-base)', padding: 'var(--space-8)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              textAlign: 'center', minHeight: 240,
            }}>
              <div style={{
                width: 56, height: 56, borderRadius: 'var(--radius-xl)',
                border: '2px dashed var(--surface-border-sub)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 'var(--space-4)', color: 'var(--text-disabled)',
              }}>
                <Icons.Chart />
              </div>
              <p className="kd-heading-sm" style={{ color: 'var(--text-primary)', marginBottom: 'var(--space-2)' }}>
                Nenhum dado ainda
              </p>
              <p className="kd-body-sm" style={{ color: 'var(--text-tertiary)', maxWidth: '24ch', marginBottom: 'var(--space-5)' }}>
                Complete seu perfil para ver análises e recomendações personalizadas.
              </p>
              <button className="kd-btn-primary" style={{ padding: '10px 20px', fontSize: '0.875rem' }}>
                Completar perfil <Icons.Arrow />
              </button>
            </div>
          </Reveal>

          {/* Focus states */}
          <Reveal delay={140}>
            <div className="kd-block" style={{ background: 'var(--surface-base)', padding: 'var(--space-8)' }}>
              <p className="kd-label-sm" style={{ color: 'var(--text-tertiary)', marginBottom: 'var(--space-6)' }}>Estados de foco & hover</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                <div>
                  <p className="kd-label-sm" style={{ color: 'var(--text-tertiary)', fontSize: '0.7rem', marginBottom: 6 }}>Focus ring — input</p>
                  <input
                    className="kd-input"
                    defaultValue="Campo em foco"
                    style={{ borderColor: 'var(--accent)', boxShadow: '0 0 0 3px var(--accent-subtle)' }}
                    readOnly
                  />
                </div>
                <div>
                  <p className="kd-label-sm" style={{ color: 'var(--text-tertiary)', fontSize: '0.7rem', marginBottom: 6 }}>Focus ring — button (keyboard)</p>
                  <button className="kd-btn-primary" style={{ outline: '2px solid var(--accent)', outlineOffset: 3, borderRadius: 'var(--radius-md)' }}>
                    Foco visível
                  </button>
                </div>
                <div>
                  <p className="kd-label-sm" style={{ color: 'var(--text-tertiary)', fontSize: '0.7rem', marginBottom: 6 }}>Hover — card</p>
                  <div style={{
                    padding: 'var(--space-4)',
                    border: '2px solid var(--surface-border)',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--surface-overlay)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = 'var(--accent)'
                      e.currentTarget.style.background = 'var(--accent-subtle)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = 'var(--surface-border)'
                      e.currentTarget.style.background = 'var(--surface-overlay)'
                    }}
                  >
                    <p className="kd-body-sm" style={{ color: 'var(--text-primary)', fontWeight: 500 }}>Passe o mouse aqui</p>
                    <p className="kd-body-sm" style={{ color: 'var(--text-tertiary)' }}>Border muda para accent</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Tooltip */}
          <Reveal delay={160}>
            <div className="kd-block" style={{ background: 'var(--surface-base)', padding: 'var(--space-8)' }}>
              <p className="kd-label-sm" style={{ color: 'var(--text-tertiary)', marginBottom: 'var(--space-6)' }}>Tooltips & popovers</p>
              <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap', paddingTop: 'var(--space-8)' }}>
                {[
                  { label: 'Calorias', tip: '2,847 kcal/dia' },
                  { label: 'Proteína', tip: '185g por dia' },
                  { label: 'Hidratação', tip: '2.8L recomendado' },
                ].map((t, i) => (
                  <div key={i} className="kd-tooltip-trigger" style={{ position: 'relative' }}>
                    <button className="kd-btn-icon" style={{ width: 'auto', padding: '8px 14px', borderRadius: 'var(--radius-full)' }}>
                      <span className="kd-body-sm" style={{ fontWeight: 500, color: 'var(--text-secondary)' }}>{t.label}</span>
                    </button>
                    <span className="kd-tooltip">{t.tip}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 'var(--space-6)' }}>
                <p className="kd-label-sm" style={{ color: 'var(--text-tertiary)', fontSize: '0.7rem', marginBottom: 8 }}>Popover preview</p>
                <div style={{
                  background: 'var(--text-primary)',
                  color: 'var(--text-inverse)',
                  padding: 'var(--space-5)',
                  borderRadius: 'var(--radius-md)',
                  boxShadow: 'var(--shadow-lg)',
                  maxWidth: 220,
                }}>
                  <p style={{ fontWeight: 600, fontSize: '0.875rem', marginBottom: 4 }}>Déficit calórico</p>
                  <p style={{ fontSize: '0.8125rem', opacity: 0.7, lineHeight: 1.5 }}>
                    Você está 340 kcal abaixo da meta. Ideal para perda gradual de peso.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ─── Motion Section ─────────────────────────────────────────────────────── */
function MotionSection() {
  const [played, setPlayed] = useState(false)
  const { ref, visible } = useInView()

  useEffect(() => {
    if (visible && !played) setPlayed(true)
  }, [visible, played])

  const curves = [
    { name: 'Spring', css: 'cubic-bezier(0.34, 1.56, 0.64, 1)', usage: 'Toggls, chips, confirmações' },
    { name: 'Out', css: 'cubic-bezier(0.16, 1, 0.3, 1)', usage: 'Entradas, revelar conteúdo' },
    { name: 'In-Out', css: 'cubic-bezier(0.65, 0, 0.35, 1)', usage: 'Transições de tela' },
    { name: 'Linear', css: 'linear', usage: 'Progresso, tickers' },
  ]

  const durations = [
    { token: '--dur-instant', val: '80ms', usage: 'Feedback tátil imediato' },
    { token: '--dur-fast', val: '150ms', usage: 'Hover, micro-estados' },
    { token: '--dur-base', val: '250ms', usage: 'Maioria das transições' },
    { token: '--dur-slow', val: '400ms', usage: 'Reveal, expansão' },
    { token: '--dur-slower', val: '600ms', usage: 'Progresso, gráficos' },
    { token: '--dur-choreog', val: '900ms', usage: 'Sequências coreografadas' },
  ]

  return (
    <section className="kd-section" id="motion" style={{ background: 'var(--surface-base)' }}>
      <div className="kd-container">
        <Reveal>
          <span className="kd-label-sm" style={{ color: 'var(--accent)', display: 'block', marginBottom: 'var(--space-4)' }}>
            Motion language
          </span>
          <h2 className="kd-display-lg" style={{ color: 'var(--text-primary)', marginBottom: 'var(--space-4)' }}>
            O sistema sabe<br />se mover.
          </h2>
          <p className="kd-body-lg" style={{ color: 'var(--text-secondary)', maxWidth: '48ch', marginBottom: 'var(--space-16)' }}>
            Animações não são decoração. São comunicação. Cada curva e duração tem papel funcional no sistema.
          </p>
        </Reveal>

        <div ref={ref} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
          {/* Easings */}
          <div className="kd-block" style={{ background: 'var(--surface-base)', padding: 'var(--space-8)' }}>
            <p className="kd-label-sm" style={{ color: 'var(--text-tertiary)', marginBottom: 'var(--space-6)' }}>Curvas de easing</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
              {curves.map((c, i) => (
                <div key={i}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span className="kd-heading-sm" style={{ color: 'var(--text-primary)' }}>{c.name}</span>
                    <span className="kd-badge kd-badge-neutral">{c.usage}</span>
                  </div>
                  <div style={{
                    height: 4, background: 'var(--surface-border-sub)',
                    borderRadius: 'var(--radius-full)', overflow: 'hidden', position: 'relative',
                  }}>
                    <div style={{
                      position: 'absolute', top: 0, left: 0,
                      height: '100%', background: 'var(--accent)',
                      borderRadius: 'var(--radius-full)',
                      width: played ? '100%' : '0%',
                      transition: `width 900ms ${c.css} ${i * 120}ms`,
                    }} />
                  </div>
                  <p className="kd-mono" style={{ color: 'var(--text-tertiary)', fontSize: '0.6875rem', marginTop: 4 }}>{c.css}</p>
                </div>
              ))}
              <button className="kd-btn-ghost" onClick={() => { setPlayed(false); setTimeout(() => setPlayed(true), 50) }}>
                Reproduzir novamente
              </button>
            </div>
          </div>

          {/* Durations */}
          <div className="kd-block" style={{ background: 'var(--surface-base)', padding: 'var(--space-8)' }}>
            <p className="kd-label-sm" style={{ color: 'var(--text-tertiary)', marginBottom: 'var(--space-6)' }}>Escala de duração</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              {durations.map((d, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 'var(--space-4)',
                  padding: 'var(--space-3) var(--space-4)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--surface-border-faint)',
                  background: 'var(--surface-overlay)',
                }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 'var(--radius-sm)',
                    background: 'var(--accent-subtle)', border: '1px solid var(--accent-border)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <span className="kd-mono" style={{ color: 'var(--accent)', fontSize: '0.6875rem', fontWeight: 500 }}>{d.val}</span>
                  </div>
                  <div>
                    <p className="kd-body-sm" style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{d.usage}</p>
                    <p className="kd-mono" style={{ color: 'var(--text-tertiary)', fontSize: '0.6875rem' }}>{d.token}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stagger demo */}
        <Reveal delay={60}>
          <div className="kd-block" style={{ background: 'var(--surface-base)', padding: 'var(--space-8)' }}>
            <p className="kd-label-sm" style={{ color: 'var(--text-tertiary)', marginBottom: 'var(--space-6)' }}>
              Stagger choreography — entrada coreografada em 60ms delay entre elementos
            </p>
            <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
              {['Perfil', 'Macros', 'Metas', 'Histórico', 'Análise', 'Dicas'].map((item, i) => (
                <div
                  key={item}
                  className={`kd-animate-fade-up kd-delay-${i + 1}`}
                  style={{
                    padding: 'var(--space-4) var(--space-6)',
                    background: i === 0 ? 'var(--accent)' : 'var(--surface-overlay)',
                    border: `2px solid ${i === 0 ? 'var(--accent)' : 'var(--surface-border-sub)'}`,
                    borderRadius: 'var(--radius-md)',
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    color: i === 0 ? 'var(--kd-black)' : 'var(--text-primary)',
                    letterSpacing: '-0.01em',
                  }}>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ─── Dashboard Components ───────────────────────────────────────────────── */
function DashboardSection() {
  const weekData = [
    { day: 'Seg', kcal: 2200, target: 2400, pct: 0.68 },
    { day: 'Ter', kcal: 2450, target: 2400, pct: 0.85 },
    { day: 'Qua', kcal: 2100, target: 2400, pct: 0.60 },
    { day: 'Qui', kcal: 2600, target: 2400, pct: 1.0 },
    { day: 'Sex', kcal: 2300, target: 2400, pct: 0.75 },
    { day: 'Sáb', kcal: 2800, target: 2400, pct: 0.90 },
    { day: 'Dom', kcal: 1900, target: 2400, pct: 0.50 },
  ]

  const macros = [
    { label: 'Proteína', grams: 185, target: 200, color: 'var(--accent)', pct: 92 },
    { label: 'Carboidrato', grams: 310, target: 320, color: '#B0E0C8', pct: 97 },
    { label: 'Gordura', grams: 78, target: 80, color: '#D4EBE0', pct: 97 },
  ]

  const metrics = [
    { label: 'Calorias hoje', value: '2,340', unit: 'kcal', delta: '+3.2%', trend: 'up', icon: <Icons.Flame /> },
    { label: 'Proteína', value: '185', unit: 'g', delta: '92%', trend: 'up', icon: <Icons.TrendUp /> },
    { label: 'Água', value: '2.4', unit: 'L', delta: '-0.4L', trend: 'down', icon: <Icons.Droplet /> },
    { label: 'Dias ativos', value: '18', unit: '/30', delta: '+2', trend: 'up', icon: <Icons.Target /> },
  ]

  const circumference = 2 * Math.PI * 44

  return (
    <section className="kd-section" id="dashboard">
      <div className="kd-container">
        <Reveal>
          <span className="kd-label-sm" style={{ color: 'var(--accent)', display: 'block', marginBottom: 'var(--space-4)' }}>
            Dashboard analítico
          </span>
          <h2 className="kd-display-lg" style={{ color: 'var(--text-primary)', marginBottom: 'var(--space-4)' }}>
            Dados com elegância.<br />Análise com clareza.
          </h2>
          <p className="kd-body-lg" style={{ color: 'var(--text-secondary)', maxWidth: '48ch', marginBottom: 'var(--space-16)' }}>
            Componentes de visualização que comunicam progresso, padrões e insights com hierarquia visual imediata.
          </p>
        </Reveal>

        {/* Metric cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: 'var(--space-4)',
          marginBottom: 'var(--space-4)',
        }}>
          {metrics.map((m, i) => (
            <Reveal key={i} delay={i * 60}>
              <div className="kd-block kd-card-lift" style={{
                background: 'var(--surface-base)',
                padding: 'var(--space-6)',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-4)' }}>
                  <div className="kd-icon-circle">{m.icon}</div>
                  <span className={`kd-badge ${m.trend === 'up' ? 'kd-badge-accent' : ''}`}
                    style={m.trend === 'down' ? { background: 'rgba(255,68,68,0.06)', color: '#FF4444', border: '1px solid rgba(255,68,68,0.20)', padding: '4px 10px', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 600 } : {}}>
                    {m.delta}
                  </span>
                </div>
                <p className="kd-metric-num">{m.value}<span style={{ fontSize: '1rem', fontWeight: 400, color: 'var(--text-tertiary)', marginLeft: 4 }}>{m.unit}</span></p>
                <p className="kd-label-sm" style={{ color: 'var(--text-tertiary)', marginTop: 'var(--space-2)' }}>{m.label}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Charts row */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
          {/* Bar chart */}
          <Reveal delay={60}>
            <div className="kd-block" style={{ background: 'var(--surface-base)', padding: 'var(--space-8)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-8)' }}>
                <div>
                  <p className="kd-heading-md" style={{ color: 'var(--text-primary)' }}>Ingestão calórica</p>
                  <p className="kd-body-sm" style={{ color: 'var(--text-tertiary)' }}>Últimos 7 dias · meta 2,400 kcal</p>
                </div>
                <button className="kd-btn-ghost" style={{ padding: '7px 14px', fontSize: '0.8125rem' }}>
                  Semana <Icons.Arrow dir="down" />
                </button>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 'var(--space-3)', height: 160 }}>
                {weekData.map((d, i) => (
                  <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, height: '100%', justifyContent: 'flex-end' }}>
                    <span className="kd-mono" style={{ fontSize: '0.6rem', color: 'var(--text-tertiary)' }}>
                      {(d.kcal / 1000).toFixed(1)}k
                    </span>
                    <div style={{
                      width: '100%',
                      height: `${d.pct * 100}%`,
                      background: d.pct >= 1
                        ? 'var(--accent)'
                        : `linear-gradient(180deg, var(--accent) 0%, rgba(29,219,106,0.4) 100%)`,
                      borderRadius: '4px 4px 2px 2px',
                      transition: 'height 0.6s cubic-bezier(0.16,1,0.3,1)',
                      cursor: 'pointer',
                      position: 'relative',
                    }}
                      onMouseEnter={e => {
                        (e.currentTarget.style.opacity = '0.85')
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget.style.opacity = '1')
                      }}
                    />
                    <span className="kd-label-sm" style={{ fontSize: '0.65rem', color: 'var(--text-tertiary)' }}>{d.day}</span>
                  </div>
                ))}
              </div>
              {/* Target line label */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 'var(--space-4)' }}>
                <div style={{ width: 20, height: 2, background: 'var(--surface-border-sub)', borderRadius: 1 }} />
                <span className="kd-label-sm" style={{ color: 'var(--text-tertiary)' }}>Meta diária: 2,400 kcal</span>
              </div>
            </div>
          </Reveal>

          {/* Radial / Donut */}
          <Reveal delay={100}>
            <div className="kd-block" style={{ background: 'var(--surface-base)', padding: 'var(--space-8)' }}>
              <p className="kd-heading-md" style={{ color: 'var(--text-primary)', marginBottom: 4 }}>Meta calórica</p>
              <p className="kd-body-sm" style={{ color: 'var(--text-tertiary)', marginBottom: 'var(--space-6)' }}>Hoje</p>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 'var(--space-6)' }}>
                <svg width="120" height="120" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="44" fill="none" stroke="var(--surface-border-sub)" strokeWidth="8" />
                  <circle
                    cx="50" cy="50" r="44" fill="none"
                    stroke="var(--accent)" strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference * (1 - 0.975)}
                    className="kd-radial"
                  />
                  <text x="50" y="46" textAnchor="middle" fill="var(--text-primary)"
                    style={{ fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 500 }}>
                    97%
                  </text>
                  <text x="50" y="60" textAnchor="middle" fill="var(--text-tertiary)"
                    style={{ fontFamily: 'var(--font-sans)', fontSize: 7, fontWeight: 500 }}>
                    da meta
                  </text>
                </svg>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                {macros.map((m, i) => (
                  <div key={i}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <span className="kd-body-sm" style={{ fontWeight: 500, color: 'var(--text-secondary)' }}>{m.label}</span>
                      <span className="kd-mono" style={{ color: 'var(--text-primary)', fontSize: '0.8125rem' }}>
                        {m.grams}<span style={{ color: 'var(--text-tertiary)', fontWeight: 400 }}>/{m.target}g</span>
                      </span>
                    </div>
                    <div style={{ height: 4, background: 'var(--surface-border-sub)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                      <div style={{
                        height: '100%',
                        width: `${m.pct}%`,
                        background: m.color,
                        borderRadius: 'var(--radius-full)',
                        transition: 'width 0.8s cubic-bezier(0.16,1,0.3,1)',
                      }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* Comparison & Heatmap row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
          {/* Comparison */}
          <Reveal delay={80}>
            <div className="kd-block" style={{ background: 'var(--surface-base)', padding: 'var(--space-8)' }}>
              <p className="kd-heading-md" style={{ color: 'var(--text-primary)', marginBottom: 4 }}>Comparação de período</p>
              <p className="kd-body-sm" style={{ color: 'var(--text-tertiary)', marginBottom: 'var(--space-8)' }}>Esta semana vs. semana anterior</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
                {[
                  { label: 'Calorias médias', a: 82, b: 65, valA: '2,340', valB: '1,980' },
                  { label: 'Proteína diária', a: 94, b: 78, valA: '185g', valB: '154g' },
                  { label: 'Consistência', a: 86, b: 58, valA: '6/7 dias', valB: '4/7 dias' },
                ].map((row, i) => (
                  <div key={i}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                      <span className="kd-body-sm" style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{row.label}</span>
                      <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
                        <span className="kd-mono" style={{ color: 'var(--accent)', fontSize: '0.8125rem' }}>{row.valA}</span>
                        <span className="kd-mono" style={{ color: 'var(--text-tertiary)', fontSize: '0.8125rem' }}>{row.valB}</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                      <div style={{ height: 8, background: 'var(--surface-border-sub)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                        <div className="kd-compare-a" style={{ '--progress-width': `${row.a}%` } as React.CSSProperties} />
                      </div>
                      <div style={{ height: 8, background: 'var(--surface-border-sub)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                        <div className="kd-compare-b" style={{ '--progress-width': `${row.b}%` } as React.CSSProperties} />
                      </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                      <span className="kd-label-sm" style={{ color: 'var(--accent)', fontSize: '0.65rem' }}>Esta semana</span>
                      <span className="kd-label-sm" style={{ color: 'var(--text-tertiary)', fontSize: '0.65rem' }}>Anterior</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Activity grid / heatmap */}
          <Reveal delay={100}>
            <div className="kd-block" style={{ background: 'var(--surface-base)', padding: 'var(--space-8)' }}>
              <p className="kd-heading-md" style={{ color: 'var(--text-primary)', marginBottom: 4 }}>Consistência mensal</p>
              <p className="kd-body-sm" style={{ color: 'var(--text-tertiary)', marginBottom: 'var(--space-6)' }}>Registro de atividade — 30 dias</p>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(10, 1fr)',
                gap: 4,
                marginBottom: 'var(--space-6)',
              }}>
                {Array.from({ length: 30 }, (_, i) => {
                  const levels = [0, 1, 2, 3, 2, 3, 1, 3, 2, 3, 3, 2, 1, 3, 3, 2, 0, 1, 3, 2, 3, 3, 2, 3, 1, 2, 3, 3, 2, 3]
                  const level = levels[i]
                  const opacity = level === 0 ? 0.08 : level === 1 ? 0.30 : level === 2 ? 0.60 : 1
                  return (
                    <div
                      key={i}
                      title={`Dia ${i + 1}`}
                      style={{
                        aspectRatio: '1',
                        background: `rgba(29,219,106,${opacity})`,
                        borderRadius: 4,
                        cursor: 'pointer',
                        transition: 'transform 0.15s ease',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.3)')}
                      onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                    />
                  )
                })}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="kd-label-sm" style={{ color: 'var(--text-tertiary)' }}>Menos</span>
                <div style={{ display: 'flex', gap: 3 }}>
                  {[0.08, 0.30, 0.60, 1].map((op, i) => (
                    <div key={i} style={{
                      width: 16, height: 16, borderRadius: 3,
                      background: `rgba(29,219,106,${op})`,
                    }} />
                  ))}
                </div>
                <span className="kd-label-sm" style={{ color: 'var(--text-tertiary)' }}>Mais</span>
              </div>
              <div className="kd-divider" style={{ margin: 'var(--space-6) 0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-around', textAlign: 'center' }}>
                {[
                  { val: '23', label: 'dias ativos' },
                  { val: '77%', label: 'consistência' },
                  { val: '18', label: 'dias seguidos' },
                ].map((s, i) => (
                  <div key={i}>
                    <p className="kd-mono-lg" style={{ color: 'var(--text-primary)', fontSize: '1.5rem' }}>{s.val}</p>
                    <p className="kd-label-sm" style={{ color: 'var(--text-tertiary)' }}>{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ─── Light/Dark Mode Demo ───────────────────────────────────────────────── */
function DualModeSection({ dark, setDark }: { dark: boolean, setDark: (v: boolean) => void }) {
  return (
    <section className="kd-section" style={{ background: 'var(--surface-base)' }}>
      <div className="kd-container">
        <Reveal>
          <span className="kd-label-sm" style={{ color: 'var(--accent)', display: 'block', marginBottom: 'var(--space-4)' }}>
            Light & Dark — Nativo
          </span>
          <h2 className="kd-display-lg" style={{ color: 'var(--text-primary)', marginBottom: 'var(--space-4)' }}>
            Dois mundos.<br />Um sistema.
          </h2>
          <p className="kd-body-lg" style={{ color: 'var(--text-secondary)', maxWidth: '48ch', marginBottom: 'var(--space-10)' }}>
            O modo escuro não é uma inversão do claro. É uma identidade complementar, 
            igualmente deliberada, igualmente premium.
          </p>
        </Reveal>

        <Reveal delay={60}>
          <div style={{ display: 'flex', gap: 'var(--space-4)', alignItems: 'center', marginBottom: 'var(--space-10)' }}>
            <button
              className={`kd-btn-ghost ${!dark ? 'kd-btn-primary' : ''}`}
              style={!dark ? {
                background: 'var(--accent)', border: 'none', color: 'var(--kd-black)',
                padding: '11px 24px', borderRadius: 'var(--radius-md)',
                fontFamily: 'var(--font-sans)', fontSize: '0.9375rem', fontWeight: 700,
                cursor: 'pointer', letterSpacing: '-0.01em',
              } : {}}
              onClick={() => setDark(false)}
            >
              <Icons.Sun /> Light Mode
            </button>
            <button
              className={`kd-btn-ghost ${dark ? 'kd-btn-primary' : ''}`}
              style={dark ? {
                background: 'var(--accent)', border: 'none', color: 'var(--kd-black)',
                padding: '11px 24px', borderRadius: 'var(--radius-md)',
                fontFamily: 'var(--font-sans)', fontSize: '0.9375rem', fontWeight: 700,
                cursor: 'pointer', letterSpacing: '-0.01em',
              } : {}}
              onClick={() => setDark(true)}
            >
              <Icons.Moon /> Dark Mode
            </button>
          </div>
        </Reveal>

        {/* Side-by-side preview */}
        <Reveal delay={80}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
            {/* Light preview */}
            <div style={{
              background: '#F8F8F6',
              borderRadius: 'var(--radius-xl)',
              border: '2px solid #E0E0DC',
              padding: 'var(--space-8)',
              overflow: 'hidden',
            }}>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#767676', marginBottom: 'var(--space-5)' }}>
                ☀ Light
              </p>
              <div style={{ background: '#fff', borderRadius: 12, border: '2px solid #1A1A1A', padding: 20, marginBottom: 12 }}>
                <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '1.125rem', color: '#0A0A0A', letterSpacing: '-0.02em', marginBottom: 4 }}>
                  Seu plano nutricional
                </p>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8125rem', color: '#767676', marginBottom: 16 }}>
                  Personalizado para seus objetivos
                </p>
                <div style={{ display: 'flex', gap: 8 }}>
                  <div style={{ flex: 1, background: '#1DDB6A', borderRadius: 8, padding: '10px 12px', textAlign: 'center' }}>
                    <p style={{ fontFamily: 'var(--font-mono)', fontWeight: 500, fontSize: '1.125rem', color: '#080808' }}>2,340</p>
                    <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.6875rem', fontWeight: 600, color: '#080808', opacity: 0.6, textTransform: 'uppercase', letterSpacing: '0.04em' }}>kcal</p>
                  </div>
                  <div style={{ flex: 1, background: '#F2F2EF', borderRadius: 8, padding: '10px 12px', textAlign: 'center', border: '1px solid #E0E0DC' }}>
                    <p style={{ fontFamily: 'var(--font-mono)', fontWeight: 500, fontSize: '1.125rem', color: '#0A0A0A' }}>185g</p>
                    <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.6875rem', fontWeight: 600, color: '#767676', textTransform: 'uppercase', letterSpacing: '0.04em' }}>prot</p>
                  </div>
                  <div style={{ flex: 1, background: '#F2F2EF', borderRadius: 8, padding: '10px 12px', textAlign: 'center', border: '1px solid #E0E0DC' }}>
                    <p style={{ fontFamily: 'var(--font-mono)', fontWeight: 500, fontSize: '1.125rem', color: '#0A0A0A' }}>78g</p>
                    <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.6875rem', fontWeight: 600, color: '#767676', textTransform: 'uppercase', letterSpacing: '0.04em' }}>gord</p>
                  </div>
                </div>
              </div>
              <button style={{
                width: '100%', padding: '13px', borderRadius: 10,
                background: '#1DDB6A', border: 'none',
                fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '0.9375rem',
                color: '#080808', cursor: 'pointer', letterSpacing: '-0.01em',
              }}>
                Ver dashboard →
              </button>
            </div>

            {/* Dark preview */}
            <div style={{
              background: '#080808',
              borderRadius: 'var(--radius-xl)',
              border: '2px solid #1E1E1E',
              padding: 'var(--space-8)',
              overflow: 'hidden',
            }}>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#444', marginBottom: 'var(--space-5)' }}>
                ◆ Dark
              </p>
              <div style={{ background: '#0F0F0F', borderRadius: 12, border: '2px solid #2A2A2A', padding: 20, marginBottom: 12 }}>
                <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '1.125rem', color: '#F4F4F4', letterSpacing: '-0.02em', marginBottom: 4 }}>
                  Seu plano nutricional
                </p>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8125rem', color: '#666', marginBottom: 16 }}>
                  Personalizado para seus objetivos
                </p>
                <div style={{ display: 'flex', gap: 8 }}>
                  <div style={{ flex: 1, background: '#1DDB6A', borderRadius: 8, padding: '10px 12px', textAlign: 'center' }}>
                    <p style={{ fontFamily: 'var(--font-mono)', fontWeight: 500, fontSize: '1.125rem', color: '#080808' }}>2,340</p>
                    <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.6875rem', fontWeight: 600, color: '#080808', opacity: 0.6, textTransform: 'uppercase', letterSpacing: '0.04em' }}>kcal</p>
                  </div>
                  <div style={{ flex: 1, background: '#1E1E1E', borderRadius: 8, padding: '10px 12px', textAlign: 'center', border: '1px solid #2A2A2A' }}>
                    <p style={{ fontFamily: 'var(--font-mono)', fontWeight: 500, fontSize: '1.125rem', color: '#F4F4F4' }}>185g</p>
                    <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.6875rem', fontWeight: 600, color: '#666', textTransform: 'uppercase', letterSpacing: '0.04em' }}>prot</p>
                  </div>
                  <div style={{ flex: 1, background: '#1E1E1E', borderRadius: 8, padding: '10px 12px', textAlign: 'center', border: '1px solid #2A2A2A' }}>
                    <p style={{ fontFamily: 'var(--font-mono)', fontWeight: 500, fontSize: '1.125rem', color: '#F4F4F4' }}>78g</p>
                    <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.6875rem', fontWeight: 600, color: '#666', textTransform: 'uppercase', letterSpacing: '0.04em' }}>gord</p>
                  </div>
                </div>
              </div>
              <button style={{
                width: '100%', padding: '13px', borderRadius: 10,
                background: '#1DDB6A', border: 'none',
                fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '0.9375rem',
                color: '#080808', cursor: 'pointer', letterSpacing: '-0.01em',
              }}>
                Ver dashboard →
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ─── Navigation Patterns ────────────────────────────────────────────────── */
function NavigationSection() {
  const [activeNav, setActiveNav] = useState('dashboard')

  const navItems = [
    { id: 'dashboard', icon: <Icons.Grid />, label: 'Dashboard' },
    { id: 'profile', icon: <Icons.User />, label: 'Perfil' },
    { id: 'analysis', icon: <Icons.Chart />, label: 'Análise' },
    { id: 'goals', icon: <Icons.Target />, label: 'Metas' },
  ]

  return (
    <section className="kd-section">
      <div className="kd-container">
        <Reveal>
          <span className="kd-label-sm" style={{ color: 'var(--accent)', display: 'block', marginBottom: 'var(--space-4)' }}>
            Navegação & layout
          </span>
          <h2 className="kd-display-lg" style={{ color: 'var(--text-primary)', marginBottom: 'var(--space-16)' }}>
            Estrutura que orienta<br />sem bloquear.
          </h2>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
          {/* Tab bar - desktop */}
          <Reveal delay={60}>
            <div className="kd-block" style={{ background: 'var(--surface-base)', padding: 'var(--space-8)' }}>
              <p className="kd-label-sm" style={{ color: 'var(--text-tertiary)', marginBottom: 'var(--space-6)' }}>
                Top nav — desktop
              </p>
              <div style={{
                display: 'flex',
                gap: 2,
                background: 'var(--surface-overlay)',
                padding: 4,
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--surface-border-faint)',
              }}>
                {navItems.map(item => (
                  <button
                    key={item.id}
                    onClick={() => setActiveNav(item.id)}
                    style={{
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 6,
                      padding: '9px 12px',
                      borderRadius: 'var(--radius-sm)',
                      border: 'none',
                      background: activeNav === item.id ? 'var(--surface-base)' : 'transparent',
                      boxShadow: activeNav === item.id ? 'var(--shadow-xs)' : 'none',
                      color: activeNav === item.id ? 'var(--text-primary)' : 'var(--text-tertiary)',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.8125rem',
                      fontWeight: activeNav === item.id ? 600 : 400,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}>
                    {item.icon} {item.label}
                  </button>
                ))}
              </div>

              {/* Underline nav */}
              <div style={{ marginTop: 'var(--space-8)' }}>
                <p className="kd-label-sm" style={{ color: 'var(--text-tertiary)', marginBottom: 'var(--space-4)' }}>
                  Underline nav — tabs
                </p>
                <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid var(--surface-border-faint)' }}>
                  {navItems.map(item => (
                    <button
                      key={item.id}
                      onClick={() => setActiveNav(item.id)}
                      style={{
                        padding: '10px 16px',
                        border: 'none',
                        borderBottom: activeNav === item.id ? '2px solid var(--accent)' : '2px solid transparent',
                        marginBottom: -1,
                        background: 'transparent',
                        color: activeNav === item.id ? 'var(--text-primary)' : 'var(--text-tertiary)',
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.875rem',
                        fontWeight: activeNav === item.id ? 600 : 400,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}>
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          {/* Bottom nav mobile */}
          <Reveal delay={80}>
            <div className="kd-block" style={{ background: 'var(--surface-base)', padding: 'var(--space-8)' }}>
              <p className="kd-label-sm" style={{ color: 'var(--text-tertiary)', marginBottom: 'var(--space-6)' }}>
                Bottom nav — mobile
              </p>
              <div style={{
                background: 'var(--surface-base)',
                border: '2px solid var(--surface-border-sub)',
                borderRadius: 'var(--radius-xl)',
                padding: '8px 4px',
                display: 'flex',
                maxWidth: 360,
              }}>
                {navItems.map(item => (
                  <button
                    key={item.id}
                    onClick={() => setActiveNav(item.id)}
                    style={{
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 4,
                      padding: '8px 4px',
                      border: 'none',
                      background: 'transparent',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}>
                    <div style={{
                      width: 32, height: 32,
                      borderRadius: 'var(--radius-sm)',
                      background: activeNav === item.id ? 'var(--accent-subtle)' : 'transparent',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: activeNav === item.id ? 'var(--accent)' : 'var(--text-tertiary)',
                      transition: 'all 0.2s ease',
                    }}>
                      {item.icon}
                    </div>
                    <span style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.625rem',
                      fontWeight: activeNav === item.id ? 600 : 400,
                      color: activeNav === item.id ? 'var(--accent)' : 'var(--text-tertiary)',
                      letterSpacing: '0.02em',
                    }}>
                      {item.label}
                    </span>
                  </button>
                ))}
              </div>

              {/* Breadcrumb */}
              <div style={{ marginTop: 'var(--space-8)' }}>
                <p className="kd-label-sm" style={{ color: 'var(--text-tertiary)', marginBottom: 'var(--space-4)' }}>
                  Breadcrumb
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  {['Início', 'Perfil', 'Configurações'].map((crumb, i, arr) => (
                    <div key={crumb} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.875rem',
                        fontWeight: i === arr.length - 1 ? 600 : 400,
                        color: i === arr.length - 1 ? 'var(--text-primary)' : 'var(--text-tertiary)',
                        cursor: i < arr.length - 1 ? 'pointer' : 'default',
                        textDecoration: i < arr.length - 1 ? 'underline' : 'none',
                        textDecorationColor: 'transparent',
                        transition: 'color 0.15s',
                      }}>
                        {crumb}
                      </span>
                      {i < arr.length - 1 && (
                        <span style={{ color: 'var(--text-disabled)', fontSize: '0.75rem' }}>›</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Pagination */}
              <div style={{ marginTop: 'var(--space-8)' }}>
                <p className="kd-label-sm" style={{ color: 'var(--text-tertiary)', marginBottom: 'var(--space-4)' }}>
                  Paginação
                </p>
                <div style={{ display: 'flex', gap: 'var(--space-1)', alignItems: 'center' }}>
                  {[1, 2, 3, '…', 12].map((p, i) => (
                    <button key={i} style={{
                      width: 36, height: 36,
                      borderRadius: 'var(--radius-sm)',
                      border: p === 2 ? '2px solid var(--accent)' : '2px solid var(--surface-border-sub)',
                      background: p === 2 ? 'var(--accent-subtle)' : 'transparent',
                      color: p === 2 ? 'var(--accent)' : 'var(--text-tertiary)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.875rem',
                      fontWeight: p === 2 ? 600 : 400,
                      cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>{p}</button>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ─── Final Manifesto Section ────────────────────────────────────────────── */
function ManifestoSection() {
  return (
    <section style={{
      background: 'var(--kd-black)',
      padding: 'var(--space-32) 0',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background noise texture */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `
          radial-gradient(circle at 20% 50%, rgba(29,219,106,0.04) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(29,219,106,0.03) 0%, transparent 40%)
        `,
        pointerEvents: 'none',
      }} />

      {/* Grid overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
        `,
        backgroundSize: '64px 64px',
        pointerEvents: 'none',
      }} />

      <div className="kd-container" style={{ position: 'relative' }}>
        <Reveal>
          <span className="kd-label-sm" style={{ color: 'var(--accent)', display: 'block', marginBottom: 'var(--space-8)' }}>
            Manifesto do sistema
          </span>
        </Reveal>

        <Reveal delay={60}>
          <h2 style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(2.5rem, 6vw, 5.5rem)',
            fontWeight: 800,
            lineHeight: 0.92,
            letterSpacing: '-0.04em',
            color: '#F4F4F4',
            marginBottom: 'var(--space-10)',
            maxWidth: '16ch',
          }}>
            Cada pixel tem<br />
            <span style={{ color: 'var(--accent)' }}>razão de ser.</span>
          </h2>
        </Reveal>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'var(--space-16)',
          marginBottom: 'var(--space-16)',
        }}>
          <Reveal delay={80}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
              {[
                'KhromaDiet não é mais um aplicativo de nutrição. É a experiência mais precisa que um produto de saúde pode oferecer: dados certos, no momento certo, na forma certa.',
                'Este sistema de design é a fundação silenciosa de tudo. Ele não aparece como elemento individual — ele é o que faz o produto parecer coeso, confiável e sofisticado desde o primeiro segundo.',
                'Neo-Brutalismo Clean não é estilo. É postura. É a decisão de ser claro antes de ser bonito, de ter estrutura antes de ter ornamento, de ter convicção antes de ter versatilidade.',
              ].map((p, i) => (
                <p key={i} style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '1rem',
                  lineHeight: 1.7,
                  color: i === 0 ? '#D4D4D4' : '#666',
                  letterSpacing: '-0.005em',
                }}>
                  {p}
                </p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
              {[
                { title: 'Nunca imitar', body: 'Não é Apple. Não é Linear. Não é qualquer produto famoso. KhromaDiet tem voz própria.' },
                { title: 'Nunca ornamentar', body: 'Gradientes sem função, sombras sem propósito, animações sem intenção. Tudo proibido.' },
                { title: 'Nunca ceder', body: 'Contraste mínimo, tipografia poluída, espaçamento comprimido. A régua não negocia.' },
                { title: 'Sempre deliberar', body: 'Se não há razão clara para uma decisão visual, ela não entra no sistema.' },
              ].map((item, i) => (
                <div key={i} style={{
                  padding: 'var(--space-5)',
                  border: '1px solid #1E1E1E',
                  borderRadius: 'var(--radius-md)',
                  background: '#0A0A0A',
                }}>
                  <p style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: '#F4F4F4',
                    marginBottom: 4,
                    letterSpacing: '-0.01em',
                  }}>
                    {item.title}
                  </p>
                  <p style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.8125rem',
                    color: '#555',
                    lineHeight: 1.6,
                  }}>
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Bottom bar */}
        <Reveal delay={120}>
          <div style={{
            borderTop: '1px solid #1A1A1A',
            paddingTop: 'var(--space-8)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 'var(--space-4)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
              <div style={{
                width: 28, height: 28,
                background: 'var(--accent)',
                borderRadius: 'var(--radius-sm)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L4 8v8l8 6 8-6V8z" fill="#080808" fillOpacity="0.9"/>
                  <path d="M12 8v8M8 10l4-2 4 2" stroke="#080808" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '0.9375rem', color: '#F4F4F4', letterSpacing: '-0.025em' }}>
                KhromaDiet
              </span>
            </div>
            <div style={{ display: 'flex', gap: 'var(--space-8)', flexWrap: 'wrap' }}>
              {['Design System v1.0', 'DM Sans + DM Mono', 'Neo-Brutalismo Clean', '© 2025'].map((item, i) => (
                <span key={i} style={{
                  fontFamily: i === 0 ? 'var(--font-mono)' : 'var(--font-sans)',
                  fontSize: '0.75rem',
                  color: '#333',
                  letterSpacing: i === 0 ? '-0.01em' : '0.04em',
                  textTransform: i !== 0 ? 'uppercase' : 'none',
                }}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ─── App Root ───────────────────────────────────────────────────────────── */
export default function App() {
  const { dark, setDark } = useTheme()

  return (
    <div style={{ minHeight: '100vh', background: 'var(--surface-bg)' }}>
      <Nav dark={dark} setDark={setDark} />

      {/* Hero */}
      <HeroSection />

      {/* Ticker */}
      <Ticker />

      {/* Principles */}
      <PrinciplesSection />

      {/* Color tokens */}
      <ColorSection />

      {/* Typography */}
      <TypographySection />

      {/* Spacing / Grid */}
      <SpacingSection />

      {/* Elevation */}
      <ElevationSection />

      {/* Buttons */}
      <ButtonsSection />

      {/* Form components */}
      <FormSection />

      {/* Badges & Feedback */}
      <BadgesSection />

      {/* Motion */}
      <MotionSection />

      {/* Dashboard components */}
      <DashboardSection />

      {/* Light/Dark demo */}
      <DualModeSection dark={dark} setDark={setDark} />

      {/* Navigation patterns */}
      <NavigationSection />

      {/* Final manifesto */}
      <ManifestoSection />
    </div>
  )
}
