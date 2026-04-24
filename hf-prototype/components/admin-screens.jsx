// admin-screens.jsx — All 5 LGU Admin desktop screens

const NAVY = '#0D1B2A';
const NAVY_SURF = '#162230';

function AdminShell({ children, active = 'dashboard', title, subtitle, topRight, noPad }) {
  const nav = [
    ['dashboard', '📊', 'Dashboard'],
    ['schedule', '📅', 'Schedule'],
    ['reports', '📸', 'Reports'],
    ['residents', '👥', 'Residents'],
    ['collectors', '🚛', 'Collectors'],
    ['announce', '📢', 'Announcements'],
    ['denr', '📋', 'DENR Report'],
    ['settings', '⚙️', 'Settings'],
  ];
  return (
    <div style={{ width: 1280, height: 860, display: 'flex', fontFamily: 'Poppins', background: '#F5F5F5', borderRadius: 10, overflow: 'hidden', boxShadow: '0 10px 40px rgba(0,0,0,0.15)' }}>
      {/* Sidebar */}
      <div style={{ width: 240, background: NAVY, color: 'white', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
        <div style={{ padding: '20px 20px 16px' }}>
          <Logo color="white" size={20}/>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', fontWeight: 700, letterSpacing: 0.8, marginTop: 6, textTransform: 'uppercase' }}>LGU Admin</div>
        </div>
        <div style={{ padding: '14px 20px', borderTop: '1px solid rgba(255,255,255,0.08)', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: 18, background: '#A5D6A7', color: NAVY, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 13 }}>EM</div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: 'white' }}>Elena Mercado</div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)' }}>LGU Officer · Lipa City</div>
          </div>
        </div>
        <div style={{ flex: 1, padding: '10px 12px' }}>
          {nav.map(([id, icon, label]) => (
            <div key={id} style={{
              display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px',
              borderRadius: 6, fontSize: 13, fontWeight: 600, cursor: 'pointer',
              color: active === id ? 'white' : 'rgba(255,255,255,0.7)',
              background: active === id ? 'rgba(255,255,255,0.10)' : 'transparent',
              borderLeft: active === id ? '3px solid #A5D6A7' : '3px solid transparent',
              marginBottom: 2,
            }}>
              <span style={{ fontSize: 15 }}>{icon}</span>
              <span>{label}</span>
            </div>
          ))}
        </div>
        <div style={{ padding: 16, fontSize: 10, color: 'rgba(255,255,255,0.4)', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          v2.4.1 · RA 9003 compliant
        </div>
      </div>

      {/* Main */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Topbar */}
        <div style={{ height: 64, background: 'white', borderBottom: '1px solid #E0E0E0', display: 'flex', alignItems: 'center', padding: '0 28px', flexShrink: 0 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 18, fontWeight: 700 }}>{title}</div>
            {subtitle && <div style={{ fontSize: 12, color: '#757575' }}>{subtitle}</div>}
          </div>
          {topRight || (
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#757575' }}>
                <span style={{ width: 8, height: 8, borderRadius: 4, background: '#2E7D32', boxShadow: '0 0 0 3px rgba(46,125,50,0.2)' }}/>
                LIVE · synced 9:42 am
              </div>
              <button style={{ background: NAVY, color: 'white', border: 'none', padding: '9px 18px', borderRadius: 6, fontFamily: 'Poppins', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>📢 Announce</button>
            </div>
          )}
        </div>
        {/* Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: noPad ? 0 : 28, background: '#F5F5F5' }}>
          {children}
        </div>
      </div>
    </div>
  );
}

// ─── 19. Admin login ─────────────────────────────────────────────────
function AdminLogin() {
  return (
    <div style={{ width: 900, height: 600, background: NAVY, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Poppins', borderRadius: 10, position: 'relative', overflow: 'hidden' }}>
      {/* Bg pattern */}
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at top, rgba(165,214,167,0.08), transparent 60%)` }}/>

      <div style={{ width: 400, background: 'white', borderRadius: 12, padding: '36px 32px', boxShadow: '0 20px 60px rgba(0,0,0,0.4)', position: 'relative' }}>
        <div style={{ textAlign: 'center' }}>
          <Logo size={28}/>
          <div style={{ display: 'inline-block', marginTop: 10, background: '#F5F5F5', color: '#757575', padding: '4px 12px', borderRadius: 20, fontSize: 10, fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase' }}>LGU Administrator Portal</div>
        </div>
        <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Input label="Email" value="elena.mercado@lipa.gov.ph" onChange={() => {}} type="email"/>
          <Input label="Password" value="••••••••••" onChange={() => {}} type="password"/>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
          <label style={{ fontSize: 12, color: '#757575', display: 'flex', alignItems: 'center', gap: 6 }}>
            <input type="checkbox" defaultChecked style={{ accentColor: NAVY }}/> Remember this device
          </label>
          <a style={{ fontSize: 12, color: NAVY, fontWeight: 600, cursor: 'pointer' }}>Forgot password?</a>
        </div>
        <Btn full color={NAVY} style={{ marginTop: 18 }}>Log in to console</Btn>
      </div>

      <div style={{ position: 'absolute', bottom: 20, left: 0, right: 0, textAlign: 'center', color: 'rgba(255,255,255,0.4)', fontSize: 11 }}>
        🔐 Authorized personnel only. All access is logged and audited per RA 10173.
      </div>
    </div>
  );
}

// ─── 20. Admin dashboard ─────────────────────────────────────────────
function AdminDashboard() {
  const metrics = [
    { accent: '#2E7D32', icon: '♻️', value: '94.2%', label: 'Compliance rate', trend: '↑ 2.4% vs. last month', trendColor: '#2E7D32' },
    { accent: '#1565C0', icon: '🚛', value: '1,248', label: 'Pickups this week', trend: '↑ 128 vs. prev week', trendColor: '#2E7D32' },
    { accent: '#F9A825', icon: '📸', value: '14', label: 'Open reports', trend: '2 urgent · 4 unassigned', trendColor: '#E65100' },
  ];
  const rows = [
    { brgy: 'Marawoy', hh: 412, rate: '96%', reports: 3, last: '9:12 am', status: 'ontrack', label: 'On Track' },
    { brgy: 'San Sebastian', hh: 385, rate: '92%', reports: 5, last: '8:47 am', status: 'ontrack', label: 'On Track' },
    { brgy: 'Balintawak', hh: 298, rate: '88%', reports: 2, last: '9:04 am', status: 'monitor', label: 'Monitor' },
    { brgy: 'Tambo', hh: 356, rate: '79%', reports: 8, last: '7:55 am', status: 'monitor', label: 'Monitor' },
    { brgy: 'Dagatan', hh: 204, rate: '71%', reports: 11, last: 'yesterday', status: 'urgent', label: 'Urgent' },
  ];
  return (
    <AdminShell active="dashboard" title="Lipa City · Operations overview" subtitle="Wednesday, April 23, 2026 · 9:42 am">
      {/* Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {metrics.map((m, i) => (
          <div key={i} style={{ background: 'white', borderRadius: 8, padding: 20, borderTop: `4px solid ${m.accent}`, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', position: 'relative' }}>
            <div style={{ position: 'absolute', top: 16, right: 16, fontSize: 20, opacity: 0.6 }}>{m.icon}</div>
            <div style={{ fontSize: 10, color: '#757575', fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase' }}>{m.label}</div>
            <div style={{ fontSize: 36, fontWeight: 800, marginTop: 6, lineHeight: 1 }}>{m.value}</div>
            <div style={{ fontSize: 12, color: m.trendColor, fontWeight: 600, marginTop: 10 }}>{m.trend}</div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div style={{ marginTop: 24, background: 'white', borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #E0E0E0' }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700 }}>Barangay performance — this week</div>
            <div style={{ fontSize: 11, color: '#757575', marginTop: 2 }}>5 of 72 barangays shown · sorted by compliance</div>
          </div>
          <a style={{ fontSize: 12, color: '#2E7D32', fontWeight: 600, cursor: 'pointer' }}>View all 72 →</a>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ background: '#E8F5E9' }}>
              {['Barangay', 'Households', 'Compliance', 'Reports', 'Last pickup', 'Status', ''].map((h, i) => (
                <th key={i} style={{ textAlign: 'left', padding: '10px 20px', fontSize: 11, color: '#1B5E20', fontWeight: 700, letterSpacing: 0.4, textTransform: 'uppercase' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} style={{ borderBottom: i < rows.length - 1 ? '1px solid #F5F5F5' : 'none' }}>
                <td style={{ padding: '14px 20px', fontWeight: 600 }}>Brgy. {r.brgy}</td>
                <td style={{ padding: '14px 20px', color: '#757575' }}>{r.hh.toLocaleString()}</td>
                <td style={{ padding: '14px 20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 60, height: 6, background: '#F5F5F5', borderRadius: 3 }}>
                      <div style={{ width: r.rate, height: '100%', background: parseInt(r.rate) > 90 ? '#2E7D32' : parseInt(r.rate) > 80 ? '#F9A825' : '#D32F2F', borderRadius: 3 }}/>
                    </div>
                    <span style={{ fontWeight: 600 }}>{r.rate}</span>
                  </div>
                </td>
                <td style={{ padding: '14px 20px', color: '#757575' }}>{r.reports}</td>
                <td style={{ padding: '14px 20px', color: '#757575' }}>{r.last}</td>
                <td style={{ padding: '14px 20px' }}><Badge kind={r.status}>{r.label}</Badge></td>
                <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                  <button style={{ background: '#E8F5E9', color: '#1B5E20', border: 'none', padding: '6px 14px', borderRadius: 4, fontSize: 11, fontWeight: 600, fontFamily: 'Poppins', cursor: 'pointer' }}>View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Activity feed */}
      <div style={{ marginTop: 20, background: 'white', borderRadius: 8, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
        <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>Recent activity</div>
        {[
          { color: '#D32F2F', desc: 'Urgent report submitted in Brgy. Dagatan — illegal dumping near river.', ts: '9:38 am' },
          { color: '#2E7D32', desc: 'Crew B completed Biodegradable route in Brgy. Marawoy (48/58 stops).', ts: '9:15 am' },
          { color: '#1565C0', desc: 'Collector Juan Reyes marked RPT-2025-00147 as In Progress.', ts: '8:42 am' },
          { color: '#F9A825', desc: 'Brgy. Tambo compliance dipped below 80% — monitor threshold.', ts: '8:10 am' },
          { color: '#2E7D32', desc: '32 new households registered in Brgy. San Sebastian overnight.', ts: '7:00 am' },
        ].map((a, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: i < 4 ? '1px solid #F5F5F5' : 'none' }}>
            <div style={{ width: 8, height: 8, borderRadius: 4, background: a.color, flexShrink: 0 }}/>
            <div style={{ flex: 1, fontSize: 13 }}>{a.desc}</div>
            <div style={{ fontSize: 11, color: '#9E9E9E' }}>{a.ts}</div>
            <a style={{ fontSize: 11, color: '#2E7D32', fontWeight: 600, cursor: 'pointer' }}>View</a>
          </div>
        ))}
      </div>
    </AdminShell>
  );
}

// ─── 21. Admin schedule ──────────────────────────────────────────────
function AdminSchedule() {
  const days = Array.from({ length: 35 }, (_, i) => i - 2); // Apr 2026 starts on Wed
  const eventsForDay = (d) => {
    if (d < 1 || d > 30) return [];
    const m = {
      1: [['bio', 'Marawoy']], 2: [['nonbio', 'Marawoy']], 3: [['rec', 'Tambo']],
      8: [['bio', 'Marawoy'], ['bio', 'Dagatan']], 10: [['cancel', 'Balintawak']],
      15: [['bio', 'Marawoy'], ['nonbio', 'Tambo']], 17: [['rec', 'San Sebastian']],
      22: [['bio', 'Marawoy'], ['bio', 'Dagatan'], ['nonbio', 'Tambo']], 23: [['bio', 'Marawoy']],
      24: [['nonbio', 'Marawoy']], 25: [['rec', 'Marawoy']],
      29: [['bio', 'All']],
    };
    return m[d] || [];
  };
  const pillBg = { bio: ['#C8E6C9', '#1B5E20'], nonbio: ['#BBDEFB', '#0D47A1'], rec: ['#FFF9C4', '#F57F17'], cancel: ['#FFCDD2', '#B71C1C'] };

  return (
    <AdminShell active="schedule" title="📅 Schedule management" subtitle="April 2026 · All barangays"
      topRight={<button style={{ background: '#2E7D32', color: 'white', border: 'none', padding: '10px 20px', borderRadius: 6, fontFamily: 'Poppins', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>+ Add new schedule</button>}>
      
      {/* Calendar */}
      <div style={{ background: 'white', borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 20px', borderBottom: '1px solid #E0E0E0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button style={{ width: 32, height: 32, background: '#F5F5F5', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 14 }}>‹</button>
            <div style={{ fontSize: 15, fontWeight: 700 }}>April 2026</div>
            <button style={{ width: 32, height: 32, background: '#F5F5F5', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 14 }}>›</button>
          </div>
          <div style={{ display: 'flex', gap: 12, fontSize: 11 }}>
            {[['🟢', 'Bio', '#1B5E20'], ['🔵', 'Non-bio', '#0D47A1'], ['🟡', 'Recycle', '#F57F17'], ['🔴', 'Cancelled', '#B71C1C']].map((l, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 4, color: l[2], fontWeight: 600 }}>{l[0]} {l[1]}</div>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', background: '#F5F5F5' }}>
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
            <div key={d} style={{ padding: '10px 8px', fontSize: 11, fontWeight: 700, color: '#757575', textTransform: 'uppercase', letterSpacing: 0.4, textAlign: 'left' }}>{d}</div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)' }}>
          {days.map((d, i) => {
            const evts = eventsForDay(d);
            const isToday = d === 23;
            const valid = d >= 1 && d <= 30;
            return (
              <div key={i} style={{
                minHeight: 82, padding: 6, borderRight: (i % 7 !== 6) ? '1px solid #F5F5F5' : 'none',
                borderBottom: i < 28 ? '1px solid #F5F5F5' : 'none',
                background: isToday ? '#E8F5E9' : 'white',
              }}>
                <div style={{
                  fontSize: 11, fontWeight: isToday ? 800 : 600,
                  color: valid ? (isToday ? '#1B5E20' : '#212121') : '#BDBDBD',
                  marginBottom: 4,
                }}>{valid ? d : (d < 1 ? (31 + d) : (d - 30))}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {evts.slice(0, 3).map((e, j) => {
                    const [bg, fg] = pillBg[e[0]];
                    return <div key={j} style={{ background: bg, color: fg, fontSize: 9, fontWeight: 700, padding: '2px 5px', borderRadius: 3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{e[1]}</div>;
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Upcoming table */}
      <div style={{ marginTop: 20, background: 'white', borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #E0E0E0', fontSize: 15, fontWeight: 700 }}>Upcoming schedules · next 7 days</div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ background: '#E8F5E9' }}>
              {['Date', 'Barangay', 'Waste type', 'Time window', 'Crew', 'Status', 'Actions'].map((h, i) => (
                <th key={i} style={{ textAlign: 'left', padding: '10px 20px', fontSize: 11, color: '#1B5E20', fontWeight: 700, letterSpacing: 0.4, textTransform: 'uppercase' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['Wed, Apr 23', 'Marawoy', '🟢 Biodegradable', '7:00 – 9:00 am', 'Crew B', 'inprogress', 'In Progress'],
              ['Thu, Apr 24', 'Marawoy', '🔵 Non-biodegradable', '7:00 – 9:00 am', 'Crew B', 'updated', 'Updated'],
              ['Thu, Apr 24', 'San Sebastian', '🟢 Biodegradable', '6:30 – 8:30 am', 'Crew A', 'scheduled', 'Scheduled'],
              ['Fri, Apr 25', 'Marawoy', '♻️ Recyclables', '8:00 – 10:00 am', 'Crew C', 'scheduled', 'Scheduled'],
              ['Fri, Apr 25', 'Balintawak', '🟢 Biodegradable', '7:00 – 9:00 am', 'Crew D', 'cancelled', 'Cancelled'],
            ].map((r, i) => (
              <tr key={i} style={{ borderBottom: i < 4 ? '1px solid #F5F5F5' : 'none' }}>
                {r.slice(0, 5).map((c, j) => <td key={j} style={{ padding: '12px 20px', color: j === 1 ? '#212121' : '#757575', fontWeight: j === 1 ? 600 : 400 }}>{c}</td>)}
                <td style={{ padding: '12px 20px' }}><Badge kind={r[5]}>{r[6]}</Badge></td>
                <td style={{ padding: '12px 20px' }}>
                  <button style={{ background: '#E8F5E9', color: '#1B5E20', border: 'none', padding: '5px 12px', borderRadius: 4, fontSize: 11, fontWeight: 600, fontFamily: 'Poppins', cursor: 'pointer', marginRight: 6 }}>Edit</button>
                  <button style={{ background: '#FFEBEE', color: '#B71C1C', border: 'none', padding: '5px 12px', borderRadius: 4, fontSize: 11, fontWeight: 600, fontFamily: 'Poppins', cursor: 'pointer' }}>Cancel</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}

// ─── 22. Admin reports ───────────────────────────────────────────────
function AdminReports() {
  const rows = [
    { prio: 'urgent', label: 'URGENT', ref: 'RPT-2025-00147', res: 'M. Dela Cruz', brgy: 'Marawoy', type: 'Illegal dumping', date: 'Apr 22', status: 'open', statusL: 'Open' },
    { prio: 'urgent', label: 'URGENT', ref: 'RPT-2025-00145', res: 'R. Catindig', brgy: 'Marawoy', type: 'Broken container', date: 'Apr 22', status: 'inprogress', statusL: 'In Progress' },
    { prio: 'high', label: 'HIGH', ref: 'RPT-2025-00144', res: 'C. Yap', brgy: 'Tambo', type: 'Overflowing bin', date: 'Apr 21', status: 'ack', statusL: 'Acknowledged' },
    { prio: 'high', label: 'HIGH', ref: 'RPT-2025-00140', res: 'B. Lontok', brgy: 'Dagatan', type: 'Improper segregation', date: 'Apr 21', status: 'inprogress', statusL: 'In Progress' },
    { prio: 'medium', label: 'MEDIUM', ref: 'RPT-2025-00138', res: 'A. Salonga', brgy: 'Balintawak', type: 'Missed collection', date: 'Apr 20', status: 'ack', statusL: 'Acknowledged' },
    { prio: 'low', label: 'LOW', ref: 'RPT-2025-00132', res: 'J. Tolentino', brgy: 'Marawoy', type: 'Schedule dispute', date: 'Apr 19', status: 'resolved', statusL: 'Resolved' },
    { prio: 'medium', label: 'MEDIUM', ref: 'RPT-2025-00128', res: 'C. Ramos', brgy: 'San Sebastian', type: 'Illegal dumping', date: 'Apr 18', status: 'resolved', statusL: 'Resolved' },
  ];
  return (
    <AdminShell active="reports" title="📸 Report management" subtitle="63 total · 14 open · 6 in progress · 43 resolved" noPad
      topRight={<div style={{ display: 'flex', gap: 8 }}>
        <button style={{ background: '#F5F5F5', color: '#212121', border: '1px solid #E0E0E0', padding: '8px 14px', borderRadius: 6, fontFamily: 'Poppins', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>🗺️ Map view</button>
        <button style={{ background: NAVY, color: 'white', border: 'none', padding: '8px 14px', borderRadius: 6, fontFamily: 'Poppins', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Export CSV</button>
      </div>}>
      <div style={{ display: 'flex', height: '100%' }}>
        {/* Main */}
        <div style={{ flex: 1, padding: 24, overflowY: 'auto' }}>
          {/* Filters + chips */}
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
            <select style={{ height: 36, border: '1px solid #BDBDBD', borderRadius: 6, padding: '0 10px', fontFamily: 'Poppins', fontSize: 12 }}><option>All statuses</option></select>
            <select style={{ height: 36, border: '1px solid #BDBDBD', borderRadius: 6, padding: '0 10px', fontFamily: 'Poppins', fontSize: 12 }}><option>All barangays</option></select>
            <select style={{ height: 36, border: '1px solid #BDBDBD', borderRadius: 6, padding: '0 10px', fontFamily: 'Poppins', fontSize: 12 }}><option>Sort: newest</option></select>
            <div style={{ flex: 1 }}/>
            <div style={{ background: '#FFCDD2', color: '#B71C1C', padding: '6px 12px', borderRadius: 20, fontSize: 11, fontWeight: 700 }}>14 Open</div>
            <div style={{ background: '#BBDEFB', color: '#0D47A1', padding: '6px 12px', borderRadius: 20, fontSize: 11, fontWeight: 700 }}>6 In Progress</div>
            <div style={{ background: '#C8E6C9', color: '#1B5E20', padding: '6px 12px', borderRadius: 20, fontSize: 11, fontWeight: 700 }}>43 Resolved</div>
          </div>

          <div style={{ marginTop: 16, background: 'white', borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
              <thead>
                <tr style={{ background: '#E8F5E9' }}>
                  {['Priority', 'Reference', 'Resident', 'Barangay', 'Issue type', 'Date', 'Status', 'Actions'].map((h, i) => (
                    <th key={i} style={{ textAlign: 'left', padding: '10px 14px', fontSize: 10, color: '#1B5E20', fontWeight: 700, letterSpacing: 0.4, textTransform: 'uppercase' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={i} style={{ borderBottom: i < rows.length - 1 ? '1px solid #F5F5F5' : 'none', background: i === 0 ? '#FFF8E1' : 'white' }}>
                    <td style={{ padding: '12px 14px' }}><Badge kind={r.prio} style={{ fontSize: 10 }}>{r.label}</Badge></td>
                    <td style={{ padding: '12px 14px', fontFamily: 'ui-monospace, Menlo', fontSize: 11, color: '#2E7D32', fontWeight: 600 }}>{r.ref}</td>
                    <td style={{ padding: '12px 14px', fontWeight: 600 }}>{r.res}</td>
                    <td style={{ padding: '12px 14px', color: '#757575' }}>Brgy. {r.brgy}</td>
                    <td style={{ padding: '12px 14px' }}>{r.type}</td>
                    <td style={{ padding: '12px 14px', color: '#757575' }}>{r.date}</td>
                    <td style={{ padding: '12px 14px' }}><Badge kind={r.status} style={{ fontSize: 10 }}>{r.statusL}</Badge></td>
                    <td style={{ padding: '12px 14px', whiteSpace: 'nowrap' }}>
                      <button style={{ background: NAVY, color: 'white', border: 'none', padding: '5px 10px', borderRadius: 4, fontSize: 10, fontWeight: 600, fontFamily: 'Poppins', cursor: 'pointer', marginRight: 4 }}>Assign</button>
                      <button style={{ background: '#E8F5E9', color: '#1B5E20', border: 'none', padding: '5px 10px', borderRadius: 4, fontSize: 10, fontWeight: 600, fontFamily: 'Poppins', cursor: 'pointer' }}>View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Side panel */}
        <div style={{ width: 420, background: 'white', borderLeft: '1px solid #E0E0E0', boxShadow: '-4px 0 20px rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #E0E0E0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontFamily: 'ui-monospace, Menlo', fontSize: 13, fontWeight: 700, color: '#1B5E20' }}>RPT-2025-00147</div>
              <div style={{ fontSize: 11, color: '#757575', marginTop: 2 }}>Illegal dumping · URGENT</div>
            </div>
            <button style={{ width: 28, height: 28, background: '#F5F5F5', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 16, color: '#757575' }}>×</button>
          </div>
          <div style={{ flex: 1, overflowY: 'auto' }}>
            <PhotoPlaceholder seed={0} style={{ height: 200 }}/>
            <div style={{ padding: 20 }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {[
                  ['Resident', 'Maria Dela Cruz'],
                  ['Barangay', 'Brgy. Marawoy, Lipa City'],
                  ['Location', 'Rizal St. cor. Mabini'],
                  ['GPS', '13.9411° N, 121.1633° E', 'mono'],
                  ['Submitted', 'Apr 22, 2026 · 2:03 pm'],
                  ['Status', 'Open · unassigned'],
                ].map(([k, v, m], i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: i < 5 ? '1px solid #F5F5F5' : 'none', fontSize: 12 }}>
                    <span style={{ color: '#757575' }}>{k}</span>
                    <span style={{ fontWeight: 600, fontFamily: m === 'mono' ? 'ui-monospace, Menlo' : 'Poppins' }}>{v}</span>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 14, fontSize: 12, color: '#212121', lineHeight: 1.5, background: '#F5F5F5', padding: 12, borderRadius: 6 }}>
                "Bag of mixed waste left at the corner for 3 days. Attracting stray dogs."
              </div>

              <UL style={{ marginTop: 16, marginBottom: 8 }}>Assign collector</UL>
              <select style={{ width: '100%', height: 42, border: '1px solid #BDBDBD', borderRadius: 6, padding: '0 10px', fontFamily: 'Poppins', fontSize: 13 }}>
                <option>Juan Reyes · Crew B (on route)</option>
                <option>Eduardo Mangahas · Crew A</option>
                <option>Ronel Pascual · Crew C</option>
              </select>

              <UL style={{ marginTop: 14, marginBottom: 8 }}>Update status</UL>
              <select style={{ width: '100%', height: 42, border: '1px solid #BDBDBD', borderRadius: 6, padding: '0 10px', fontFamily: 'Poppins', fontSize: 13 }}>
                <option>Acknowledged</option>
              </select>

              <UL style={{ marginTop: 14, marginBottom: 8 }}>Admin notes</UL>
              <textarea defaultValue="Priority route. Dispatch nearest collector immediately." style={{ width: '100%', minHeight: 70, padding: 10, border: '1px solid #BDBDBD', borderRadius: 6, fontFamily: 'Poppins', fontSize: 12, resize: 'vertical', boxSizing: 'border-box' }}/>
            </div>
          </div>
          <div style={{ padding: 16, borderTop: '1px solid #E0E0E0', display: 'flex', gap: 8 }}>
            <Btn full color={NAVY}>Save changes</Btn>
            <Btn outline color={NAVY}>Export PDF</Btn>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}

// ─── 23. DENR report ─────────────────────────────────────────────────
function AdminDENRReport() {
  return (
    <AdminShell active="denr" title="📋 DENR compliance report" subtitle="Quarterly submission · RA 9003 · NSWMC"
      topRight={<button style={{ background: NAVY, color: 'white', border: 'none', padding: '10px 20px', borderRadius: 6, fontFamily: 'Poppins', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>Submit to NSWMC →</button>}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 24, alignItems: 'flex-start' }}>
        {/* PREVIEW */}
        <div style={{ background: 'white', borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', padding: '36px 44px', fontFamily: 'Poppins' }}>
          <div style={{ textAlign: 'center', paddingBottom: 18, borderBottom: '2px solid #212121' }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase' }}>Republic of the Philippines</div>
            <div style={{ fontSize: 11, fontWeight: 600, color: '#757575', marginTop: 2 }}>Department of Environment and Natural Resources</div>
            <div style={{ fontSize: 10, color: '#757575' }}>National Solid Waste Management Commission</div>
            <h1 style={{ fontSize: 18, fontWeight: 800, margin: '14px 0 2px', letterSpacing: 0.5 }}>RA 9003 COMPLIANCE REPORT</h1>
            <div style={{ fontSize: 11, color: '#757575' }}>Ecological Solid Waste Management Act of 2000</div>
          </div>

          <div style={{ background: '#F5F5F5', padding: '12px 14px', borderRadius: 6, marginTop: 16, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px 16px', fontSize: 11 }}>
            <div><span style={{ color: '#757575' }}>LGU:</span> <strong>Lipa City, Batangas</strong></div>
            <div><span style={{ color: '#757575' }}>Period:</span> <strong>Q1 2026 (Jan – Mar)</strong></div>
            <div><span style={{ color: '#757575' }}>Certifying officer:</span> <strong>Elena T. Mercado</strong></div>
            <div><span style={{ color: '#757575' }}>Generated:</span> <strong>Apr 23, 2026</strong></div>
          </div>

          {[
            { title: '1. Executive Summary', rows: [['Total households registered', '34,812'], ['Barangays covered', '72 of 72 (100%)'], ['Active collectors', '148'], ['Overall compliance rate', '94.2%']] },
            { title: '2. Waste Diversion', rows: [['Biodegradable collected', '8,412 tonnes'], ['Non-biodegradable collected', '3,208 tonnes'], ['Recyclables recovered', '1,104 tonnes'], ['Diversion rate', '62.3% (target: 50%)']] },
            { title: '3. Infractions and Resolutions', rows: [['Reports filed', '412'], ['Resolved within SLA', '384 (93.2%)'], ['Pending investigation', '18'], ['Escalated to city', '10']] },
            { title: '4. MRF and Composting', rows: [['Barangays with MRF', '68 of 72'], ['Composting facilities active', '54'], ['Compost produced', '218 tonnes']] },
            { title: '5. IEC and Civic Engagement', rows: [['Eco-points redeemed', '₱482,340'], ['Registered residents', '28,104'], ['Community clean-ups', '47']] },
          ].map((s, i) => (
            <div key={i} style={{ marginTop: 20 }}>
              <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: 0.5, textTransform: 'uppercase', borderBottom: '1px solid #212121', paddingBottom: 4, marginBottom: 8 }}>{s.title}</div>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
                <tbody>
                  {s.rows.map(([k, v], j) => (
                    <tr key={j} style={{ borderBottom: j < s.rows.length - 1 ? '1px solid #F5F5F5' : 'none' }}>
                      <td style={{ padding: '6px 0', color: '#757575' }}>{k}</td>
                      <td style={{ padding: '6px 0', textAlign: 'right', fontWeight: 600 }}>{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}

          <div style={{ marginTop: 24, padding: 16, border: '1px solid #E0E0E0', borderRadius: 6 }}>
            <div style={{ fontSize: 11, fontStyle: 'italic', color: '#212121', lineHeight: 1.7 }}>
              I hereby certify that the foregoing data is true, correct, and complete to the best of my knowledge, as generated from the BAGO.PH civic waste management system, and compliant with the Ecological Solid Waste Management Act of 2000 (RA 9003) and its Implementing Rules and Regulations.
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28, marginTop: 28 }}>
              {[['ELENA T. MERCADO', 'LGU Officer, Lipa City'], ['HON. ARMANDO N. SALAZAR', 'City Mayor']].map(([n, t], i) => (
                <div key={i}>
                  <div style={{ borderBottom: '1px solid #212121', height: 28 }}/>
                  <div style={{ fontSize: 11, fontWeight: 700, marginTop: 6 }}>{n}</div>
                  <div style={{ fontSize: 10, color: '#757575' }}>{t}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginTop: 20, paddingTop: 14, borderTop: '1px dashed #BDBDBD', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontFamily: 'ui-monospace, Menlo', fontSize: 10, color: '#9E9E9E' }}>
              CERT-ID: BAGO-LIPA-Q12026-0039<br/>
              SHA256: a7f3…9e2c · Blockchain-anchored
            </div>
            <div style={{ width: 56, height: 56, background: '#212121', borderRadius: 4, display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', padding: 4, gap: 1 }}>
              {Array.from({ length: 64 }, (_, k) => <div key={k} style={{ background: Math.random() > 0.5 ? 'white' : '#212121' }}/>)}
            </div>
          </div>
        </div>

        {/* CONFIG */}
        <div style={{ position: 'sticky', top: 0, background: 'white', borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', padding: 20 }}>
          <UL>Report configuration</UL>
          <Select label="Reporting period" value="Q1 2026 (Jan – Mar)" onChange={() => {}}
            options={['Q1 2026 (Jan – Mar)', 'Q4 2025 (Oct – Dec)', 'Q3 2025 (Jul – Sep)', 'Annual 2025']} style={{ marginTop: 10 }}/>
          <Input label="Certifying officer" value="Elena T. Mercado" onChange={() => {}} style={{ marginTop: 12 }}/>

          <UL style={{ marginTop: 18, marginBottom: 10 }}>Sections to include</UL>
          {['Executive summary', 'Waste diversion', 'Infractions & resolutions', 'MRF & composting', 'IEC and civic engagement', 'Appendices (barangay-level data)'].map((s, i) => (
            <label key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 12, padding: '6px 0' }}>
              <input type="checkbox" defaultChecked={i < 5} style={{ accentColor: NAVY }}/> {s}
            </label>
          ))}

          <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <Btn full color={NAVY}>Generate report</Btn>
            <Btn full outline color={NAVY}>Export PDF</Btn>
            <Btn full outline color={NAVY}>Export CSV</Btn>
          </div>

          <div style={{ marginTop: 16, padding: 12, background: '#E8F5E9', borderRadius: 6, fontSize: 11, color: '#1B5E20', lineHeight: 1.5 }}>
            ♻️ Submissions are digitally signed and anchored on the DENR ledger per RA 9003 Sec. 49.
          </div>
        </div>
      </div>
    </AdminShell>
  );
}

Object.assign(window, { AdminLogin, AdminDashboard, AdminSchedule, AdminReports, AdminDENRReport });
