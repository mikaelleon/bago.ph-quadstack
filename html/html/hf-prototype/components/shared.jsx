// shared.jsx — shared UI primitives for all BAGO.PH screens

const COLORS = {
  green: '#2E7D32',
  greenDeep: '#1B5E20',
  greenMid: '#43A047',
  greenLight: '#A5D6A7',
  greenTint: '#E8F5E9',
  blue: '#1565C0',
  blueDeep: '#0D47A1',
  blueLight: '#BBDEFB',
  blueTint: '#E3F2FD',
  navy: '#0D1B2A',
  navySurface: '#162230',
  bg: '#F5F5F5',
  surface: '#FFFFFF',
  border: '#E0E0E0',
  borderStrong: '#BDBDBD',
  textPri: '#212121',
  textSec: '#757575',
  textHint: '#9E9E9E',
  error: '#D32F2F',
  warning: '#F9A825',
  rowHover: '#F9FBF9',
};

function UL({ children, style }) {
  return <div style={{
    fontSize: 11, fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase',
    color: COLORS.textSec, ...style,
  }}>{children}</div>;
}

function Card({ children, accent, accentSide = 'left', style, padding = 16 }) {
  const accentKey = accentSide === 'top' ? 'borderTop' : 'borderLeft';
  return <div style={{
    background: 'white', borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
    padding, [accentKey]: accent ? `4px solid ${accent}` : undefined, ...style,
  }}>{children}</div>;
}

function Badge({ kind, children, style }) {
  const map = {
    scheduled: ['#C8E6C9', '#1B5E20'],
    updated:   ['#FFE0B2', '#E65100'],
    cancelled: ['#FFCDD2', '#B71C1C'],
    resolved:  ['#C8E6C9', '#1B5E20'],
    ontrack:   ['#C8E6C9', '#1B5E20'],
    open:      ['#FFCDD2', '#B71C1C'],
    urgent:    ['#FFCDD2', '#B71C1C'],
    inprogress:['#BBDEFB', '#0D47A1'],
    ack:       ['#FFF9C4', '#F57F17'],
    monitor:   ['#FFE0B2', '#E65100'],
    high:      ['#FFE0B2', '#E65100'],
    medium:    ['#FFF9C4', '#F57F17'],
    low:       ['#F5F5F5', '#757575'],
    rejected:  ['#F5F5F5', '#757575'],
  };
  const [bg, fg] = map[kind] || ['#F5F5F5', '#757575'];
  return <span style={{
    background: bg, color: fg, padding: '4px 10px', borderRadius: 12,
    fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.3,
    display: 'inline-block', whiteSpace: 'nowrap', ...style,
  }}>{children}</span>;
}

function PhoneFrame({ topColor = '#2E7D32', title, bottomNav, children, onBack, roleBadge, notifDot = true, topActions }) {
  return (
    <div style={{
      width: 390, height: 780, background: '#111', borderRadius: 44, padding: 8,
      boxShadow: '0 30px 60px rgba(0,0,0,0.25), 0 8px 20px rgba(0,0,0,0.12)',
      boxSizing: 'border-box', position: 'relative',
    }}>
      <div style={{
        width: '100%', height: '100%', background: '#F5F5F5', borderRadius: 36,
        overflow: 'hidden', position: 'relative', display: 'flex', flexDirection: 'column',
      }}>
        {/* Status bar */}
        <div style={{
          height: 36, background: topColor, color: 'white', display: 'flex',
          alignItems: 'center', justifyContent: 'space-between', padding: '0 22px',
          fontSize: 13, fontWeight: 600, fontFamily: 'Poppins', flexShrink: 0,
        }}>
          <span>9:41</span>
          <span style={{ fontSize: 10, opacity: 0.9, letterSpacing: 1 }}>5G ▮▮▮▮ 🔋</span>
        </div>
        {/* Top nav */}
        <div style={{
          minHeight: 56, background: topColor, color: 'white', display: 'flex',
          alignItems: 'center', padding: '8px 14px', gap: 10, fontFamily: 'Poppins', flexShrink: 0,
        }}>
          {onBack && (
            <button onClick={onBack} style={{
              background: 'rgba(255,255,255,0.18)', border: 'none', color: 'white',
              width: 32, height: 32, borderRadius: 8, fontSize: 18, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>‹</button>
          )}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 16, fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{title}</div>
            {roleBadge && <span style={{
              background: 'rgba(255,255,255,0.2)', padding: '3px 10px', borderRadius: 20,
              fontSize: 10, fontWeight: 700, letterSpacing: 0.4, flexShrink: 0,
            }}>{roleBadge}</span>}
          </div>
          {topActions}
          {notifDot && (
            <div style={{ position: 'relative', cursor: 'pointer' }}>
              <span style={{ fontSize: 18 }}>🔔</span>
              <span style={{
                position: 'absolute', top: -2, right: -2, width: 8, height: 8,
                borderRadius: 4, background: '#F9A825', border: '1.5px solid ' + topColor,
              }}/>
            </div>
          )}
        </div>
        {/* Content */}
        <div style={{
          flex: 1, overflowY: 'auto', paddingBottom: bottomNav ? 72 : 16, position: 'relative',
          background: '#F5F5F5',
        }}>{children}</div>
        {/* Bottom nav */}
        {bottomNav && (
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: 64,
            background: 'white', borderTop: '1px solid #E0E0E0', display: 'flex',
            fontFamily: 'Poppins', paddingBottom: 4,
          }}>{bottomNav}</div>
        )}
      </div>
    </div>
  );
}

function BottomNavItem({ icon, label, active, activeColor = '#2E7D32', onClick }) {
  return (
    <button onClick={onClick} style={{
      flex: 1, background: 'none', border: 'none', cursor: 'pointer',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      color: active ? activeColor : '#9E9E9E', gap: 2, padding: '6px 0',
      fontFamily: 'Poppins',
    }}>
      <div style={{ fontSize: 19 }}>{icon}</div>
      <div style={{ fontSize: 10, fontWeight: active ? 700 : 500 }}>{label}</div>
      {active && <div style={{ width: 18, height: 2, background: activeColor, borderRadius: 1, marginTop: 1 }}/>}
    </button>
  );
}

function Btn({ children, onClick, color = '#2E7D32', outline, style, size = 'md', full, icon }) {
  const h = size === 'sm' ? 36 : 48;
  const bg = outline ? 'transparent' : color;
  const fg = outline ? color : 'white';
  const border = outline ? `1.5px solid ${color}` : 'none';
  return (
    <button onClick={onClick} style={{
      height: h, background: bg, color: fg, border, borderRadius: 8,
      fontFamily: 'Poppins', fontWeight: 600, fontSize: size === 'sm' ? 13 : 14,
      padding: size === 'sm' ? '0 14px' : '0 20px', cursor: 'pointer',
      width: full ? '100%' : undefined, display: 'inline-flex', alignItems: 'center',
      justifyContent: 'center', gap: 8, transition: 'opacity 0.2s',
      ...style,
    }} onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
       onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
      {icon && <span style={{ fontSize: 16 }}>{icon}</span>}
      {children}
    </button>
  );
}

function Input({ label, value, onChange, placeholder, type = 'text', prefix, suffix, hint, style }) {
  return (
    <div style={{ ...style }}>
      {label && <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>{label}</label>}
      <div style={{
        display: 'flex', alignItems: 'center', height: 48,
        border: '1px solid #BDBDBD', borderRadius: 8, overflow: 'hidden', background: 'white',
      }}>
        {prefix && <div style={{
          padding: '0 12px', height: '100%', display: 'flex', alignItems: 'center',
          background: '#F5F5F5', borderRight: '1px solid #E0E0E0', fontSize: 14, fontWeight: 600, color: '#757575',
        }}>{prefix}</div>}
        <input type={type} value={value} onChange={onChange} placeholder={placeholder} style={{
          flex: 1, border: 'none', outline: 'none', height: '100%', padding: '0 12px',
          fontFamily: 'Poppins', fontSize: 14, background: 'transparent',
        }}/>
        {suffix && <div style={{ padding: '0 12px', color: '#757575', fontSize: 12 }}>{suffix}</div>}
      </div>
      {hint && <div style={{ fontSize: 11, color: '#757575', marginTop: 4 }}>{hint}</div>}
    </div>
  );
}

function Select({ label, value, onChange, options, style }) {
  return (
    <div style={{ ...style }}>
      {label && <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>{label}</label>}
      <select value={value} onChange={(e) => onChange && onChange(e.target.value)} style={{
        width: '100%', height: 48, border: '1px solid #BDBDBD', borderRadius: 8,
        padding: '0 12px', fontFamily: 'Poppins', fontSize: 14, background: 'white',
      }}>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

function Toggle({ on, onChange, color = '#2E7D32' }) {
  return (
    <div onClick={() => onChange && onChange(!on)} style={{
      width: 46, height: 26, borderRadius: 13, background: on ? color : '#BDBDBD',
      position: 'relative', cursor: 'pointer', transition: 'background 0.3s', flexShrink: 0,
    }}>
      <div style={{
        position: 'absolute', top: 3, left: on ? 23 : 3, width: 20, height: 20,
        background: 'white', borderRadius: '50%', transition: 'left 0.3s',
        boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
      }}/>
    </div>
  );
}

function PhotoPlaceholder({ seed = 0, label = 'Waste report photo', style, children }) {
  // Deterministic "photo" — gradient + icon
  const hues = [
    'linear-gradient(135deg, #6B8E5A, #4A6B3E)',
    'linear-gradient(135deg, #8B7355, #5C4A3A)',
    'linear-gradient(135deg, #7A8B9B, #4A5A6A)',
    'linear-gradient(135deg, #9B8B55, #6B5A35)',
    'linear-gradient(135deg, #5A7A8B, #3A5A6B)',
    'linear-gradient(135deg, #8B5A5A, #6B3A3A)',
  ];
  const icons = ['🗑️', '📦', '♻️', '🛢️', '🍂', '🏚️'];
  const idx = ((seed % hues.length) + hues.length) % hues.length;
  return (
    <div style={{
      background: hues[idx], display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: 'rgba(255,255,255,0.7)', fontSize: 32, position: 'relative', overflow: 'hidden',
      ...style,
    }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.15), transparent 50%)' }}/>
      <div style={{ position: 'relative', fontSize: 48 }}>{icons[idx]}</div>
      {children}
    </div>
  );
}

function Avatar({ initials, color = '#2E7D32', size = 36, style }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%', background: color + '22',
      color, display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: size * 0.38, fontWeight: 700, fontFamily: 'Poppins', flexShrink: 0,
      ...style,
    }}>{initials}</div>
  );
}

function Logo({ color = '#2E7D32', size = 24, withLeaf = true }) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 6, color,
      fontSize: size, fontWeight: 800, fontFamily: 'Poppins', letterSpacing: -0.5,
    }}>
      {withLeaf && <span style={{ fontSize: size * 0.9 }}>🌿</span>}
      <span>BAGO.<span style={{ opacity: 0.85 }}>PH</span></span>
    </div>
  );
}

Object.assign(window, {
  COLORS, UL, Card, Badge, PhoneFrame, BottomNavItem, Btn, Input, Select, Toggle,
  PhotoPlaceholder, Avatar, Logo,
});
