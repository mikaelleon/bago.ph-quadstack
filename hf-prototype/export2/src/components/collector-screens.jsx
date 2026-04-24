// collector-screens.jsx — All 5 collector screens

const COL = '#1565C0';
const COL_DEEP = '#0D47A1';
const COL_TINT = '#E3F2FD';

function CollectorBottomNav({ active }) {
  const items = [
    ['home', '🚛', 'Route'],
    ['scan', '📱', 'Scan'],
    ['reports', '📸', 'Reports'],
    ['profile', '👤', 'Profile'],
  ];
  return <>{items.map(([id, icon, label]) => (
    <BottomNavItem key={id} icon={icon} label={label} active={active === id} activeColor={COL}/>
  ))}</>;
}

// ─── 14. Collector home ──────────────────────────────────────────────
function CollectorHome() {
  const [onDuty, setOnDuty] = React.useState(true);
  return (
    <PhoneFrame topColor={COL} title="BAGO.PH" roleBadge="COLLECTOR" bottomNav={<CollectorBottomNav active="home"/>}>
      <div style={{ padding: 16 }}>
        {/* Greeting */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Avatar initials="JR" color={COL} size={44}/>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 18, fontWeight: 700 }}>Hello, Juan Reyes 👷</div>
            <div style={{ fontFamily: 'ui-monospace, Menlo', fontSize: 11, color: COL, fontWeight: 600, marginTop: 2 }}>COL-LIPA-0042 · Crew B</div>
          </div>
        </div>

        {/* Duty toggle */}
        <div style={{ marginTop: 14, background: 'white', borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', padding: 14, display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 600 }}>Shift status</div>
            <div style={{ fontSize: 11, color: '#757575', marginTop: 2 }}>Started 6:45 am · Lipa depot</div>
          </div>
          <Toggle on={onDuty} onChange={setOnDuty} color={COL}/>
          <div style={{ fontSize: 11, fontWeight: 700, color: onDuty ? '#2E7D32' : '#D32F2F', letterSpacing: 0.5 }}>{onDuty ? 'ON DUTY' : 'OFF DUTY'}</div>
        </div>

        {/* Route summary */}
        <div style={{ marginTop: 14, background: 'white', borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', padding: 16, borderLeft: `4px solid ${COL}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: 14, fontWeight: 700 }}>🚛 Today's route</div>
            <span style={{ background: COL_TINT, color: COL_DEEP, padding: '3px 10px', borderRadius: 12, fontSize: 10, fontWeight: 700 }}>🟢 BIODEGRADABLE</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 8, marginTop: 14 }}>
            {[
              ['3', 'Barangays', '#212121'],
              ['58', 'Stops', '#212121'],
              ['28', 'Scanned', COL],
              ['30', 'Remaining', '#757575'],
            ].map(([n, l, c], i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 24, fontWeight: 800, color: c }}>{n}</div>
                <div style={{ fontSize: 9, color: '#757575', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.4, marginTop: 2 }}>{l}</div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 14 }}>
            <div style={{ height: 6, background: '#E0E0E0', borderRadius: 3 }}>
              <div style={{ width: '48%', height: '100%', background: COL, borderRadius: 3 }}/>
            </div>
            <div style={{ fontSize: 11, color: '#757575', marginTop: 6, fontWeight: 600 }}>48% complete · est. finish 11:30 am</div>
          </div>

          <button style={{ width: '100%', marginTop: 14, background: 'transparent', color: COL, border: `1.5px solid ${COL}`, borderRadius: 8, padding: '10px 0', fontFamily: 'Poppins', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>View full route →</button>
        </div>

        {/* Assigned reports */}
        <div style={{ marginTop: 12, background: 'white', borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', padding: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: 14, fontWeight: 700 }}>📸 Assigned reports</div>
            <span style={{ background: '#FFCDD2', color: '#B71C1C', padding: '3px 10px', borderRadius: 12, fontSize: 10, fontWeight: 700 }}>4 OPEN</span>
          </div>
          <div style={{ fontSize: 11, color: '#757575', marginTop: 6 }}>2 urgent · 1 on your route today</div>
          <button style={{ width: '100%', marginTop: 12, background: 'transparent', color: COL, border: `1.5px solid ${COL}`, borderRadius: 8, padding: '10px 0', fontFamily: 'Poppins', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>View reports →</button>
        </div>
      </div>
    </PhoneFrame>
  );
}

// ─── 15. Route ───────────────────────────────────────────────────────
function CollectorRoute() {
  const stops = [
    { state: 'done', hh: 'Reyes household', hid: 'BAGO-MARA-2025-00091', addr: 'Rizal St. #14, Purok 1', time: '7:05 am' },
    { state: 'done', hh: 'Aguilar household', hid: 'BAGO-MARA-2025-00092', addr: 'Rizal St. #22, Purok 1', time: '7:12 am' },
    { state: 'active', hh: 'Dela Cruz household', hid: 'BAGO-MARA-2025-00142', addr: '128 Rizal St., Purok 3', time: 'now' },
    { state: 'pending', hh: 'Lontok household', hid: 'BAGO-MARA-2025-00143', addr: '130 Rizal St., Purok 3', time: 'next' },
    { state: 'pending', hh: 'Salonga household', hid: 'BAGO-MARA-2025-00148', addr: 'Mabini St. #5, Purok 3', time: '' },
    { state: 'pending', hh: 'Bautista household', hid: 'BAGO-MARA-2025-00151', addr: 'Mabini St. #9, Purok 3', time: '' },
  ];
  return (
    <PhoneFrame topColor={COL} title="Route map" onBack={() => {}} roleBadge="COLLECTOR" bottomNav={<CollectorBottomNav active="home"/>}>
      {/* Map placeholder */}
      <div style={{ position: 'relative', height: 200, background: 'linear-gradient(135deg, #BBDEFB, #90CAF9, #A5D6A7)', overflow: 'hidden' }}>
        {/* Fake roads */}
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
          <path d="M 0 120 Q 100 80 200 140 T 400 100" stroke="white" strokeWidth="6" fill="none" opacity="0.6"/>
          <path d="M 80 0 L 140 200" stroke="white" strokeWidth="4" fill="none" opacity="0.5"/>
          <path d="M 280 0 L 260 200" stroke="white" strokeWidth="4" fill="none" opacity="0.5"/>
        </svg>
        {/* Pins */}
        <div style={{ position: 'absolute', left: 60, top: 80, width: 14, height: 14, borderRadius: 7, background: '#2E7D32', border: '2px solid white', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }}/>
        <div style={{ position: 'absolute', left: 120, top: 110, width: 14, height: 14, borderRadius: 7, background: '#2E7D32', border: '2px solid white', opacity: 0.6 }}/>
        <div style={{ position: 'absolute', left: 180, top: 90, width: 18, height: 18, borderRadius: 9, background: COL, border: '2px solid white', boxShadow: '0 0 0 6px rgba(21,101,192,0.3)' }}/>
        <div style={{ position: 'absolute', left: 240, top: 130, width: 12, height: 12, borderRadius: 6, background: '#9E9E9E', border: '2px solid white' }}/>
        <div style={{ position: 'absolute', left: 300, top: 150, width: 12, height: 12, borderRadius: 6, background: '#9E9E9E', border: '2px solid white' }}/>

        {/* Legend */}
        <div style={{ position: 'absolute', bottom: 10, right: 10, background: 'white', borderRadius: 8, padding: '8px 10px', fontSize: 10, boxShadow: '0 1px 3px rgba(0,0,0,0.15)', fontFamily: 'Poppins' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}><span style={{ width: 8, height: 8, borderRadius: 4, background: '#2E7D32' }}/> Done</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}><span style={{ width: 8, height: 8, borderRadius: 4, background: COL }}/> Active</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 8, height: 8, borderRadius: 4, background: '#9E9E9E' }}/> Pending</div>
        </div>
      </div>

      <div style={{ padding: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700 }}>🟢 Biodegradable</div>
            <div style={{ fontSize: 11, color: '#757575', marginTop: 2 }}>Wed, Apr 23 · Brgy. Marawoy</div>
          </div>
          <div style={{ fontSize: 11, color: '#757575' }}><span style={{ fontWeight: 700, color: COL, fontSize: 14 }}>28</span> / 58</div>
        </div>

        <UL style={{ marginTop: 18, marginBottom: 8 }}>Route stops</UL>
        <div style={{ background: 'white', borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
          {stops.map((s, i) => {
            const colors = {
              done: { dot: '#2E7D32', bg: 'white', opacity: 0.55 },
              active: { dot: COL, bg: COL_TINT, opacity: 1, glow: true },
              pending: { dot: '#BDBDBD', bg: 'white', opacity: 1 },
            };
            const c = colors[s.state];
            return (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px',
                background: c.bg, opacity: c.opacity,
                borderLeft: s.state === 'active' ? `4px solid ${COL}` : '4px solid transparent',
                borderBottom: i < stops.length - 1 ? '1px solid #F5F5F5' : 'none',
              }}>
                <div style={{
                  width: 14, height: 14, borderRadius: 7, background: c.dot,
                  boxShadow: c.glow ? `0 0 0 5px rgba(21,101,192,0.25)` : 'none', flexShrink: 0,
                }}/>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 700 }}>{s.hh}</div>
                  <div style={{ fontFamily: 'ui-monospace, Menlo', fontSize: 10, color: '#757575', marginTop: 2 }}>{s.hid}</div>
                  <div style={{ fontSize: 11, color: '#757575', marginTop: 2 }}>{s.addr}</div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  {s.state === 'active'
                    ? <button style={{ background: COL, color: 'white', border: 'none', padding: '6px 12px', borderRadius: 6, fontSize: 11, fontWeight: 700, fontFamily: 'Poppins', cursor: 'pointer' }}>Scan QR</button>
                    : <div style={{ fontSize: 11, color: '#9E9E9E', fontWeight: 600 }}>{s.time}</div>}
                </div>
              </div>
            );
          })}
        </div>

        <Btn full outline color={COL} style={{ marginTop: 14 }}>Mark all complete</Btn>
      </div>
    </PhoneFrame>
  );
}

// ─── 16. QR Scan ─────────────────────────────────────────────────────
function CollectorScan() {
  return (
    <PhoneFrame topColor={COL} title="Scan QR" onBack={() => {}} roleBadge="COLLECTOR" bottomNav={<CollectorBottomNav active="scan"/>}>
      {/* Scanner */}
      <div style={{ height: 300, background: '#0D1B2A', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          width: 200, height: 200,
        }}>
          {/* Corner brackets */}
          {[
            { top: 0, left: 0, borderTop: '3px solid white', borderLeft: '3px solid white' },
            { top: 0, right: 0, borderTop: '3px solid white', borderRight: '3px solid white' },
            { bottom: 0, left: 0, borderBottom: '3px solid white', borderLeft: '3px solid white' },
            { bottom: 0, right: 0, borderBottom: '3px solid white', borderRight: '3px solid white' },
          ].map((s, i) => (
            <div key={i} style={{ position: 'absolute', width: 30, height: 30, borderTopLeftRadius: s.borderTop && s.borderLeft ? 8 : 0, borderTopRightRadius: s.borderTop && s.borderRight ? 8 : 0, borderBottomLeftRadius: s.borderBottom && s.borderLeft ? 8 : 0, borderBottomRightRadius: s.borderBottom && s.borderRight ? 8 : 0, ...s }}/>
          ))}
          {/* Scan line */}
          <div style={{
            position: 'absolute', left: 6, right: 6, top: '50%', height: 2,
            background: 'linear-gradient(90deg, transparent, white, transparent)',
            boxShadow: '0 0 8px white',
          }}/>
          {/* Glyph */}
          <div style={{ position: 'absolute', inset: 40, display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 3, opacity: 0.6 }}>
            {Array.from({ length: 25 }).map((_, i) => (
              <div key={i} style={{ background: [0,1,4,5,8,12,16,19,20,23,24].includes(i) ? 'white' : 'transparent' }}/>
            ))}
          </div>
        </div>
        <div style={{ position: 'absolute', bottom: 16, left: 0, right: 0, textAlign: 'center', color: 'white', fontSize: 12, opacity: 0.85 }}>
          Align the household QR within the frame
        </div>
      </div>

      {/* Result card */}
      <div style={{ background: 'white', borderRadius: '16px 16px 0 0', marginTop: -16, padding: 18, position: 'relative', zIndex: 1 }}>
        <Badge kind="resolved">✓ VALID</Badge>
        <div style={{ fontSize: 17, fontWeight: 700, marginTop: 8 }}>Dela Cruz household</div>
        <div style={{ fontSize: 11, color: '#757575' }}>128 Rizal St., Purok 3 · Brgy. Marawoy</div>
        <div style={{ fontFamily: 'ui-monospace, Menlo', fontSize: 11, color: COL, fontWeight: 600, marginTop: 4 }}>BAGO-MARA-2025-00142</div>

        <div style={{ marginTop: 12, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          <span style={{ background: '#F5F5F5', color: '#757575', padding: '4px 10px', borderRadius: 12, fontSize: 11, fontWeight: 600 }}>🟢 Biodegradable confirmed</span>
          <span style={{ background: '#F5F5F5', color: '#757575', padding: '4px 10px', borderRadius: 12, fontSize: 11, fontWeight: 600 }}>Segregated ✓</span>
        </div>

        <div style={{ marginTop: 12, background: '#E8F5E9', padding: 12, borderRadius: 8 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#1B5E20' }}>🌿 +10 Eco-Points credited</div>
          <div style={{ fontSize: 11, color: '#1B5E20', opacity: 0.75, marginTop: 2 }}>Push notification sent to resident ✅</div>
        </div>

        <div style={{ marginTop: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#757575', marginBottom: 4 }}>
            <span>Route progress</span>
            <span style={{ color: COL, fontWeight: 700 }}>29 / 58</span>
          </div>
          <div style={{ height: 5, background: '#E0E0E0', borderRadius: 3 }}>
            <div style={{ width: '50%', height: '100%', background: COL, borderRadius: 3 }}/>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
          <Btn full color={RES = '#2E7D32'}>✓ Confirm and scan next</Btn>
        </div>
        <Btn full outline color="#F9A825" style={{ marginTop: 8 }}>🚩 Flag this household</Btn>
      </div>

      <div style={{ padding: 16, background: '#F5F5F5' }}>
        <UL>Manual entry</UL>
        <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
          <input placeholder="BAGO-MARA-2025-…" style={{
            flex: 1, height: 44, border: '1px solid #BDBDBD', borderRadius: 8,
            padding: '0 12px', fontFamily: 'ui-monospace, Menlo', fontSize: 12,
          }}/>
          <Btn color={COL} size="sm" style={{ height: 44, padding: '0 18px' }}>Verify</Btn>
        </div>
      </div>
    </PhoneFrame>
  );
}

// ─── 17. Assigned reports ────────────────────────────────────────────
function CollectorReports() {
  const reports = [
    { prio: 'urgent', label: 'URGENT', type: 'Illegal dumping', addr: 'Rizal St. cor. Mabini', ref: 'RPT-2025-00147', date: 'Today · 2:03 pm' },
    { prio: 'high',   label: 'HIGH',   type: 'Overflowing bin', addr: 'Purok 3, near chapel', ref: 'RPT-2025-00132', date: 'Apr 19, 2026' },
    { prio: 'urgent', label: 'URGENT', type: 'Broken container', addr: 'Purok 1 covered court', ref: 'RPT-2025-00145', date: 'Today · 9:15 am' },
    { prio: 'medium', label: 'MEDIUM', type: 'Improper segregation', addr: 'Bonifacio Ave. #12', ref: 'RPT-2025-00140', date: 'Apr 21, 2026' },
    { prio: 'low',    label: 'LOW',    type: 'Schedule dispute', addr: 'Mabini St., Purok 2', ref: 'RPT-2025-00138', date: 'Apr 20, 2026' },
  ];
  return (
    <PhoneFrame topColor={COL} title="📸 Assigned reports" roleBadge="COLLECTOR" bottomNav={<CollectorBottomNav active="reports"/>}>
      <div style={{ padding: 16 }}>
        <div style={{ display: 'flex', gap: 6, marginBottom: 14 }}>
          {['All (5)', 'Urgent (2)', 'Today (2)'].map((t, i) => (
            <button key={t} style={{
              padding: '6px 12px', borderRadius: 20, fontSize: 11, fontWeight: 600,
              background: i === 0 ? COL : 'white', color: i === 0 ? 'white' : '#757575',
              border: i === 0 ? 'none' : '1px solid #E0E0E0', fontFamily: 'Poppins', cursor: 'pointer',
            }}>{t}</button>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {reports.map((r, i) => (
            <div key={i} style={{ background: 'white', borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', padding: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Badge kind={r.prio}>{r.label}</Badge>
                <div style={{ fontSize: 10, color: '#9E9E9E' }}>{r.date}</div>
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, marginTop: 8 }}>{r.type}</div>
              <div style={{ fontSize: 12, color: '#757575', marginTop: 2 }}>📍 {r.addr}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10, paddingTop: 10, borderTop: '1px solid #F5F5F5' }}>
                <div style={{ fontFamily: 'ui-monospace, Menlo', fontSize: 11, color: COL, fontWeight: 600 }}>{r.ref}</div>
                <button style={{ background: 'transparent', color: COL, border: 'none', fontFamily: 'Poppins', fontWeight: 600, fontSize: 12, cursor: 'pointer' }}>View & update →</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PhoneFrame>
  );
}

// ─── 18. Collector report update ─────────────────────────────────────
function CollectorReportUpdate() {
  return (
    <PhoneFrame topColor={COL} title="Update report" onBack={() => {}} roleBadge="COLLECTOR" bottomNav={<CollectorBottomNav active="reports"/>}>
      <div style={{ position: 'relative' }}>
        <PhotoPlaceholder seed={0} style={{ height: 220 }}/>
        <div style={{ background: 'white', borderRadius: '16px 16px 0 0', marginTop: -16, padding: 18, position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontFamily: 'ui-monospace, Menlo', fontSize: 13, fontWeight: 700, color: COL_DEEP }}>RPT-2025-00147</div>
            <Badge kind="ack">Acknowledged</Badge>
          </div>

          <div style={{ fontSize: 15, fontWeight: 700, marginTop: 10 }}>Illegal dumping</div>

          <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column' }}>
            {[
              ['Location', 'Rizal St. cor. Mabini'],
              ['Barangay', 'Brgy. Marawoy'],
              ['Reported by', 'Maria Dela Cruz'],
              ['Priority', 'URGENT'],
              ['Reported', 'Apr 22 · 2:03 pm'],
            ].map(([k, v], i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: i < 4 ? '1px solid #F5F5F5' : 'none', fontSize: 12 }}>
                <span style={{ color: '#757575' }}>{k}</span>
                <span style={{ fontWeight: 600 }}>{v}</span>
              </div>
            ))}
          </div>

          <UL style={{ marginTop: 18, marginBottom: 10 }}>Update status</UL>
          <Select value="In Progress — collecting now" onChange={() => {}}
            options={['Acknowledged', 'In Progress — collecting now', 'Resolved', 'Needs escalation']}/>

          <div style={{ marginTop: 12 }}>
            <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>Collector notes</label>
            <textarea defaultValue="On site. 4 bags of mixed household waste. Loading now. ETA clear in 10 mins." style={{
              width: '100%', minHeight: 80, padding: 12, borderRadius: 8,
              border: '1px solid #BDBDBD', fontFamily: 'Poppins', fontSize: 13, resize: 'vertical',
              boxSizing: 'border-box', lineHeight: 1.5,
            }}/>
          </div>

          <Btn full color={COL} style={{ marginTop: 14 }}>Update report status</Btn>

          <div style={{ marginTop: 12, background: COL_TINT, borderLeft: `4px solid ${COL}`, borderRadius: '0 8px 8px 0', padding: '10px 12px', fontSize: 12, color: COL_DEEP }}>
            📱 Resident will be notified automatically.
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}

Object.assign(window, { CollectorHome, CollectorRoute, CollectorScan, CollectorReports, CollectorReportUpdate });
