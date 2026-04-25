// auth-web.jsx — BAGO.PH web-app authentication screens (1280 × 820)
// Marketing-forward split layout: brand panel (left) + form (right).
// Matches the visual language of resident-web / collector-web consoles.

const AW_GREEN = '#2E7D32';
const AW_GREEN_DEEP = '#1B5E20';
const AW_GREEN_TINT = '#E8F5E9';
const AW_BLUE = '#1565C0';
const AW_NAVY = '#0D1B2A';

/* ─────────────────────────────────────────────────────────────────
   AuthWebShell — shared chrome (topbar + brand panel + footer)
   children renders into the right-side white card area.
   ───────────────────────────────────────────────────────────────── */
function AuthWebShell({ tagline, heroStat, heroStatLabel, heroBullets, footerLeft, children, accent = AW_GREEN }) {
  return (
    <div style={{ width: 1280, height: 820, display: 'flex', flexDirection: 'column', fontFamily: 'Poppins', background: '#F5F5F5', color: '#212121' }}>
      {/* Top nav */}
      <div style={{ height: 56, background: 'white', borderBottom: '1px solid #E0E0E0', display: 'flex', alignItems: 'center', padding: '0 32px', gap: 14, flexShrink: 0 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 17, fontWeight: 800, letterSpacing: -0.3, color: AW_GREEN_DEEP }}>
          <span style={{ fontSize: 18 }}>🌿</span>
          <span>BAGO.<span style={{ color: AW_GREEN }}>PH</span></span>
        </div>
        <div style={{ display: 'flex', gap: 24, marginLeft: 28, fontSize: 13, color: '#757575' }}>
          <span style={{ cursor: 'pointer' }}>How it works</span>
          <span style={{ cursor: 'pointer' }}>For barangays</span>
          <span style={{ cursor: 'pointer' }}>RA 9003</span>
          <span style={{ cursor: 'pointer' }}>Help</span>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12, fontSize: 12, color: '#9E9E9E' }}>
          <span>🇵🇭 English</span>
          <span>·</span>
          <span style={{ cursor: 'pointer' }}>Tagalog</span>
        </div>
      </div>

      {/* Split content */}
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1.05fr', minHeight: 0 }}>
        {/* LEFT — brand panel */}
        <div style={{
          position: 'relative',
          background: `linear-gradient(135deg, ${accent} 0%, ${AW_GREEN_DEEP} 100%)`,
          color: 'white', padding: '56px 64px', display: 'flex', flexDirection: 'column', overflow: 'hidden',
        }}>
          {/* decorative shapes */}
          <svg style={{ position: 'absolute', right: -80, top: -80, width: 380, height: 380, opacity: 0.09 }} viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="90" fill="white"/>
          </svg>
          <svg style={{ position: 'absolute', left: -60, bottom: -60, width: 260, height: 260, opacity: 0.07 }} viewBox="0 0 100 100">
            <path d="M50 5 L95 50 L50 95 L5 50 Z" fill="white"/>
          </svg>
          <svg style={{ position: 'absolute', right: 60, bottom: 120, width: 120, height: 120, opacity: 0.11 }} viewBox="0 0 100 100">
            <path d="M50 15 C30 15, 20 35, 30 55 C35 70, 50 80, 50 90 C50 80, 65 70, 70 55 C80 35, 70 15, 50 15 Z" fill="white"/>
          </svg>

          <div style={{ position: 'relative', fontSize: 11, fontWeight: 700, letterSpacing: 1.2, textTransform: 'uppercase', opacity: 0.85 }}>
            Barangay App for Garbage Operations
          </div>
          <div style={{ position: 'relative', fontSize: 42, fontWeight: 800, letterSpacing: -1, lineHeight: 1.1, marginTop: 18, textWrap: 'pretty' }}>
            {tagline}
          </div>

          {/* Hero stat */}
          <div style={{ position: 'relative', marginTop: 40, display: 'flex', alignItems: 'baseline', gap: 14 }}>
            <div style={{ fontSize: 72, fontWeight: 800, letterSpacing: -3, lineHeight: 1 }}>{heroStat}</div>
            <div style={{ fontSize: 13, opacity: 0.9, lineHeight: 1.4, maxWidth: 220 }}>{heroStatLabel}</div>
          </div>

          {/* Bullets */}
          <div style={{ position: 'relative', marginTop: 40, display: 'flex', flexDirection: 'column', gap: 16 }}>
            {heroBullets.map(([icon, title, sub], i) => (
              <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(255,255,255,0.16)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>{icon}</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{title}</div>
                  <div style={{ fontSize: 12, opacity: 0.82, marginTop: 2, lineHeight: 1.5 }}>{sub}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Compliance strip */}
          <div style={{ position: 'relative', marginTop: 'auto', paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.18)', display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {[
              ['♻️', 'RA 9003', 'Solid Waste Mgmt.'],
              ['🔒', 'RA 10173', 'Data Privacy'],
              ['🏛️', 'DILG', 'MOU-aligned'],
            ].map(([i, c, s], k) => (
              <div key={k} style={{ background: 'rgba(255,255,255,0.1)', borderRadius: 8, padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 14 }}>{i}</span>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700 }}>{c}</div>
                  <div style={{ fontSize: 9, opacity: 0.8 }}>{s}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — form area */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32, overflowY: 'auto' }}>
          {children}
        </div>
      </div>

      {/* Footer */}
      <div style={{ height: 44, background: 'white', borderTop: '1px solid #E0E0E0', display: 'flex', alignItems: 'center', padding: '0 32px', fontSize: 11, color: '#9E9E9E', flexShrink: 0 }}>
        <div>{footerLeft || '© 2026 LGU Lipa City · Piloted with DENR Region IV-A'}</div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 16 }}>
          <span style={{ cursor: 'pointer' }}>Privacy</span>
          <span style={{ cursor: 'pointer' }}>Terms</span>
          <span style={{ cursor: 'pointer' }}>Accessibility</span>
          <span style={{ cursor: 'pointer' }}>Contact</span>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   40 · Web Login — role toggle + credentials + SSO for LGU
   ───────────────────────────────────────────────────────────────── */
function AuthWebLogin() {
  const [role, setRole] = React.useState('Resident');
  const [govEmail, setGovEmail] = React.useState('m.santos@lipacity.gov.ph');
  const [govPassword, setGovPassword] = React.useState('LipaDemo2026!');
  const roles = [
    { key: 'Resident',  icon: '🏠', color: AW_GREEN, desc: 'Households · barangay residents' },
    { key: 'Collector', icon: '🚛', color: AW_BLUE,  desc: 'Field crew · depot operators' },
    { key: 'LGU Admin', icon: '🏛️', color: AW_NAVY,  desc: 'City hall · barangay officials' },
  ];
  const active = roles.find(r => r.key === role);

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

      <div style={{ width: '100%', maxWidth: 440 }}>
        <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: -0.5 }}>Welcome back</div>
        <div style={{ fontSize: 13, color: '#757575', marginTop: 4 }}>Log in to BAGO.PH to manage your household, route, or barangay.</div>

        {/* Role cards */}
        <div style={{ marginTop: 22, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
          {roles.map(r => {
            const on = r.key === role;
            return (
              <button key={r.key} onClick={() => setRole(r.key)} style={{
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
            <Input label="Government email" value={govEmail} onChange={(e) => setGovEmail(e.target.value)} type="email"/>
          ) : (
            <Input label="Mobile number" value="917 543 8821" onChange={() => {}} prefix="+63" type="tel"/>
          )}
          <div>
            <Input label={role === 'LGU Admin' ? 'Password' : 'PIN'} value={role === 'LGU Admin' ? govPassword : '••••'} onChange={role === 'LGU Admin' ? (e) => setGovPassword(e.target.value) : () => {}} type="password" hint={role === 'LGU Admin' ? 'Min. 10 chars · 2FA required next · demo: LipaDemo2026!' : '4-digit PIN'}/>
            <div style={{ textAlign: 'right', marginTop: 6 }}>
              <a style={{ fontSize: 12, color: active.color, fontWeight: 600, cursor: 'pointer' }}>Forgot {role === 'LGU Admin' ? 'password' : 'PIN'}?</a>
            </div>
          </div>

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
            <button style={{ width: '100%', height: 46, background: 'white', border: '1.5px solid #BDBDBD', borderRadius: 8, fontFamily: 'Poppins', fontSize: 13, fontWeight: 600, color: '#424242', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
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

  const [rName, setRName] = React.useState('Maria Santos Dela Cruz');
  const [rMobile, setRMobile] = React.useState('9175438821');
  const [rBrgy, setRBrgy] = React.useState('Brgy. Marawoy');
  const [rCity, setRCity] = React.useState('Lipa City, Batangas');
  const [rStreet, setRStreet] = React.useState('128 Rizal St., Purok 3');
  const [rPin, setRPin] = React.useState('');
  const [rPin2, setRPin2] = React.useState('');

  const [inv, setInv] = React.useState(['2', '0', '7', '1', '4', '2']);
  function setInvIdx(i, v) {
    var d = String(v || '').replace(/\D/g, '').slice(-1);
    setInv(function (prev) { var n = prev.slice(); n[i] = d; return n; });
  }
  const [cName, setCName] = React.useState('Juan Carlos Reyes');
  const [cMobile, setCMobile] = React.useState('9176120042');
  const [cIdType, setCIdType] = React.useState('PhilSys (National ID)');
  const [cIdNum, setCIdNum] = React.useState('');
  const [cPin, setCPin] = React.useState('');
  const [cPin2, setCPin2] = React.useState('');

  const [aName, setAName] = React.useState('Elena R. Mercado');
  const [aPos, setAPos] = React.useState('Senior Environmental Officer');
  const [aEmail, setAEmail] = React.useState('emercado@lipacity.gov.ph');
  const [aCsc, setACsc] = React.useState('2018-LIPA-04217');

  function submitResident() {
    if (String(rName).trim().length < 3) return alert('Enter full name (at least 3 characters).');
    if (String(rPin) !== String(rPin2)) return alert('PIN and confirm PIN must match.');
    var fn = window.BAGOPrototype && window.BAGOPrototype.applyWebRegister;
    if (fn) fn({ role: 'user', mobile: rMobile, pin: rPin, fullName: rName, barangay: rBrgy, city: rCity, street: rStreet });
    else alert('Registration bridge not loaded. Refresh the page.');
  }

  function submitCollector() {
    var code = inv.join('');
    if (!/^\d{6}$/.test(code)) return alert('Enter the 6-digit supervisor invite code (digits only).');
    if (String(cName).trim().length < 3) return alert('Enter full legal name.');
    if (String(cPin) !== String(cPin2)) return alert('PIN and confirm PIN must match.');
    var fn = window.BAGOPrototype && window.BAGOPrototype.applyWebRegister;
    if (fn) fn({ role: 'collector', mobile: cMobile, pin: cPin, fullName: cName, inviteCode: code, idType: cIdType, idNumber: cIdNum });
    else alert('Registration bridge not loaded. Refresh the page.');
  }

  function submitAdmin() {
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

      <div style={{ width: '100%', maxWidth: 560 }} data-bago-active-role={role}>
        {!hideRolePicker && (
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#757575', letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 8 }}>I'm signing up as a…</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8 }}>
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
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 18 }}>
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
                {i < arr.length - 1 && <div style={{ flex: 1, height: 2, background: s === 'done' ? accent : '#E0E0E0' }}/>}
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
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 8 }}>
              <Input label="Full name" value={rName} onChange={(e) => setRName(e.target.value)}/>
              <Input label="Mobile number" value={rMobile} onChange={(e) => setRMobile(e.target.value)} prefix="+63" type="tel" hint="10 digits, e.g. 9175438821"/>
            </div>
            <UL style={{ marginTop: 14, color: AW_GREEN_DEEP }}>Address</UL>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 8 }}>
              <Select label="Barangay" value={rBrgy} onChange={setRBrgy} options={brgyOptions}/>
              <Input label="City" value={rCity} onChange={(e) => setRCity(e.target.value)}/>
            </div>
            <Input label="Street address & purok" value={rStreet} onChange={(e) => setRStreet(e.target.value)} style={{ marginTop: 10 }}/>
            <UL style={{ marginTop: 14, color: AW_GREEN_DEEP }}>Security PIN</UL>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 8 }}>
              <Input label="Create PIN" value={rPin} onChange={(e) => setRPin(e.target.value)} type="password" hint="4 digits"/>
              <Input label="Confirm PIN" value={rPin2} onChange={(e) => setRPin2(e.target.value)} type="password" hint="Match required"/>
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
              <div style={{ fontSize: 11, color: '#757575', marginTop: 4, marginBottom: 10 }}>6-digit code from your supervisor (72 h, single-use). Prototype demo: <strong>207142</strong>.</div>
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
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <Input label="Full legal name" value={cName} onChange={(e) => setCName(e.target.value)}/>
                <Input label="Mobile number" value={cMobile} onChange={(e) => setCMobile(e.target.value)} prefix="+63" type="tel" hint="For OTP after submit"/>
                <Select label="ID type" value={cIdType} onChange={setCIdType} options={idTypeOptions}/>
                <Input label="ID number" value={cIdNum} onChange={(e) => setCIdNum(e.target.value)} hint="As shown on ID"/>
              </div>
              <UL style={{ color: COL_DEEP, marginTop: 14 }}>App PIN (after LGU approves)</UL>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 8 }}>
                <Input label="Create PIN" value={cPin} onChange={(e) => setCPin(e.target.value)} type="password" hint="4 digits"/>
                <Input label="Confirm PIN" value={cPin2} onChange={(e) => setCPin2(e.target.value)} type="password" hint="Match required"/>
              </div>
              {/* Upload tiles */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 12 }}>
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

            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <label style={{ flex: 1, display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 11, color: '#424242', lineHeight: 1.5 }}>
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
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 8 }}>
                <Input label="Full legal name" value={aName} onChange={(e) => setAName(e.target.value)}/>
                <Input label="Position" value={aPos} onChange={(e) => setAPos(e.target.value)}/>
                <Input label="Government email" value={aEmail} onChange={(e) => setAEmail(e.target.value)} type="email"/>
                <Input label="CSC employee no." value={aCsc} onChange={(e) => setACsc(e.target.value)}/>
              </div>
              <UL style={{ color: NAVY, marginTop: 14 }}>Step 3 — 2-factor authentication</UL>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 8 }}>
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

            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <label style={{ flex: 1, display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 11, color: '#424242', lineHeight: 1.5 }}>
                <input type="checkbox" defaultChecked style={{ accentColor: NAVY, marginTop: 2, flexShrink: 0 }}/>
                <span>I understand my actions are <strong>fully audit-logged</strong> and subject to NSWMC review.</span>
              </label>
              <Btn color={NAVY} style={{ minWidth: 220 }} onClick={submitAdmin}>Submit to NSWMC →</Btn>
            </div>
          </div>
        )}
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
  const [mobileDisplay, setMobileDisplay] = React.useState('+63 · · · · · · · · · ·');
  const [debugOtp, setDebugOtp] = React.useState('');

  React.useEffect(function () {
    var pendingMobile = String(localStorage.getItem('bagoPendingMobile') || '').replace(/\D/g, '');
    var pendingOtp = String(localStorage.getItem('bagoPendingOtp') || '');
    if (pendingMobile.length >= 11 && pendingMobile.indexOf('0') === 0) {
      setMobileDisplay('+63 ' + pendingMobile.slice(1, 4) + ' ••• ' + pendingMobile.slice(-4));
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

      <div style={{ width: '100%', maxWidth: 440, textAlign: 'center' }}>
        <div style={{ width: 72, height: 72, borderRadius: 36, background: '#E8F5E9', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 34 }}>📱</div>
        <div style={{ fontSize: 26, fontWeight: 700, marginTop: 18, letterSpacing: -0.5 }}>Verify your number</div>
        <div style={{ fontSize: 13, color: '#757575', marginTop: 6 }}>We sent a 6-digit code to</div>
        <div style={{ fontSize: 15, fontWeight: 700, marginTop: 4 }}>{mobileDisplay}</div>
        <div style={{ marginTop: 8 }}>
          <a href="./auth-web-register.html" style={{ color: AW_GREEN, fontWeight: 600, fontSize: 12, textDecoration: 'none' }}>Change number</a>
        </div>

        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginTop: 28 }}>
          {digits.map((d, i) => (
            <input
              key={i}
              data-otp-digit={i}
              value={d}
              onChange={(e) => onDigitChange(i, e.target.value)}
              onKeyDown={(e) => onDigitKeyDown(i, e)}
              inputMode="numeric"
              maxLength={1}
              style={{
                width: 56, height: 64,
                border: '1.5px solid ' + (d ? AW_GREEN : '#BDBDBD'),
                borderRadius: 10, fontSize: 26, fontWeight: 700, background: d ? '#E8F5E9' : 'white',
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

        <Btn full color={AW_GREEN} style={{ marginTop: 22 }}>Verify & finish registration</Btn>

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
        <div style={{ marginTop: 12, fontSize: 13 }}>
          <a href="./auth-web-register.html" style={{ color: '#757575', fontWeight: 600, textDecoration: 'none' }}>← Back to registration</a>
        </div>
      </div>
    </AuthWebShell>
  );
}

Object.assign(window, {
  AuthWebShell, AuthWebLogin, AuthWebRegister, AuthWebOTP,
  AuthWebRegisterResident, AuthWebRegisterCollector, AuthWebRegisterAdmin,
});
