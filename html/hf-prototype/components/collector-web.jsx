// collector-web.jsx — BAGO.PH Collector web app (desktop 1280 × 820)

const CW_BLUE = '#1565C0';
const CW_BLUE_DEEP = '#0D47A1';
const CW_BLUE_TINT = '#E3F2FD';
const CW_GREEN = '#2E7D32';

const COLLECTOR_WEB_ROUTES = {
  route: 'collector-web-route.html',
  scan: 'collector-web-scan.html',
  reports: 'collector-web-reports.html',
  schedule: 'collector-web-schedule.html',
  analytics: 'collector-web-analytics.html',
  profile: 'collector-web-profile.html',
};

function navTo(path) {
  window.location.href = './' + String(path || 'index.html').replace(/^\.\//, '');
}

function CollectorWebShell({ active, title, subtitle, actions, children, pageScrollable = true }) {
  const nav = [
    ['route',    '🚛', 'Today\'s route'],
    ['scan',     '📱', 'QR verification'],
    ['reports',  '📸', 'Assigned reports'],
    ['schedule', '📅', 'Shift schedule'],
    ['analytics','📊', 'My analytics'],
    ['profile',  '👤', 'Profile'],
  ];
  return (
    <div style={{ width: '100vw', minHeight: '100vh', height: '100vh', display: 'flex', fontFamily: 'Poppins', background: '#F5F5F5', color: '#212121', overflow: 'hidden' }}>
      <aside style={{ width: 240, background: '#0D1B2A', color: 'white', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
        <div style={{ padding: '20px 20px 16px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <div onClick={() => navTo('dashboard-collector.html')} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 20, fontWeight: 800, letterSpacing: -0.5, cursor: 'pointer' }}>
            <span style={{ fontSize: 22 }}>🌿</span>
            <span>BAGO.<span style={{ opacity: 0.85 }}>PH</span></span>
          </div>
          <div style={{ fontSize: 10, color: '#90CAF9', marginTop: 4, letterSpacing: 0.3, textTransform: 'uppercase', fontWeight: 700 }}>Collector Console</div>
        </div>

        <div style={{ margin: 16, padding: 12, background: 'rgba(255,255,255,0.06)', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 10 }}>
          <Avatar initials="JR" color={CW_BLUE} size={36} style={{ background: '#1976D2', color: 'white' }}/>
          <div style={{ minWidth: 0, flex: 1 }}>
            <div style={{ fontSize: 12, fontWeight: 700 }}>Juan Reyes</div>
            <div style={{ fontFamily: 'ui-monospace, Menlo', fontSize: 9, color: '#90CAF9', fontWeight: 600 }}>COL-LIPA-0042 · Crew B</div>
          </div>
        </div>

        <div style={{ margin: '0 16px 14px', padding: 10, background: 'rgba(46,125,50,0.25)', border: '1px solid rgba(165,214,167,0.3)', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ width: 8, height: 8, borderRadius: 4, background: '#A5D6A7', boxShadow: '0 0 8px #A5D6A7' }}/>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 11, fontWeight: 700 }}>ON DUTY</div>
            <div style={{ fontSize: 10, color: '#A5D6A7' }}>Since 6:45 am · Lipa depot</div>
          </div>
        </div>

        <nav style={{ padding: '0 8px', flex: 1, overflowY: 'auto' }}>
          {nav.map(([id, icon, label]) => {
            const on = id === active;
            return (
              <div key={id} onClick={() => navTo(COLLECTOR_WEB_ROUTES[id])} style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px',
                borderRadius: 6, marginBottom: 2, cursor: 'pointer',
                background: on ? 'rgba(33,150,243,0.2)' : 'transparent',
                color: on ? '#BBDEFB' : 'rgba(255,255,255,0.75)',
                fontSize: 13, fontWeight: on ? 700 : 500,
                borderLeft: on ? `3px solid #42A5F5` : '3px solid transparent',
                paddingLeft: on ? 9 : 12,
              }}>
                <span style={{ fontSize: 16, width: 20, textAlign: 'center' }}>{icon}</span>
                <span>{label}</span>
              </div>
            );
          })}
        </nav>

        <div style={{ padding: 16, borderTop: '1px solid rgba(255,255,255,0.08)', fontSize: 11, color: 'rgba(255,255,255,0.55)', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 10 }}>
          <span style={{ cursor: 'pointer' }}>Help</span><span>·</span>
          <span style={{ cursor: 'pointer' }}>Dispatch</span><span>·</span>
          <span style={{ cursor: 'pointer', fontWeight: 700, color: '#FFCDD2' }} onClick={() => window.bagoConfirmSignOut && window.bagoConfirmSignOut()}>Sign out</span>
        </div>
      </aside>

      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <div style={{ height: 64, background: 'white', borderBottom: '1px solid #E0E0E0', display: 'flex', alignItems: 'center', padding: '0 28px', gap: 16, flexShrink: 0 }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 18, fontWeight: 700 }}>{title}</div>
            {subtitle && <div style={{ fontSize: 12, color: '#757575', marginTop: 1 }}>{subtitle}</div>}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 12px', background: '#F5F5F5', borderRadius: 6, width: 260, color: '#9E9E9E', fontSize: 13 }}>
            <span>🔍</span><span>Search household ID, report…</span>
          </div>
          {actions}
          <button
            type="button"
            onClick={() => window.bagoConfirmSignOut && window.bagoConfirmSignOut()}
            style={{
              height: 36, padding: '0 14px', border: '1px solid #FFCDD2', background: '#FFF8F8',
              borderRadius: 6, fontFamily: 'Poppins', fontSize: 12, fontWeight: 700, color: '#C62828', cursor: 'pointer',
            }}
          >Sign out</button>
          <div style={{ position: 'relative', cursor: 'pointer', padding: '8px 6px' }}>
            <span style={{ fontSize: 20 }}>🔔</span>
            <span style={{ position: 'absolute', top: 6, right: 4, width: 8, height: 8, borderRadius: 4, background: '#F9A825', border: '1.5px solid white' }}/>
          </div>
        </div>
        <div style={{ flex: 1, overflowY: pageScrollable ? 'auto' : 'hidden', padding: 28 }}>{children}</div>
      </main>
    </div>
  );
}

/* 29. Route view — map + stops + crew + progress */
function CollectorWebRoute() {
  const stops = [
    { state: 'done', hh: 'Reyes household', hid: 'BAGO-MARA-2025-00091', addr: 'Rizal St. #14, Purok 1', time: '7:05 am' },
    { state: 'done', hh: 'Aguilar household', hid: 'BAGO-MARA-2025-00092', addr: 'Rizal St. #22, Purok 1', time: '7:12 am' },
    { state: 'done', hh: 'Mendoza household', hid: 'BAGO-MARA-2025-00095', addr: 'Mabini St. #4, Purok 2', time: '7:30 am' },
    { state: 'active', hh: 'Dela Cruz household', hid: 'BAGO-MARA-2025-00142', addr: '128 Rizal St., Purok 3', time: 'now' },
    { state: 'pending', hh: 'Lontok household', hid: 'BAGO-MARA-2025-00143', addr: '130 Rizal St., Purok 3', time: 'next' },
    { state: 'pending', hh: 'Salonga household', hid: 'BAGO-MARA-2025-00148', addr: 'Mabini St. #5, Purok 3', time: '9:10 am' },
    { state: 'pending', hh: 'Bautista household', hid: 'BAGO-MARA-2025-00151', addr: 'Mabini St. #9, Purok 3', time: '9:20 am' },
    { state: 'flagged', hh: 'Ramos household', hid: 'BAGO-MARA-2025-00156', addr: 'Bonifacio #2, Purok 4', time: '🚩 flagged' },
  ];
  return (
    <CollectorWebShell active="route"
      title="Today's route · Brgy. Marawoy · 🟢 Biodegradable"
      subtitle="Crew B · Truck MR-04 · Started 6:45 am · est. finish 11:30 am"
      actions={<>
        <Btn size="sm" outline color={CW_BLUE}>📍 Re-center</Btn>
        <Btn size="sm" color={CW_BLUE}>📱 Scan next</Btn>
      </>}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 18, height: '100%' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* Map */}
          <div style={{ position: 'relative', height: 380, background: 'linear-gradient(135deg,#BBDEFB,#90CAF9,#A5D6A7)', borderRadius: 10, overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
            <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
              <path d="M 0 200 Q 200 140 400 220 T 800 180" stroke="white" strokeWidth="10" fill="none" opacity="0.55"/>
              <path d="M 120 0 L 180 400" stroke="white" strokeWidth="7" fill="none" opacity="0.5"/>
              <path d="M 420 0 L 400 400" stroke="white" strokeWidth="7" fill="none" opacity="0.5"/>
              <path d="M 620 40 L 680 380" stroke="white" strokeWidth="6" fill="none" opacity="0.45"/>
              <path d="M 0 80 Q 150 60 300 110" stroke="white" strokeWidth="4" fill="none" opacity="0.4"/>
            </svg>
            {/* Pins */}
            {[
              { x: 80,  y: 150, c: CW_GREEN, s: 12 },
              { x: 170, y: 200, c: CW_GREEN, s: 12 },
              { x: 260, y: 170, c: CW_GREEN, s: 12 },
              { x: 360, y: 210, c: CW_BLUE,  s: 20, glow: true },
              { x: 420, y: 200, c: '#9E9E9E', s: 10 },
              { x: 500, y: 240, c: '#9E9E9E', s: 10 },
              { x: 580, y: 210, c: '#9E9E9E', s: 10 },
              { x: 640, y: 280, c: '#D32F2F', s: 14 },
            ].map((p, i) => (
              <div key={i} style={{ position: 'absolute', left: p.x, top: p.y, width: p.s, height: p.s, borderRadius: p.s / 2, background: p.c, border: '2.5px solid white', boxShadow: p.glow ? `0 0 0 8px rgba(21,101,192,0.3)` : '0 1px 4px rgba(0,0,0,0.3)' }}/>
            ))}
            {/* Truck marker */}
            <div style={{ position: 'absolute', left: 355, top: 175, background: CW_BLUE, color: 'white', padding: '4px 10px', borderRadius: 16, fontSize: 10, fontWeight: 700, boxShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>🚛 MR-04 · here</div>
            {/* Legend */}
            <div style={{ position: 'absolute', bottom: 12, right: 12, background: 'white', borderRadius: 8, padding: '10px 14px', fontSize: 11, boxShadow: '0 1px 3px rgba(0,0,0,0.15)', fontFamily: 'Poppins' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}><span style={{ width: 10, height: 10, borderRadius: 5, background: CW_GREEN }}/>Done · 28</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}><span style={{ width: 10, height: 10, borderRadius: 5, background: CW_BLUE }}/>Active · 1</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}><span style={{ width: 10, height: 10, borderRadius: 5, background: '#9E9E9E' }}/>Pending · 28</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ width: 10, height: 10, borderRadius: 5, background: '#D32F2F' }}/>Flagged · 1</div>
            </div>
            {/* Zoom */}
            <div style={{ position: 'absolute', top: 12, right: 12, background: 'white', borderRadius: 6, boxShadow: '0 1px 3px rgba(0,0,0,0.15)', display: 'flex', flexDirection: 'column' }}>
              <button style={{ width: 34, height: 34, border: 'none', background: 'transparent', fontSize: 18, fontWeight: 700, borderBottom: '1px solid #E0E0E0', cursor: 'pointer' }}>+</button>
              <button style={{ width: 34, height: 34, border: 'none', background: 'transparent', fontSize: 18, fontWeight: 700, cursor: 'pointer' }}>−</button>
            </div>
          </div>

          {/* Progress + stats */}
          <div style={{ background: 'white', borderRadius: 10, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', padding: 20 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12 }}>
              {[
                ['58',  'Total stops',   '#212121'],
                ['28',  'Scanned',       CW_GREEN],
                ['29',  'Remaining',     '#757575'],
                ['1',   'Flagged',       '#D32F2F'],
                ['2:45', 'Elapsed (hrs)', CW_BLUE],
              ].map(([n, l, c], i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 26, fontWeight: 800, color: c, letterSpacing: -0.5 }}>{n}</div>
                  <div style={{ fontSize: 10, color: '#757575', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.4, marginTop: 2 }}>{l}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#757575', marginBottom: 6 }}>
                <span style={{ fontWeight: 600 }}>Route progress</span>
                <span style={{ fontWeight: 700, color: CW_BLUE }}>48% · est. finish 11:30 am</span>
              </div>
              <div style={{ height: 8, background: '#E0E0E0', borderRadius: 4 }}>
                <div style={{ width: '48%', height: '100%', background: `linear-gradient(90deg, ${CW_BLUE}, ${CW_BLUE_DEEP})`, borderRadius: 4 }}/>
              </div>
            </div>
          </div>
        </div>

        {/* Stops list */}
        <div style={{ background: 'white', borderRadius: 10, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
          <div style={{ padding: '14px 18px', borderBottom: '1px solid #F0F0F0', display: 'flex', alignItems: 'center' }}>
            <div style={{ fontSize: 13, fontWeight: 700 }}>Route stops</div>
            <div style={{ flex: 1 }}/>
            <div style={{ fontSize: 11, color: '#757575' }}><span style={{ fontWeight: 700, color: CW_BLUE }}>28</span> / 58</div>
          </div>
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {stops.map((s, i) => {
              const color = s.state === 'done' ? CW_GREEN : s.state === 'active' ? CW_BLUE : s.state === 'flagged' ? '#D32F2F' : '#BDBDBD';
              const bg = s.state === 'active' ? CW_BLUE_TINT : s.state === 'flagged' ? '#FFEBEE' : 'white';
              const opacity = s.state === 'done' ? 0.6 : 1;
              return (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 18px', background: bg, opacity, borderLeft: s.state === 'active' ? `3px solid ${CW_BLUE}` : '3px solid transparent', borderBottom: i < stops.length - 1 ? '1px solid #F5F5F5' : 'none' }}>
                  <div style={{ width: 12, height: 12, borderRadius: 6, background: color, boxShadow: s.state === 'active' ? `0 0 0 5px rgba(21,101,192,0.25)` : 'none', flexShrink: 0 }}/>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12, fontWeight: 700 }}>{s.hh}</div>
                    <div style={{ fontFamily: 'ui-monospace, Menlo', fontSize: 10, color: '#757575', marginTop: 2 }}>{s.hid}</div>
                    <div style={{ fontSize: 11, color: '#757575', marginTop: 1 }}>{s.addr}</div>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    {s.state === 'active'
                      ? <button style={{ background: CW_BLUE, color: 'white', border: 'none', padding: '6px 12px', borderRadius: 6, fontSize: 11, fontWeight: 700, fontFamily: 'Poppins', cursor: 'pointer' }}>Scan QR</button>
                      : <div style={{ fontSize: 11, color: s.state === 'flagged' ? '#D32F2F' : '#9E9E9E', fontWeight: 600 }}>{s.time}</div>}
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{ padding: 12, borderTop: '1px solid #F0F0F0' }}>
            <Btn full outline color={CW_BLUE} size="sm">Mark all complete</Btn>
          </div>
        </div>
      </div>
    </CollectorWebShell>
  );
}

/* 30. QR Verification console — webcam + manual + recent */
function CollectorWebScan() {
  const recent = [
    { hh: 'Dela Cruz household', hid: 'BAGO-MARA-2025-00142', t: '2 min ago', ok: true },
    { hh: 'Mendoza household', hid: 'BAGO-MARA-2025-00095', t: '18 min ago', ok: true },
    { hh: 'Aguilar household', hid: 'BAGO-MARA-2025-00092', t: '32 min ago', ok: true },
    { hh: 'Reyes household', hid: 'BAGO-MARA-2025-00091', t: '45 min ago', ok: true },
    { hh: 'Unregistered QR', hid: '—', t: '1 hr ago', ok: false, note: 'Invalid barcode' },
  ];
  return (
    <CollectorWebShell active="scan"
      title="QR verification console"
      subtitle="Scan or enter a household QR to confirm pickup and credit eco-points"
      actions={<Btn size="sm" outline color={CW_BLUE} icon="🎥">Change camera</Btn>}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 18 }}>
        {/* Scanner */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ position: 'relative', background: '#0D1B2A', borderRadius: 10, overflow: 'hidden', aspectRatio: '16 / 10' }}>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 320, height: 320 }}>
              {[
                { top: 0, left: 0, borderTop: '4px solid white', borderLeft: '4px solid white' },
                { top: 0, right: 0, borderTop: '4px solid white', borderRight: '4px solid white' },
                { bottom: 0, left: 0, borderBottom: '4px solid white', borderLeft: '4px solid white' },
                { bottom: 0, right: 0, borderBottom: '4px solid white', borderRight: '4px solid white' },
              ].map((s, i) => (
                <div key={i} style={{ position: 'absolute', width: 44, height: 44, ...s }}/>
              ))}
              <div style={{ position: 'absolute', left: 10, right: 10, top: '50%', height: 3, background: 'linear-gradient(90deg, transparent, #42A5F5, transparent)', boxShadow: '0 0 12px #42A5F5' }}/>
              <div style={{ position: 'absolute', inset: 60, display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 3, opacity: 0.55 }}>
                {Array.from({ length: 25 }).map((_, i) => (
                  <div key={i} style={{ background: [0,1,4,5,8,12,16,19,20,23,24].includes(i) ? 'white' : 'transparent' }}/>
                ))}
              </div>
            </div>
            <div style={{ position: 'absolute', top: 14, left: 14, background: 'rgba(0,0,0,0.5)', color: 'white', padding: '5px 12px', borderRadius: 16, fontSize: 11, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 6, height: 6, borderRadius: 3, background: '#EF4444', boxShadow: '0 0 6px #EF4444' }}/> Webcam · live
            </div>
            <div style={{ position: 'absolute', bottom: 18, left: 0, right: 0, textAlign: 'center', color: 'white', fontSize: 13, opacity: 0.88 }}>
              Align the household QR within the frame — auto-capture on detect
            </div>
          </div>

          {/* Manual entry */}
          <div style={{ background: 'white', borderRadius: 10, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', padding: 20 }}>
            <UL>Manual entry</UL>
            <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
              <input placeholder="BAGO-MARA-2025-…" style={{ flex: 1, height: 44, border: '1px solid #BDBDBD', borderRadius: 8, padding: '0 14px', fontFamily: 'ui-monospace, Menlo', fontSize: 13, outline: 'none' }}/>
              <Btn color={CW_BLUE}>Verify</Btn>
            </div>
            <div style={{ fontSize: 11, color: '#757575', marginTop: 8 }}>💡 Use manual entry only if QR is damaged. Barangay will review.</div>
          </div>
        </div>

        {/* Result panel + recent */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ background: 'white', borderRadius: 10, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
            <div style={{ background: '#E8F5E9', padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: 18, background: CW_GREEN, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>✓</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#1B5E20' }}>VALID · Last scan</div>
                <div style={{ fontSize: 11, color: '#1B5E20', opacity: 0.75 }}>2 min ago · auto-detected</div>
              </div>
            </div>
            <div style={{ padding: 20 }}>
              <div style={{ fontSize: 17, fontWeight: 700 }}>Dela Cruz household</div>
              <div style={{ fontSize: 11, color: '#757575', marginTop: 2 }}>128 Rizal St., Purok 3 · Brgy. Marawoy</div>
              <div style={{ fontFamily: 'ui-monospace, Menlo', fontSize: 12, color: CW_BLUE, fontWeight: 700, marginTop: 6 }}>BAGO-MARA-2025-00142</div>

              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 12 }}>
                <span style={{ background: '#F5F5F5', color: '#757575', padding: '4px 10px', borderRadius: 12, fontSize: 11, fontWeight: 600 }}>🟢 Biodegradable</span>
                <span style={{ background: '#F5F5F5', color: '#757575', padding: '4px 10px', borderRadius: 12, fontSize: 11, fontWeight: 600 }}>Segregated ✓</span>
                <span style={{ background: '#F5F5F5', color: '#757575', padding: '4px 10px', borderRadius: 12, fontSize: 11, fontWeight: 600 }}>5 members</span>
              </div>

              <div style={{ marginTop: 14, padding: 12, background: '#E8F5E9', borderRadius: 8 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#1B5E20' }}>🌿 +10 eco-points credited to resident</div>
                <div style={{ fontSize: 11, color: '#1B5E20', opacity: 0.75, marginTop: 2 }}>SMS + push notification sent ✅</div>
              </div>

              <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
                <Btn full color={CW_GREEN}>✓ Confirm & scan next</Btn>
              </div>
              <Btn full outline color="#F9A825" style={{ marginTop: 8 }}>🚩 Flag this household</Btn>
            </div>
          </div>

          <div style={{ background: 'white', borderRadius: 10, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '12px 18px', borderBottom: '1px solid #F0F0F0', fontSize: 12, fontWeight: 700 }}>Recent scans</div>
            <div style={{ overflowY: 'auto' }}>
              {recent.map((r, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 18px', borderBottom: i < recent.length - 1 ? '1px solid #F5F5F5' : 'none' }}>
                  <div style={{ width: 24, height: 24, borderRadius: 12, background: r.ok ? '#E8F5E9' : '#FFEBEE', color: r.ok ? CW_GREEN : '#D32F2F', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>{r.ok ? '✓' : '✕'}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12, fontWeight: 600 }}>{r.hh}</div>
                    <div style={{ fontFamily: 'ui-monospace, Menlo', fontSize: 10, color: '#757575' }}>{r.hid} {r.note && <span style={{ color: '#D32F2F', fontFamily: 'Poppins' }}>· {r.note}</span>}</div>
                  </div>
                  <div style={{ fontSize: 10, color: '#9E9E9E' }}>{r.t}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </CollectorWebShell>
  );
}

/* 31. Assigned reports (table) */
function CollectorWebReports() {
  const reports = [
    { prio: 'urgent', label: 'URGENT', type: 'Illegal dumping',      addr: 'Rizal St. cor. Mabini',     ref: 'RPT-2025-00147', date: 'Today · 2:03 pm', status: 'ack', statusL: 'Acknowledged', sel: true },
    { prio: 'urgent', label: 'URGENT', type: 'Broken container',     addr: 'Purok 1 covered court',     ref: 'RPT-2025-00145', date: 'Today · 9:15 am', status: 'open', statusL: 'Open' },
    { prio: 'high',   label: 'HIGH',   type: 'Overflowing bin',      addr: 'Purok 3, near chapel',      ref: 'RPT-2025-00132', date: 'Apr 19, 2026',   status: 'inprogress', statusL: 'In Progress' },
    { prio: 'medium', label: 'MEDIUM', type: 'Improper segregation', addr: 'Bonifacio Ave. #12',        ref: 'RPT-2025-00140', date: 'Apr 21, 2026',   status: 'ack', statusL: 'Acknowledged' },
    { prio: 'low',    label: 'LOW',    type: 'Schedule dispute',     addr: 'Mabini St., Purok 2',       ref: 'RPT-2025-00138', date: 'Apr 20, 2026',   status: 'ack', statusL: 'Acknowledged' },
  ];
  return (
    <CollectorWebShell active="reports"
      title="Assigned reports"
      subtitle="5 active · 2 urgent · 2 due today"
      actions={<Btn size="sm" color={CW_BLUE}>+ New update</Btn>}
      pageScrollable={false}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 18, height: '100%' }}>
        <div style={{ background: 'white', borderRadius: 10, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ padding: '14px 20px', borderBottom: '1px solid #F0F0F0', display: 'flex', gap: 8, alignItems: 'center' }}>
            {['All (5)', 'Urgent (2)', 'Today (2)', 'On my route'].map((t, i) => (
              <button key={t} style={{ padding: '6px 12px', borderRadius: 16, fontSize: 11, fontWeight: 600, background: i === 0 ? CW_BLUE : 'white', color: i === 0 ? 'white' : '#757575', border: i === 0 ? 'none' : '1px solid #E0E0E0', fontFamily: 'Poppins', cursor: 'pointer' }}>{t}</button>
            ))}
            <div style={{ flex: 1 }}/>
            <button style={{ padding: '6px 10px', border: '1px solid #E0E0E0', background: 'white', borderRadius: 6, fontSize: 11, fontWeight: 600, fontFamily: 'Poppins', color: '#757575', cursor: 'pointer' }}>↕ Priority</button>
          </div>
          <div style={{ flex: 1, overflowY: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
              <thead>
                <tr style={{ position: 'sticky', top: 0, background: '#FAFAFA', zIndex: 1 }}>
                  {['Priority', 'Report', 'Reference', 'Submitted', 'Status', ''].map((h, i) => (
                    <th key={i} style={{ textAlign: 'left', padding: '10px 14px', fontSize: 10, fontWeight: 700, color: '#757575', letterSpacing: 0.4, textTransform: 'uppercase', borderBottom: '1px solid #E0E0E0' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {reports.map((r, i) => (
                  <tr key={i} style={{ background: r.sel ? CW_BLUE_TINT : 'white', borderLeft: r.sel ? `3px solid ${CW_BLUE}` : '3px solid transparent', cursor: 'pointer' }}>
                    <td style={{ padding: '12px 14px', borderBottom: '1px solid #F5F5F5' }}><Badge kind={r.prio}>{r.label}</Badge></td>
                    <td style={{ padding: '12px 14px', borderBottom: '1px solid #F5F5F5' }}>
                      <div style={{ fontWeight: 700 }}>{r.type}</div>
                      <div style={{ fontSize: 11, color: '#757575', marginTop: 1 }}>📍 {r.addr}</div>
                    </td>
                    <td style={{ padding: '12px 14px', borderBottom: '1px solid #F5F5F5', fontFamily: 'ui-monospace, Menlo', fontSize: 11, color: CW_BLUE, fontWeight: 600 }}>{r.ref}</td>
                    <td style={{ padding: '12px 14px', borderBottom: '1px solid #F5F5F5', color: '#757575' }}>{r.date}</td>
                    <td style={{ padding: '12px 14px', borderBottom: '1px solid #F5F5F5' }}><Badge kind={r.status}>{r.statusL}</Badge></td>
                    <td style={{ padding: '12px 14px', borderBottom: '1px solid #F5F5F5', color: '#BDBDBD', fontSize: 18 }}>›</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Detail + update */}
        <div style={{ background: 'white', borderRadius: 10, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <PhotoPlaceholder seed={0} style={{ height: 160 }}/>
          <div style={{ padding: 20, flex: 1, overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontFamily: 'ui-monospace, Menlo', fontSize: 13, fontWeight: 700, color: CW_BLUE_DEEP }}>RPT-2025-00147</div>
              <Badge kind="urgent">URGENT</Badge>
            </div>
            <div style={{ fontSize: 16, fontWeight: 700, marginTop: 8 }}>Illegal dumping</div>
            <div style={{ fontSize: 11, color: '#757575', marginTop: 2 }}>📍 Rizal St. cor. Mabini · Reported by Maria Dela Cruz · Today 2:03 pm</div>

            <div style={{ marginTop: 14 }}>
              <label style={{ fontSize: 12, fontWeight: 700, display: 'block', marginBottom: 6 }}>Update status</label>
              <select defaultValue="In Progress — collecting now" style={{ width: '100%', height: 42, border: '1px solid #BDBDBD', borderRadius: 8, padding: '0 12px', fontFamily: 'Poppins', fontSize: 13, background: 'white' }}>
                <option>Acknowledged</option><option>In Progress — collecting now</option><option>Resolved</option><option>Needs escalation</option>
              </select>
            </div>
            <div style={{ marginTop: 12 }}>
              <label style={{ fontSize: 12, fontWeight: 700, display: 'block', marginBottom: 6 }}>Collector notes</label>
              <textarea defaultValue="On site. 4 bags of mixed household waste. Loading now. ETA clear in 10 mins." style={{ width: '100%', minHeight: 80, padding: 12, borderRadius: 8, border: '1px solid #BDBDBD', fontFamily: 'Poppins', fontSize: 13, resize: 'vertical', boxSizing: 'border-box', lineHeight: 1.5 }}/>
            </div>
            <div style={{ marginTop: 12, padding: 12, background: CW_BLUE_TINT, borderLeft: `3px solid ${CW_BLUE}`, borderRadius: '0 8px 8px 0', fontSize: 12, color: CW_BLUE_DEEP }}>📱 Resident is notified automatically on every status change.</div>
          </div>
          <div style={{ borderTop: '1px solid #F0F0F0', padding: 12, display: 'flex', gap: 8 }}>
            <Btn full outline color="#757575" size="sm">🖨️ Print report</Btn>
            <Btn full color={CW_BLUE} size="sm">Update status</Btn>
          </div>
        </div>
      </div>
    </CollectorWebShell>
  );
}

/* 32. Shift schedule */
function CollectorWebSchedule() {
  const rows = [
    { date: 'Mon · Apr 21', brgy: 'Marawoy', type: '🟢 Bio', shift: '6:00 – 11:00 am', crew: 'Crew B', truck: 'MR-04', stops: 56, done: 56, state: 'complete' },
    { date: 'Tue · Apr 22', brgy: 'San Sebastian', type: '🔵 Non-bio', shift: '6:00 – 11:00 am', crew: 'Crew B', truck: 'MR-04', stops: 62, done: 62, state: 'complete' },
    { date: 'Wed · Apr 23', brgy: 'Marawoy', type: '🟢 Bio', shift: '6:00 – 11:30 am', crew: 'Crew B', truck: 'MR-04', stops: 58, done: 28, state: 'active' },
    { date: 'Thu · Apr 24', brgy: 'Marawoy', type: '🔵 Non-bio', shift: '6:00 – 11:00 am', crew: 'Crew B', truck: 'MR-04', stops: 58, done: 0, state: 'upcoming' },
    { date: 'Fri · Apr 25', brgy: 'Balintawak', type: '♻️ Recycle', shift: '7:00 am – 12:00 pm', crew: 'Crew B', truck: 'MR-04', stops: 42, done: 0, state: 'upcoming' },
    { date: 'Sat · Apr 26', brgy: 'Marawoy', type: '🟢 Bio', shift: '6:00 – 10:00 am', crew: 'Crew B', truck: 'MR-04', stops: 55, done: 0, state: 'upcoming' },
    { date: 'Sun · Apr 27', brgy: '—',       type: '—',        shift: 'Rest day', crew: '—', truck: '—', stops: 0, done: 0, state: 'off' },
  ];
  return (
    <CollectorWebShell active="schedule" title="Shift schedule" subtitle="Crew B · Week of Apr 21 · 5 shifts · 1 rest day"
      actions={<Btn size="sm" outline color={CW_BLUE}>📥 Export .ics</Btn>}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 18 }}>
        {[
          ['This week',  '5',   'shifts · Mon–Sat', CW_BLUE],
          ['Total stops', '273', 'scheduled',       '#212121'],
          ['Completed',  '146', '54% of week',     CW_GREEN],
          ['Hours',      '24.5','of 30 target',     '#F9A825'],
        ].map(([l, v, s, c], i) => (
          <div key={i} style={{ background: 'white', borderRadius: 10, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', padding: 18 }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: '#757575', letterSpacing: 0.5, textTransform: 'uppercase' }}>{l}</div>
            <div style={{ fontSize: 28, fontWeight: 800, marginTop: 6, color: c }}>{v}</div>
            <div style={{ fontSize: 11, color: '#757575', marginTop: 2 }}>{s}</div>
          </div>
        ))}
      </div>

      <div style={{ background: 'white', borderRadius: 10, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
          <thead>
            <tr style={{ background: '#FAFAFA' }}>
              {['Day', 'Barangay', 'Type', 'Shift', 'Truck / crew', 'Stops', 'Progress', ''].map((h, i) => (
                <th key={i} style={{ textAlign: 'left', padding: '12px 18px', fontSize: 10, fontWeight: 700, color: '#757575', letterSpacing: 0.4, textTransform: 'uppercase', borderBottom: '1px solid #E0E0E0' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => {
              const pct = r.stops ? Math.round((r.done / r.stops) * 100) : 0;
              const bg = r.state === 'active' ? CW_BLUE_TINT : r.state === 'off' ? '#FAFAFA' : 'white';
              return (
                <tr key={i} style={{ background: bg, borderLeft: r.state === 'active' ? `3px solid ${CW_BLUE}` : '3px solid transparent' }}>
                  <td style={{ padding: '14px 18px', borderBottom: '1px solid #F5F5F5', fontWeight: 700 }}>{r.date}{r.state === 'active' && <span style={{ marginLeft: 8, fontSize: 9, background: CW_BLUE, color: 'white', padding: '2px 8px', borderRadius: 10, letterSpacing: 0.4 }}>TODAY</span>}</td>
                  <td style={{ padding: '14px 18px', borderBottom: '1px solid #F5F5F5' }}>{r.brgy}</td>
                  <td style={{ padding: '14px 18px', borderBottom: '1px solid #F5F5F5' }}>{r.type}</td>
                  <td style={{ padding: '14px 18px', borderBottom: '1px solid #F5F5F5', color: r.state === 'off' ? '#9E9E9E' : '#212121', fontStyle: r.state === 'off' ? 'italic' : 'normal' }}>{r.shift}</td>
                  <td style={{ padding: '14px 18px', borderBottom: '1px solid #F5F5F5', fontSize: 11, color: '#757575' }}>{r.truck !== '—' ? `${r.truck} · ${r.crew}` : '—'}</td>
                  <td style={{ padding: '14px 18px', borderBottom: '1px solid #F5F5F5', fontFamily: 'ui-monospace, Menlo', fontWeight: 600 }}>{r.stops ? `${r.done} / ${r.stops}` : '—'}</td>
                  <td style={{ padding: '14px 18px', borderBottom: '1px solid #F5F5F5', width: 160 }}>
                    {r.state === 'off' ? <span style={{ fontSize: 11, color: '#9E9E9E' }}>Rest day</span> :
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ flex: 1, height: 5, background: '#E0E0E0', borderRadius: 3 }}>
                          <div style={{ width: `${pct}%`, height: '100%', background: r.state === 'complete' ? CW_GREEN : CW_BLUE, borderRadius: 3 }}/>
                        </div>
                        <span style={{ fontSize: 10, fontWeight: 700, color: r.state === 'complete' ? CW_GREEN : CW_BLUE, width: 34 }}>{pct}%</span>
                      </div>
                    }
                  </td>
                  <td style={{ padding: '14px 18px', borderBottom: '1px solid #F5F5F5' }}>
                    {r.state === 'complete' && <Badge kind="resolved">✓ Done</Badge>}
                    {r.state === 'active' && <Badge kind="inprogress">In Progress</Badge>}
                    {r.state === 'upcoming' && <Badge kind="scheduled">Scheduled</Badge>}
                    {r.state === 'off' && <span style={{ fontSize: 10, color: '#9E9E9E', fontWeight: 700, letterSpacing: 0.4, textTransform: 'uppercase' }}>Off</span>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </CollectorWebShell>
  );
}

/* 33. Analytics */
function CollectorWebAnalytics() {
  const weeks = [220, 245, 198, 260, 273, 280, 256, 290, 268, 305, 284, 273];
  const max = Math.max(...weeks);
  return (
    <CollectorWebShell active="analytics" title="My analytics" subtitle="April 2026 · your performance vs. Crew B average">
      {/* KPI row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 18 }}>
        {[
          ['Pickups this month', '1,086', '+8% vs Mar', CW_BLUE, '🚛'],
          ['On-time rate',        '97.2%', 'Crew B avg 94.1%', CW_GREEN, '⏱'],
          ['Scan success',        '99.1%', '12 manual overrides', '#F9A825', '📱'],
          ['Reports resolved',    '42',    '+3 urgent handled',    CW_BLUE, '📸'],
        ].map(([l, v, s, c, i], k) => (
          <div key={k} style={{ background: 'white', borderRadius: 10, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', padding: 18, borderLeft: `4px solid ${c}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <span style={{ fontSize: 20 }}>{i}</span>
              <span style={{ fontSize: 10, color: '#9E9E9E', fontWeight: 600, letterSpacing: 0.3, textTransform: 'uppercase' }}>{l}</span>
            </div>
            <div style={{ fontSize: 26, fontWeight: 800, marginTop: 8, letterSpacing: -0.5 }}>{v}</div>
            <div style={{ fontSize: 11, color: c, fontWeight: 600, marginTop: 2 }}>{s}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 18 }}>
        {/* Weekly pickups chart */}
        <div style={{ background: 'white', borderRadius: 10, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', padding: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700 }}>Weekly pickups</div>
              <div style={{ fontSize: 11, color: '#757575', marginTop: 2 }}>Feb – Apr 2026 · You vs. Crew B average</div>
            </div>
            <div style={{ display: 'flex', gap: 12, fontSize: 11, color: '#757575' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 12, height: 3, background: CW_BLUE, borderRadius: 2 }}/>You</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 12, height: 3, background: '#BDBDBD', borderRadius: 2 }}/>Crew avg</span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 180, marginTop: 24, paddingBottom: 22, borderBottom: '1px solid #F0F0F0', position: 'relative' }}>
            {weeks.map((v, i) => {
              const crew = v * 0.92;
              return (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, height: '100%', justifyContent: 'flex-end', position: 'relative' }}>
                  <div style={{ width: '100%', display: 'flex', gap: 3, alignItems: 'flex-end', height: '100%' }}>
                    <div style={{ flex: 1, height: `${(v / max) * 100}%`, background: i === weeks.length - 1 ? CW_BLUE_DEEP : CW_BLUE, borderRadius: '3px 3px 0 0' }}/>
                    <div style={{ flex: 1, height: `${(crew / max) * 100}%`, background: '#BDBDBD', borderRadius: '3px 3px 0 0' }}/>
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#9E9E9E', marginTop: 8 }}>
            <span>Wk 1</span><span>Wk 3</span><span>Wk 5</span><span>Wk 7</span><span>Wk 9</span><span>Wk 12</span>
          </div>
        </div>

        {/* Brgy breakdown + insights */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ background: 'white', borderRadius: 10, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', padding: 20 }}>
            <div style={{ fontSize: 13, fontWeight: 700 }}>By barangay · this month</div>
            {[
              ['Brgy. Marawoy',        486, CW_BLUE],
              ['Brgy. San Sebastian',  284, '#42A5F5'],
              ['Brgy. Balintawak',     196, '#90CAF9'],
              ['Brgy. Tambo',          120, '#BBDEFB'],
            ].map(([b, v, c], i) => {
              const pct = (v / 486) * 100;
              return (
                <div key={i} style={{ marginTop: i === 0 ? 14 : 12 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, fontWeight: 600, marginBottom: 4 }}>
                    <span>{b}</span><span>{v}</span>
                  </div>
                  <div style={{ height: 6, background: '#F0F0F0', borderRadius: 3 }}>
                    <div style={{ width: `${pct}%`, height: '100%', background: c, borderRadius: 3 }}/>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ background: '#E8F5E9', borderRadius: 10, padding: 18, fontSize: 12, color: '#1B5E20', lineHeight: 1.6 }}>
            <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 8 }}>🏅 Recognition</div>
            <ul style={{ margin: 0, paddingLeft: 18 }}>
              <li>#2 in Crew B for on-time rate (Mar)</li>
              <li>Zero safety incidents this quarter</li>
              <li>12 residents thanked you this month</li>
            </ul>
          </div>
        </div>
      </div>
    </CollectorWebShell>
  );
}

/* 34. Collector profile */
function CollectorWebProfile() {
  return (
    <CollectorWebShell active="profile" title="Profile" subtitle="Credentials, permits, and account settings">
      <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 18 }}>
        <div style={{ background: 'white', borderRadius: 10, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', padding: 24 }}>
          <div style={{ display: 'flex', gap: 20 }}>
            <Avatar initials="JR" color={CW_BLUE} size={90}/>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 22, fontWeight: 700 }}>Juan Reyes</div>
              <div style={{ fontFamily: 'ui-monospace, Menlo', fontSize: 12, color: CW_BLUE, fontWeight: 700, marginTop: 2 }}>COL-LIPA-0042 · Crew B · Lipa Depot</div>
              <div style={{ fontSize: 12, color: '#757575', marginTop: 8 }}>📞 +63 917 555 1234 &nbsp;·&nbsp; ✉ juan.reyes@lipacity.gov.ph</div>
              <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                <Badge kind="resolved">✓ Active</Badge>
                <Badge kind="inprogress">On duty</Badge>
                <Badge kind="ontrack">97% on-time</Badge>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginTop: 22, paddingTop: 20, borderTop: '1px solid #F5F5F5' }}>
            {[
              ['Hired', 'Jan 15, 2024'],
              ['Shifts completed', '412'],
              ['Tenure', '2 yr 3 mo'],
              ['Rating', '4.8 / 5.0 ⭐'],
            ].map(([k, v], i) => (
              <div key={i}>
                <div style={{ fontSize: 10, fontWeight: 700, color: '#757575', letterSpacing: 0.4, textTransform: 'uppercase' }}>{k}</div>
                <div style={{ fontSize: 14, fontWeight: 700, marginTop: 4 }}>{v}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div style={{ background: 'white', borderRadius: 10, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', padding: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 12 }}>Certifications & permits</div>
          {[
            ['🪪 LGU Solid Waste Handler ID', 'Valid until Dec 2026', 'resolved', 'Valid'],
            ['🚛 Professional Driver\'s License', 'Expires May 2027', 'resolved', 'Valid'],
            ['🧤 Occupational Safety Training', 'Renewal due in 45 days', 'ack', 'Renew soon'],
            ['🧪 Hazmat Awareness (Level 1)', 'Completed Feb 2026', 'resolved', 'Current'],
          ].map(([l, d, k, b], i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: i < 3 ? '1px solid #F5F5F5' : 'none' }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12, fontWeight: 600 }}>{l}</div>
                <div style={{ fontSize: 11, color: '#757575', marginTop: 2 }}>{d}</div>
              </div>
              <Badge kind={k}>{b}</Badge>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: 'white', borderRadius: 10, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', padding: 24, marginTop: 16 }}>
        <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 14 }}>Dispatch preferences</div>
        {[
          ['SMS alerts for new urgent reports', 'Wakes phone · override silent mode', true],
          ['Push notification for schedule changes', 'Immediate · sound enabled', true],
          ['Route auto-optimize', 'Nearest-first algorithm', true],
          ['Offline mode', 'Cache 50 stops for spotty signal', true],
          ['Share location with dispatch', 'Only during active shift', false],
        ].map(([l, d, on], i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '10px 0', borderBottom: i < 4 ? '1px solid #F5F5F5' : 'none' }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 600 }}>{l}</div>
              <div style={{ fontSize: 11, color: '#757575', marginTop: 2 }}>{d}</div>
            </div>
            <Toggle on={on} color={CW_BLUE}/>
          </div>
        ))}
        <div style={{ marginTop: 18, paddingTop: 16, borderTop: '1px solid #F5F5F5', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ fontSize: 11, color: '#757575', maxWidth: 420 }}>
            End your shift on this device only. Dispatch still sees your last known status until you sign in again.
          </div>
          <Btn outline color="#C62828" onClick={() => window.bagoConfirmSignOut && window.bagoConfirmSignOut()}>Sign out of console</Btn>
        </div>
      </div>
    </CollectorWebShell>
  );
}

Object.assign(window, {
  CollectorWebShell, CollectorWebRoute, CollectorWebScan, CollectorWebReports,
  CollectorWebSchedule, CollectorWebAnalytics, CollectorWebProfile,
});
