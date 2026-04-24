// resident-screens.jsx — All 10 resident screens

const RES = '#2E7D32';
const RES_DEEP = '#1B5E20';
const RES_TINT = '#E8F5E9';

function ResidentBottomNav({ active, onChange }) {
  const items = [
    ['home', '🏠', 'Home'],
    ['schedule', '📅', 'Schedule'],
    ['report', '📸', 'Report'],
    ['rewards', '🎁', 'Rewards'],
    ['profile', '👤', 'Profile'],
  ];
  return <>{items.map(([id, icon, label]) => (
    <BottomNavItem key={id} icon={icon} label={label} active={active === id}
      activeColor={RES} onClick={() => onChange && onChange(id)}/>
  ))}</>;
}

// ─── 4. Home ─────────────────────────────────────────────────────────
function ResidentHome() {
  return (
    <PhoneFrame topColor={RES} title="BAGO.PH" bottomNav={<ResidentBottomNav active="home"/>}>
      <div style={{ padding: 16 }}>
        {/* Greeting */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Avatar initials="MD" color={RES} size={44}/>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 18, fontWeight: 700 }}>Hello, Maria! 👋</div>
            <div style={{ fontSize: 12, color: '#757575', marginTop: 2 }}>📍 Brgy. Marawoy, Lipa City</div>
          </div>
        </div>

        {/* Chips */}
        <div style={{ display: 'flex', gap: 8, marginTop: 16, overflowX: 'auto' }}>
          <div style={{ background: RES, color: 'white', padding: '8px 12px', borderRadius: 20, fontSize: 12, fontWeight: 600, whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: 6 }}>
            📅 Pickup Thu, Apr 24
          </div>
          <div style={{ background: '#E3F2FD', color: '#0D47A1', padding: '8px 12px', borderRadius: 20, fontSize: 12, fontWeight: 600, whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: 6 }}>
            🌿 240 pts
          </div>
          <div style={{ background: '#F5F5F5', color: '#757575', padding: '8px 12px', borderRadius: 20, fontSize: 12, fontWeight: 600, whiteSpace: 'nowrap' }}>
            2 open reports
          </div>
        </div>

        {/* Feature grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 18 }}>
          {[
            ['📅', 'Schedule', 'This week', RES],
            ['📸', 'Report issue', 'Earn +15 pts', '#1565C0'],
            ['🌿', 'My wallet', '240 eco-pts', RES],
            ['🏆', 'Leaderboard', '#4 in brgy', '#1565C0'],
          ].map(([icon, title, sub, accent], i) => (
            <div key={i} style={{
              background: 'white', borderRadius: 8, padding: 14, borderLeft: `4px solid ${accent}`,
              boxShadow: '0 1px 3px rgba(0,0,0,0.08)', cursor: 'pointer',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ fontSize: 24 }}>{icon}</div>
                <div style={{ fontSize: 16, color: '#BDBDBD' }}>›</div>
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, marginTop: 8 }}>{title}</div>
              <div style={{ fontSize: 11, color: '#757575', marginTop: 2 }}>{sub}</div>
            </div>
          ))}
        </div>

        {/* Announcement */}
        <UL style={{ marginTop: 20, marginBottom: 8 }}>📢 Latest Announcement</UL>
        <Card accent={RES}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <div style={{ fontSize: 11, color: '#2E7D32', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.3 }}>Brgy. Marawoy Office</div>
            <div style={{ fontSize: 11, color: '#9E9E9E' }}>2h ago</div>
          </div>
          <div style={{ fontSize: 14, fontWeight: 700, marginTop: 6 }}>Segregation drive this Saturday</div>
          <div style={{ fontSize: 12, color: '#757575', marginTop: 4, lineHeight: 1.5 }}>
            Join the barangay clean-up at the covered court, April 26, 6:00 am. Free compost starter kit for the first 50 households.
          </div>
        </Card>
      </div>
    </PhoneFrame>
  );
}

// ─── 5. Schedule ─────────────────────────────────────────────────────
function ResidentSchedule() {
  const days = [
    { d: 'Mon', n: 21, dot: '🟢', active: false },
    { d: 'Tue', n: 22, dot: '🔵', active: false },
    { d: 'Wed', n: 23, dot: '🟢', active: true },
    { d: 'Thu', n: 24, dot: '🔵', active: false },
    { d: 'Fri', n: 25, dot: '♻️', active: false },
    { d: 'Sat', n: 26, dot: '🟢', active: false },
    { d: 'Sun', n: 27, dot: '—', active: false },
  ];
  const sched = [
    { brgy: 'Marawoy · Purok 3', type: '🟢 Biodegradable', day: 'Wed, Apr 23', time: '7:00 – 9:00 am', status: 'scheduled', label: 'Scheduled' },
    { brgy: 'Marawoy · Purok 3', type: '🔵 Non-biodegradable', day: 'Thu, Apr 24', time: '7:00 – 9:00 am', status: 'updated', label: 'Updated' },
    { brgy: 'Marawoy · Purok 3', type: '♻️ Recyclables', day: 'Fri, Apr 25', time: '8:00 – 10:00 am', status: 'scheduled', label: 'Scheduled' },
    { brgy: 'Marawoy · Purok 3', type: '🟢 Biodegradable', day: 'Sat, Apr 26', time: '7:00 – 9:00 am', status: 'scheduled', label: 'Scheduled' },
  ];
  return (
    <PhoneFrame topColor={RES} title="📅 Schedule" bottomNav={<ResidentBottomNav active="schedule"/>}>
      <div style={{ padding: 16 }}>
        <div style={{ fontSize: 12, color: '#757575' }}>Brgy. Marawoy · Week of Apr 21</div>

        {/* Alert */}
        <div style={{
          marginTop: 12, background: '#FFF8E1', borderLeft: '4px solid #F9A825',
          color: '#5D4037', borderRadius: '0 8px 8px 0', padding: '12px 14px', fontSize: 13, lineHeight: 1.5,
        }}>
          <strong>⚠️ Schedule updated:</strong> Wednesday's non-biodegradable pickup moved to <strong>Thursday, Apr 24</strong>.
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
          <Select value="Brgy. Marawoy" onChange={() => {}} options={['Brgy. Marawoy', 'Brgy. San Sebastian']} style={{ flex: 1 }}/>
          <Select value="All types" onChange={() => {}} options={['All types', 'Biodegradable', 'Non-biodegradable', 'Recyclables']} style={{ flex: 1 }}/>
        </div>

        {/* Week strip */}
        <div style={{ display: 'flex', gap: 6, marginTop: 14, overflowX: 'auto', paddingBottom: 4 }}>
          {days.map((d, i) => (
            <div key={i} style={{
              minWidth: 44, padding: '10px 6px', borderRadius: 10, textAlign: 'center',
              background: d.active ? RES : 'white',
              color: d.active ? 'white' : '#212121',
              boxShadow: '0 1px 3px rgba(0,0,0,0.08)', fontFamily: 'Poppins', cursor: 'pointer',
            }}>
              <div style={{ fontSize: 10, opacity: d.active ? 0.9 : 0.6, fontWeight: 600 }}>{d.d}</div>
              <div style={{ fontSize: 16, fontWeight: 700, marginTop: 2 }}>{d.n}</div>
              <div style={{ fontSize: 11, marginTop: 3 }}>{d.dot}</div>
            </div>
          ))}
        </div>

        {/* Schedule cards */}
        <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {sched.map((s, i) => (
            <div key={i} style={{ background: 'white', borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
              <div style={{ background: RES, color: 'white', padding: '8px 14px', fontSize: 12, fontWeight: 700 }}>
                {s.brgy}
              </div>
              <div style={{ padding: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{s.type}</div>
                  <Badge kind={s.status}>{s.label}</Badge>
                </div>
                <div style={{ display: 'flex', gap: 14, marginTop: 8, fontSize: 12, color: '#757575' }}>
                  <span>📅 {s.day}</span>
                  <span>🕐 {s.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PhoneFrame>
  );
}

// ─── 6. Report ───────────────────────────────────────────────────────
function ResidentReport() {
  return (
    <PhoneFrame topColor={RES} title="📸 Report" bottomNav={<ResidentBottomNav active="report"/>}>
      <div style={{ padding: 16 }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, margin: 0 }}>Report a waste issue</h1>

        <div style={{ marginTop: 12, background: RES_TINT, borderLeft: `4px solid ${RES}`, padding: '12px 14px', borderRadius: '0 8px 8px 0', fontSize: 13, color: RES_DEEP }}>
          <strong>+15 Eco-Points</strong> when your report is validated by the barangay.
        </div>

        <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Select label="Issue type" value="Illegal dumping" onChange={() => {}}
            options={['Illegal dumping', 'Missed collection', 'Overflowing bin', 'Improper segregation', 'Broken container']}/>

          <div>
            <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>Description</label>
            <textarea defaultValue="Bag of mixed waste left at the corner of Rizal St. and Mabini for 3 days. Attracting stray dogs." style={{
              width: '100%', minHeight: 90, padding: 12, borderRadius: 8,
              border: '1px solid #BDBDBD', fontFamily: 'Poppins', fontSize: 14, resize: 'vertical',
              boxSizing: 'border-box', lineHeight: 1.5,
            }}/>
            <div style={{ display: 'flex', justifyContent: 'flex-end', fontSize: 11, color: '#757575', marginTop: 4 }}>98 / 300</div>
          </div>

          <div>
            <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>Photo evidence</label>
            <div style={{ borderRadius: 8, overflow: 'hidden' }}>
              <PhotoPlaceholder seed={0} style={{ height: 140 }}/>
            </div>
            <div style={{ fontSize: 11, color: '#757575', marginTop: 4 }}>1 photo · tap to add more</div>
          </div>

          <Input label="Street address" value="Rizal St. cor. Mabini" onChange={() => {}}/>

          <Select label="Barangay" value="Brgy. Marawoy" onChange={() => {}}
            options={['Brgy. Marawoy', 'Brgy. San Sebastian', 'Brgy. Balintawak', 'Brgy. Tambo']}/>

          <div style={{ fontSize: 12, color: '#757575', fontStyle: 'italic', display: 'flex', alignItems: 'center', gap: 6 }}>
            📍 GPS auto-tagged: 13.9411° N, 121.1633° E
          </div>

          <Btn full>Submit report</Btn>
        </div>
      </div>
    </PhoneFrame>
  );
}

// ─── 7. Report submitted ─────────────────────────────────────────────
function ResidentReportSubmitted() {
  return (
    <PhoneFrame topColor={RES} title="Report submitted" bottomNav={<ResidentBottomNav active="report"/>}>
      <div style={{ padding: '32px 20px', textAlign: 'center' }}>
        <div style={{
          width: 84, height: 84, borderRadius: '50%', background: RES_TINT,
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 44,
        }}>✅</div>
        <h1 style={{ fontSize: 22, fontWeight: 700, margin: '16px 0 4px' }}>Report submitted</h1>
        <div style={{ fontSize: 13, color: '#757575', lineHeight: 1.5 }}>
          Your barangay officers will acknowledge this within 24 hours.
        </div>

        <div style={{ background: '#F5F5F5', borderRadius: 8, padding: 14, marginTop: 20, textAlign: 'left', position: 'relative' }}>
          <div style={{ fontSize: 10, color: '#757575', fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase' }}>Reference number</div>
          <div style={{ fontFamily: 'ui-monospace, Menlo', fontSize: 16, color: RES_DEEP, fontWeight: 700, marginTop: 4 }}>RPT-2025-00147</div>
          <button style={{
            position: 'absolute', top: 12, right: 12, background: 'white', border: '1px solid #BDBDBD',
            borderRadius: 6, padding: '4px 10px', fontSize: 11, fontWeight: 600, fontFamily: 'Poppins',
            color: RES, cursor: 'pointer',
          }}>Copy</button>
        </div>

        <div style={{ marginTop: 20, textAlign: 'left' }}>
          <UL>What happens next</UL>
          <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              'Barangay officer reviews within 24 hours',
              'A collector will be assigned and notified',
              'You\'ll get SMS + push updates on each status change',
              '+15 eco-points credited when resolved',
            ].map((step, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, fontSize: 13 }}>
                <div style={{ color: RES, fontWeight: 700, flexShrink: 0 }}>✓</div>
                <div style={{ color: '#212121', lineHeight: 1.5 }}>{step}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 24 }}>
          <Btn full>View my reports</Btn>
          <Btn full outline color={RES}>Back to home</Btn>
        </div>
      </div>
    </PhoneFrame>
  );
}

// ─── 8. My reports ───────────────────────────────────────────────────
function ResidentMyReports() {
  const tabs = ['All', 'Open', 'In Progress', 'Resolved'];
  const active = 'All';
  const reports = [
    { seed: 0, type: 'Illegal dumping', addr: 'Rizal St. cor. Mabini', ref: 'RPT-2025-00147', date: 'Apr 22, 2026', status: 'open', label: 'Open' },
    { seed: 1, type: 'Overflowing bin', addr: 'Purok 3, near chapel', ref: 'RPT-2025-00132', date: 'Apr 19, 2026', status: 'inprogress', label: 'In Progress' },
    { seed: 2, type: 'Missed collection', addr: 'Mabini St., Purok 2', ref: 'RPT-2025-00118', date: 'Apr 12, 2026', status: 'resolved', label: 'Resolved' },
    { seed: 3, type: 'Improper segregation', addr: 'Bonifacio Ave.', ref: 'RPT-2025-00104', date: 'Apr 5, 2026', status: 'resolved', label: 'Resolved' },
  ];
  return (
    <PhoneFrame topColor={RES} title="My reports" onBack={() => {}} bottomNav={<ResidentBottomNav active="report"/>}>
      <div style={{ padding: 16 }}>
        <div style={{ display: 'flex', gap: 6, marginBottom: 14 }}>
          {tabs.map(t => (
            <button key={t} style={{
              padding: '7px 14px', borderRadius: 20, fontSize: 12, fontWeight: 600,
              background: t === active ? RES : 'white', color: t === active ? 'white' : '#757575',
              border: t === active ? 'none' : '1px solid #E0E0E0', fontFamily: 'Poppins', cursor: 'pointer',
            }}>{t}</button>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {reports.map((r, i) => (
            <div key={i} style={{ background: 'white', borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', padding: 12, display: 'flex', gap: 12 }}>
              <div style={{ width: 72, height: 72, borderRadius: 8, overflow: 'hidden', flexShrink: 0 }}>
                <PhotoPlaceholder seed={r.seed} style={{ width: '100%', height: '100%', fontSize: 28 }}/>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 700 }}>{r.type}</div>
                <div style={{ fontSize: 11, color: '#757575', marginTop: 2 }}>{r.addr}</div>
                <div style={{ fontFamily: 'ui-monospace, Menlo', fontSize: 10, color: RES, marginTop: 4, fontWeight: 600 }}>{r.ref}</div>
                <div style={{ fontSize: 10, color: '#9E9E9E', marginTop: 2 }}>{r.date}</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <Badge kind={r.status}>{r.label}</Badge>
                <div style={{ fontSize: 18, color: '#BDBDBD' }}>›</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PhoneFrame>
  );
}

// ─── 9. Report detail ────────────────────────────────────────────────
function ResidentReportDetail() {
  const steps = [
    { label: 'Open', state: 'done' },
    { label: 'Acknowledged', state: 'done' },
    { label: 'In Progress', state: 'active' },
    { label: 'Resolved', state: 'future' },
  ];
  const history = [
    { color: '#0D47A1', label: 'In Progress', note: 'Collector Juan Reyes dispatched to site.', ts: 'Today · 8:42 am' },
    { color: '#F57F17', label: 'Acknowledged', note: 'Reviewed by Brgy. Kagawad Elena Mercado.', ts: 'Apr 22 · 6:15 pm' },
    { color: '#1B5E20', label: 'Open', note: 'Report submitted by resident.', ts: 'Apr 22 · 2:03 pm' },
  ];
  return (
    <PhoneFrame topColor={RES} title="Report detail" onBack={() => {}} bottomNav={<ResidentBottomNav active="report"/>}>
      <div style={{ position: 'relative' }}>
        <PhotoPlaceholder seed={0} style={{ height: 240 }}/>
        <div style={{ background: 'white', borderRadius: '16px 16px 0 0', marginTop: -16, padding: 20, position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontFamily: 'ui-monospace, Menlo', fontSize: 13, fontWeight: 700, color: RES_DEEP }}>RPT-2025-00147</div>
            <Badge kind="inprogress">In Progress</Badge>
          </div>

          <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column' }}>
            {[
              ['Issue type', 'Illegal dumping'],
              ['Location', 'Rizal St. cor. Mabini, Brgy. Marawoy'],
              ['GPS', '13.9411° N, 121.1633° E', 'mono'],
              ['Submitted', 'Apr 22, 2026 · 2:03 pm'],
              ['Assigned to', 'Juan Reyes · Crew B'],
            ].map(([k, v, m], i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: i < 4 ? '1px solid #F5F5F5' : 'none', fontSize: 12 }}>
                <span style={{ color: '#757575' }}>{k}</span>
                <span style={{ fontWeight: 600, fontFamily: m === 'mono' ? 'ui-monospace, Menlo' : 'Poppins', textAlign: 'right' }}>{v}</span>
              </div>
            ))}
          </div>

          {/* Progress bar */}
          <UL style={{ marginTop: 18, marginBottom: 10 }}>Status progress</UL>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {steps.map((s, i) => (
              <React.Fragment key={i}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, flexShrink: 0 }}>
                  <div style={{
                    width: 22, height: 22, borderRadius: 11,
                    background: s.state === 'done' ? RES : s.state === 'active' ? '#1565C0' : '#E0E0E0',
                    color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 11, fontWeight: 700,
                    boxShadow: s.state === 'active' ? '0 0 0 4px rgba(21,101,192,0.2)' : 'none',
                  }}>{s.state === 'done' ? '✓' : i + 1}</div>
                  <div style={{ fontSize: 9, fontWeight: 600, color: s.state === 'future' ? '#BDBDBD' : '#212121', textAlign: 'center', maxWidth: 56 }}>{s.label}</div>
                </div>
                {i < steps.length - 1 && <div style={{ flex: 1, height: 2, background: s.state === 'done' ? RES : '#E0E0E0', marginBottom: 14 }}/>}
              </React.Fragment>
            ))}
          </div>

          {/* History */}
          <UL style={{ marginTop: 22, marginBottom: 10 }}>Status history</UL>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {history.map((h, i) => (
              <div key={i} style={{ display: 'flex', gap: 12 }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                  <div style={{ width: 10, height: 10, borderRadius: 5, background: h.color, marginTop: 4 }}/>
                  {i < history.length - 1 && <div style={{ width: 2, flex: 1, background: '#E0E0E0', marginTop: 4 }}/>}
                </div>
                <div style={{ flex: 1, paddingBottom: 4 }}>
                  <div style={{ fontSize: 13, fontWeight: 700 }}>{h.label}</div>
                  <div style={{ fontSize: 12, color: '#757575', marginTop: 2, lineHeight: 1.5 }}>{h.note}</div>
                  <div style={{ fontSize: 11, color: '#9E9E9E', marginTop: 3 }}>{h.ts}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}

// ─── 10. Wallet ──────────────────────────────────────────────────────
function ResidentWallet() {
  const txs = [
    { i: '🟢', bg: RES_TINT, fg: RES, label: 'Segregation confirmed', date: 'Apr 22 · 7:12 am', amt: '+15' },
    { i: '🟢', bg: RES_TINT, fg: RES, label: 'Pickup attended on time', date: 'Apr 20 · 7:03 am', amt: '+10' },
    { i: '🧺', bg: '#FFE0B2', fg: '#E65100', label: 'Redeemed: Sari-sari tote bag', date: 'Apr 18 · 3:41 pm', amt: '−50' },
    { i: '🟢', bg: RES_TINT, fg: RES, label: 'Report resolved · bonus', date: 'Apr 17 · 5:00 pm', amt: '+25' },
    { i: '🟢', bg: RES_TINT, fg: RES, label: 'Weekly compliance streak', date: 'Apr 14 · 9:00 pm', amt: '+20' },
  ];
  return (
    <PhoneFrame topColor={RES_DEEP} title="My wallet" bottomNav={<ResidentBottomNav active="rewards"/>}>
      <div style={{ fontFamily: 'Poppins' }}>
        <div style={{
          background: 'linear-gradient(160deg,#1B5E20,#2E7D32,#388E3C)',
          color: 'white', padding: '28px 20px 44px', textAlign: 'center',
        }}>
          <div style={{
            display: 'inline-block', background: 'rgba(255,255,255,0.2)',
            padding: '5px 14px', borderRadius: 20, fontSize: 11, fontWeight: 700, letterSpacing: 0.5,
          }}>🌱 ECO-SAVER · TIER 2</div>
          <div style={{ fontSize: 72, fontWeight: 900, lineHeight: 1, marginTop: 10 }}>240</div>
          <div style={{ fontSize: 13, fontWeight: 600, opacity: 0.9, marginTop: 2 }}>Eco-Points</div>
          <div style={{ fontSize: 12, opacity: 0.75, marginTop: 4 }}>≈ ₱240.00 redeem value</div>

          <div style={{ marginTop: 18, padding: '0 8px' }}>
            <div style={{ height: 6, background: 'rgba(255,255,255,0.3)', borderRadius: 999 }}>
              <div style={{ width: '60%', height: '100%', background: 'white', borderRadius: 999 }}/>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, marginTop: 6, opacity: 0.9 }}>
              <span>🌱 Seedling</span>
              <span style={{ fontWeight: 700 }}>🌿 Eco-Saver</span>
              <span>🛡️ Guardian</span>
            </div>
            <div style={{ fontSize: 11, marginTop: 8, opacity: 0.85 }}>160 pts to Green Guardian</div>
          </div>
        </div>

        <div style={{ padding: 16, marginTop: -20 }}>
          <div style={{ display: 'flex', gap: 10 }}>
            <Btn full outline color={RES} icon="🎯">Earn points</Btn>
            <Btn full color={RES} icon="🎁">Redeem now</Btn>
          </div>

          <UL style={{ marginTop: 20, marginBottom: 10 }}>Recent transactions</UL>
          <div style={{ background: 'white', borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', padding: '4px 14px' }}>
            {txs.map((t, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: i < txs.length - 1 ? '1px solid #F5F5F5' : 'none' }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 18, background: t.bg, color: t.fg,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16,
                }}>{t.i}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{t.label}</div>
                  <div style={{ fontSize: 11, color: '#757575', marginTop: 2 }}>{t.date}</div>
                </div>
                <div style={{ fontSize: 15, fontWeight: 700, color: t.amt.startsWith('−') ? '#D32F2F' : RES }}>{t.amt}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}

// ─── 11. Missions ────────────────────────────────────────────────────
function ResidentMissions() {
  const missions = [
    { icon: '♻️', name: 'Segregate correctly', desc: 'Use separate bins for bio, non-bio, recycle.', freq: 'Every pickup', pts: '+15', fnote: '/ pickup', progress: 1, total: 2, progressLabel: '1 of 2 confirmed this week' },
    { icon: '📸', name: 'Report illegal dumping', desc: 'Submit validated reports with photo evidence.', freq: 'Any time', pts: '+25', fnote: '/ report' },
    { icon: '🚛', name: 'Be present at pickup', desc: 'Hand your QR card to the collector.', freq: '3× per week', pts: '+10', fnote: '/ pickup', progress: 2, total: 3, progressLabel: '2 of 3 confirmed this week' },
    { icon: '🏘️', name: 'Invite a neighbor', desc: 'Get 5 households in your purok to register.', freq: 'One-time', pts: '+100', fnote: 'bonus', progress: 3, total: 5, progressLabel: '3 of 5 registered' },
    { icon: '🌱', name: 'Home composting pledge', desc: 'Start a compost bin, verified by brgy.', freq: 'Monthly', pts: '+50', fnote: '/ month' },
  ];
  return (
    <PhoneFrame topColor={RES} title="🎯 Active missions" onBack={() => {}} bottomNav={<ResidentBottomNav active="rewards"/>}>
      <div style={{ padding: 16 }}>
        <div style={{ fontSize: 12, color: '#757575', marginBottom: 12 }}>Earn eco-points by completing these community actions.</div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {missions.map((m, i) => (
            <div key={i} style={{ background: 'white', borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', padding: 14 }}>
              <div style={{ display: 'flex', gap: 12 }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 8, background: RES_TINT,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0,
                }}>{m.icon}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{m.name}</div>
                  <div style={{ fontSize: 11, color: '#757575', marginTop: 2, lineHeight: 1.4 }}>{m.desc}</div>
                  <div style={{ fontSize: 10, color: '#9E9E9E', marginTop: 4, textTransform: 'uppercase', letterSpacing: 0.3, fontWeight: 600 }}>{m.freq}</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 2 }}>
                  <div style={{ background: RES_TINT, color: RES, padding: '4px 10px', borderRadius: 20, fontSize: 13, fontWeight: 700 }}>{m.pts}</div>
                  <div style={{ fontSize: 9, color: '#9E9E9E' }}>{m.fnote}</div>
                </div>
              </div>
              {m.progress != null && (
                <div style={{ marginTop: 12 }}>
                  <div style={{ height: 4, background: '#E0E0E0', borderRadius: 2 }}>
                    <div style={{ width: `${(m.progress / m.total) * 100}%`, height: '100%', background: RES, borderRadius: 2 }}/>
                  </div>
                  <div style={{ fontSize: 10, color: '#757575', marginTop: 4, fontWeight: 600 }}>{m.progressLabel}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </PhoneFrame>
  );
}

// ─── 12. Rewards ─────────────────────────────────────────────────────
function ResidentRewards() {
  const filters = ['All', 'Data', 'GCash', 'Groceries', 'Food', 'Utilities'];
  const rewards = [
    { logo: '📱', name: '10 GB Globe data', partner: 'Globe Telecom', peso: '₱99', pts: 90, locked: false },
    { logo: '💸', name: '₱50 GCash credit', partner: 'GCash', peso: '₱50', pts: 50, locked: false },
    { logo: '🍚', name: '1 kg Jasponica rice', partner: 'Puregold', peso: '₱75', pts: 80, locked: false },
    { logo: '☕', name: 'Jollibee breakfast meal', partner: 'Jollibee', peso: '₱99', pts: 100, locked: false },
    { logo: '💡', name: '₱100 Meralco credit', partner: 'Meralco', peso: '₱100', pts: 400, locked: true, needed: 160 },
    { logo: '🛒', name: '₱500 SM gift card', partner: 'SM Supermalls', peso: '₱500', pts: 900, locked: true, needed: 660 },
  ];
  return (
    <PhoneFrame topColor={RES} title="🎁 Redeem points" bottomNav={<ResidentBottomNav active="rewards"/>}
      topActions={<div style={{ background: 'rgba(255,255,255,0.2)', padding: '5px 12px', borderRadius: 20, fontSize: 11, fontWeight: 700, color: 'white' }}>240 pts</div>}>
      <div style={{ padding: 16 }}>
        <div style={{ display: 'flex', gap: 6, marginBottom: 14, overflowX: 'auto', paddingBottom: 4 }}>
          {filters.map((f, i) => (
            <button key={f} style={{
              padding: '6px 14px', borderRadius: 20, fontSize: 12, fontWeight: 600,
              background: i === 0 ? RES : 'white', color: i === 0 ? 'white' : '#757575',
              border: i === 0 ? 'none' : '1px solid #E0E0E0', fontFamily: 'Poppins', cursor: 'pointer',
              whiteSpace: 'nowrap', flexShrink: 0,
            }}>{f}</button>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {rewards.map((r, i) => (
            <div key={i} style={{
              background: 'white', borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
              padding: 12, display: 'flex', gap: 12, alignItems: 'center',
              opacity: r.locked ? 0.6 : 1,
            }}>
              <div style={{
                width: 56, height: 56, border: '1px solid #E0E0E0', borderRadius: 8,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, flexShrink: 0, position: 'relative',
              }}>
                {r.logo}
                {r.locked && <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.6)', borderRadius: 8, fontSize: 18 }}>🔒</div>}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 700 }}>{r.name}</div>
                <div style={{ fontSize: 11, color: '#757575', marginTop: 2 }}>{r.partner}</div>
                <div style={{ fontSize: 10, color: '#9E9E9E', marginTop: 3 }}>Value: {r.peso}</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: RES }}>{r.pts} pts</div>
                {r.locked
                  ? <div style={{ fontSize: 10, color: '#D32F2F', fontWeight: 600 }}>Need {r.needed} more</div>
                  : <button style={{ background: RES, color: 'white', border: 'none', padding: '6px 14px', borderRadius: 6, fontSize: 11, fontWeight: 600, fontFamily: 'Poppins', cursor: 'pointer' }}>Redeem</button>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </PhoneFrame>
  );
}

// ─── 13. Leaderboard ─────────────────────────────────────────────────
function ResidentLeaderboard() {
  const rows = [
    { rank: 1, name: 'Lola Remedios Bautista', brgy: 'Purok 2', pts: 1240, gold: true },
    { rank: 2, name: 'Juan Miguel Tolentino', brgy: 'Purok 1', pts: 980 },
    { rank: 3, name: 'Andrea Salonga', brgy: 'Purok 5', pts: 820 },
    { rank: 4, name: 'Maria Dela Cruz', brgy: 'Purok 3', pts: 240, you: true },
    { rank: 5, name: 'Rodel Catindig', brgy: 'Purok 4', pts: 215 },
    { rank: 6, name: 'Cecile Ramos', brgy: 'Purok 2', pts: 190 },
    { rank: 7, name: 'Benjie Lontok', brgy: 'Purok 6', pts: 175 },
    { rank: 8, name: 'Carmencita Yap', brgy: 'Purok 1', pts: 160 },
  ];
  return (
    <PhoneFrame topColor={RES} title="🏆 Leaderboard" bottomNav={<ResidentBottomNav active="rewards"/>}>
      <div style={{ padding: 16 }}>
        <div style={{ fontSize: 12, color: '#757575' }}>Top earners this month · April 2026</div>

        <div style={{ marginTop: 14, background: '#EEEEEE', padding: 4, borderRadius: 8, display: 'flex' }}>
          {['My Barangay', 'All Barangays'].map((t, i) => (
            <button key={t} style={{
              flex: 1, height: 36, background: i === 0 ? 'white' : 'transparent',
              borderRadius: 6, border: 'none', fontFamily: 'Poppins', fontWeight: 600, fontSize: 12,
              color: i === 0 ? RES : '#757575', cursor: 'pointer',
              boxShadow: i === 0 ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
            }}>{t}</button>
          ))}
        </div>

        <div style={{ marginTop: 14, background: 'white', borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
          {rows.map((r, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px',
              background: r.gold ? '#FFF8E1' : r.you ? RES_TINT : 'white',
              borderLeft: r.gold ? '4px solid #F9A825' : r.you ? `4px solid ${RES}` : '4px solid transparent',
              borderBottom: i < rows.length - 1 ? '1px solid #F5F5F5' : 'none',
            }}>
              <div style={{
                fontSize: 18, fontWeight: 800, width: 28, textAlign: 'center',
                color: r.gold ? '#F57F17' : r.you ? RES : '#9E9E9E',
              }}>{r.rank}</div>
              <Avatar initials={r.name.split(' ').map(w => w[0]).slice(0, 2).join('')} color={r.gold ? '#F9A825' : r.you ? RES : '#757575'} size={32}/>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: r.you || r.gold ? 700 : 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {r.name} {r.you && <span style={{ color: RES, fontSize: 10, marginLeft: 4 }}>(you)</span>}
                </div>
                <div style={{ fontSize: 11, color: '#757575' }}>{r.brgy}</div>
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, color: r.gold ? '#F57F17' : RES }}>{r.pts.toLocaleString()}</div>
            </div>
          ))}
        </div>
      </div>
    </PhoneFrame>
  );
}

Object.assign(window, {
  ResidentHome, ResidentSchedule, ResidentReport, ResidentReportSubmitted,
  ResidentMyReports, ResidentReportDetail, ResidentWallet, ResidentMissions,
  ResidentRewards, ResidentLeaderboard,
});
