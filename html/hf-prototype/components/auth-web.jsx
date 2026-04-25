// auth-web.jsx — BAGO.PH web-app authentication (responsive: full viewport + stacked hero on narrow screens)

const AW_GREEN = '#2E7D32';
const AW_GREEN_DEEP = '#1B5E20';
const AW_GREEN_TINT = '#E8F5E9';
const AW_BLUE = '#1565C0';
const AW_NAVY = '#0D1B2A';

/** Injected once — layout + breakpoints for all AuthWeb* screens */
const AUTH_WEB_SHELL_CSS = `
.auth-web-root{width:100%;max-width:100vw;min-height:100vh;min-height:100dvh;box-sizing:border-box;display:flex;flex-direction:column;overflow-x:hidden;font-family:Poppins,system-ui,sans-serif;background:#F5F5F5;color:#212121;}
.auth-web-topnav{display:flex;align-items:center;padding:0 clamp(16px,4vw,32px);gap:12px;flex-shrink:0;min-height:56px;flex-wrap:wrap;background:#fff;border-bottom:1px solid #E0E0E0;box-sizing:border-box;}
.auth-web-topnav-logo{display:inline-flex;align-items:center;gap:6px;font-size:clamp(15px,3.8vw,17px);font-weight:800;letter-spacing:-0.03em;color:${AW_GREEN_DEEP};}
.auth-web-nav-mid{display:flex;gap:24px;margin-left:28px;font-size:13px;color:#757575;}
.auth-web-lang{margin-left:auto;display:flex;align-items:center;gap:12px;font-size:12px;color:#9E9E9E;}
.auth-web-split{flex:1;min-height:0;display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.05fr);width:100%;}
.auth-web-hero{position:relative;display:flex;flex-direction:column;overflow:hidden;box-sizing:border-box;min-width:0;color:#fff;padding:clamp(24px,5vw,56px) clamp(20px,5vw,64px);}
.auth-web-hero-kicker{position:relative;font-size:11px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;opacity:0.85;}
.auth-web-hero-tagline{position:relative;font-weight:800;letter-spacing:-0.03em;line-height:1.1;text-wrap:pretty;margin-top:18px;font-size:clamp(1.25rem,4.2vw,2.625rem);}
.auth-web-hero-stat-row{position:relative;margin-top:clamp(20px,4vw,40px);display:flex;align-items:baseline;gap:14px;flex-wrap:wrap;}
.auth-web-hero-stat-num{font-weight:800;letter-spacing:-0.05em;line-height:1;font-size:clamp(2.25rem,11vw,4.5rem);}
.auth-web-hero-stat-label{font-size:13px;opacity:0.9;line-height:1.4;max-width:min(220px,100%);flex:1;min-width:min(160px,100%);}
.auth-web-hero-bullets{position:relative;margin-top:clamp(20px,4vw,40px);display:flex;flex-direction:column;gap:16px;}
.auth-web-form-col{display:flex;align-items:flex-start;justify-content:center;padding:clamp(20px,4vw,32px);overflow-y:auto;min-width:0;box-sizing:border-box;width:100%;}
.auth-web-footer{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;min-height:44px;padding:10px clamp(16px,4vw,32px);background:#fff;border-top:1px solid #E0E0E0;font-size:11px;color:#9E9E9E;flex-shrink:0;box-sizing:border-box;}
.auth-web-footer-links{display:flex;flex-wrap:wrap;gap:12px 16px;margin-left:auto;}
.auth-web-form-inner{width:100%;max-width:440px;box-sizing:border-box;}
.auth-web-form-inner-wide{max-width:560px;}
.auth-web-welcome-title{font-size:clamp(1.35rem,4.5vw,1.625rem);font-weight:700;letter-spacing:-0.03em;}
.auth-web-role-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;}
.auth-web-two-col{display:grid;grid-template-columns:1fr 1fr;gap:10px;}
.auth-web-stepper{display:flex;align-items:center;gap:8px;margin-top:18px;flex-wrap:wrap;overflow-x:auto;padding-bottom:4px;-webkit-overflow-scrolling:touch;}
.auth-web-stepper-sep{flex:1;min-width:12px;height:2px;background:#E0E0E0;}
.auth-web-otp-row{display:flex;gap:clamp(6px,2vw,10px);justify-content:center;flex-wrap:wrap;margin-top:28px;max-width:100%;}
.auth-web-otp-digit{width:clamp(40px,11vw,56px);height:clamp(52px,14vw,64px);box-sizing:border-box;}
@media (max-width:960px){
  .auth-web-nav-mid{display:none;}
  .auth-web-split{grid-template-columns:1fr;display:flex;flex-direction:column;}
  .auth-web-form-col{order:-1;flex:1 1 auto;padding-top:16px;}
  .auth-web-hero{flex:0 1 auto;}
}
@media (max-width:520px){
  .auth-web-role-grid{grid-template-columns:1fr;}
  .auth-web-two-col{grid-template-columns:1fr;}
}
`;

/* ─────────────────────────────────────────────────────────────────
   AuthWebShell — shared chrome (topbar + brand panel + footer)
   children renders into the right-side white card area.
   ───────────────────────────────────────────────────────────────── */
function AuthWebShell({ tagline, heroStat, heroStatLabel, heroBullets, footerLeft, children, accent = AW_GREEN }) {
  return (
    <React.Fragment>
      <style dangerouslySetInnerHTML={{ __html: AUTH_WEB_SHELL_CSS }} />
      <div className="auth-web-root">
        <header className="auth-web-topnav">
          <div className="auth-web-topnav-logo">
            <span style={{ fontSize: 18 }}>🌿</span>
            <span>BAGO.<span style={{ color: AW_GREEN }}>PH</span></span>
          </div>
          <nav className="auth-web-nav-mid" aria-label="Marketing">
            <span style={{ cursor: 'pointer' }}>How it works</span>
            <span style={{ cursor: 'pointer' }}>For barangays</span>
            <span style={{ cursor: 'pointer' }}>RA 9003</span>
            <span style={{ cursor: 'pointer' }}>Help</span>
          </nav>
          <div className="auth-web-lang">
            <span>🇵🇭 English</span>
            <span>·</span>
            <span style={{ cursor: 'pointer' }}>Tagalog</span>
          </div>
        </header>

        <div className="auth-web-split">
          <div
            className="auth-web-hero"
            style={{ background: `linear-gradient(135deg, ${accent} 0%, ${AW_GREEN_DEEP} 100%)` }}
          >
            <svg style={{ position: 'absolute', right: -80, top: -80, width: 380, height: 380, opacity: 0.09, pointerEvents: 'none' }} viewBox="0 0 200 200" aria-hidden>
              <circle cx="100" cy="100" r="90" fill="white"/>
            </svg>
            <svg style={{ position: 'absolute', left: -60, bottom: -60, width: 260, height: 260, opacity: 0.07, pointerEvents: 'none' }} viewBox="0 0 100 100" aria-hidden>
              <path d="M50 5 L95 50 L50 95 L5 50 Z" fill="white"/>
            </svg>
            <svg style={{ position: 'absolute', right: 60, bottom: 120, width: 120, height: 120, opacity: 0.11, pointerEvents: 'none' }} viewBox="0 0 100 100" aria-hidden>
              <path d="M50 15 C30 15, 20 35, 30 55 C35 70, 50 80, 50 90 C50 80, 65 70, 70 55 C80 35, 70 15, 50 15 Z" fill="white"/>
            </svg>

            <div className="auth-web-hero-kicker">Barangay App for Garbage Operations</div>
            <div className="auth-web-hero-tagline">{tagline}</div>

            <div className="auth-web-hero-stat-row">
              <div className="auth-web-hero-stat-num">{heroStat}</div>
              <div className="auth-web-hero-stat-label">{heroStatLabel}</div>
            </div>

            <div className="auth-web-hero-bullets">
              {heroBullets.map(([icon, title, sub], i) => (
                <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <div style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(255,255,255,0.16)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>{icon}</div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{title}</div>
                    <div style={{ fontSize: 12, opacity: 0.82, marginTop: 2, lineHeight: 1.5 }}>{sub}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ position: 'relative', marginTop: 'auto', paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.18)', display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {[
                ['♻️', 'RA 9003', 'Solid Waste Mgmt.'],
                ['🔒', 'RA 10173', 'Data Privacy'],
                ['🏛️', 'DILG', 'MOU-aligned'],
              ].map(([ic, c, s], k) => (
                <div key={k} style={{ background: 'rgba(255,255,255,0.1)', borderRadius: 8, padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 14 }}>{ic}</span>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 700 }}>{c}</div>
                    <div style={{ fontSize: 9, opacity: 0.8 }}>{s}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="auth-web-form-col">
            {children}
          </div>
        </div>

        <footer className="auth-web-footer">
          <div>{footerLeft || '© 2026 LGU Lipa City · Piloted with DENR Region IV-A'}</div>
          <div className="auth-web-footer-links">
            <span style={{ cursor: 'pointer' }}>Privacy</span>
            <span style={{ cursor: 'pointer' }}>Terms</span>
            <span style={{ cursor: 'pointer' }}>Accessibility</span>
            <span style={{ cursor: 'pointer' }}>Contact</span>
          </div>
        </footer>
      </div>
    </React.Fragment>
  );
}

/* ─────────────────────────────────────────────────────────────────
   40 · Web Login — role toggle + credentials + SSO for LGU
   ───────────────────────────────────────────────────────────────── */
function AuthWebLogin() {
  const [role, setRole] = React.useState('Resident');
  const [govEmail, setGovEmail] = React.useState('');
  const [govPassword, setGovPassword] = React.useState('');
  const [mobile, setMobile] = React.useState('');
  const [pin, setPin] = React.useState('');
  const roles = [
    { key: 'Resident',  icon: '🏠', color: AW_GREEN, desc: 'Households · barangay residents' },
    { key: 'Collector', icon: '🚛', color: AW_BLUE,  desc: 'Field crew · depot operators' },
    { key: 'LGU Admin', icon: '🏛️', color: AW_NAVY,  desc: 'City hall · barangay officials' },
  ];
  const active = roles.find(r => r.key === role);

  function onMobileDigits(e) {
    var d = String(e.target.value || '').replace(/\D/g, '').slice(0, 10);
    setMobile(d);
  }
  function onPinDigits(e) {
    var d = String(e.target.value || '').replace(/\D/g, '').slice(0, 4);
    setPin(d);
  }

  return (
    <AuthWebShell
      accent={active.color}
      tagline="Clean barangays, built on data and community."
      heroStat="142,850"
      heroStatLabel="households already enrolled across 18 pilot barangays in Lipa City."
      heroBullets={[
        ['📅', 'Pickup schedules that never surprise you', 'SMS + push alerts the evening before every collection.'],
        ['🌿', 'Earn eco-points for compliance',            'Redeem for GCash, mobile data, or groceries at partner sariling tindahan.'],
        ['📸', 'Report illegal dumping in 30 seconds',       'Photos, GPS, and status updates all in one place.'],
      ]}>

      <div className="auth-web-form-inner">
        <div className="auth-web-welcome-title">Welcome back</div>
        <div style={{ fontSize: 13, color: '#757575', marginTop: 4 }}>Log in to BAGO.PH to manage your household, route, or barangay.</div>

        {/* Role cards */}
        <div className="auth-web-role-grid" style={{ marginTop: 22 }}>
          {roles.map(r => {
            const on = r.key === role;
            return (
              <button type="button" key={r.key} onClick={() => setRole(r.key)} style={{
                background: on ? 'white' : '#FAFAFA',
                border: on ? `2px solid ${r.color}` : '1.5px solid #E0E0E0',
                borderRadius: 10, padding: '14px 10px', cursor: 'pointer',
                fontFamily: 'Poppins', textAlign: 'center',
                boxShadow: on ? `0 2px 10px ${r.color}22` : 'none',
                transition: 'all 0.15s',
              }}>
                <div style={{ fontSize: 22 }}>{r.icon}</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: on ? r.color : '#424242', marginTop: 6 }}>{r.key}</div>
              </button>
            );
          })}
        </div>
        <div style={{ fontSize: 11, color: '#9E9E9E', marginTop: 8, textAlign: 'center' }}>{active.desc}</div>

        {/* Form */}
        <div style={{ marginTop: 22, display: 'flex', flexDirection: 'column', gap: 14 }}>
          {role === 'LGU Admin' ? (
            <>
              <Input label="Government email" value={govEmail} onChange={(e) => setGovEmail(e.target.value)} type="email" placeholder="name@lipacity.gov.ph"/>
              <div>
                <Input label="Password" value={govPassword} onChange={(e) => setGovPassword(e.target.value)} type="password" placeholder="Enter password" hint="Min. 10 characters · 2FA after sign-in · prototype demo: m.santos@lipacity.gov.ph / LipaDemo2026!"/>
                <div style={{ textAlign: 'right', marginTop: 6 }}>
                  <a style={{ fontSize: 12, color: active.color, fontWeight: 600, cursor: 'pointer' }}>Forgot password?</a>
                </div>
              </div>
            </>
          ) : (
            <>
              <Input label="Mobile number" value={mobile} onChange={onMobileDigits} prefix="+63" type="tel" placeholder="9171234567" hint="10 digits after +63"/>
              <div>
                <Input label="PIN" value={pin} onChange={onPinDigits} type="password" placeholder="4-digit PIN" hint="4-digit PIN"/>
                <div style={{ textAlign: 'right', marginTop: 6 }}>
                  <a style={{ fontSize: 12, color: active.color, fontWeight: 600, cursor: 'pointer' }}>Forgot PIN?</a>
                </div>
              </div>
            </>
          )}

          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: '#616161', cursor: 'pointer' }}>
            <input type="checkbox" defaultChecked style={{ accentColor: active.color, width: 14, height: 14 }}/>
            Keep me signed in on this device
          </label>
        </div>

        <Btn full color={active.color} style={{ marginTop: 14 }}>Log in to {role}</Btn>

        {role === 'LGU Admin' && (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '18px 0', color: '#BDBDBD', fontSize: 11, fontWeight: 600 }}>
              <div style={{ flex: 1, height: 1, background: '#E0E0E0' }}/>OR<div style={{ flex: 1, height: 1, background: '#E0E0E0' }}/>
            </div>
            <button type="button" style={{ width: '100%', height: 46, background: 'white', border: '1.5px solid #BDBDBD', borderRadius: 8, fontFamily: 'Poppins', fontSize: 13, fontWeight: 600, color: '#424242', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
              🏛️ Continue with GovPH SSO
            </button>
          </>
        )}

        <div style={{ textAlign: 'center', marginTop: 20, fontSize: 13, color: '#757575' }}>
          New to BAGO.PH?{' '}
          <a href="./auth-web-register.html" style={{ color: active.color, fontWeight: 700, cursor: 'pointer', textDecoration: 'none' }}>Register household →</a>
        </div>
        <div style={{ textAlign: 'center', marginTop: 10, fontSize: 12, color: '#9E9E9E', lineHeight: 1.65 }}>
          <a href="./auth-web-register-collector.html" style={{ color: AW_BLUE, fontWeight: 600, cursor: 'pointer', textDecoration: 'none' }}>Collector enrollment</a>
          {' · '}
          <a href="./auth-web-register-lgu.html" style={{ color: AW_NAVY, fontWeight: 600, cursor: 'pointer', textDecoration: 'none' }}>LGU admin enrollment</a>
        </div>
        <div style={{ textAlign: 'center', marginTop: 8 }}>
          <button
            type="button"
            data-bago-demo-creds="1"
            style={{ border: 'none', background: 'transparent', color: active.color, fontSize: 12, fontWeight: 700, cursor: 'pointer', textDecoration: 'underline' }}
          >
            Demo credentials
          </button>
        </div>
      </div>
    </AuthWebShell>
  );
}

/* ─────────────────────────────────────────────────────────────────
   41 · Web Register — stepper + full form + side summary
   ───────────────────────────────────────────────────────────────── */
function AuthWebRegister({ initialRole = 'resident', hideRolePicker = false } = {}) {
  const [role, setRole] = React.useState(initialRole);
  const COL = '#1565C0', COL_DEEP = '#0D47A1', COL_TINT = '#E3F2FD';
  const NAVY = '#0D1B2A', NAVY_TINT = '#E8EAF0';
  const accent = role === 'collector' ? COL : role === 'admin' ? NAVY : AW_GREEN;

  // Hero changes per role
  const heroByRole = {
    resident: {
      tagline: 'Your barangay ID, a QR card, and eco-points — in 3 minutes.',
      heroStat: '3 min',
      heroStatLabel: 'average time to register · verification via SMS OTP. No office visit needed.',
      bullets: [
        ['🪪', 'Unique household ID (e.g. BAGO-MARA-2025-00142)', 'Printable QR card that collectors scan at pickup.'],
        ['💸', 'Free forever for residents',                      'Your LGU funds BAGO.PH under the SWM plan.'],
        ['🔒', 'Your data stays in the Philippines',              'RA 10173-compliant processing · opt-out any time.'],
      ],
    },
    collector: {
      tagline: 'Collector accounts are issued by your LGU substation supervisor.',
      heroStat: 'Invite-only',
      heroStatLabel: 'You\'ll need a 6-digit invite code from your supervisor + your government ID.',
      bullets: [
        ['📨', 'Get an invite from your substation supervisor', 'Codes expire after 72 hours and one use.'],
        ['🪪', 'Verify with PhilSys or driver\'s license',       'Photo + selfie liveness check. Done in 5 minutes.'],
        ['👮', 'Manual approval by LGU within 24 hours',         'You\'ll get a text once your account is active.'],
      ],
    },
    admin: {
      tagline: 'LGU admin access is restricted — register only with explicit authorization.',
      heroStat: 'Mayor-signed',
      heroStatLabel: 'Office Order required · NSWMC verifies your appointment before account creation.',
      bullets: [
        ['🏛️', 'PhilGov SSO is the recommended path',              'No password to manage. Audit-logged on every access.'],
        ['📜', 'Office Order from Mayor or ENRO required',          'Uploaded as PDF — kept on file for audits.'],
        ['🛡️', '2-factor authentication enforced from day one',     'Hardware key supported. SMS fallback available.'],
      ],
    },
  };
  const hero = heroByRole[role];

  const brgyOptions = ['Brgy. Marawoy', 'Brgy. San Sebastian', 'Brgy. Balintawak', 'Brgy. Tambo', 'Brgy. Dagatan'];
  const idTypeOptions = ['PhilSys (National ID)', 'Driver\'s license', 'PRC license', 'Postal ID'];

  React.useEffect(function () {
    if (hideRolePicker) setRole(initialRole);
  }, [hideRolePicker, initialRole]);

  const [rName, setRName] = React.useState('');
  const [rMobile, setRMobile] = React.useState('');
  const [rBrgy, setRBrgy] = React.useState('');
  const [rCity, setRCity] = React.useState('');
  const [rStreet, setRStreet] = React.useState('');
  const [rPin, setRPin] = React.useState('');
  const [rPin2, setRPin2] = React.useState('');

  const [inv, setInv] = React.useState(['', '', '', '', '', '']);
  function setInvIdx(i, v) {
    var d = String(v || '').replace(/\D/g, '').slice(-1);
    setInv(function (prev) { var n = prev.slice(); n[i] = d; return n; });
  }
  const [cName, setCName] = React.useState('');
  const [cMobile, setCMobile] = React.useState('');
  const [cIdType, setCIdType] = React.useState('');
  const [cIdNum, setCIdNum] = React.useState('');
  const [cPin, setCPin] = React.useState('');
  const [cPin2, setCPin2] = React.useState('');

  const [aName, setAName] = React.useState('');
  const [aPos, setAPos] = React.useState('');
  const [aEmail, setAEmail] = React.useState('');
  const [aCsc, setACsc] = React.useState('');

  function submitResident() {
    if (String(rName).trim().length < 3) return alert('Enter full name (at least 3 characters).');
    if (!String(rBrgy).trim()) return alert('Select barangay.');
    if (String(rCity).trim().length < 2) return alert('Enter city / municipality.');
    if (String(rStreet).trim().length < 3) return alert('Enter street address and purok.');
    var mob = String(rMobile || '').replace(/\D/g, '');
    if (mob.length !== 10) return alert('Enter 10-digit mobile number (after +63).');
    if (String(rPin) !== String(rPin2)) return alert('PIN and confirm PIN must match.');
    var fn = window.BAGOPrototype && window.BAGOPrototype.applyWebRegister;
    if (fn) fn({ role: 'user', mobile: rMobile, pin: rPin, fullName: rName, barangay: rBrgy, city: rCity, street: rStreet });
    else alert('Registration bridge not loaded. Refresh the page.');
  }

  function submitCollector() {
    var code = inv.join('');
    if (!/^\d{6}$/.test(code)) return alert('Enter the 6-digit supervisor invite code (digits only).');
    if (String(cName).trim().length < 3) return alert('Enter full legal name.');
    if (!String(cIdType).trim()) return alert('Select ID type.');
    var cm = String(cMobile || '').replace(/\D/g, '');
    if (cm.length !== 10) return alert('Enter 10-digit mobile number (after +63).');
    if (String(cPin) !== String(cPin2)) return alert('PIN and confirm PIN must match.');
    var fn = window.BAGOPrototype && window.BAGOPrototype.applyWebRegister;
    if (fn) fn({ role: 'collector', mobile: cMobile, pin: cPin, fullName: cName, inviteCode: code, idType: cIdType, idNumber: cIdNum });
    else alert('Registration bridge not loaded. Refresh the page.');
  }

  function submitAdmin() {
    if (String(aName).trim().length < 3) return alert('Enter full legal name.');
    if (String(aPos).trim().length < 2) return alert('Enter position or title.');
    var em = String(aEmail || '').trim();
    if (!em || em.indexOf('@') < 1) return alert('Enter valid government email.');
    if (String(aCsc).trim().length < 3) return alert('Enter CSC employee number.');
    var fn = window.BAGOPrototype && window.BAGOPrototype.submitLGUAdminApplication;
    if (fn) fn({ email: aEmail, fullName: aName, position: aPos, cscNo: aCsc });
    else alert('Registration bridge not loaded. Refresh the page.');
  }

  return (
    <AuthWebShell
      tagline={hero.tagline}
      heroStat={hero.heroStat}
      heroStatLabel={hero.heroStatLabel}
      heroBullets={hero.bullets}
      accent={accent}>

      <div className="auth-web-form-inner auth-web-form-inner-wide" data-bago-active-role={role}>
        {!hideRolePicker && (
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#757575', letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 8 }}>I'm signing up as a…</div>
          <div className="auth-web-role-grid">
            {[
              ['resident',  '🏠', 'Resident',  'Self-serve · OTP only'],
              ['collector', '🚛', 'Collector', 'Invite + ID required'],
              ['admin',     '🏛️', 'LGU Admin', 'Office Order required'],
            ].map(([id, ic, l, sub]) => {
              const on = role === id;
              const c = id === 'collector' ? COL : id === 'admin' ? NAVY : AW_GREEN;
              return (
                <button type="button" key={id} onClick={() => setRole(id)} style={{
                  padding: '12px 10px', textAlign: 'left',
                  background: on ? (id === 'collector' ? COL_TINT : id === 'admin' ? NAVY_TINT : '#E8F5E9') : 'white',
                  border: on ? `2px solid ${c}` : '1.5px solid #E0E0E0',
                  borderRadius: 8, cursor: 'pointer', fontFamily: 'Poppins', transition: 'all 0.15s',
                }}>
                  <div style={{ fontSize: 18 }}>{ic}</div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: on ? c : '#212121', marginTop: 4 }}>{l}</div>
                  <div style={{ fontSize: 10, color: '#757575', marginTop: 2 }}>{sub}</div>
                </button>
              );
            })}
          </div>
        </div>
        )}
        {hideRolePicker && (
          <div style={{ fontSize: 12, fontWeight: 700, color: '#757575', marginBottom: 4 }}>
            {initialRole === 'collector' ? '🚛 Collector enrollment' : '🏛️ LGU admin enrollment'}
          </div>
        )}

        {/* Step indicator */}
        <div className="auth-web-stepper">
          {(role === 'resident'
            ? [[1, 'Account', 'done'], [2, 'Address', 'done'], [3, 'Security', 'current'], [4, 'OTP', 'pending']]
            : role === 'collector'
              ? [[1, 'Invite code', 'done'], [2, 'Identity', 'current'], [3, 'OTP', 'pending'], [4, 'LGU approval', 'pending']]
              : [[1, 'Office Order', 'done'], [2, 'PhilGov SSO', 'current'], [3, '2FA setup', 'pending'], [4, 'NSWMC review', 'pending']]
          ).map(([n, l, s], i, arr) => {
            const active = s === 'done' || s === 'current';
            return (
              <React.Fragment key={n}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{
                    width: 22, height: 22, borderRadius: 11,
                    background: active ? accent : '#E0E0E0',
                    color: active ? 'white' : '#9E9E9E',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 10, fontWeight: 700,
                    boxShadow: s === 'current' ? `0 0 0 3px ${accent}22` : 'none',
                  }}>{s === 'done' ? '✓' : n}</div>
                  <span style={{ fontSize: 11, fontWeight: s === 'current' ? 700 : 500, color: active ? '#212121' : '#9E9E9E' }}>{l}</span>
                </div>
                {i < arr.length - 1 && <div className="auth-web-stepper-sep" style={{ background: s === 'done' ? accent : '#E0E0E0' }}/>}
              </React.Fragment>
            );
          })}
        </div>

        {/* RESIDENT FORM */}
        {role === 'resident' && (
          <div style={{ marginTop: 18, background: 'white', borderRadius: 12, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
            <div style={{ fontSize: 17, fontWeight: 700 }}>Create your household account</div>
            <div style={{ fontSize: 12, color: '#757575', marginTop: 2 }}>Step 3 of 4 — one form, then a quick SMS verification.</div>

            <UL style={{ marginTop: 16, color: AW_GREEN_DEEP }}>Personal details</UL>
            <div className="auth-web-two-col" style={{ marginTop: 8 }}>
              <Input label="Full name" value={rName} onChange={(e) => setRName(e.target.value)} placeholder="Maria Santos Dela Cruz"/>
              <Input label="Mobile number" value={rMobile} onChange={(e) => setRMobile(e.target.value)} prefix="+63" type="tel" placeholder="9171234567" hint="10 digits after +63"/>
            </div>
            <UL style={{ marginTop: 14, color: AW_GREEN_DEEP }}>Address</UL>
            <div className="auth-web-two-col" style={{ marginTop: 8 }}>
              <Select label="Barangay" value={rBrgy} onChange={setRBrgy} options={brgyOptions} placeholder="Select barangay"/>
              <Input label="City" value={rCity} onChange={(e) => setRCity(e.target.value)} placeholder="Lipa City, Batangas"/>
            </div>
            <Input label="Street address & purok" value={rStreet} onChange={(e) => setRStreet(e.target.value)} style={{ marginTop: 10 }} placeholder="House no., street, purok"/>
            <UL style={{ marginTop: 14, color: AW_GREEN_DEEP }}>Security PIN</UL>
            <div className="auth-web-two-col" style={{ marginTop: 8 }}>
              <Input label="Create PIN" value={rPin} onChange={(e) => setRPin(e.target.value)} type="password" hint="4 digits" placeholder="••••"/>
              <Input label="Confirm PIN" value={rPin2} onChange={(e) => setRPin2(e.target.value)} type="password" hint="Match required" placeholder="••••"/>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginTop: 14, padding: 10, background: AW_GREEN_TINT, borderRadius: 8 }}>
              <input type="checkbox" defaultChecked style={{ marginTop: 2, accentColor: AW_GREEN, width: 14, height: 14, flexShrink: 0 }}/>
              <div style={{ fontSize: 11, color: AW_GREEN_DEEP, lineHeight: 1.5 }}>
                I agree to the <strong>BAGO.PH terms</strong> and consent to data processing under <strong>RA 10173</strong>.
              </div>
            </div>
            <div style={{ display: 'flex', gap: 12, marginTop: 14, alignItems: 'center' }}>
              <div style={{ flex: 1, background: AW_GREEN_TINT, borderRadius: 8, padding: '10px 12px' }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: AW_GREEN_DEEP, letterSpacing: 0.5, textTransform: 'uppercase' }}>Household ID will be</div>
                <div style={{ fontFamily: 'ui-monospace, Menlo', fontSize: 13, color: AW_GREEN_DEEP, fontWeight: 700, marginTop: 2 }}>BAGO-MARA-2026-00203</div>
              </div>
              <Btn type="button" color={AW_GREEN} onClick={submitResident}>Continue → Verify</Btn>
            </div>
          </div>
        )}

        {/* COLLECTOR FORM */}
        {role === 'collector' && (
          <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ background: COL_TINT, borderRadius: 10, padding: 14, borderLeft: `3px solid ${COL}`, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <div style={{ fontSize: 20 }}>🛡️</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: COL_DEEP }}>Why this is more locked-down</div>
                <div style={{ fontSize: 11, color: COL_DEEP, opacity: 0.85, marginTop: 3, lineHeight: 1.5 }}>
                  Collectors scan QR codes and award eco-points. A fake collector account could mark phantom pickups and steal points. We verify your identity against your LGU substation roster before activating.
                </div>
              </div>
            </div>

            <div style={{ background: 'white', borderRadius: 12, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
              <UL style={{ color: COL_DEEP }}>Step 1 — Substation invite code</UL>
              <div style={{ fontSize: 11, color: '#757575', marginTop: 4, marginBottom: 10 }}>6-digit code from your supervisor (72 h, single-use). Prototype accepts demo code <strong>207142</strong>.</div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
                {inv.map((d, i) => (
                  <input
                    key={i}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={d}
                    onChange={(e) => setInvIdx(i, e.target.value)}
                    style={{
                      width: 44, height: 52, border: `2px solid ${COL}`, borderRadius: 8, textAlign: 'center',
                      fontSize: 22, fontWeight: 700, fontFamily: 'ui-monospace, Menlo', background: COL_TINT, color: COL_DEEP,
                    }}
                  />
                ))}
                <div style={{ flex: 1, minWidth: 80 }}/>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center' }}>
                  {inv.join('').length === 6 && /^\d{6}$/.test(inv.join('')) ? (
                    <>
                      <span style={{ background: '#E8F5E9', color: '#1B5E20', fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 999 }}>✓ Format OK</span>
                      <div style={{ fontSize: 10, color: '#757575', marginTop: 4 }}>LGU validates code + roster on submit</div>
                    </>
                  ) : (
                    <span style={{ background: '#FFF8E1', color: '#8D6E0F', fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 999 }}>Enter 6 digits</span>
                  )}
                </div>
              </div>
            </div>

            <div style={{ background: 'white', borderRadius: 12, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
              <UL style={{ color: COL_DEEP }}>Step 2 — Identity verification</UL>
              <div style={{ fontSize: 11, color: '#757575', marginTop: 4, marginBottom: 12 }}>Upload one government-issued ID. We verify against your substation roster.</div>
              <div className="auth-web-two-col">
                <Input label="Full legal name" value={cName} onChange={(e) => setCName(e.target.value)} placeholder="Juan Carlos Reyes"/>
                <Input label="Mobile number" value={cMobile} onChange={(e) => setCMobile(e.target.value)} prefix="+63" type="tel" placeholder="9171234567" hint="For OTP after submit"/>
                <Select label="ID type" value={cIdType} onChange={setCIdType} options={idTypeOptions} placeholder="Select ID type"/>
                <Input label="ID number" value={cIdNum} onChange={(e) => setCIdNum(e.target.value)} hint="As shown on ID" placeholder="ID number on document"/>
              </div>
              <UL style={{ color: COL_DEEP, marginTop: 14 }}>App PIN (after LGU approves)</UL>
              <div className="auth-web-two-col" style={{ marginTop: 8 }}>
                <Input label="Create PIN" value={cPin} onChange={(e) => setCPin(e.target.value)} type="password" hint="4 digits" placeholder="••••"/>
                <Input label="Confirm PIN" value={cPin2} onChange={(e) => setCPin2(e.target.value)} type="password" hint="Match required" placeholder="••••"/>
              </div>
              {/* Upload tiles */}
              <div className="auth-web-two-col" style={{ marginTop: 12 }}>
                {[
                  ['ID front',   '#E8F5E9', '#1B5E20', '✓ Verified · OCR match',  'philsys-front.jpg · 2.1 MB'],
                  ['Selfie',     '#E8F5E9', '#1B5E20', '✓ Liveness passed',       'selfie-001.jpg · 1.8 MB'],
                ].map(([t, bg, fg, ok, fn], i) => (
                  <div key={i} style={{ background: bg, borderRadius: 8, padding: 12, border: `1px dashed ${fg}66` }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 32, height: 32, borderRadius: 6, background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, color: fg }}>{i === 0 ? '🪪' : '🤳'}</div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 12, fontWeight: 700, color: fg }}>{t}</div>
                        <div style={{ fontSize: 10, color: fg, opacity: 0.75 }}>{ok}</div>
                      </div>
                    </div>
                    <div style={{ fontSize: 10, color: '#757575', marginTop: 6, fontFamily: 'ui-monospace, Menlo' }}>{fn}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 12, padding: 10, background: '#FFF8E1', borderRadius: 6, borderLeft: '3px solid #F9A825', fontSize: 11, color: '#6D4C1B', lineHeight: 1.5 }}>
                After OTP, your supervisor receives a notification. <strong>Account activates within 24 hours</strong> after they confirm. You'll get a text.
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
              <label style={{ flex: '1 1 220px', display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 11, color: '#424242', lineHeight: 1.5 }}>
                <input type="checkbox" defaultChecked style={{ accentColor: COL, marginTop: 2, flexShrink: 0 }}/>
                <span>I confirm the information is accurate and consent to identity verification under <strong>RA 10173</strong>.</span>
              </label>
              <Btn color={COL} style={{ minWidth: 200 }} onClick={submitCollector}>Submit for review →</Btn>
            </div>
          </div>
        )}

        {/* ADMIN FORM */}
        {role === 'admin' && (
          <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ background: '#FFEBEE', borderRadius: 10, padding: 14, borderLeft: '3px solid #C62828', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <div style={{ fontSize: 20 }}>🛡️</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#B71C1C' }}>Restricted access · audit-logged</div>
                <div style={{ fontSize: 11, color: '#B71C1C', opacity: 0.9, marginTop: 3, lineHeight: 1.5 }}>
                  LGU admin accounts have full visibility into resident data and can issue points adjustments. We require an Office Order signed by the Mayor or ENRO. NSWMC reviews and activates within 1 business day.
                </div>
              </div>
            </div>

            <div style={{ background: 'white', borderRadius: 12, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
              <UL style={{ color: NAVY }}>Recommended — PhilGov SSO</UL>
              <button type="button" onClick={() => alert('PhilGov SSO would open here (philgov.gov.ph). Use manual route below for this prototype.')} style={{ width: '100%', height: 56, marginTop: 8, background: NAVY, color: 'white', border: 'none', borderRadius: 8, fontFamily: 'Poppins', fontWeight: 700, fontSize: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
                <span style={{ fontSize: 22 }}>🏛️</span>
                <span>Continue with PhilGov SSO</span>
                <span style={{ fontSize: 10, opacity: 0.7, fontWeight: 500 }}>(philgov.gov.ph)</span>
              </button>
              <div style={{ fontSize: 11, color: '#757575', marginTop: 8, lineHeight: 1.5 }}>
                Single sign-on for government employees. No new password to manage. Your appointment is verified against the CSC roster automatically.
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ flex: 1, height: 1, background: '#E0E0E0' }}/>
              <div style={{ fontSize: 10, color: '#9E9E9E', letterSpacing: 0.6, textTransform: 'uppercase', fontWeight: 600 }}>or manual route</div>
              <div style={{ flex: 1, height: 1, background: '#E0E0E0' }}/>
            </div>

            <div style={{ background: 'white', borderRadius: 12, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
              <UL style={{ color: NAVY }}>Step 1 — Office Order</UL>
              <div style={{ fontSize: 11, color: '#757575', marginTop: 4, marginBottom: 12 }}>Upload the order signed by the Mayor or ENRO designating you as LGU admin.</div>
              <div style={{ background: NAVY_TINT, borderRadius: 8, padding: 14, border: `1px dashed ${NAVY}66`, display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 40, height: 48, background: 'white', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>📄</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: NAVY }}>OO-2026-117 Designation of LGU Admin.pdf</div>
                  <div style={{ fontSize: 10, color: '#757575', marginTop: 2 }}>Uploaded · 482 KB · Signed by Mayor J. Magsaysay (Apr 18)</div>
                </div>
                <span style={{ background: '#E8F5E9', color: '#1B5E20', fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 999 }}>✓ Verified</span>
              </div>
              <UL style={{ color: NAVY, marginTop: 16 }}>Step 2 — Your details</UL>
              <div className="auth-web-two-col" style={{ marginTop: 8 }}>
                <Input label="Full legal name" value={aName} onChange={(e) => setAName(e.target.value)} placeholder="Elena R. Mercado"/>
                <Input label="Position" value={aPos} onChange={(e) => setAPos(e.target.value)} placeholder="Senior Environmental Officer"/>
                <Input label="Government email" value={aEmail} onChange={(e) => setAEmail(e.target.value)} type="email" placeholder="name@lipacity.gov.ph"/>
                <Input label="CSC employee no." value={aCsc} onChange={(e) => setACsc(e.target.value)} placeholder="e.g. 2018-LIPA-04217"/>
              </div>
              <UL style={{ color: NAVY, marginTop: 14 }}>Step 3 — 2-factor authentication</UL>
              <div className="auth-web-two-col" style={{ marginTop: 8 }}>
                <label style={{ background: NAVY_TINT, padding: 12, borderRadius: 8, cursor: 'pointer', border: `2px solid ${NAVY}`, display: 'flex', alignItems: 'center', gap: 10 }}>
                  <input type="radio" name="2fa" defaultChecked style={{ accentColor: NAVY }}/>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: NAVY }}>🔑 Hardware key</div>
                    <div style={{ fontSize: 10, color: '#757575', marginTop: 2 }}>YubiKey · Titan · recommended</div>
                  </div>
                </label>
                <label style={{ background: 'white', padding: 12, borderRadius: 8, cursor: 'pointer', border: '1.5px solid #E0E0E0', display: 'flex', alignItems: 'center', gap: 10 }}>
                  <input type="radio" name="2fa" style={{ accentColor: NAVY }}/>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700 }}>📱 Authenticator app</div>
                    <div style={{ fontSize: 10, color: '#757575', marginTop: 2 }}>Google Authenticator · Authy</div>
                  </div>
                </label>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
              <label style={{ flex: '1 1 220px', display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 11, color: '#424242', lineHeight: 1.5 }}>
                <input type="checkbox" defaultChecked style={{ accentColor: NAVY, marginTop: 2, flexShrink: 0 }}/>
                <span>I understand my actions are <strong>fully audit-logged</strong> and subject to NSWMC review.</span>
              </label>
              <Btn color={NAVY} style={{ minWidth: 220 }} onClick={submitAdmin}>Submit to NSWMC →</Btn>
            </div>
          </div>
        )}

        <div style={{ marginTop: 24, paddingTop: 16, borderTop: '1px solid #E0E0E0', fontSize: 13, textAlign: 'center', color: '#757575', lineHeight: 1.8 }}>
          <a href="./auth-web-login.html" style={{ color: accent, fontWeight: 700, textDecoration: 'none' }}>← Sign in</a>
          {!hideRolePicker ? (
            <span>
              {' · '}
              <a href="./auth-web-register-collector.html" style={{ color: COL, fontWeight: 600, textDecoration: 'none' }}>Collector sign-up</a>
              {' · '}
              <a href="./auth-web-register-lgu.html" style={{ color: NAVY, fontWeight: 600, textDecoration: 'none' }}>LGU admin</a>
            </span>
          ) : initialRole === 'collector' ? (
            <span>
              {' · '}
              <a href="./auth-web-register.html" style={{ color: AW_GREEN, fontWeight: 600, textDecoration: 'none' }}>Resident sign-up</a>
              {' · '}
              <a href="./auth-web-register-lgu.html" style={{ color: NAVY, fontWeight: 600, textDecoration: 'none' }}>LGU admin</a>
            </span>
          ) : (
            <span>
              {' · '}
              <a href="./auth-web-register.html" style={{ color: AW_GREEN, fontWeight: 600, textDecoration: 'none' }}>Resident sign-up</a>
              {' · '}
              <a href="./auth-web-register-collector.html" style={{ color: COL, fontWeight: 600, textDecoration: 'none' }}>Collector sign-up</a>
            </span>
          )}
        </div>
      </div>
    </AuthWebShell>
  );
}

/* Wrapper variants for the canvas */
function AuthWebRegisterResident()  { return <AuthWebRegister initialRole="resident" hideRolePicker={false} />; }
function AuthWebRegisterCollector() { return <AuthWebRegister initialRole="collector" hideRolePicker />; }
function AuthWebRegisterAdmin()     { return <AuthWebRegister initialRole="admin" hideRolePicker />; }

/* ─────────────────────────────────────────────────────────────────
   42 · Web OTP — 6 digit input + timer + fallback
   ───────────────────────────────────────────────────────────────── */
function AuthWebOTP() {
  const [digits, setDigits] = React.useState(['', '', '', '', '', '']);
  const [mobileDisplay, setMobileDisplay] = React.useState('—');
  const [debugOtp, setDebugOtp] = React.useState('');

  React.useEffect(function () {
    var pendingMobile = String(localStorage.getItem('bagoPendingMobile') || '').replace(/\D/g, '');
    var pendingOtp = String(localStorage.getItem('bagoPendingOtp') || '');
    if (pendingMobile.length >= 11 && pendingMobile.indexOf('0') === 0) {
      setMobileDisplay('+63 ' + pendingMobile.slice(1, 4) + ' ••• ' + pendingMobile.slice(-4));
    } else {
      setMobileDisplay('Complete registration to receive a code at your number.');
    }
    if ((location.hostname === 'localhost' || location.hostname === '127.0.0.1') && /^\d{6}$/.test(pendingOtp)) {
      setDebugOtp(pendingOtp);
    }
  }, []);

  function onDigitChange(index, value) {
    var next = String(value || '').replace(/\D/g, '').slice(0, 1);
    var copy = digits.slice();
    copy[index] = next;
    setDigits(copy);
    if (next && index < 5) {
      var nxt = document.querySelector('[data-otp-digit="' + (index + 1) + '"]');
      if (nxt) nxt.focus();
    }
  }

  function onDigitKeyDown(index, event) {
    if (event.key === 'Backspace' && !digits[index] && index > 0) {
      var prev = document.querySelector('[data-otp-digit="' + (index - 1) + '"]');
      if (prev) prev.focus();
    }
  }

  function verifyOtp() {
    var expected = String(localStorage.getItem('bagoPendingOtp') || '');
    var got = digits.join('');
    if (got.length !== 6) {
      window.alert('Enter all 6 digits of the code.');
      return;
    }
    if (expected && got !== expected) {
      window.alert('Invalid OTP. On localhost, check the browser console for the test code.');
      return;
    }
    localStorage.removeItem('bagoPendingOtp');
    var r = String(localStorage.getItem('bagoRole') || 'user').toLowerCase().replace(/\s+/g, '_');
    var home = r === 'collector' ? './dashboard-collector.html' : r === 'lgu_officer' ? './dashboard-lgu.html' : './dashboard-resident.html';
    window.location.href = home;
  }

  return (
    <AuthWebShell
      tagline="One more step — verify it's really you."
      heroStat="99.4%"
      heroStatLabel="of SMS codes deliver within 10 seconds via our Globe + Smart integration."
      heroBullets={[
        ['📶', 'Works on any network',          'Globe · Smart · Sun · DITO · PLDT mobile.'],
        ['⏱', 'Auto-expires in 5 minutes',      'Codes are single-use and hashed at rest.'],
        ['🛟', 'Stuck? Call your barangay desk', 'In-office registration available as fallback.'],
      ]}>

      <div className="auth-web-form-inner" style={{ textAlign: 'center' }}>
        <div style={{ width: 72, height: 72, maxWidth: '100%', borderRadius: 36, background: '#E8F5E9', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 34 }}>📱</div>
        <div className="auth-web-welcome-title" style={{ marginTop: 18 }}>Verify your number</div>
        <div style={{ fontSize: 13, color: '#757575', marginTop: 6 }}>We sent a 6-digit code to</div>
        <div style={{ fontSize: 15, fontWeight: 700, marginTop: 4, wordBreak: 'break-word', padding: '0 4px' }}>{mobileDisplay}</div>
        <div style={{ marginTop: 8 }}>
          <a href="./auth-web-register.html" style={{ color: AW_GREEN, fontWeight: 600, fontSize: 12, textDecoration: 'none' }}>Change number</a>
        </div>

        <div className="auth-web-otp-row">
          {digits.map((d, i) => (
            <input
              key={i}
              data-otp-digit={i}
              className="auth-web-otp-digit"
              value={d}
              onChange={(e) => onDigitChange(i, e.target.value)}
              onKeyDown={(e) => onDigitKeyDown(i, e)}
              inputMode="numeric"
              maxLength={1}
              style={{
                border: '1.5px solid ' + (d ? AW_GREEN : '#BDBDBD'),
                borderRadius: 10, fontSize: 'clamp(18px, 5vw, 26px)', fontWeight: 700, background: d ? '#E8F5E9' : 'white',
                color: d ? AW_GREEN_DEEP : '#212121', fontFamily: 'ui-monospace, Menlo', textAlign: 'center', outline: 'none',
              }}
            />
          ))}
        </div>

        {debugOtp && (
          <div style={{ marginTop: 12, fontSize: 12, color: '#1B5E20', background: '#E8F5E9', border: '1px dashed #66BB6A', borderRadius: 8, padding: '8px 10px' }}>
            Localhost test OTP: <strong>{debugOtp}</strong>
          </div>
        )}

        <div style={{ marginTop: 20, fontSize: 13, color: '#757575' }}>
          Didn't receive it? <span style={{ color: '#BDBDBD', textDecoration: 'line-through' }}>Resend code</span>
          <span style={{ marginLeft: 10, fontSize: 12, color: AW_GREEN, fontWeight: 700 }}>in 0:42</span>
        </div>

        <Btn full color={AW_GREEN} style={{ marginTop: 22 }} onClick={verifyOtp}>Verify & finish registration</Btn>

        {/* Alternate channels */}
        <div style={{ marginTop: 22, padding: 14, background: '#FAFAFA', borderRadius: 10, border: '1px solid #E0E0E0', textAlign: 'left' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#424242', letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 8 }}>Having trouble?</div>
          {[
            ['📞', 'Get the code by voice call', '(Takes up to 30 seconds)'],
            ['🏛️', 'Register at your barangay hall', 'Mon–Fri · 8 am – 5 pm · bring valid ID'],
          ].map(([i, t, s], k) => (
            <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderTop: k === 0 ? 'none' : '1px solid #F0F0F0', cursor: 'pointer' }}>
              <span style={{ fontSize: 18 }}>{i}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{t}</div>
                <div style={{ fontSize: 11, color: '#757575', marginTop: 1 }}>{s}</div>
              </div>
              <span style={{ color: '#BDBDBD' }}>›</span>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 18, fontSize: 12, color: '#9E9E9E' }}>
          🔒 Your code is single-use and expires in 5 minutes.
        </div>
        <div style={{ marginTop: 12, fontSize: 13, display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'center' }}>
          <a href="./auth-web-register.html" style={{ color: '#757575', fontWeight: 600, textDecoration: 'none' }}>← Back to registration</a>
          <a href="./auth-web-login.html" style={{ color: AW_GREEN, fontWeight: 600, textDecoration: 'none' }}>← Sign in instead</a>
        </div>
      </div>
    </AuthWebShell>
  );
}

Object.assign(window, {
  AuthWebShell, AuthWebLogin, AuthWebRegister, AuthWebOTP,
  AuthWebRegisterResident, AuthWebRegisterCollector, AuthWebRegisterAdmin,
});
