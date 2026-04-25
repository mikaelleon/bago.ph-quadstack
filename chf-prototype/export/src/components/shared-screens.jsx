// shared-screens.jsx — Login, Register, OTP

function LoginScreen() {
  const [role, setRole] = React.useState('Resident');
  const [mobile, setMobile] = React.useState('917 543 8821');
  const [pin, setPin] = React.useState('••••');
  const roles = ['Resident', 'Collector', 'LGU Admin'];

  return (
    <div style={{ width: 520, background: '#F5F5F5', borderRadius: 12, overflow: 'hidden', fontFamily: 'Poppins', boxShadow: '0 10px 40px rgba(0,0,0,0.12)' }}>
      {/* Navbar */}
      <div style={{ height: 56, background: '#2E7D32', color: 'white', display: 'flex', alignItems: 'center', padding: '0 20px', gap: 10 }}>
        <Logo color="white" size={18}/>
        <div style={{ marginLeft: 'auto', fontSize: 11, opacity: 0.9, letterSpacing: 0.5, textTransform: 'uppercase', fontWeight: 600 }}>Civic Waste Platform</div>
      </div>

      <div style={{ padding: '40px 28px 32px', display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '100%', maxWidth: 420, background: 'white', borderRadius: 12, padding: 28, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <div style={{ textAlign: 'center' }}>
            <Logo size={28}/>
            <div style={{ fontSize: 12, color: '#757575', marginTop: 6 }}>Barangay App for Garbage Operations</div>
          </div>

          <div style={{ display: 'flex', gap: 6, marginTop: 22, background: '#F5F5F5', padding: 4, borderRadius: 8 }}>
            {roles.map(r => (
              <button key={r} onClick={() => setRole(r)} style={{
                flex: 1, height: 38, background: role === r ? 'white' : 'transparent',
                border: role === r ? '1.5px solid #2E7D32' : '1.5px solid transparent',
                borderRadius: 6, fontFamily: 'Poppins', fontWeight: 600, fontSize: 12,
                color: role === r ? '#2E7D32' : '#757575', cursor: 'pointer',
              }}>{r}</button>
            ))}
          </div>

          <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
            <Input label="Mobile number" value={mobile} onChange={e => setMobile(e.target.value)} prefix="+63" type="tel"/>
            <Input label="PIN" value={pin} onChange={e => setPin(e.target.value)} type="password" hint="4-digit PIN"/>
          </div>

          <div style={{ textAlign: 'right', marginTop: 8 }}>
            <a style={{ fontSize: 12, color: '#2E7D32', fontWeight: 600, cursor: 'pointer' }}>Forgot PIN?</a>
          </div>

          <Btn full style={{ marginTop: 16 }}>Log in</Btn>

          <div style={{ textAlign: 'center', marginTop: 18, fontSize: 13, color: '#757575' }}>
            Don't have an account? <a style={{ color: '#2E7D32', fontWeight: 600, cursor: 'pointer' }}>Register now</a>
          </div>
        </div>
      </div>

      <div style={{ background: '#1B5E20', color: 'rgba(255,255,255,0.85)', padding: '14px 20px', fontSize: 11, textAlign: 'center', lineHeight: 1.5 }}>
        ♻️ Compliant with <strong style={{ color: 'white' }}>RA 9003</strong> — Ecological Solid Waste Management Act · <strong style={{ color: 'white' }}>RA 10173</strong> Data Privacy
      </div>
    </div>
  );
}

function RegisterScreen() {
  return (
    <div style={{ width: 920, background: '#F5F5F5', padding: 28, fontFamily: 'Poppins', borderRadius: 12 }}>
      <div style={{ textAlign: 'center', marginBottom: 22 }}>
        <Logo size={24}/>
        <h1 style={{ fontSize: 22, fontWeight: 700, margin: '10px 0 4px' }}>Create your account</h1>
        <div style={{ fontSize: 13, color: '#757575' }}>Join your barangay's waste management community.</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 20 }}>
        {/* LEFT — form */}
        <div style={{ background: 'white', borderRadius: 12, padding: 24, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
          <UL>Personal details</UL>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginTop: 12 }}>
            <Input label="Full name" value="Maria Santos Dela Cruz" onChange={() => {}}/>
            <Input label="Mobile number" value="917 543 8821" onChange={() => {}} prefix="+63" type="tel"/>
          </div>

          <UL style={{ marginTop: 20 }}>Address</UL>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginTop: 12 }}>
            <Select label="Barangay" value="Brgy. Marawoy" onChange={() => {}} options={['Brgy. Marawoy', 'Brgy. San Sebastian', 'Brgy. Balintawak', 'Brgy. Tambo', 'Brgy. Dagatan']}/>
            <Input label="City" value="Lipa City, Batangas" onChange={() => {}}/>
          </div>
          <Input label="Street address" value="128 Rizal St., Purok 3" onChange={() => {}} style={{ marginTop: 14 }}/>

          <UL style={{ marginTop: 20 }}>Security</UL>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginTop: 12 }}>
            <Input label="Create PIN" value="••••" onChange={() => {}} type="password" hint="4 digits"/>
            <Input label="Confirm PIN" value="••••" onChange={() => {}} type="password"/>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginTop: 20, padding: 12, background: '#E8F5E9', borderRadius: 8 }}>
            <input type="checkbox" defaultChecked style={{ marginTop: 2, accentColor: '#2E7D32' }}/>
            <div style={{ fontSize: 12, color: '#1B5E20', lineHeight: 1.5 }}>
              I agree to the BAGO.PH terms and consent to data processing under <strong>RA 10173</strong> for civic waste management purposes.
            </div>
          </div>

          <Btn full style={{ marginTop: 18 }}>Continue to verification</Btn>
        </div>

        {/* RIGHT — benefits */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ background: 'white', borderRadius: 12, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', borderTop: '4px solid #2E7D32' }}>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>What you'll get</div>
            {[
              ['Unique Household ID', 'Registered to your barangay'],
              ['Printable QR card', 'For collector scanning'],
              ['Eco-points wallet', 'Earn rewards for compliance'],
              ['Schedule alerts', 'SMS + push notifications'],
              ['Report issues directly', 'Barangay officials notified'],
            ].map(([title, sub], i) => (
              <div key={i} style={{ display: 'flex', gap: 10, padding: '10px 0', borderBottom: i < 4 ? '1px solid #F5F5F5' : 'none' }}>
                <div style={{ width: 22, height: 22, borderRadius: 11, background: '#E8F5E9', color: '#2E7D32', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800, flexShrink: 0 }}>✓</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{title}</div>
                  <div style={{ fontSize: 11, color: '#757575', marginTop: 2 }}>{sub}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ background: '#E8F5E9', borderRadius: 12, padding: 16 }}>
            <UL style={{ color: '#1B5E20' }}>Your household ID will be</UL>
            <div style={{ fontFamily: 'ui-monospace, Menlo', fontSize: 16, color: '#1B5E20', fontWeight: 700, marginTop: 6, letterSpacing: 0.5 }}>BAGO-MARA-2025-00142</div>
            <div style={{ fontSize: 11, color: '#1B5E20', opacity: 0.75, marginTop: 4 }}>Brgy. Marawoy · Lipa City</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function OTPScreen() {
  const digits = ['8', '3', '1', '', '', ''];
  return (
    <div style={{ width: 460, background: 'white', borderRadius: 12, padding: '36px 32px', fontFamily: 'Poppins', boxShadow: '0 10px 40px rgba(0,0,0,0.12)' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 48 }}>📱</div>
        <h1 style={{ fontSize: 22, fontWeight: 700, margin: '12px 0 4px' }}>Verify your number</h1>
        <div style={{ fontSize: 13, color: '#757575' }}>We sent a 6-digit code to</div>
        <div style={{ fontSize: 14, fontWeight: 700, marginTop: 4 }}>+63 917 ••• 8821</div>
      </div>

      <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginTop: 26 }}>
        {digits.map((d, i) => (
          <div key={i} style={{
            width: 48, height: 56, border: `1.5px solid ${d ? '#2E7D32' : '#BDBDBD'}`,
            borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 22, fontWeight: 700, background: d ? '#E8F5E9' : 'white',
            color: d ? '#1B5E20' : '#212121',
            boxShadow: !d && i === 3 ? '0 0 0 2px rgba(46,125,50,0.25)' : 'none',
          }}>{d}</div>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: 20, fontSize: 13, color: '#757575' }}>
        Didn't receive it? <a style={{ color: '#BDBDBD', fontWeight: 600, textDecoration: 'line-through' }}>Resend code</a>
        <span style={{ marginLeft: 8, fontSize: 12, color: '#2E7D32', fontWeight: 600 }}>in 0:42</span>
      </div>

      <Btn full style={{ marginTop: 20 }}>Verify and continue</Btn>

      <div style={{ textAlign: 'center', marginTop: 14, fontSize: 12, color: '#757575' }}>
        Wrong number? <a style={{ color: '#2E7D32', fontWeight: 600, cursor: 'pointer' }}>Go back</a>
      </div>
    </div>
  );
}

Object.assign(window, { LoginScreen, RegisterScreen, OTPScreen });
