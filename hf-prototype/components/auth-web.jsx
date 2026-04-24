// auth-web.jsx — BAGO.PH web-app authentication screens (1280 × 820)
// Marketing-forward split layout: brand panel (left) + form (right).
// Matches the visual language of resident-web / collector-web consoles.

const AW_GREEN = '#2E7D32';
const AW_GREEN_DEEP = '#1B5E20';
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
            <Input label="Government email" value="m.santos@lipacity.gov.ph" onChange={() => {}} type="email"/>
          ) : (
            <Input label="Mobile number" value="917 543 8821" onChange={() => {}} prefix="+63" type="tel"/>
          )}
          <div>
            <Input label={role === 'LGU Admin' ? 'Password' : 'PIN'} value={role === 'LGU Admin' ? '••••••••••' : '••••'} onChange={() => {}} type="password" hint={role === 'LGU Admin' ? 'Min. 10 chars · 2FA required next' : '4-digit PIN'}/>
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
          New to BAGO.PH? <a style={{ color: active.color, fontWeight: 700, cursor: 'pointer' }}>Register your household →</a>
        </div>
      </div>
    </AuthWebShell>
  );
}

/* ─────────────────────────────────────────────────────────────────
   41 · Web Register — stepper + full form + side summary
   ───────────────────────────────────────────────────────────────── */
function AuthWebRegister() {
  return (
    <AuthWebShell
      tagline="Your barangay ID, a QR card, and eco-points — in 3 minutes."
      heroStat="3 min"
      heroStatLabel="average time to register · verification via SMS OTP. No office visit needed."
      heroBullets={[
        ['🪪', 'Unique household ID (e.g. BAGO-MARA-2025-00142)', 'Printable QR card that collectors scan at pickup.'],
        ['💸', 'Free forever for residents',                      'Your LGU funds BAGO.PH under the SWM plan.'],
        ['🔒', 'Your data stays in the Philippines',              'RA 10173-compliant processing · opt-out any time.'],
      ]}>

      <div style={{ width: '100%', maxWidth: 540 }}>
        {/* Stepper */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
          {[
            [1, 'Account',    'active'],
            [2, 'Address',    'active'],
            [3, 'Security',   'current'],
            [4, 'Verify OTP', 'pending'],
          ].map(([n, l, s], i) => {
            const active = s === 'active' || s === 'current';
            return (
              <React.Fragment key={n}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{
                    width: 26, height: 26, borderRadius: 13,
                    background: active ? AW_GREEN : '#E0E0E0',
                    color: active ? 'white' : '#9E9E9E',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 12, fontWeight: 700,
                    boxShadow: s === 'current' ? `0 0 0 4px ${AW_GREEN}22` : 'none',
                  }}>{s === 'active' ? '✓' : n}</div>
                  <span style={{ fontSize: 12, fontWeight: s === 'current' ? 700 : 500, color: active ? '#212121' : '#9E9E9E' }}>{l}</span>
                </div>
                {i < 3 && <div style={{ flex: 1, height: 2, background: s === 'active' ? AW_GREEN : '#E0E0E0' }}/>}
              </React.Fragment>
            );
          })}
        </div>

        <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: -0.5 }}>Create your household account</div>
        <div style={{ fontSize: 13, color: '#757575', marginTop: 4 }}>Step 3 of 4 — one form, then a quick SMS verification.</div>

        {/* Form */}
        <div style={{ marginTop: 22, background: 'white', borderRadius: 12, padding: 22, boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
          <UL style={{ color: AW_GREEN_DEEP }}>Personal details</UL>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 10 }}>
            <Input label="Full name" value="Maria Santos Dela Cruz" onChange={() => {}}/>
            <Input label="Mobile number" value="917 543 8821" onChange={() => {}} prefix="+63" type="tel"/>
          </div>

          <UL style={{ marginTop: 18, color: AW_GREEN_DEEP }}>Address</UL>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 10 }}>
            <Select label="Barangay" value="Brgy. Marawoy" onChange={() => {}} options={['Brgy. Marawoy', 'Brgy. San Sebastian', 'Brgy. Balintawak', 'Brgy. Tambo', 'Brgy. Dagatan']}/>
            <Input label="City" value="Lipa City, Batangas" onChange={() => {}}/>
          </div>
          <Input label="Street address & purok" value="128 Rizal St., Purok 3" onChange={() => {}} style={{ marginTop: 12 }}/>

          <UL style={{ marginTop: 18, color: AW_GREEN_DEEP }}>Security PIN</UL>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 10 }}>
            <Input label="Create PIN" value="••••" onChange={() => {}} type="password" hint="4 digits"/>
            <Input label="Confirm PIN" value="••••" onChange={() => {}} type="password" hint="Match required"/>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginTop: 18, padding: 12, background: '#E8F5E9', borderRadius: 8 }}>
            <input type="checkbox" defaultChecked style={{ marginTop: 2, accentColor: AW_GREEN, width: 14, height: 14, flexShrink: 0 }}/>
            <div style={{ fontSize: 12, color: AW_GREEN_DEEP, lineHeight: 1.5 }}>
              I agree to the <strong>BAGO.PH terms</strong> and consent to data processing under <strong>RA 10173</strong> for civic waste management. I understand my household ID is public within my barangay.
            </div>
          </div>
        </div>

        {/* Preview card + CTAs */}
        <div style={{ display: 'flex', gap: 14, marginTop: 16, alignItems: 'center' }}>
          <div style={{ flex: 1, background: '#E8F5E9', borderRadius: 10, padding: '12px 14px' }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: AW_GREEN_DEEP, letterSpacing: 0.5, textTransform: 'uppercase' }}>Your household ID will be</div>
            <div style={{ fontFamily: 'ui-monospace, Menlo', fontSize: 14, color: AW_GREEN_DEEP, fontWeight: 700, marginTop: 2 }}>BAGO-MARA-2025-00142</div>
          </div>
          <Btn color={AW_GREEN} style={{ minWidth: 180 }}>Continue → Verify</Btn>
        </div>
      </div>
    </AuthWebShell>
  );
}

/* ─────────────────────────────────────────────────────────────────
   42 · Web OTP — 6 digit input + timer + fallback
   ───────────────────────────────────────────────────────────────── */
function AuthWebOTP() {
  const digits = ['8', '3', '1', '', '', ''];

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
        <div style={{ fontSize: 15, fontWeight: 700, marginTop: 4 }}>+63 917 ••• 8821 &nbsp;·&nbsp; <a style={{ color: AW_GREEN, fontWeight: 600, fontSize: 12, cursor: 'pointer' }}>Change number</a></div>

        {/* OTP boxes */}
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginTop: 28 }}>
          {digits.map((d, i) => (
            <div key={i} style={{
              width: 56, height: 64,
              border: `1.5px solid ${d ? AW_GREEN : i === 3 ? AW_GREEN : '#BDBDBD'}`,
              borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 26, fontWeight: 700, background: d ? '#E8F5E9' : 'white',
              color: d ? AW_GREEN_DEEP : '#212121',
              boxShadow: !d && i === 3 ? `0 0 0 3px ${AW_GREEN}33` : 'none',
              fontFamily: 'ui-monospace, Menlo',
            }}>{d || (i === 3 && <span style={{ width: 2, height: 26, background: AW_GREEN, animation: 'none' }}/>)}</div>
          ))}
        </div>

        {/* Resend */}
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
      </div>
    </AuthWebShell>
  );
}

Object.assign(window, { AuthWebShell, AuthWebLogin, AuthWebRegister, AuthWebOTP });
