// admin-screens-2.jsx — Additional LGU Admin desktop screens
// 24 · Residents registry  ·  25 · Collectors mgmt  ·  26 · Announcements  ·  27 · Settings

const NAVY2 = '#0D1B2A';

/* ─── 24 · Residents registry ──────────────────────────────────── */
function AdminResidents() {
  const rows = [
    { sel: true,  hh: 'BAGO-MARA-2025-00142', name: 'Maria Dela Cruz',     brgy: 'Marawoy',         purok: '3', size: 5, score: 'A',  pts: 815, status: 'verified',  joined: 'Jan 12, 2026' },
    { sel: false, hh: 'BAGO-MARA-2025-00141', name: 'Juan Tolentino',       brgy: 'Marawoy',         purok: '1', size: 4, score: 'A+', pts: 980, status: 'verified',  joined: 'Jan 10, 2026' },
    { sel: false, hh: 'BAGO-SSEB-2025-00094', name: 'Ana Reyes',            brgy: 'San Sebastian',   purok: '2', size: 3, score: 'B',  pts: 410, status: 'verified',  joined: 'Feb 02, 2026' },
    { sel: false, hh: 'BAGO-MARA-2025-00187', name: 'Roberto Aquino',       brgy: 'Marawoy',         purok: '5', size: 6, score: 'C',  pts: 122, status: 'flagged',   joined: 'Mar 18, 2026' },
    { sel: false, hh: 'BAGO-BTAW-2025-00033', name: 'Ligaya Buenaventura',  brgy: 'Balintawak',      purok: '4', size: 2, score: 'A',  pts: 760, status: 'verified',  joined: 'Jan 04, 2026' },
    { sel: false, hh: 'BAGO-TAMB-2025-00211', name: 'Carlos Mendoza',       brgy: 'Tambo',           purok: '2', size: 7, score: 'B+', pts: 540, status: 'verified',  joined: 'Feb 28, 2026' },
    { sel: false, hh: 'BAGO-DAGT-2025-00156', name: 'Patricia Villanueva',  brgy: 'Dagatan',         purok: '1', size: 4, score: 'A',  pts: 720, status: 'verified',  joined: 'Feb 14, 2026' },
    { sel: false, hh: 'BAGO-MARA-2026-00203', name: 'Eduardo Pascual',      brgy: 'Marawoy',         purok: '6', size: 5, score: '—',  pts: 0,   status: 'pending',   joined: 'Apr 24, 2026' },
    { sel: false, hh: 'BAGO-SSEB-2025-00118', name: 'Imelda Ramos',         brgy: 'San Sebastian',   purok: '3', size: 3, score: 'B',  pts: 385, status: 'verified',  joined: 'Feb 19, 2026' },
    { sel: false, hh: 'BAGO-MARA-2025-00099', name: 'Felipe Castro',        brgy: 'Marawoy',         purok: '4', size: 8, score: 'D',  pts: 45,  status: 'flagged',   joined: 'Jan 25, 2026' },
  ];
  const statusPill = (s) => {
    const map = {
      verified: ['#E8F5E9', '#1B5E20', '✓ Verified'],
      pending:  ['#FFF8E1', '#8D6E0F', '⧗ Pending OTP'],
      flagged:  ['#FFEBEE', '#B71C1C', '⚠ Flagged'],
    };
    const [bg, fg, label] = map[s];
    return <span style={{ background: bg, color: fg, fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: 999 }}>{label}</span>;
  };
  const scorePill = (g) => {
    if (g === '—') return <span style={{ color: '#BDBDBD' }}>—</span>;
    const color = g.startsWith('A') ? '#1B5E20' : g.startsWith('B') ? '#558B2F' : g.startsWith('C') ? '#F9A825' : '#B71C1C';
    return <span style={{ display: 'inline-block', minWidth: 26, textAlign: 'center', background: color + '18', color, fontSize: 11, fontWeight: 800, padding: '3px 7px', borderRadius: 6 }}>{g}</span>;
  };

  return (
    <AdminShell active="residents" title="👥 Residents registry"
      subtitle="42,418 households · 38,902 verified · 2,104 pending · 1,412 flagged"
      topRight={
        <div style={{ display: 'flex', gap: 10 }}>
          <button style={{ height: 36, padding: '0 14px', border: '1px solid #BDBDBD', background: 'white', borderRadius: 6, fontFamily: 'Poppins', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>📥 Export CSV</button>
          <button style={{ height: 36, padding: '0 16px', background: '#2E7D32', color: 'white', border: 'none', borderRadius: 6, fontFamily: 'Poppins', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>+ Bulk import</button>
        </div>
      }>
      <div style={{ padding: 24, display: 'grid', gridTemplateColumns: '1fr 320px', gap: 20, height: '100%', overflow: 'hidden' }}>
        {/* LEFT — table */}
        <div style={{ background: 'white', borderRadius: 10, display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
          {/* Filter bar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: 14, borderBottom: '1px solid #F0F0F0' }}>
            <div style={{ flex: 1, position: 'relative' }}>
              <span style={{ position: 'absolute', left: 10, top: 9, fontSize: 13, color: '#9E9E9E' }}>🔍</span>
              <input placeholder="Search by name or household ID…" defaultValue="" style={{ width: '100%', height: 34, paddingLeft: 32, paddingRight: 12, border: '1px solid #E0E0E0', borderRadius: 6, fontFamily: 'Poppins', fontSize: 12 }}/>
            </div>
            {[['Barangay', 'All barangays'], ['Status', 'All statuses'], ['Eco-score', 'All grades'], ['Joined', 'Last 90 days']].map(([k, v]) => (
              <button key={k} style={{ height: 34, padding: '0 12px', background: 'white', border: '1px solid #E0E0E0', borderRadius: 6, fontSize: 11, fontFamily: 'Poppins', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ color: '#757575' }}>{k}:</span> <span style={{ fontWeight: 600 }}>{v}</span> ▾
              </button>
            ))}
          </div>

          {/* Table head */}
          <div style={{ display: 'grid', gridTemplateColumns: '36px 1.4fr 1.4fr 0.7fr 0.6fr 0.7fr 0.9fr 1fr', padding: '10px 14px', borderBottom: '1px solid #F0F0F0', background: '#FAFAFA', fontSize: 10, fontWeight: 700, color: '#757575', letterSpacing: 0.4, textTransform: 'uppercase' }}>
            <div><input type="checkbox"/></div>
            <div>Household</div><div>Head of household</div><div>Brgy / Purok</div><div>Size</div><div>Eco-score</div><div>Points</div><div style={{ textAlign: 'right' }}>Status</div>
          </div>

          {/* Rows */}
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {rows.map((r, i) => (
              <div key={i} style={{
                display: 'grid', gridTemplateColumns: '36px 1.4fr 1.4fr 0.7fr 0.6fr 0.7fr 0.9fr 1fr',
                padding: '12px 14px', borderBottom: '1px solid #F5F5F5',
                background: r.sel ? '#E8F5E9' : 'white', fontSize: 12, alignItems: 'center',
                borderLeft: r.sel ? '3px solid #2E7D32' : '3px solid transparent',
              }}>
                <div><input type="checkbox" defaultChecked={r.sel}/></div>
                <div style={{ fontFamily: 'ui-monospace, Menlo', fontWeight: 600, color: '#1B5E20' }}>{r.hh}</div>
                <div style={{ fontWeight: 600 }}>{r.name}</div>
                <div style={{ color: '#757575' }}>{r.brgy} <span style={{ color: '#BDBDBD' }}>· P{r.purok}</span></div>
                <div>{r.size}</div>
                <div>{scorePill(r.score)}</div>
                <div style={{ fontWeight: 700, color: r.pts > 0 ? '#1B5E20' : '#BDBDBD' }}>{r.pts > 0 ? r.pts.toLocaleString() : '—'}</div>
                <div style={{ textAlign: 'right' }}>{statusPill(r.status)}</div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div style={{ display: 'flex', alignItems: 'center', padding: '10px 14px', borderTop: '1px solid #F0F0F0', fontSize: 11, color: '#757575' }}>
            <div>Showing <strong style={{ color: '#212121' }}>1–10</strong> of 42,418 · 1 selected</div>
            <div style={{ flex: 1 }}/>
            <div style={{ display: 'flex', gap: 4 }}>
              {['‹', '1', '2', '3', '…', '4,242', '›'].map((p, i) => (
                <button key={i} style={{ minWidth: 26, height: 26, fontSize: 11, fontFamily: 'Poppins', border: '1px solid #E0E0E0', background: p === '1' ? '#2E7D32' : 'white', color: p === '1' ? 'white' : '#212121', borderRadius: 4, cursor: 'pointer', fontWeight: p === '1' ? 700 : 400 }}>{p}</button>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT — selected detail panel */}
        <div style={{ background: 'white', borderRadius: 10, padding: 18, boxShadow: '0 1px 3px rgba(0,0,0,0.06)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#757575', letterSpacing: 0.5, textTransform: 'uppercase' }}>Selected household</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 12 }}>
            <div style={{ width: 46, height: 46, borderRadius: 23, background: '#E8F5E9', color: '#1B5E20', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 16 }}>MD</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700 }}>Maria Dela Cruz</div>
              <div style={{ fontSize: 11, color: '#757575' }}>128 Rizal St., Purok 3</div>
              <div style={{ fontSize: 11, color: '#757575' }}>Brgy. Marawoy · Lipa City</div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 14 }}>
            {[['Eco-score', 'A · 815 pts'], ['Members', '5 (3 adults, 2 minors)'], ['Bin compliance', '94% last 30d'], ['Reports filed', '3 · 2 resolved']].map(([k, v]) => (
              <div key={k} style={{ background: '#F9FBF9', borderRadius: 6, padding: '8px 10px' }}>
                <div style={{ fontSize: 10, color: '#757575', fontWeight: 600 }}>{k}</div>
                <div style={{ fontSize: 12, fontWeight: 700, marginTop: 2 }}>{v}</div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 16, fontSize: 11, fontWeight: 700, color: '#757575', letterSpacing: 0.5, textTransform: 'uppercase' }}>Recent activity</div>
          <div style={{ marginTop: 8, fontSize: 12 }}>
            {[
              ['#22C55E', 'Pickup verified', 'Apr 22 · +15 pts'],
              ['#22C55E', 'Pickup verified', 'Apr 19 · +15 pts'],
              ['#F59E0B', 'Report submitted', 'Apr 14 · RPT-00147'],
              ['#22C55E', 'Mission completed', 'Apr 10 · Recycling 5x'],
            ].map(([c, t, s], i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, padding: '7px 0', borderBottom: i < 3 ? '1px solid #F5F5F5' : 'none' }}>
                <div style={{ width: 6, height: 6, borderRadius: 3, background: c, marginTop: 6, flexShrink: 0 }}/>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600 }}>{t}</div>
                  <div style={{ fontSize: 10, color: '#9E9E9E', marginTop: 1 }}>{s}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 8, paddingTop: 14 }}>
            <button style={{ height: 36, background: '#2E7D32', color: 'white', border: 'none', borderRadius: 6, fontFamily: 'Poppins', fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>View full profile</button>
            <button style={{ height: 32, background: 'white', color: '#212121', border: '1px solid #E0E0E0', borderRadius: 6, fontFamily: 'Poppins', fontWeight: 600, fontSize: 11, cursor: 'pointer' }}>Send message · Reissue QR · Flag</button>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}

/* ─── 25 · Collectors management ──────────────────────────────── */
function AdminCollectors() {
  const collectors = [
    { id: 'COL-0142', name: 'Juan Reyes',         truck: 'TRK-04', route: 'Marawoy R1',        shift: '6 am – 2 pm', status: 'on-route',  pickups: 142, accuracy: 96, sel: true  },
    { id: 'COL-0118', name: 'Ricardo Santos',     truck: 'TRK-02', route: 'San Sebastian R3',  shift: '6 am – 2 pm', status: 'on-route',  pickups: 118, accuracy: 94, sel: false },
    { id: 'COL-0203', name: 'Andres Bonifacio',   truck: 'TRK-07', route: 'Balintawak R1',     shift: '2 pm – 10 pm',status: 'standby',   pickups: 0,   accuracy: 92, sel: false },
    { id: 'COL-0067', name: 'Miguel Ramirez',     truck: 'TRK-03', route: 'Tambo R2',          shift: '6 am – 2 pm', status: 'on-route',  pickups: 87,  accuracy: 89, sel: false },
    { id: 'COL-0091', name: 'Felipe Garcia',      truck: 'TRK-05', route: 'Dagatan R1',        shift: '6 am – 2 pm', status: 'break',     pickups: 64,  accuracy: 91, sel: false },
    { id: 'COL-0156', name: 'Jose Luna',          truck: '—',      route: '—',                 shift: 'Day off',     status: 'off-duty',  pickups: 0,   accuracy: 95, sel: false },
    { id: 'COL-0211', name: 'Antonio Mabini',     truck: 'TRK-06', route: 'Marawoy R2',        shift: '6 am – 2 pm', status: 'on-route',  pickups: 96,  accuracy: 88, sel: false },
    { id: 'COL-0048', name: 'Diego Silang',       truck: 'TRK-01', route: 'San Sebastian R1',  shift: '2 pm – 10 pm',status: 'standby',   pickups: 0,   accuracy: 93, sel: false },
  ];
  const stPill = (s) => {
    const m = {
      'on-route': ['#E8F5E9', '#1B5E20', '🟢 On route'],
      'standby':  ['#E3F2FD', '#0D47A1', '🔵 Standby'],
      'break':    ['#FFF8E1', '#8D6E0F', '☕ On break'],
      'off-duty': ['#F5F5F5', '#757575', '⚫ Off duty'],
    };
    const [bg, fg, l] = m[s];
    return <span style={{ background: bg, color: fg, fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: 999 }}>{l}</span>;
  };

  return (
    <AdminShell active="collectors" title="🚛 Collectors & fleet"
      subtitle="48 active collectors · 12 trucks deployed · 36 routes · 4 substations"
      topRight={
        <div style={{ display: 'flex', gap: 10 }}>
          <button style={{ height: 36, padding: '0 14px', border: '1px solid #BDBDBD', background: 'white', borderRadius: 6, fontFamily: 'Poppins', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>📦 Manage routes</button>
          <button style={{ height: 36, padding: '0 16px', background: '#1565C0', color: 'white', border: 'none', borderRadius: 6, fontFamily: 'Poppins', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>+ Onboard collector</button>
        </div>
      }>
      <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16, height: '100%', overflow: 'hidden' }}>
        {/* Stat row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14, flexShrink: 0 }}>
          {[
            { ic: '🚛', val: '12 / 12', lab: 'Trucks deployed', sub: 'All routes covered today', accent: '#1565C0' },
            { ic: '📍', val: '34',      lab: 'Active stops',    sub: '187 completed / 521 today', accent: '#2E7D32' },
            { ic: '⚡', val: '94.2%',  lab: 'On-time rate',    sub: '↑ 2.1% vs last week',     accent: '#558B2F' },
            { ic: '⚠️', val: '3',       lab: 'Overdue pickups', sub: 'Marawoy R2 · escalate?',   accent: '#C62828' },
          ].map((s, i) => (
            <div key={i} style={{ background: 'white', borderRadius: 10, padding: 14, boxShadow: '0 1px 3px rgba(0,0,0,0.06)', borderLeft: `3px solid ${s.accent}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ fontSize: 18 }}>{s.ic}</div>
                <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: -0.5, color: s.accent }}>{s.val}</div>
              </div>
              <div style={{ fontSize: 11, fontWeight: 700, marginTop: 4 }}>{s.lab}</div>
              <div style={{ fontSize: 10, color: '#757575', marginTop: 2 }}>{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Two-col body */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 14, flex: 1, minHeight: 0 }}>
          {/* Roster */}
          <div style={{ background: 'white', borderRadius: 10, display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
            <div style={{ padding: 14, borderBottom: '1px solid #F0F0F0', display: 'flex', alignItems: 'center' }}>
              <div style={{ fontSize: 13, fontWeight: 700 }}>Collector roster — Shift A (6 am – 2 pm)</div>
              <div style={{ flex: 1 }}/>
              <input placeholder="Search collector or truck…" style={{ height: 30, padding: '0 10px', border: '1px solid #E0E0E0', borderRadius: 5, fontFamily: 'Poppins', fontSize: 11, width: 200 }}/>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '0.7fr 1.3fr 0.7fr 1fr 0.9fr 0.7fr 0.9fr', padding: '8px 14px', borderBottom: '1px solid #F0F0F0', background: '#FAFAFA', fontSize: 10, fontWeight: 700, color: '#757575', letterSpacing: 0.4, textTransform: 'uppercase' }}>
              <div>ID</div><div>Name</div><div>Truck</div><div>Route</div><div>Status</div><div>Pickups</div><div>Accuracy</div>
            </div>
            <div style={{ flex: 1, overflowY: 'auto' }}>
              {collectors.map((c, i) => (
                <div key={i} style={{
                  display: 'grid', gridTemplateColumns: '0.7fr 1.3fr 0.7fr 1fr 0.9fr 0.7fr 0.9fr',
                  padding: '11px 14px', borderBottom: '1px solid #F5F5F5', fontSize: 12, alignItems: 'center',
                  background: c.sel ? '#E3F2FD' : 'white',
                  borderLeft: c.sel ? '3px solid #1565C0' : '3px solid transparent',
                }}>
                  <div style={{ fontFamily: 'ui-monospace, Menlo', fontWeight: 600, color: '#0D47A1' }}>{c.id}</div>
                  <div style={{ fontWeight: 600 }}>{c.name}</div>
                  <div style={{ color: '#757575', fontFamily: 'ui-monospace, Menlo' }}>{c.truck}</div>
                  <div style={{ color: '#757575' }}>{c.route}</div>
                  <div>{stPill(c.status)}</div>
                  <div style={{ fontWeight: 700 }}>{c.pickups || '—'}</div>
                  <div>
                    {c.accuracy ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <div style={{ width: 60, height: 5, background: '#F0F0F0', borderRadius: 3, overflow: 'hidden' }}>
                          <div style={{ width: c.accuracy + '%', height: '100%', background: c.accuracy >= 93 ? '#2E7D32' : c.accuracy >= 90 ? '#F9A825' : '#C62828' }}/>
                        </div>
                        <div style={{ fontSize: 11, fontWeight: 700, color: c.accuracy >= 93 ? '#1B5E20' : c.accuracy >= 90 ? '#8D6E0F' : '#B71C1C' }}>{c.accuracy}%</div>
                      </div>
                    ) : '—'}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Detail panel for selected collector */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, minHeight: 0 }}>
            <div style={{ background: 'white', borderRadius: 10, padding: 16, boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 50, height: 50, borderRadius: 25, background: '#E3F2FD', color: '#0D47A1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 16 }}>JR</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 15, fontWeight: 700 }}>Juan Reyes</div>
                  <div style={{ fontSize: 11, color: '#757575' }}>COL-0142 · 4 yr tenure · Marawoy substation</div>
                </div>
                {stPill('on-route')}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginTop: 14 }}>
                {[['Today', '14 / 24'], ['Week', '142 / 168'], ['Rating', '4.8 ★']].map(([k, v]) => (
                  <div key={k} style={{ background: '#F9FBF9', borderRadius: 6, padding: '8px 10px', textAlign: 'center' }}>
                    <div style={{ fontSize: 16, fontWeight: 800, color: '#1B5E20' }}>{v}</div>
                    <div style={{ fontSize: 10, color: '#757575', fontWeight: 600 }}>{k}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: 'white', borderRadius: 10, padding: 16, boxShadow: '0 1px 3px rgba(0,0,0,0.06)', flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#757575', letterSpacing: 0.5, textTransform: 'uppercase' }}>Live route — Marawoy R1</div>
              {/* Map placeholder */}
              <div style={{ flex: 1, marginTop: 10, borderRadius: 8, background: 'linear-gradient(135deg, #E8F5E9, #C8E6C9)', position: 'relative', overflow: 'hidden', minHeight: 140 }}>
                {/* Streets */}
                <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0 }}>
                  <path d="M 0 60 Q 100 40 200 80 T 400 60" stroke="#A5D6A7" strokeWidth="20" fill="none" opacity="0.6"/>
                  <path d="M 0 130 L 400 110" stroke="#A5D6A7" strokeWidth="14" fill="none" opacity="0.5"/>
                  <path d="M 80 0 L 100 200" stroke="#A5D6A7" strokeWidth="14" fill="none" opacity="0.5"/>
                  <path d="M 250 0 L 280 200" stroke="#A5D6A7" strokeWidth="14" fill="none" opacity="0.5"/>
                </svg>
                {/* Pins */}
                {[[18, 44, 'done'], [42, 58, 'done'], [62, 36, 'done'], [78, 62, 'now'], [50, 78, 'next'], [28, 78, 'next']].map(([x, y, st], i) => (
                  <div key={i} style={{ position: 'absolute', left: x + '%', top: y + '%', transform: 'translate(-50%, -100%)' }}>
                    <div style={{ width: 22, height: 22, borderRadius: 11, background: st === 'done' ? '#2E7D32' : st === 'now' ? '#1565C0' : 'white', border: '2px solid white', boxShadow: '0 2px 6px rgba(0,0,0,0.25)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700 }}>{st === 'done' ? '✓' : st === 'now' ? '●' : ''}</div>
                  </div>
                ))}
                {/* Truck */}
                <div style={{ position: 'absolute', left: '78%', top: '62%', transform: 'translate(-50%, -130%)', fontSize: 22 }}>🚛</div>
              </div>
              <div style={{ display: 'flex', gap: 14, marginTop: 10, fontSize: 11 }}>
                <span><span style={{ color: '#2E7D32' }}>●</span> 14 done</span>
                <span><span style={{ color: '#1565C0' }}>●</span> 1 in progress</span>
                <span><span style={{ color: '#9E9E9E' }}>●</span> 9 remaining</span>
                <div style={{ flex: 1 }}/>
                <span style={{ color: '#757575' }}>ETA finish: 1:32 pm</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}

/* ─── 26 · Announcements ──────────────────────────────────────── */
function AdminAnnouncements() {
  const past = [
    { stat: 'sent',      title: 'Holy Week schedule changes',          channels: ['📱 Push', '✉️ SMS', '📧 Email'], audience: 'All barangays · 42,418 households', sent: 'Apr 02, 2026 · 8:00 am', open: '78%', click: '34%' },
    { stat: 'sent',      title: 'New recycling drop-off in Marawoy',   channels: ['📱 Push', '✉️ SMS'],            audience: 'Brgy. Marawoy · 8,204 hh',          sent: 'Mar 28, 2026 · 6:00 pm', open: '82%', click: '41%' },
    { stat: 'scheduled', title: 'May Day truck reroute notice',         channels: ['📱 Push', '✉️ SMS'],            audience: 'All barangays · 42,418 hh',          sent: 'May 01, 2026 · 7:00 am', open: '—',   click: '—' },
    { stat: 'draft',     title: 'Earth Day 2026 cleanup drive — RSVP', channels: ['📱 Push', '📧 Email'],          audience: 'All residents (opted-in events)',    sent: 'Draft',                  open: '—',   click: '—' },
    { stat: 'sent',      title: 'Bulky-waste collection — Apr 26',     channels: ['📱 Push'],                       audience: 'Brgy. San Sebastian · 5,108 hh',     sent: 'Apr 18, 2026 · 9:00 am', open: '64%', click: '22%' },
  ];
  const stP = (s) => {
    const m = { sent: ['#E8F5E9', '#1B5E20', '✓ Sent'], scheduled: ['#FFF8E1', '#8D6E0F', '⏰ Scheduled'], draft: ['#F5F5F5', '#757575', '✎ Draft'] };
    const [bg, fg, l] = m[s];
    return <span style={{ background: bg, color: fg, fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: 999 }}>{l}</span>;
  };

  return (
    <AdminShell active="announce" title="📢 Announcements" subtitle="Reach residents via push, SMS, email — segmented by barangay or attribute">
      <div style={{ padding: 24, display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 18, height: '100%', overflow: 'hidden' }}>
        {/* LEFT — composer */}
        <div style={{ background: 'white', borderRadius: 10, padding: 18, boxShadow: '0 1px 3px rgba(0,0,0,0.06)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700 }}>New announcement</div>
              <div style={{ fontSize: 11, color: '#757575' }}>Compose once · sent across selected channels with delivery tracking.</div>
            </div>
            <div style={{ flex: 1 }}/>
            <span style={{ background: '#FFF8E1', color: '#8D6E0F', fontSize: 10, fontWeight: 700, padding: '4px 8px', borderRadius: 4, letterSpacing: 0.4, textTransform: 'uppercase' }}>Auto-saved 12 sec ago</span>
          </div>

          <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 12, overflowY: 'auto', flex: 1 }}>
            {/* Type selector */}
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#757575', letterSpacing: 0.4, textTransform: 'uppercase', marginBottom: 6 }}>Announcement type</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 6 }}>
                {[['🚨', 'Emergency', false], ['📅', 'Schedule', true], ['🌿', 'Campaign', false], ['📢', 'General', false]].map(([ic, l, on]) => (
                  <button key={l} style={{
                    padding: '10px 8px', borderRadius: 6, fontFamily: 'Poppins', fontSize: 11, fontWeight: 600, cursor: 'pointer',
                    background: on ? '#E8F5E9' : 'white', border: on ? '1.5px solid #2E7D32' : '1px solid #E0E0E0',
                    color: on ? '#1B5E20' : '#212121',
                  }}>
                    <div style={{ fontSize: 18 }}>{ic}</div>
                    <div style={{ marginTop: 3 }}>{l}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#757575', letterSpacing: 0.4, textTransform: 'uppercase', marginBottom: 6 }}>Title</div>
              <input defaultValue="Schedule change: Apr 28 pickup moved to Apr 29" style={{ width: '100%', height: 38, padding: '0 12px', border: '1px solid #E0E0E0', borderRadius: 6, fontFamily: 'Poppins', fontSize: 13, fontWeight: 600 }}/>
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 6 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#757575', letterSpacing: 0.4, textTransform: 'uppercase' }}>Message</div>
                <div style={{ flex: 1 }}/>
                <div style={{ fontSize: 10, color: '#9E9E9E' }}>187 / 320 chars</div>
              </div>
              <textarea defaultValue="Maganda umaga, ka-barangay! Due to the labor day holiday, your scheduled pickup on Apr 28 (Tue) will be moved to Apr 29 (Wed), 7–9 am. Please leave bins out by 6:45 am. Salamat po!" style={{ width: '100%', height: 92, padding: 12, border: '1px solid #E0E0E0', borderRadius: 6, fontFamily: 'Poppins', fontSize: 12, lineHeight: 1.5, resize: 'none' }}/>
            </div>

            {/* Channels */}
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#757575', letterSpacing: 0.4, textTransform: 'uppercase', marginBottom: 6 }}>Channels</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {[
                  ['📱', 'Push notification', 'Free · ~38k devices', true],
                  ['✉️',  'SMS via Globe Labs', '₱0.50 per send · ~4k recipients without push', true],
                  ['📧', 'Email digest',       'Free · 12k subscribers · sent 8:00 am next day', false],
                  ['📺', 'Barangay LED board', 'Pushes to 4 substations',                       false],
                ].map(([ic, l, sub, on], i) => (
                  <label key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: 10, background: on ? '#E8F5E9' : '#F9FBF9', borderRadius: 6, cursor: 'pointer', border: on ? '1px solid #A5D6A7' : '1px solid transparent' }}>
                    <input type="checkbox" defaultChecked={on} style={{ accentColor: '#2E7D32' }}/>
                    <div style={{ fontSize: 16, width: 22 }}>{ic}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 12, fontWeight: 600 }}>{l}</div>
                      <div style={{ fontSize: 10, color: '#757575', marginTop: 1 }}>{sub}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Audience */}
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#757575', letterSpacing: 0.4, textTransform: 'uppercase', marginBottom: 6 }}>Audience</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: 10, background: '#F9FBF9', borderRadius: 6, border: '1px solid #E0E0E0' }}>
                <div style={{ fontSize: 12, fontWeight: 600, flex: 1 }}>All households · Brgy. Marawoy</div>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#1B5E20' }}>8,204 recipients</div>
                <button style={{ height: 28, padding: '0 10px', background: 'white', border: '1px solid #E0E0E0', borderRadius: 4, fontSize: 11, fontFamily: 'Poppins', fontWeight: 600, cursor: 'pointer' }}>Edit segment</button>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 8, paddingTop: 12, borderTop: '1px solid #F0F0F0', marginTop: 12 }}>
            <button style={{ height: 38, padding: '0 14px', background: 'white', border: '1px solid #E0E0E0', borderRadius: 6, fontFamily: 'Poppins', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Save draft</button>
            <button style={{ height: 38, padding: '0 14px', background: 'white', border: '1px solid #E0E0E0', borderRadius: 6, fontFamily: 'Poppins', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Schedule for later</button>
            <div style={{ flex: 1 }}/>
            <button style={{ height: 38, padding: '0 22px', background: '#2E7D32', color: 'white', border: 'none', borderRadius: 6, fontFamily: 'Poppins', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>📤 Send now → 8,204 hh</button>
          </div>
        </div>

        {/* RIGHT — preview + history */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, minHeight: 0 }}>
          {/* Phone preview */}
          <div style={{ background: 'white', borderRadius: 10, padding: 16, boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#757575', letterSpacing: 0.4, textTransform: 'uppercase', marginBottom: 10 }}>Live preview · resident push</div>
            <div style={{ background: 'linear-gradient(180deg,#1B2540,#2E3F5C)', borderRadius: 18, padding: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'rgba(255,255,255,0.7)', fontSize: 10 }}>
                <span>9:41</span><span style={{ flex: 1 }}/><span>5G</span><span>🔋</span>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.96)', borderRadius: 12, padding: 12, marginTop: 12, display: 'flex', gap: 10 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: '#2E7D32', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>🌿</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'baseline' }}>
                    <div style={{ fontSize: 11, fontWeight: 700 }}>BAGO.PH</div>
                    <div style={{ flex: 1 }}/>
                    <div style={{ fontSize: 9, color: '#9E9E9E' }}>now</div>
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 700, marginTop: 2 }}>Schedule change: Apr 28 → Apr 29</div>
                  <div style={{ fontSize: 11, color: '#424242', marginTop: 2, lineHeight: 1.4 }}>Maganda umaga, ka-barangay! Due to the labor day holiday, your scheduled pickup on Apr 28 (Tue) will be moved to…</div>
                </div>
              </div>
            </div>
          </div>

          {/* History */}
          <div style={{ background: 'white', borderRadius: 10, boxShadow: '0 1px 3px rgba(0,0,0,0.06)', flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minHeight: 0 }}>
            <div style={{ padding: 14, borderBottom: '1px solid #F0F0F0', display: 'flex', alignItems: 'center' }}>
              <div style={{ fontSize: 13, fontWeight: 700 }}>Recent announcements</div>
              <div style={{ flex: 1 }}/>
              <a style={{ fontSize: 11, color: '#2E7D32', fontWeight: 600, cursor: 'pointer' }}>View all →</a>
            </div>
            <div style={{ flex: 1, overflowY: 'auto' }}>
              {past.map((a, i) => (
                <div key={i} style={{ padding: '12px 14px', borderBottom: i < past.length - 1 ? '1px solid #F5F5F5' : 'none' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    {stP(a.stat)}
                    <div style={{ flex: 1 }}/>
                    <div style={{ fontSize: 10, color: '#9E9E9E' }}>{a.sent}</div>
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 600 }}>{a.title}</div>
                  <div style={{ fontSize: 10, color: '#757575', marginTop: 3 }}>
                    {a.channels.join(' · ')} · {a.audience}
                  </div>
                  {a.open !== '—' && (
                    <div style={{ display: 'flex', gap: 14, marginTop: 6, fontSize: 11 }}>
                      <span style={{ color: '#1B5E20', fontWeight: 700 }}>👁 {a.open} open</span>
                      <span style={{ color: '#0D47A1', fontWeight: 700 }}>👆 {a.click} click</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}

/* ─── 27 · Settings ──────────────────────────────────────────── */
function AdminSettings() {
  const sectionLabel = (t) => <div style={{ fontSize: 11, fontWeight: 700, color: '#757575', letterSpacing: 0.4, textTransform: 'uppercase', marginBottom: 12 }}>{t}</div>;
  const Row = ({ label, sub, children }) => (
    <div style={{ display: 'flex', alignItems: 'center', padding: '14px 0', borderBottom: '1px solid #F5F5F5' }}>
      <div style={{ flex: 1, paddingRight: 16 }}>
        <div style={{ fontSize: 13, fontWeight: 600 }}>{label}</div>
        {sub && <div style={{ fontSize: 11, color: '#757575', marginTop: 2, lineHeight: 1.4 }}>{sub}</div>}
      </div>
      <div>{children}</div>
    </div>
  );
  const tabs = [
    ['LGU profile',     true],
    ['Schedule rules',  false],
    ['Eco-points',      false],
    ['Roles & access',  false],
    ['Integrations',    false],
    ['Data & privacy',  false],
    ['Audit log',       false],
  ];
  const tg = (on) => (
    <div style={{ width: 38, height: 22, background: on ? '#2E7D32' : '#BDBDBD', borderRadius: 11, position: 'relative', cursor: 'pointer' }}>
      <div style={{ position: 'absolute', top: 2, left: on ? 18 : 2, width: 18, height: 18, background: 'white', borderRadius: 9, transition: 'all 0.15s' }}/>
    </div>
  );

  return (
    <AdminShell active="settings" title="⚙️ Settings" subtitle="Configure your LGU instance · only Super-admins can edit">
      <div style={{ padding: 24, display: 'grid', gridTemplateColumns: '220px 1fr', gap: 20, height: '100%', overflow: 'hidden' }}>
        {/* LEFT — sub-nav */}
        <div style={{ background: 'white', borderRadius: 10, padding: 10, boxShadow: '0 1px 3px rgba(0,0,0,0.06)', alignSelf: 'start' }}>
          {tabs.map(([t, on], i) => (
            <div key={i} style={{
              padding: '10px 12px', borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: 'pointer',
              background: on ? '#E8F5E9' : 'transparent',
              color: on ? '#1B5E20' : '#212121',
              borderLeft: on ? '3px solid #2E7D32' : '3px solid transparent',
              marginBottom: 2,
            }}>{t}</div>
          ))}
        </div>

        {/* RIGHT — content */}
        <div style={{ overflowY: 'auto' }}>
          {/* LGU profile card */}
          <div style={{ background: 'white', borderRadius: 10, padding: 22, boxShadow: '0 1px 3px rgba(0,0,0,0.06)', marginBottom: 16 }}>
            {sectionLabel('LGU profile')}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <Input label="LGU name"   value="Lipa City LGU"            onChange={() => {}}/>
              <Input label="LGU code"   value="PH-LIPA-CITY-04"         onChange={() => {}} hint="Read-only · DENR-issued"/>
              <Input label="Region"     value="Region IV-A · CALABARZON" onChange={() => {}}/>
              <Input label="Province"   value="Batangas"                 onChange={() => {}}/>
              <Input label="MSWMC head" value="Hon. Atty. Jose P. Magsaysay" onChange={() => {}}/>
              <Input label="DENR liaison" value="Ms. Carmen Lopez · ENRO" onChange={() => {}}/>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: 12, background: '#E8F5E9', borderRadius: 8, marginTop: 16 }}>
              <div style={{ width: 38, height: 38, borderRadius: 19, background: '#2E7D32', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>✓</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#1B5E20' }}>RA 9003 SWM Plan certified</div>
                <div style={{ fontSize: 11, color: '#1B5E20', opacity: 0.8, marginTop: 1 }}>Last reviewed Mar 12, 2026 by NSWMC. Valid through Dec 2026.</div>
              </div>
              <button style={{ height: 32, padding: '0 12px', background: 'white', color: '#1B5E20', border: '1px solid #1B5E20', borderRadius: 6, fontFamily: 'Poppins', fontSize: 11, fontWeight: 700, cursor: 'pointer' }}>View certificate</button>
            </div>
          </div>

          {/* Notifications card */}
          <div style={{ background: 'white', borderRadius: 10, padding: 22, boxShadow: '0 1px 3px rgba(0,0,0,0.06)', marginBottom: 16 }}>
            {sectionLabel('Operational defaults')}
            <Row label="Default pickup window"     sub="Used when a new route is created.">
              <select defaultValue="6:00 am – 9:00 am" style={{ height: 34, padding: '0 10px', border: '1px solid #E0E0E0', borderRadius: 6, fontFamily: 'Poppins', fontSize: 12 }}>
                <option>6:00 am – 9:00 am</option><option>7:00 am – 10:00 am</option>
              </select>
            </Row>
            <Row label="Auto-flag missed pickup after" sub="Resident reports an absence — auto-create incident?">
              <select defaultValue="2 hours" style={{ height: 34, padding: '0 10px', border: '1px solid #E0E0E0', borderRadius: 6, fontFamily: 'Poppins', fontSize: 12 }}>
                <option>1 hour</option><option>2 hours</option><option>4 hours</option>
              </select>
            </Row>
            <Row label="Resident can self-edit address" sub="When off, address changes require LGU approval.">{tg(false)}</Row>
            <Row label="Send weekly performance digest"  sub="Delivered to all LGU admins every Monday 8 am.">{tg(true)}</Row>
            <Row label="Public leaderboard"               sub="Show top 50 households on bago.ph/lipa-city.">{tg(true)}</Row>
          </div>

          {/* Eco-points */}
          <div style={{ background: 'white', borderRadius: 10, padding: 22, boxShadow: '0 1px 3px rgba(0,0,0,0.06)', marginBottom: 16 }}>
            {sectionLabel('Eco-points economy')}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12 }}>
              {[['Verified pickup', '+10'], ['Correctly segregated', '+5'], ['Report submitted', '+20'], ['Mission completed', '+50']].map(([k, v]) => (
                <div key={k} style={{ background: '#F9FBF9', borderRadius: 6, padding: 12 }}>
                  <div style={{ fontSize: 11, color: '#757575', fontWeight: 600 }}>{k}</div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: '#1B5E20', marginTop: 4 }}>{v} <span style={{ fontSize: 11, color: '#757575' }}>pts</span></div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 14, padding: 12, background: '#FFF8E1', borderRadius: 8, fontSize: 11, color: '#6D4C1B', borderLeft: '3px solid #F9A825' }}>
              ⚠️ Changes to point values apply prospectively only. Past balances are locked. Affected residents: 38,902.
            </div>
          </div>

          {/* Footer save bar */}
          <div style={{ display: 'flex', alignItems: 'center', padding: 12, background: 'white', borderRadius: 10, boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
            <div style={{ fontSize: 12, color: '#757575' }}>Last edited Apr 23 by Elena Mercado · 2 unsaved changes</div>
            <div style={{ flex: 1 }}/>
            <button style={{ height: 36, padding: '0 14px', background: 'white', border: '1px solid #E0E0E0', borderRadius: 6, fontFamily: 'Poppins', fontSize: 12, fontWeight: 600, cursor: 'pointer', marginRight: 8 }}>Discard</button>
            <button style={{ height: 36, padding: '0 18px', background: '#2E7D32', color: 'white', border: 'none', borderRadius: 6, fontFamily: 'Poppins', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>Save changes</button>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}

Object.assign(window, { AdminResidents, AdminCollectors, AdminAnnouncements, AdminSettings });
