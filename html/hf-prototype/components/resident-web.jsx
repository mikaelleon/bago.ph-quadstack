// resident-web.jsx — BAGO.PH Resident web app (desktop 1280 × 820)
// Responsive mirror of the mobile app, app-shell with sidebar

const RW_GREEN = '#2E7D32';
const RW_GREEN_DEEP = '#1B5E20';
const RW_GREEN_TINT = '#E8F5E9';
const RW_BLUE = '#1565C0';

const RESIDENT_WEB_ROUTES = {
  home: 'resident-web-home.html',
  schedule: 'resident-web-schedule.html',
  report: 'resident-web-report.html',
  myreports: 'resident-web-myreports.html',
  wallet: 'resident-web-wallet.html',
  missions: 'resident-web-missions.html',
  rewards: 'resident-web-rewards.html',
  leaderboard: 'resident-web-leaderboard.html',
  profile: 'resident-web-profile.html',
};

function navTo(path) {
  window.location.href = './' + String(path || 'index.html').replace(/^\.\//, '');
}

/* ──────────────────────────────────────────────────────────────────
   Shell: sidebar + topbar — consistent across all resident web screens
   ────────────────────────────────────────────────────────────────── */
function ResidentWebShell({ active, title, subtitle, actions, children, pageScrollable = true }) {
  const nav = [
    ['home',       '🏠',  'Home'],
    ['schedule',   '📅',  'Schedule'],
    ['report',     '📸',  'Submit report'],
    ['myreports',  '📋',  'My reports'],
    ['wallet',     '🌿',  'Eco-Points wallet'],
    ['missions',   '🎯',  'Missions'],
    ['rewards',    '🎁',  'Rewards'],
    ['leaderboard','🏆',  'Leaderboard'],
    ['profile',    '👤',  'Profile'],
  ];
  return (
    <div style={{ width: '100vw', minHeight: '100vh', height: '100vh', display: 'flex', fontFamily: 'Poppins', background: '#F5F5F5', color: '#212121', overflow: 'hidden' }}>
      {/* Sidebar */}
      <aside style={{
        width: 240, background: 'white', borderRight: '1px solid #E0E0E0',
        display: 'flex', flexDirection: 'column', flexShrink: 0,
      }}>
        <div style={{ padding: '20px 20px 16px', borderBottom: '1px solid #F0F0F0' }}>
          <div onClick={() => navTo('dashboard-resident.html')} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: RW_GREEN, fontSize: 20, fontWeight: 800, letterSpacing: -0.5, cursor: 'pointer' }}>
            <span style={{ fontSize: 22 }}>🌿</span>
            <span>BAGO.<span style={{ opacity: 0.85 }}>PH</span></span>
          </div>
          <div style={{ fontSize: 10, color: '#9E9E9E', marginTop: 4, letterSpacing: 0.3, textTransform: 'uppercase', fontWeight: 600 }}>Resident Portal</div>
        </div>

        {/* Household card */}
        <div style={{ margin: 16, padding: 12, background: RW_GREEN_TINT, borderRadius: 8, display: 'flex', alignItems: 'center', gap: 10 }}>
          <Avatar initials="MD" color={RW_GREEN} size={36}/>
          <div style={{ minWidth: 0, flex: 1 }}>
            <div style={{ fontSize: 12, fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Maria Dela Cruz</div>
            <div style={{ fontFamily: 'ui-monospace, Menlo', fontSize: 9, color: RW_GREEN_DEEP, fontWeight: 600 }}>BAGO-MARA-00142</div>
          </div>
        </div>

        <nav style={{ padding: '0 8px', flex: 1, overflowY: 'auto' }}>
          {nav.map(([id, icon, label]) => {
            const on = id === active;
            return (
              <div key={id} onClick={() => navTo(RESIDENT_WEB_ROUTES[id])} style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px',
                borderRadius: 6, marginBottom: 2, cursor: 'pointer',
                background: on ? RW_GREEN_TINT : 'transparent',
                color: on ? RW_GREEN_DEEP : '#424242',
                fontSize: 13, fontWeight: on ? 700 : 500,
                borderLeft: on ? `3px solid ${RW_GREEN}` : '3px solid transparent',
                paddingLeft: on ? 9 : 12,
              }}>
                <span style={{ fontSize: 16, width: 20, textAlign: 'center' }}>{icon}</span>
                <span>{label}</span>
              </div>
            );
          })}
        </nav>

        {/* Bottom: points pill + logout */}
        <div style={{ padding: 16, borderTop: '1px solid #F0F0F0' }}>
          <div style={{
            background: 'linear-gradient(160deg,#1B5E20,#2E7D32,#388E3C)',
            color: 'white', borderRadius: 8, padding: '10px 12px',
            display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <span style={{ fontSize: 22 }}>🌿</span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 18, fontWeight: 800, lineHeight: 1 }}>240</div>
              <div style={{ fontSize: 10, opacity: 0.85 }}>Eco-Points</div>
            </div>
            <div style={{ fontSize: 9, background: 'rgba(255,255,255,0.2)', padding: '3px 8px', borderRadius: 10, fontWeight: 700, letterSpacing: 0.4 }}>TIER 2</div>
          </div>
          <div style={{ display: 'flex', gap: 4, marginTop: 10, fontSize: 11, color: '#9E9E9E' }}>
            <span style={{ cursor: 'pointer' }}>Help</span>
            <span>·</span>
            <span style={{ cursor: 'pointer' }}>Settings</span>
            <span>·</span>
            <span style={{ cursor: 'pointer' }} onClick={() => { localStorage.removeItem('bagoRole'); localStorage.removeItem('bagoToken'); navTo('index.html'); }}>Log out</span>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Topbar */}
        <div style={{
          height: 64, background: 'white', borderBottom: '1px solid #E0E0E0',
          display: 'flex', alignItems: 'center', padding: '0 28px', gap: 16, flexShrink: 0,
        }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 18, fontWeight: 700 }}>{title}</div>
            {subtitle && <div style={{ fontSize: 12, color: '#757575', marginTop: 1 }}>{subtitle}</div>}
          </div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8, padding: '7px 12px',
            background: '#F5F5F5', borderRadius: 6, width: 320, color: '#9E9E9E', fontSize: 13,
          }}>
            <span>🔍</span>
            <span>Search schedule, rewards, reports…</span>
            <span style={{ marginLeft: 'auto', fontSize: 10, background: 'white', color: '#757575', padding: '2px 6px', borderRadius: 3, fontFamily: 'ui-monospace, Menlo' }}>⌘K</span>
          </div>
          {actions}
          <div style={{ position: 'relative', cursor: 'pointer', padding: '8px 6px' }}>
            <span style={{ fontSize: 20 }}>🔔</span>
            <span style={{ position: 'absolute', top: 6, right: 4, width: 8, height: 8, borderRadius: 4, background: '#F9A825', border: '1.5px solid white' }}/>
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: pageScrollable ? 'auto' : 'hidden', padding: 28 }}>
          {children}
        </div>
      </main>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
   19. Resident Home (web)
   ────────────────────────────────────────────────────────────────── */
function ResidentWebHome() {
  const statCards = [
    { icon: '📅', label: 'Next pickup', value: 'Thu, Apr 24', sub: '🔵 Non-biodegradable · 7–9 am', accent: RW_GREEN },
    { icon: '🌿', label: 'Eco-points',  value: '240',         sub: 'Tier 2 · Eco-Saver',               accent: RW_GREEN },
    { icon: '📸', label: 'Open reports', value: '2',          sub: '1 in progress · 1 new',            accent: RW_BLUE },
    { icon: '🏆', label: 'Barangay rank', value: '#4',         sub: 'of 312 residents in Marawoy',      accent: '#F9A825' },
  ];
  const activity = [
    { icon: '🟢', bg: RW_GREEN_TINT, fg: RW_GREEN, t: 'Segregation confirmed at pickup', d: 'Collector Juan Reyes · Apr 22, 7:12 am', r: '+15 pts' },
    { icon: '🚛', bg: '#E3F2FD', fg: RW_BLUE, t: 'Collector marked in-progress', d: 'Report RPT-2025-00147 · Today 8:42 am', r: 'In Progress' },
    { icon: '🎁', bg: '#FFE0B2', fg: '#E65100', t: 'Redeemed: Sari-sari tote bag',   d: 'Apr 18, 3:41 pm', r: '−50 pts' },
    { icon: '📢', bg: '#FFF8E1', fg: '#F57F17', t: 'Segregation drive — Sat Apr 26', d: 'Brgy. Marawoy Office · 2h ago', r: '' },
  ];
  return (
    <ResidentWebShell active="home" title="Hello, Maria 👋" subtitle="Brgy. Marawoy, Lipa City · Purok 3">
      {/* Hero row: welcome + next pickup */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 16, marginBottom: 20 }}>
        <div style={{
          background: 'linear-gradient(135deg,#1B5E20,#2E7D32,#43A047)',
          color: 'white', borderRadius: 12, padding: '24px 28px', position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', right: -30, top: -30, fontSize: 200, opacity: 0.1 }}>🌿</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
            <div style={{ fontSize: 26, fontWeight: 800, letterSpacing: -0.5 }}>Good morning, Maria</div>
            <span style={{ fontSize: 11, fontWeight: 700, background: 'rgba(255,255,255,0.22)', padding: '4px 10px', borderRadius: 20, letterSpacing: 0.4 }}>TIER 2 · ECO-SAVER</span>
          </div>
          <div style={{ fontSize: 13, opacity: 0.9, marginTop: 6, lineHeight: 1.5, maxWidth: 520 }}>
            You've earned <strong>240 eco-points</strong> this month. 160 more to reach 🛡️ Green Guardian — submit a valid report to get there faster.
          </div>
          <div style={{ display: 'flex', gap: 10, marginTop: 18 }}>
            <button style={{ background: 'white', color: RW_GREEN_DEEP, border: 'none', borderRadius: 8, padding: '10px 18px', fontFamily: 'Poppins', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>📸 Report an issue</button>
            <button style={{ background: 'rgba(255,255,255,0.15)', color: 'white', border: '1.5px solid rgba(255,255,255,0.4)', borderRadius: 8, padding: '10px 18px', fontFamily: 'Poppins', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>🖨️ Print my household QR</button>
          </div>
        </div>
        <div style={{ background: 'white', borderRadius: 12, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', padding: 20, display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase', color: '#757575' }}>Next scheduled pickup</div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 14, marginTop: 10 }}>
            <div style={{ width: 66, height: 66, borderRadius: 10, background: RW_GREEN_TINT, color: RW_GREEN_DEEP, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.4 }}>APR</div>
              <div style={{ fontSize: 28, fontWeight: 800, lineHeight: 1 }}>24</div>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 16, fontWeight: 700 }}>Thursday</div>
              <div style={{ fontSize: 12, color: '#757575', marginTop: 2 }}>🔵 Non-biodegradable · 7:00 – 9:00 am</div>
              <Badge kind="updated" style={{ marginTop: 6 }}>Schedule updated</Badge>
            </div>
          </div>
          <div style={{ marginTop: 14, padding: 10, background: '#FFF8E1', borderRadius: 8, fontSize: 12, color: '#5D4037', lineHeight: 1.5, borderLeft: '3px solid #F9A825' }}>
            Moved from Wednesday due to heavy rain advisory.
          </div>
          <div style={{ marginTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: RW_GREEN, fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
            <span>View full schedule</span>
            <span>→</span>
          </div>
        </div>
      </div>

      {/* Stat cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 20 }}>
        {statCards.map((s, i) => (
          <div key={i} style={{ background: 'white', borderRadius: 10, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', padding: 18, borderLeft: `4px solid ${s.accent}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ fontSize: 22 }}>{s.icon}</div>
              <div style={{ fontSize: 10, color: '#9E9E9E', fontWeight: 600, letterSpacing: 0.3, textTransform: 'uppercase' }}>{s.label}</div>
            </div>
            <div style={{ fontSize: 26, fontWeight: 800, marginTop: 8, letterSpacing: -0.5 }}>{s.value}</div>
            <div style={{ fontSize: 11, color: '#757575', marginTop: 2 }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Activity + announcements */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 16 }}>
        <div style={{ background: 'white', borderRadius: 10, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #F0F0F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: 14, fontWeight: 700 }}>Recent activity</div>
            <div style={{ fontSize: 12, color: RW_GREEN, fontWeight: 600, cursor: 'pointer' }}>See all →</div>
          </div>
          <div>
            {activity.map((a, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 20px', borderBottom: i < activity.length - 1 ? '1px solid #F5F5F5' : 'none' }}>
                <div style={{ width: 40, height: 40, borderRadius: 8, background: a.bg, color: a.fg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>{a.icon}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{a.t}</div>
                  <div style={{ fontSize: 11, color: '#757575', marginTop: 2 }}>{a.d}</div>
                </div>
                <div style={{ fontSize: 12, fontWeight: 700, color: a.r.startsWith('−') ? '#D32F2F' : a.r.startsWith('+') ? RW_GREEN : '#757575' }}>{a.r}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: 'white', borderRadius: 10, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #F0F0F0' }}>
            <div style={{ fontSize: 14, fontWeight: 700 }}>📢 Announcements</div>
            <div style={{ fontSize: 11, color: '#757575', marginTop: 2 }}>From Brgy. Marawoy Office</div>
          </div>
          <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              { tag: 'EVENT', tagColor: RW_GREEN, title: 'Segregation drive this Saturday', body: 'Covered court, Apr 26, 6 am. Free compost starter kit for the first 50 households.', when: '2h ago' },
              { tag: 'NOTICE', tagColor: '#F9A825', title: 'Typhoon Bising advisory', body: 'Non-bio pickup for Wednesday moved to Thursday Apr 24.', when: 'Yesterday' },
              { tag: 'BULLETIN', tagColor: RW_BLUE, title: 'New recycling drop-off point', body: 'PET and glass now accepted at the barangay hall every Friday 8 am–5 pm.', when: 'Apr 20' },
            ].map((a, i) => (
              <div key={i} style={{ paddingBottom: 14, borderBottom: i < 2 ? '1px solid #F5F5F5' : 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: a.tagColor, letterSpacing: 0.5 }}>{a.tag}</div>
                  <div style={{ fontSize: 10, color: '#9E9E9E' }}>{a.when}</div>
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, marginTop: 4 }}>{a.title}</div>
                <div style={{ fontSize: 12, color: '#757575', marginTop: 3, lineHeight: 1.5 }}>{a.body}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ResidentWebShell>
  );
}

/* ──────────────────────────────────────────────────────────────────
   20. Resident Schedule (web) — month calendar
   ────────────────────────────────────────────────────────────────── */
function ResidentWebSchedule() {
  // April 2026 starts on Wed. 30 days.
  const firstDow = 3; // Wed
  const daysInMonth = 30;
  const today = 23;
  // legend: G = bio, B = non-bio, R = recycle, X = none
  // Pattern: Mon/Thu bio, Tue/Fri non-bio, Wed recycle
  const typeFor = (dom) => {
    const dow = (firstDow + dom - 1) % 7; // 0=Sun, 1=Mon…
    if (dow === 1 || dow === 4) return 'bio';
    if (dow === 2 || dow === 5) return 'nonbio';
    if (dow === 3) return 'recycle';
    return null;
  };
  const typeMap = {
    bio:     { dot: '#2E7D32', bg: '#E8F5E9', label: '🟢 Bio' },
    nonbio:  { dot: '#1565C0', bg: '#E3F2FD', label: '🔵 Non-bio' },
    recycle: { dot: '#F9A825', bg: '#FFF8E1', label: '♻️ Recycle' },
  };
  const upcoming = [
    { date: 'Thu · Apr 24', type: 'nonbio',  time: '7:00 – 9:00 am', status: 'updated',   label: 'Updated' },
    { date: 'Fri · Apr 25', type: 'recycle', time: '8:00 – 10:00 am', status: 'scheduled', label: 'Scheduled' },
    { date: 'Sat · Apr 26', type: 'bio',     time: '7:00 – 9:00 am', status: 'scheduled', label: 'Scheduled' },
    { date: 'Mon · Apr 28', type: 'bio',     time: '7:00 – 9:00 am', status: 'scheduled', label: 'Scheduled' },
    { date: 'Tue · Apr 29', type: 'nonbio',  time: '7:00 – 9:00 am', status: 'scheduled', label: 'Scheduled' },
  ];

  return (
    <ResidentWebShell active="schedule" title="Collection schedule" subtitle="Brgy. Marawoy · Purok 3 · April 2026"
      actions={<>
        <button style={{ height: 36, padding: '0 14px', border: '1px solid #BDBDBD', background: 'white', borderRadius: 6, fontFamily: 'Poppins', fontWeight: 600, fontSize: 12, cursor: 'pointer' }}>📥 Export .ics</button>
        <button style={{ height: 36, padding: '0 14px', border: '1px solid #BDBDBD', background: 'white', borderRadius: 6, fontFamily: 'Poppins', fontWeight: 600, fontSize: 12, cursor: 'pointer' }}>🖨️ Print</button>
      </>}>
      {/* Alert */}
      <div style={{ background: '#FFF8E1', borderLeft: '4px solid #F9A825', padding: '14px 18px', borderRadius: '0 8px 8px 0', fontSize: 13, color: '#5D4037', marginBottom: 16 }}>
        <strong>⚠️ Schedule updated:</strong> Wednesday's non-biodegradable pickup moved to <strong>Thursday, Apr 24</strong> due to typhoon advisory.
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 16 }}>
        {/* Calendar */}
        <div style={{ background: 'white', borderRadius: 10, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', padding: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <button style={{ width: 32, height: 32, border: '1px solid #E0E0E0', borderRadius: 6, background: 'white', cursor: 'pointer' }}>‹</button>
              <div style={{ fontSize: 16, fontWeight: 700 }}>April 2026</div>
              <button style={{ width: 32, height: 32, border: '1px solid #E0E0E0', borderRadius: 6, background: 'white', cursor: 'pointer' }}>›</button>
            </div>
            <div style={{ display: 'flex', gap: 4, background: '#F5F5F5', padding: 3, borderRadius: 6 }}>
              {['Month', 'Week', 'List'].map((v, i) => (
                <button key={v} style={{ padding: '6px 14px', borderRadius: 4, border: 'none', background: i === 0 ? 'white' : 'transparent', color: i === 0 ? RW_GREEN_DEEP : '#757575', fontWeight: i === 0 ? 700 : 500, fontSize: 12, fontFamily: 'Poppins', cursor: 'pointer', boxShadow: i === 0 ? '0 1px 2px rgba(0,0,0,0.06)' : 'none' }}>{v}</button>
              ))}
            </div>
          </div>

          {/* Calendar grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 6 }}>
            {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d => (
              <div key={d} style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.4, color: '#9E9E9E', padding: '0 2px 6px', textTransform: 'uppercase' }}>{d}</div>
            ))}
            {Array.from({ length: firstDow }).map((_, i) => <div key={`b${i}`}/>)}
            {Array.from({ length: daysInMonth }).map((_, idx) => {
              const dom = idx + 1;
              const t = typeFor(dom);
              const isToday = dom === today;
              const isPast = dom < today;
              const tm = t && typeMap[t];
              return (
                <div key={dom} style={{
                  minHeight: 66, padding: 8,
                  background: isToday ? RW_GREEN_DEEP : tm ? tm.bg : 'white',
                  color: isToday ? 'white' : '#212121',
                  borderRadius: 6, border: isToday ? 'none' : '1px solid #F0F0F0',
                  opacity: isPast && !isToday ? 0.5 : 1,
                  display: 'flex', flexDirection: 'column', gap: 4,
                }}>
                  <div style={{ fontSize: 12, fontWeight: isToday ? 800 : 600 }}>{dom}</div>
                  {tm && (
                    <div style={{ fontSize: 9, fontWeight: 600, color: isToday ? 'white' : tm.dot, opacity: isToday ? 0.9 : 1 }}>{tm.label}</div>
                  )}
                  {dom === 24 && (
                    <div style={{ fontSize: 9, fontWeight: 700, color: isToday ? 'white' : '#E65100', background: isToday ? 'rgba(255,255,255,0.25)' : '#FFE0B2', padding: '1px 5px', borderRadius: 3, alignSelf: 'flex-start' }}>UPDATED</div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div style={{ display: 'flex', gap: 18, marginTop: 16, fontSize: 11, color: '#757575' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 10, height: 10, borderRadius: 2, background: '#E8F5E9', border: '1px solid #A5D6A7' }}/> Biodegradable</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 10, height: 10, borderRadius: 2, background: '#E3F2FD', border: '1px solid #90CAF9' }}/> Non-biodegradable</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 10, height: 10, borderRadius: 2, background: '#FFF8E1', border: '1px solid #FFE082' }}/> Recyclables</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 10, height: 10, borderRadius: 2, background: RW_GREEN_DEEP }}/> Today</span>
          </div>
        </div>

        {/* Upcoming list */}
        <div style={{ background: 'white', borderRadius: 10, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
          <div style={{ padding: '16px 18px', borderBottom: '1px solid #F0F0F0' }}>
            <div style={{ fontSize: 13, fontWeight: 700 }}>Upcoming pickups</div>
            <div style={{ fontSize: 11, color: '#757575', marginTop: 2 }}>Next 2 weeks</div>
          </div>
          {upcoming.map((u, i) => {
            const tm = typeMap[u.type];
            return (
              <div key={i} style={{ padding: '14px 18px', borderBottom: i < upcoming.length - 1 ? '1px solid #F5F5F5' : 'none', display: 'flex', gap: 12, alignItems: 'center' }}>
                <div style={{ width: 8, height: 40, borderRadius: 4, background: tm.dot, flexShrink: 0 }}/>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, fontWeight: 700 }}>{u.date}</div>
                  <div style={{ fontSize: 11, color: '#757575', marginTop: 1 }}>{tm.label} · {u.time}</div>
                </div>
                <Badge kind={u.status}>{u.label}</Badge>
              </div>
            );
          })}
        </div>
      </div>
    </ResidentWebShell>
  );
}

Object.assign(window, {
  ResidentWebShell, ResidentWebHome, ResidentWebSchedule,
});
