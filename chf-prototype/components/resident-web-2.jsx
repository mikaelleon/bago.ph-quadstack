// resident-web-2.jsx — BAGO.PH Resident web app — remaining screens

/* ──────────────────────────────────────────────────────────────────
   21. Submit Report (web) — 2-column: form + live preview
   ────────────────────────────────────────────────────────────────── */
function ResidentWebReport() {
  return (
    <ResidentWebShell active="report" title="Submit a waste report" subtitle="Your report is reviewed by the barangay within 24 hours">
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 20 }}>
        {/* Form */}
        <div style={{ background: 'white', borderRadius: 10, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', padding: 28 }}>
          <div style={{ background: '#E8F5E9', borderLeft: `4px solid #2E7D32`, padding: '12px 14px', borderRadius: '0 8px 8px 0', fontSize: 13, color: '#1B5E20', marginBottom: 22 }}>
            <strong>+15 Eco-Points</strong> credited when your report is validated by the barangay.
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <Select label="Issue type" value="Illegal dumping" onChange={() => {}}
              options={['Illegal dumping', 'Missed collection', 'Overflowing bin', 'Improper segregation', 'Broken container']}/>
            <Select label="Priority" value="Urgent — public health risk" onChange={() => {}}
              options={['Low', 'Medium', 'High', 'Urgent — public health risk']}/>
          </div>

          <div style={{ marginTop: 16 }}>
            <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>Description</label>
            <textarea defaultValue="Bag of mixed household waste has been left at the corner of Rizal St. and Mabini for 3 days. It's attracting stray dogs and creating odor issues for nearby households." style={{
              width: '100%', minHeight: 110, padding: 14, borderRadius: 8,
              border: '1px solid #BDBDBD', fontFamily: 'Poppins', fontSize: 14, resize: 'vertical',
              boxSizing: 'border-box', lineHeight: 1.6,
            }}/>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#757575', marginTop: 4 }}>
              <span>Be specific — include landmarks if helpful.</span>
              <span>168 / 300</span>
            </div>
          </div>

          <div style={{ marginTop: 16 }}>
            <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>Photo evidence <span style={{ color: '#9E9E9E', fontWeight: 400 }}>(up to 4)</span></label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
              <div style={{ borderRadius: 8, overflow: 'hidden', aspectRatio: '1 / 1' }}>
                <PhotoPlaceholder seed={0} style={{ width: '100%', height: '100%' }}/>
              </div>
              <div style={{ borderRadius: 8, overflow: 'hidden', aspectRatio: '1 / 1' }}>
                <PhotoPlaceholder seed={1} style={{ width: '100%', height: '100%' }}/>
              </div>
              <div style={{ border: '2px dashed #BDBDBD', borderRadius: 8, aspectRatio: '1 / 1', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#757575', gap: 4, cursor: 'pointer' }}>
                <div style={{ fontSize: 24 }}>📷</div>
                <div style={{ fontSize: 11, fontWeight: 600 }}>Add photo</div>
              </div>
              <div style={{ border: '2px dashed #BDBDBD', borderRadius: 8, aspectRatio: '1 / 1', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#757575', gap: 4, cursor: 'pointer' }}>
                <div style={{ fontSize: 20 }}>⬆️</div>
                <div style={{ fontSize: 11, fontWeight: 600 }}>Upload</div>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16, marginTop: 16 }}>
            <Input label="Street address" value="Rizal St. cor. Mabini" onChange={() => {}}/>
            <Select label="Barangay" value="Brgy. Marawoy" onChange={() => {}}
              options={['Brgy. Marawoy', 'Brgy. San Sebastian', 'Brgy. Balintawak', 'Brgy. Tambo']}/>
          </div>

          <div style={{ marginTop: 16, padding: 14, background: '#F5F5F5', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ fontSize: 20 }}>📍</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 12, fontWeight: 600 }}>GPS auto-tagged</div>
              <div style={{ fontFamily: 'ui-monospace, Menlo', fontSize: 11, color: '#757575', marginTop: 2 }}>13.9411° N, 121.1633° E · Accuracy ±8 m</div>
            </div>
            <button style={{ padding: '6px 12px', border: '1px solid #BDBDBD', background: 'white', borderRadius: 6, fontSize: 11, fontWeight: 600, fontFamily: 'Poppins', cursor: 'pointer', color: '#2E7D32' }}>Adjust on map</button>
          </div>

          <div style={{ marginTop: 22, display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
            <Btn outline color="#757575">Save as draft</Btn>
            <Btn>Submit report</Btn>
          </div>
        </div>

        {/* Live preview */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ background: 'white', borderRadius: 10, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
            <div style={{ padding: '14px 18px', background: '#F5F5F5', borderBottom: '1px solid #E0E0E0', fontSize: 11, fontWeight: 700, color: '#757575', letterSpacing: 0.5, textTransform: 'uppercase' }}>Preview · how admin sees it</div>
            <div style={{ padding: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <Badge kind="open">New · Open</Badge>
                <div style={{ fontSize: 10, color: '#9E9E9E', fontFamily: 'ui-monospace, Menlo' }}>RPT-2025-00148</div>
              </div>
              <div style={{ borderRadius: 8, overflow: 'hidden' }}>
                <PhotoPlaceholder seed={0} style={{ height: 140 }}/>
              </div>
              <div style={{ marginTop: 10, fontSize: 14, fontWeight: 700 }}>Illegal dumping · Urgent</div>
              <div style={{ fontSize: 11, color: '#757575', marginTop: 2 }}>📍 Rizal St. cor. Mabini, Brgy. Marawoy</div>
              <div style={{ fontSize: 12, color: '#424242', marginTop: 8, lineHeight: 1.5 }}>
                Bag of mixed household waste has been left at the corner for 3 days. Attracting stray dogs and creating odor issues…
              </div>
            </div>
          </div>
          <div style={{ background: '#E8F5E9', borderRadius: 10, padding: 18, fontSize: 12, color: '#1B5E20', lineHeight: 1.6 }}>
            <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 8 }}>💡 Faster resolution tips</div>
            <ul style={{ margin: 0, paddingLeft: 18 }}>
              <li>Include one clear photo at a distance + one close-up</li>
              <li>Mention nearby landmarks (chapel, covered court, etc.)</li>
              <li>GPS is auto-tagged — don't move if it looks right</li>
              <li>Urgent reports acknowledged within 6 hours</li>
            </ul>
          </div>
        </div>
      </div>
    </ResidentWebShell>
  );
}

/* ──────────────────────────────────────────────────────────────────
   22. My Reports (web) — table with filters + side detail
   ────────────────────────────────────────────────────────────────── */
function ResidentWebMyReports() {
  const reports = [
    { seed: 0, type: 'Illegal dumping',       addr: 'Rizal St. cor. Mabini',     ref: 'RPT-2025-00147', date: 'Apr 22, 2026', status: 'open',       label: 'Open',         sel: true },
    { seed: 1, type: 'Overflowing bin',       addr: 'Purok 3, near chapel',      ref: 'RPT-2025-00132', date: 'Apr 19, 2026', status: 'inprogress', label: 'In Progress' },
    { seed: 2, type: 'Missed collection',     addr: 'Mabini St., Purok 2',       ref: 'RPT-2025-00118', date: 'Apr 12, 2026', status: 'resolved',   label: 'Resolved' },
    { seed: 3, type: 'Improper segregation',  addr: 'Bonifacio Ave.',            ref: 'RPT-2025-00104', date: 'Apr 5, 2026',  status: 'resolved',   label: 'Resolved' },
    { seed: 4, type: 'Broken container',      addr: 'Purok 1, covered court',    ref: 'RPT-2025-00091', date: 'Mar 28, 2026', status: 'resolved',   label: 'Resolved' },
    { seed: 5, type: 'Illegal dumping',       addr: 'Bonifacio Ave. #22',        ref: 'RPT-2025-00072', date: 'Mar 15, 2026', status: 'rejected',   label: 'Rejected' },
  ];
  return (
    <ResidentWebShell active="myreports" title="My reports" subtitle="6 reports · 4 resolved · +65 eco-points earned" pageScrollable={false}
      actions={<Btn size="sm" icon="📸">New report</Btn>}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 18, height: '100%' }}>
        {/* Table */}
        <div style={{ background: 'white', borderRadius: 10, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ padding: '14px 20px', borderBottom: '1px solid #F0F0F0', display: 'flex', gap: 8, alignItems: 'center' }}>
            {['All (6)', 'Open (1)', 'In Progress (1)', 'Resolved (3)', 'Rejected (1)'].map((t, i) => (
              <button key={t} style={{
                padding: '6px 12px', borderRadius: 16, fontSize: 11, fontWeight: 600,
                background: i === 0 ? '#2E7D32' : 'white', color: i === 0 ? 'white' : '#757575',
                border: i === 0 ? 'none' : '1px solid #E0E0E0', fontFamily: 'Poppins', cursor: 'pointer',
              }}>{t}</button>
            ))}
            <div style={{ flex: 1 }}/>
            <button style={{ padding: '6px 10px', border: '1px solid #E0E0E0', background: 'white', borderRadius: 6, fontSize: 11, fontWeight: 600, fontFamily: 'Poppins', color: '#757575', cursor: 'pointer' }}>↕ Sort</button>
          </div>
          <div style={{ flex: 1, overflowY: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
              <thead>
                <tr style={{ position: 'sticky', top: 0, background: '#FAFAFA', zIndex: 1 }}>
                  {['Report', 'Reference', 'Date', 'Status', ''].map((h, i) => (
                    <th key={i} style={{ textAlign: 'left', padding: '10px 14px', fontSize: 10, fontWeight: 700, color: '#757575', letterSpacing: 0.4, textTransform: 'uppercase', borderBottom: '1px solid #E0E0E0' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {reports.map((r, i) => (
                  <tr key={i} style={{ background: r.sel ? '#E8F5E9' : 'white', cursor: 'pointer', borderLeft: r.sel ? '3px solid #2E7D32' : '3px solid transparent' }}>
                    <td style={{ padding: '12px 14px', borderBottom: '1px solid #F5F5F5' }}>
                      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                        <div style={{ width: 44, height: 44, borderRadius: 6, overflow: 'hidden', flexShrink: 0 }}>
                          <PhotoPlaceholder seed={r.seed} style={{ width: '100%', height: '100%', fontSize: 20 }}/>
                        </div>
                        <div style={{ minWidth: 0 }}>
                          <div style={{ fontWeight: 700 }}>{r.type}</div>
                          <div style={{ fontSize: 11, color: '#757575', marginTop: 1 }}>📍 {r.addr}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '12px 14px', borderBottom: '1px solid #F5F5F5', fontFamily: 'ui-monospace, Menlo', fontSize: 11, color: '#2E7D32', fontWeight: 600 }}>{r.ref}</td>
                    <td style={{ padding: '12px 14px', borderBottom: '1px solid #F5F5F5', color: '#757575' }}>{r.date}</td>
                    <td style={{ padding: '12px 14px', borderBottom: '1px solid #F5F5F5' }}><Badge kind={r.status}>{r.label}</Badge></td>
                    <td style={{ padding: '12px 14px', borderBottom: '1px solid #F5F5F5', color: '#BDBDBD', fontSize: 18 }}>›</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Detail panel — same RPT as selected */}
        <div style={{ background: 'white', borderRadius: 10, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ position: 'relative' }}>
            <PhotoPlaceholder seed={0} style={{ height: 180 }}/>
            <div style={{ position: 'absolute', top: 12, left: 12 }}>
              <Badge kind="open">Open · New</Badge>
            </div>
          </div>
          <div style={{ padding: 20, flex: 1, overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontFamily: 'ui-monospace, Menlo', fontSize: 13, fontWeight: 700, color: '#1B5E20' }}>RPT-2025-00147</div>
              <div style={{ fontSize: 11, color: '#9E9E9E' }}>Apr 22 · 2:03 pm</div>
            </div>
            <div style={{ fontSize: 17, fontWeight: 700, marginTop: 8 }}>Illegal dumping</div>
            <div style={{ fontSize: 12, color: '#757575', marginTop: 2 }}>📍 Rizal St. cor. Mabini, Brgy. Marawoy</div>

            {/* Progress stepper */}
            <div style={{ marginTop: 18, display: 'flex', alignItems: 'center' }}>
              {[
                { label: 'Open',         state: 'done' },
                { label: 'Acknowledged', state: 'active' },
                { label: 'In Progress',  state: 'future' },
                { label: 'Resolved',     state: 'future' },
              ].map((s, i, arr) => (
                <React.Fragment key={i}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, flexShrink: 0 }}>
                    <div style={{ width: 22, height: 22, borderRadius: 11, background: s.state === 'done' ? '#2E7D32' : s.state === 'active' ? '#1565C0' : '#E0E0E0', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, boxShadow: s.state === 'active' ? '0 0 0 4px rgba(21,101,192,0.2)' : 'none' }}>{s.state === 'done' ? '✓' : i + 1}</div>
                    <div style={{ fontSize: 9, fontWeight: 600, color: s.state === 'future' ? '#BDBDBD' : '#212121' }}>{s.label}</div>
                  </div>
                  {i < arr.length - 1 && <div style={{ flex: 1, height: 2, background: s.state === 'done' ? '#2E7D32' : '#E0E0E0', marginBottom: 14 }}/>}
                </React.Fragment>
              ))}
            </div>

            <UL style={{ marginTop: 18, marginBottom: 10 }}>Status history</UL>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { c: '#F57F17', l: 'Acknowledged', n: 'Reviewed by Brgy. Kagawad Elena Mercado.', t: 'Today · 8:42 am' },
                { c: '#1B5E20', l: 'Open', n: 'Report submitted by resident.', t: 'Apr 22 · 2:03 pm' },
              ].map((h, i) => (
                <div key={i} style={{ display: 'flex', gap: 10 }}>
                  <div style={{ width: 8, height: 8, borderRadius: 4, background: h.c, marginTop: 6, flexShrink: 0 }}/>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700 }}>{h.l}</div>
                    <div style={{ fontSize: 11, color: '#757575', marginTop: 1 }}>{h.n}</div>
                    <div style={{ fontSize: 10, color: '#9E9E9E', marginTop: 2 }}>{h.t}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ borderTop: '1px solid #F0F0F0', padding: 14, display: 'flex', gap: 8 }}>
            <Btn full outline color="#757575" size="sm">🖨️ Print</Btn>
            <Btn full size="sm">View full detail</Btn>
          </div>
        </div>
      </div>
    </ResidentWebShell>
  );
}

/* ──────────────────────────────────────────────────────────────────
   23. Wallet (web)
   ────────────────────────────────────────────────────────────────── */
function ResidentWebWallet() {
  const txs = [
    { i: '🟢', bg: '#E8F5E9', fg: '#2E7D32', label: 'Segregation confirmed', desc: 'Apr 22 · 7:12 am · Collector Juan Reyes', amt: '+15' },
    { i: '🟢', bg: '#E8F5E9', fg: '#2E7D32', label: 'Pickup attended on time', desc: 'Apr 20 · 7:03 am', amt: '+10' },
    { i: '🧺', bg: '#FFE0B2', fg: '#E65100', label: 'Redeemed: Sari-sari tote bag', desc: 'Apr 18 · 3:41 pm · Order #RDM-0041', amt: '−50' },
    { i: '🟢', bg: '#E8F5E9', fg: '#2E7D32', label: 'Report resolved · bonus', desc: 'Apr 17 · 5:00 pm · RPT-2025-00118', amt: '+25' },
    { i: '🟢', bg: '#E8F5E9', fg: '#2E7D32', label: 'Weekly compliance streak', desc: 'Apr 14 · 9:00 pm', amt: '+20' },
    { i: '🎯', bg: '#FFF9C4', fg: '#F57F17', label: 'Mission: Invite a neighbor', desc: 'Apr 12 · 10:15 am · 1 of 5 progress', amt: '+20' },
    { i: '🟢', bg: '#E8F5E9', fg: '#2E7D32', label: 'Pickup attended on time', desc: 'Apr 10 · 7:00 am', amt: '+10' },
  ];
  const chart = [12, 18, 9, 22, 15, 28, 10, 14, 20, 25, 16, 30]; // weeks
  const max = Math.max(...chart);
  return (
    <ResidentWebShell active="wallet" title="Eco-Points wallet" subtitle="Redeem points for data, groceries, utility credits and more">
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 18 }}>
        {/* Hero */}
        <div style={{
          background: 'linear-gradient(135deg,#1B5E20,#2E7D32,#43A047)',
          color: 'white', borderRadius: 14, padding: 28, position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: -40, right: -30, fontSize: 240, opacity: 0.08 }}>🌿</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ fontSize: 11, fontWeight: 700, background: 'rgba(255,255,255,0.22)', padding: '4px 10px', borderRadius: 20, letterSpacing: 0.4 }}>🌿 ECO-SAVER · TIER 2</div>
            <div style={{ fontSize: 11, opacity: 0.75 }}>Since Feb 2026</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16, marginTop: 12 }}>
            <div style={{ fontSize: 84, fontWeight: 900, lineHeight: 1, letterSpacing: -2 }}>240</div>
            <div style={{ paddingBottom: 8 }}>
              <div style={{ fontSize: 14, fontWeight: 600 }}>Eco-Points</div>
              <div style={{ fontSize: 12, opacity: 0.8 }}>≈ ₱240.00 redeem value</div>
            </div>
          </div>

          <div style={{ marginTop: 22 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 6 }}>
              <span style={{ opacity: 0.8 }}>Tier progress</span>
              <span style={{ fontWeight: 700 }}>240 / 400 to 🛡️ Green Guardian</span>
            </div>
            <div style={{ height: 8, background: 'rgba(255,255,255,0.25)', borderRadius: 999 }}>
              <div style={{ width: '60%', height: '100%', background: 'white', borderRadius: 999 }}/>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, marginTop: 6, opacity: 0.85 }}>
              <span>🌱 Seedling · 0</span>
              <span style={{ fontWeight: 700 }}>🌿 Eco-Saver · 100</span>
              <span>🛡️ Guardian · 400</span>
              <span>🏆 Champion · 1000</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10, marginTop: 22 }}>
            <button style={{ background: 'white', color: '#1B5E20', border: 'none', borderRadius: 8, padding: '12px 22px', fontFamily: 'Poppins', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>🎁 Redeem now</button>
            <button style={{ background: 'rgba(255,255,255,0.15)', color: 'white', border: '1.5px solid rgba(255,255,255,0.4)', borderRadius: 8, padding: '12px 22px', fontFamily: 'Poppins', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>🎯 Earn more</button>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ background: 'white', borderRadius: 10, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', padding: 20 }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: '#757575', letterSpacing: 0.5, textTransform: 'uppercase' }}>Lifetime earned</div>
            <div style={{ fontSize: 28, fontWeight: 800, marginTop: 4 }}>465 <span style={{ fontSize: 13, color: '#757575', fontWeight: 500 }}>pts</span></div>
            <div style={{ fontSize: 11, color: '#757575', marginTop: 2 }}>Redeemed 225 pts · Available 240 pts</div>
          </div>
          <div style={{ background: 'white', borderRadius: 10, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', padding: 20, flex: 1, display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: '#757575', letterSpacing: 0.5, textTransform: 'uppercase' }}>Last 12 weeks</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#2E7D32' }}>+24% vs last quarter</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 80, marginTop: 14 }}>
              {chart.map((v, i) => (
                <div key={i} style={{ flex: 1, height: `${(v / max) * 100}%`, background: i === chart.length - 1 ? '#2E7D32' : '#A5D6A7', borderRadius: 3 }}/>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#9E9E9E', marginTop: 6 }}>
              <span>Feb 1</span><span>Mar 1</span><span>Apr 23</span>
            </div>
          </div>
        </div>
      </div>

      {/* Transactions */}
      <div style={{ marginTop: 18, background: 'white', borderRadius: 10, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
        <div style={{ padding: '14px 20px', borderBottom: '1px solid #F0F0F0', display: 'flex', alignItems: 'center' }}>
          <div style={{ fontSize: 13, fontWeight: 700 }}>Recent transactions</div>
          <div style={{ flex: 1 }}/>
          <div style={{ display: 'flex', gap: 4, background: '#F5F5F5', padding: 3, borderRadius: 6 }}>
            {['All', 'Earned', 'Redeemed'].map((v, i) => (
              <button key={v} style={{ padding: '5px 12px', borderRadius: 4, border: 'none', background: i === 0 ? 'white' : 'transparent', color: i === 0 ? '#1B5E20' : '#757575', fontWeight: i === 0 ? 700 : 500, fontSize: 11, fontFamily: 'Poppins', cursor: 'pointer' }}>{v}</button>
            ))}
          </div>
        </div>
        {txs.map((t, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 20px', borderBottom: i < txs.length - 1 ? '1px solid #F5F5F5' : 'none' }}>
            <div style={{ width: 40, height: 40, borderRadius: 20, background: t.bg, color: t.fg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>{t.i}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 600 }}>{t.label}</div>
              <div style={{ fontSize: 11, color: '#757575', marginTop: 2 }}>{t.desc}</div>
            </div>
            <div style={{ fontSize: 15, fontWeight: 700, color: t.amt.startsWith('−') ? '#D32F2F' : '#2E7D32' }}>{t.amt}</div>
          </div>
        ))}
      </div>
    </ResidentWebShell>
  );
}

/* ──────────────────────────────────────────────────────────────────
   24. Missions (web)
   ────────────────────────────────────────────────────────────────── */
function ResidentWebMissions() {
  const missions = [
    { icon: '♻️', name: 'Segregate correctly',      desc: 'Use separate bins for bio, non-bio, and recyclables at every pickup. Collectors verify on-site.', freq: 'Every pickup', pts: '+15', fnote: '/ pickup', progress: 1, total: 2, progressLabel: '1 of 2 confirmed this week', earned: '30 pts this month' },
    { icon: '📸', name: 'Report illegal dumping',    desc: 'Submit validated reports with photo evidence. Must be verified by barangay.', freq: 'Any time', pts: '+25', fnote: '/ report', earned: '75 pts this month' },
    { icon: '🚛', name: 'Be present at pickup',     desc: 'Hand your household QR card to the collector during scheduled pickup.', freq: '3× per week', pts: '+10', fnote: '/ pickup', progress: 2, total: 3, progressLabel: '2 of 3 confirmed this week', earned: '40 pts this month' },
    { icon: '🏘️', name: 'Invite a neighbor',         desc: 'Get 5 households in your purok to register and complete their first pickup.', freq: 'One-time', pts: '+100', fnote: 'bonus', progress: 3, total: 5, progressLabel: '3 of 5 neighbors registered', earned: '60 pts earned so far' },
    { icon: '🌱', name: 'Home composting pledge',   desc: 'Start a home compost bin, verified by barangay visit.', freq: 'Monthly', pts: '+50', fnote: '/ month', locked: true, unlockAt: 'Unlocks at Tier 3 · Green Guardian' },
    { icon: '🎓', name: 'Segregation workshop',     desc: 'Attend a monthly MRF-facilitated workshop at the barangay hall.', freq: 'Monthly', pts: '+40', fnote: '/ attend', earned: '0 pts this month' },
  ];
  return (
    <ResidentWebShell active="missions" title="Missions" subtitle="Earn eco-points by completing these community actions">
      {/* Summary band */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 20 }}>
        {[
          ['This month', '+205', '#2E7D32', 'pts earned'],
          ['Active missions', '6', '#1565C0', '1 locked'],
          ['Completed', '14', '#F9A825', 'all time'],
          ['Weekly streak', '3', '#2E7D32', 'weeks 🔥'],
        ].map(([l, v, c, s], i) => (
          <div key={i} style={{ background: 'white', borderRadius: 10, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', padding: 18 }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: '#757575', letterSpacing: 0.5, textTransform: 'uppercase' }}>{l}</div>
            <div style={{ fontSize: 28, fontWeight: 800, marginTop: 6, color: c }}>{v}</div>
            <div style={{ fontSize: 11, color: '#757575', marginTop: 2 }}>{s}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        {missions.map((m, i) => (
          <div key={i} style={{
            background: 'white', borderRadius: 10, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', padding: 20,
            opacity: m.locked ? 0.7 : 1, position: 'relative',
          }}>
            <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
              <div style={{ width: 56, height: 56, borderRadius: 10, background: '#E8F5E9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, flexShrink: 0 }}>{m.icon}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10 }}>
                  <div style={{ fontSize: 15, fontWeight: 700 }}>{m.name}</div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 2, flexShrink: 0 }}>
                    <div style={{ background: '#E8F5E9', color: '#2E7D32', padding: '4px 12px', borderRadius: 20, fontSize: 14, fontWeight: 800 }}>{m.pts}</div>
                    <div style={{ fontSize: 9, color: '#9E9E9E' }}>{m.fnote}</div>
                  </div>
                </div>
                <div style={{ fontSize: 12, color: '#757575', marginTop: 6, lineHeight: 1.5 }}>{m.desc}</div>
                <div style={{ display: 'flex', gap: 10, marginTop: 10, fontSize: 10, fontWeight: 600, color: '#9E9E9E', letterSpacing: 0.3, textTransform: 'uppercase' }}>
                  <span>⏱ {m.freq}</span>
                  {m.earned && <span>· {m.earned}</span>}
                </div>
              </div>
            </div>
            {m.progress != null && (
              <div style={{ marginTop: 14 }}>
                <div style={{ height: 6, background: '#E0E0E0', borderRadius: 3 }}>
                  <div style={{ width: `${(m.progress / m.total) * 100}%`, height: '100%', background: '#2E7D32', borderRadius: 3 }}/>
                </div>
                <div style={{ fontSize: 11, color: '#757575', marginTop: 4, fontWeight: 600 }}>{m.progressLabel}</div>
              </div>
            )}
            {m.locked && (
              <div style={{ marginTop: 12, padding: '8px 12px', background: '#F5F5F5', borderRadius: 6, fontSize: 11, color: '#757575', display: 'flex', alignItems: 'center', gap: 8 }}>
                <span>🔒</span>{m.unlockAt}
              </div>
            )}
          </div>
        ))}
      </div>
    </ResidentWebShell>
  );
}

/* ──────────────────────────────────────────────────────────────────
   25. Rewards catalog (web)
   ────────────────────────────────────────────────────────────────── */
function ResidentWebRewards() {
  const filters = ['All', 'Data', 'GCash', 'Groceries', 'Food', 'Utilities', 'Partner brands'];
  const rewards = [
    { logo: '📱', name: '10 GB Globe data', partner: 'Globe Telecom',  peso: '₱99',  pts: 90,  locked: false, stock: '24 left' },
    { logo: '💸', name: '₱50 GCash credit',  partner: 'GCash',          peso: '₱50',  pts: 50,  locked: false, stock: 'In stock' },
    { logo: '🍚', name: '1 kg Jasponica rice', partner: 'Puregold',      peso: '₱75',  pts: 80,  locked: false, stock: '12 left' },
    { logo: '☕', name: 'Jollibee breakfast meal', partner: 'Jollibee',  peso: '₱99',  pts: 100, locked: false, stock: 'In stock' },
    { logo: '🌾', name: '5 kg NFA rice', partner: 'DSWD partner store', peso: '₱275', pts: 250, locked: false, stock: '4 left · popular' },
    { logo: '🧴', name: 'Eco-cleaning kit', partner: 'Human Nature',    peso: '₱180', pts: 200, locked: false, stock: '8 left' },
    { logo: '💡', name: '₱100 Meralco credit', partner: 'Meralco',      peso: '₱100', pts: 400, locked: true, needed: 160 },
    { logo: '🛒', name: '₱500 SM gift card', partner: 'SM Supermalls', peso: '₱500', pts: 900, locked: true, needed: 660 },
  ];
  return (
    <ResidentWebShell active="rewards" title="Rewards catalog" subtitle="Redeem eco-points for real-world rewards from trusted LGU partners"
      actions={<div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 14px', background: '#E8F5E9', borderRadius: 20, fontSize: 12, fontWeight: 700, color: '#1B5E20' }}>🌿 240 pts available</div>}>
      {/* Filter row */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 18, flexWrap: 'wrap' }}>
        {filters.map((f, i) => (
          <button key={f} style={{
            padding: '8px 16px', borderRadius: 20, fontSize: 12, fontWeight: 600,
            background: i === 0 ? '#2E7D32' : 'white', color: i === 0 ? 'white' : '#757575',
            border: i === 0 ? 'none' : '1px solid #E0E0E0', fontFamily: 'Poppins', cursor: 'pointer',
          }}>{f}</button>
        ))}
        <div style={{ flex: 1 }}/>
        <select style={{ height: 34, border: '1px solid #E0E0E0', borderRadius: 6, padding: '0 12px', fontSize: 12, fontFamily: 'Poppins', background: 'white', color: '#757575' }}>
          <option>Sort by: Relevant</option><option>Points: low → high</option><option>Points: high → low</option>
        </select>
      </div>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
        {rewards.map((r, i) => (
          <div key={i} style={{
            background: 'white', borderRadius: 10, boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
            padding: 16, display: 'flex', flexDirection: 'column',
            opacity: r.locked ? 0.55 : 1, position: 'relative',
          }}>
            <div style={{ height: 110, background: '#F5F5F5', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 56, position: 'relative' }}>
              {r.logo}
              {r.locked && <div style={{ position: 'absolute', top: 8, right: 8, background: 'white', padding: '4px 8px', borderRadius: 12, fontSize: 11, fontWeight: 700, color: '#757575' }}>🔒 Locked</div>}
            </div>
            <div style={{ marginTop: 12, fontSize: 13, fontWeight: 700 }}>{r.name}</div>
            <div style={{ fontSize: 11, color: '#757575', marginTop: 2 }}>{r.partner}</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#9E9E9E', marginTop: 6 }}>
              <span>Value: {r.peso}</span>
              {r.stock && <span>{r.stock}</span>}
            </div>
            <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
              <div style={{ fontSize: 16, fontWeight: 800, color: '#2E7D32' }}>{r.pts} <span style={{ fontSize: 10, fontWeight: 500, color: '#757575' }}>pts</span></div>
              {r.locked
                ? <div style={{ fontSize: 10, color: '#D32F2F', fontWeight: 700, textAlign: 'right' }}>Need<br/>{r.needed} more</div>
                : <button style={{ background: '#2E7D32', color: 'white', border: 'none', padding: '6px 12px', borderRadius: 6, fontSize: 11, fontWeight: 700, fontFamily: 'Poppins', cursor: 'pointer' }}>Redeem</button>}
            </div>
          </div>
        ))}
      </div>
    </ResidentWebShell>
  );
}

/* ──────────────────────────────────────────────────────────────────
   26. Leaderboard (web)
   ────────────────────────────────────────────────────────────────── */
function ResidentWebLeaderboard() {
  const top3 = [
    { rank: 2, name: 'Juan Miguel Tolentino', brgy: 'Purok 1', pts: 980, avatar: '#BDBDBD', medal: '🥈' },
    { rank: 1, name: 'Lola Remedios Bautista', brgy: 'Purok 2', pts: 1240, avatar: '#F9A825', medal: '🥇', crown: true },
    { rank: 3, name: 'Andrea Salonga',        brgy: 'Purok 5', pts: 820,  avatar: '#CD7F32', medal: '🥉' },
  ];
  const rows = [
    { rank: 4, name: 'Maria Dela Cruz',      brgy: 'Purok 3', pts: 240,  you: true, trend: '+15' },
    { rank: 5, name: 'Rodel Catindig',       brgy: 'Purok 4', pts: 215,  trend: '+10' },
    { rank: 6, name: 'Cecile Ramos',         brgy: 'Purok 2', pts: 190,  trend: '+5' },
    { rank: 7, name: 'Benjie Lontok',        brgy: 'Purok 6', pts: 175,  trend: '+12' },
    { rank: 8, name: 'Carmencita Yap',       brgy: 'Purok 1', pts: 160,  trend: '0' },
    { rank: 9, name: 'Armando Peralta',      brgy: 'Purok 3', pts: 155,  trend: '+8' },
    { rank: 10, name: 'Melchor Sarmiento',   brgy: 'Purok 5', pts: 140,  trend: '+5' },
    { rank: 11, name: 'Lolita Estrada',      brgy: 'Purok 2', pts: 135,  trend: '+3' },
  ];
  const PodiumCard = ({ p, tall }) => (
    <div style={{
      background: p.crown ? 'linear-gradient(160deg,#FFF8E1,#FFECB3)' : 'white',
      border: p.crown ? '2px solid #F9A825' : '1px solid #E0E0E0',
      borderRadius: 12, padding: 20, textAlign: 'center',
      boxShadow: p.crown ? '0 4px 20px rgba(249,168,37,0.25)' : '0 1px 3px rgba(0,0,0,0.08)',
      transform: tall ? 'translateY(-14px)' : 'none',
    }}>
      <div style={{ fontSize: 32 }}>{p.medal}</div>
      <Avatar initials={p.name.split(' ').map(w => w[0]).slice(0, 2).join('')} color={p.avatar} size={64} style={{ margin: '10px auto' }}/>
      <div style={{ fontSize: 14, fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.name}</div>
      <div style={{ fontSize: 11, color: '#757575', marginTop: 2 }}>{p.brgy}</div>
      <div style={{ fontSize: 24, fontWeight: 800, color: p.crown ? '#F57F17' : '#2E7D32', marginTop: 10 }}>{p.pts.toLocaleString()}<span style={{ fontSize: 11, fontWeight: 500, color: '#757575', marginLeft: 4 }}>pts</span></div>
    </div>
  );

  return (
    <ResidentWebShell active="leaderboard" title="🏆 Leaderboard" subtitle="Top earners · Brgy. Marawoy · April 2026"
      actions={<div style={{ display: 'flex', gap: 4, background: '#F5F5F5', padding: 3, borderRadius: 6 }}>
        {['My Barangay', 'All Lipa', 'Region'].map((v, i) => (
          <button key={v} style={{ padding: '7px 14px', borderRadius: 4, border: 'none', background: i === 0 ? 'white' : 'transparent', color: i === 0 ? '#1B5E20' : '#757575', fontWeight: i === 0 ? 700 : 500, fontSize: 12, fontFamily: 'Poppins', cursor: 'pointer' }}>{v}</button>
        ))}
      </div>}>
      {/* Podium */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 18, marginBottom: 24, padding: '14px 0' }}>
        <PodiumCard p={top3[0]}/>
        <PodiumCard p={top3[1]} tall/>
        <PodiumCard p={top3[2]}/>
      </div>

      {/* Table */}
      <div style={{ background: 'white', borderRadius: 10, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
        <div style={{ padding: '14px 20px', borderBottom: '1px solid #F0F0F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: 13, fontWeight: 700 }}>Full ranking · 312 residents</div>
          <div style={{ fontSize: 11, color: '#757575' }}>Updated daily at midnight</div>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
          <thead>
            <tr style={{ background: '#FAFAFA' }}>
              {['Rank', 'Resident', 'Purok', 'Points', 'This week', ''].map((h, i) => (
                <th key={i} style={{ textAlign: i === 3 || i === 4 ? 'right' : 'left', padding: '10px 20px', fontSize: 10, fontWeight: 700, color: '#757575', letterSpacing: 0.4, textTransform: 'uppercase', borderBottom: '1px solid #E0E0E0' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} style={{ background: r.you ? '#E8F5E9' : 'white', borderLeft: r.you ? '3px solid #2E7D32' : '3px solid transparent' }}>
                <td style={{ padding: '12px 20px', borderBottom: '1px solid #F5F5F5', fontWeight: 800, color: r.you ? '#1B5E20' : '#9E9E9E', fontSize: 14 }}>{r.rank}</td>
                <td style={{ padding: '12px 20px', borderBottom: '1px solid #F5F5F5' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Avatar initials={r.name.split(' ').map(w => w[0]).slice(0, 2).join('')} color={r.you ? '#2E7D32' : '#757575'} size={32}/>
                    <span style={{ fontWeight: r.you ? 700 : 500 }}>
                      {r.name}
                      {r.you && <span style={{ color: '#2E7D32', fontSize: 10, marginLeft: 6, fontWeight: 700 }}>(YOU)</span>}
                    </span>
                  </div>
                </td>
                <td style={{ padding: '12px 20px', borderBottom: '1px solid #F5F5F5', color: '#757575' }}>{r.brgy}</td>
                <td style={{ padding: '12px 20px', borderBottom: '1px solid #F5F5F5', textAlign: 'right', fontWeight: 700, color: r.you ? '#2E7D32' : '#212121' }}>{r.pts.toLocaleString()}</td>
                <td style={{ padding: '12px 20px', borderBottom: '1px solid #F5F5F5', textAlign: 'right', color: r.trend === '0' ? '#9E9E9E' : '#2E7D32', fontWeight: 600 }}>{r.trend !== '0' ? `+${r.trend.replace('+','')}` : '—'}</td>
                <td style={{ padding: '12px 20px', borderBottom: '1px solid #F5F5F5', color: '#BDBDBD' }}>›</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ResidentWebShell>
  );
}

/* ──────────────────────────────────────────────────────────────────
   27. Profile (web)
   ────────────────────────────────────────────────────────────────── */
function ResidentWebProfile() {
  return (
    <ResidentWebShell active="profile" title="Profile & settings" subtitle="Your household, notification preferences, and privacy controls">
      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 18 }}>
        {/* Side nav */}
        <div style={{ background: 'white', borderRadius: 10, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', padding: 10 }}>
          {[
            ['Household', '🏠', true],
            ['Contact info', '📞'],
            ['Notifications', '🔔'],
            ['Privacy', '🔒'],
            ['Linked accounts', '🔗'],
            ['Language', '🌐'],
            ['Help & support', '❓'],
          ].map(([l, i, on]) => (
            <div key={l} style={{ padding: '10px 14px', borderRadius: 6, background: on ? '#E8F5E9' : 'transparent', color: on ? '#1B5E20' : '#424242', fontSize: 13, fontWeight: on ? 700 : 500, cursor: 'pointer', display: 'flex', gap: 10, alignItems: 'center' }}>
              <span style={{ fontSize: 14 }}>{i}</span>{l}
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Household card */}
          <div style={{ background: 'white', borderRadius: 10, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', padding: 24 }}>
            <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
              <Avatar initials="MD" color="#2E7D32" size={80}/>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 20, fontWeight: 700 }}>Maria Dela Cruz</div>
                <div style={{ fontFamily: 'ui-monospace, Menlo', fontSize: 12, color: '#2E7D32', fontWeight: 600, marginTop: 2 }}>BAGO-MARA-00142 · Head of household</div>
                <div style={{ fontSize: 12, color: '#757575', marginTop: 6 }}>📍 128 Rizal St., Purok 3, Brgy. Marawoy, Lipa City, Batangas</div>
                <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
                  <Btn size="sm" outline color="#2E7D32">Edit household</Btn>
                  <Btn size="sm" outline color="#1565C0" icon="🖨️">Print household QR card</Btn>
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginTop: 22, paddingTop: 20, borderTop: '1px solid #F5F5F5' }}>
              {[
                ['Members', '5'],
                ['Registered', 'Feb 12, 2026'],
                ['Compliance score', '92%'],
                ['Status', '✅ Active'],
              ].map(([k, v], i) => (
                <div key={i}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: '#757575', letterSpacing: 0.4, textTransform: 'uppercase' }}>{k}</div>
                  <div style={{ fontSize: 14, fontWeight: 700, marginTop: 4 }}>{v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Notifications */}
          <div style={{ background: 'white', borderRadius: 10, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', padding: 24 }}>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 14 }}>Notifications</div>
            {[
              ['Pickup reminders', 'SMS + push · 1 hour before', true],
              ['Schedule changes', 'Push notification immediately', true],
              ['Report status updates', 'Email + push', true],
              ['Eco-point credits', 'Push only', true],
              ['Barangay announcements', 'Push only · not urgent', true],
              ['Leaderboard weekly digest', 'Email · every Monday', false],
              ['Partner brand offers', 'Push only', false],
            ].map(([l, d, on], i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 0', borderBottom: i < 6 ? '1px solid #F5F5F5' : 'none' }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{l}</div>
                  <div style={{ fontSize: 11, color: '#757575', marginTop: 2 }}>{d}</div>
                </div>
                <Toggle on={on} color="#2E7D32"/>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ResidentWebShell>
  );
}

/* ──────────────────────────────────────────────────────────────────
   28. Household QR Card (print view)
   ────────────────────────────────────────────────────────────────── */
function ResidentHouseholdQRCard() {
  // QR-like dot pattern
  const qrRows = 21;
  const qrBits = [];
  for (let i = 0; i < qrRows * qrRows; i++) {
    const r = Math.floor(i / qrRows), c = i % qrRows;
    const inTL = r < 7 && c < 7;
    const inTR = r < 7 && c >= qrRows - 7;
    const inBL = r >= qrRows - 7 && c < 7;
    const onFinder = (corner) => {
      const rr = corner === 'tl' ? r : corner === 'tr' ? r : r - (qrRows - 7);
      const cc = corner === 'tl' ? c : corner === 'tr' ? c - (qrRows - 7) : c;
      if (rr === 0 || rr === 6 || cc === 0 || cc === 6) return true;
      if (rr >= 2 && rr <= 4 && cc >= 2 && cc <= 4) return true;
      return false;
    };
    if (inTL) { qrBits.push(onFinder('tl')); continue; }
    if (inTR) { qrBits.push(onFinder('tr')); continue; }
    if (inBL) { qrBits.push(onFinder('bl')); continue; }
    qrBits.push(((i * 73 + 17) ^ (i >> 3)) % 3 !== 0);
  }

  // Sized as a US-Letter print sheet, 820 × 1100 portrait
  return (
    <div style={{ width: 820, height: 1100, background: 'white', fontFamily: 'Poppins', padding: 48, display: 'flex', flexDirection: 'column', boxShadow: '0 8px 30px rgba(0,0,0,0.06)', position: 'relative' }}>
      {/* Print-only crop marks (decorative) */}
      {[[18, 18], [18, 1064], [784, 18], [784, 1064]].map(([l, t], i) => (
        <div key={i} style={{ position: 'absolute', left: l, top: t, width: 18, height: 18, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', top: 9, left: 0, right: 0, height: 1, background: '#BDBDBD' }}/>
          <div style={{ position: 'absolute', left: 9, top: 0, bottom: 0, width: 1, background: '#BDBDBD' }}/>
        </div>
      ))}

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
        <div style={{ width: 44, height: 44, borderRadius: 8, background: '#2E7D32', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>🌿</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: -0.5 }}>BAGO.<span style={{ opacity: 0.85 }}>PH</span> · Household QR Card</div>
          <div style={{ fontSize: 11, color: '#757575', marginTop: 2 }}>Lipa City Local Government Unit · Department of Environment & Natural Resources Office (ENRO)</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 9, color: '#9E9E9E', letterSpacing: 0.5, fontWeight: 600, textTransform: 'uppercase' }}>Issued</div>
          <div style={{ fontSize: 12, fontWeight: 700, marginTop: 2 }}>Apr 24, 2026</div>
          <div style={{ fontSize: 9, color: '#9E9E9E', marginTop: 4 }}>Valid: 1 year</div>
        </div>
      </div>

      {/* Cut-line for the actual card */}
      <div style={{ marginTop: 28, fontSize: 9, color: '#9E9E9E', display: 'flex', alignItems: 'center', gap: 8, letterSpacing: 0.5, textTransform: 'uppercase', fontWeight: 600 }}>
        <span>✂️ Cut along dashed line · 3.5 × 5 in.</span>
        <div style={{ flex: 1, borderTop: '1.5px dashed #BDBDBD' }}/>
      </div>

      {/* The card itself */}
      <div style={{ marginTop: 14, border: '1.5px dashed #BDBDBD', borderRadius: 14, padding: 6, alignSelf: 'center', width: 504, height: 720 }}>
        <div style={{ width: '100%', height: '100%', borderRadius: 10, overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
          {/* Top brand strip */}
          <div style={{ background: 'linear-gradient(135deg,#1B5E20,#2E7D32,#43A047)', color: 'white', padding: '20px 24px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: -40, right: -40, width: 140, height: 140, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }}/>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 22 }}>🌿</span>
              <div>
                <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: -0.5 }}>BAGO.<span style={{ opacity: 0.85 }}>PH</span></div>
                <div style={{ fontSize: 9, opacity: 0.85, fontWeight: 600, letterSpacing: 0.5 }}>HOUSEHOLD QR · LIPA CITY</div>
              </div>
            </div>
          </div>

          {/* QR + ID */}
          <div style={{ padding: '20px 24px 18px', display: 'flex', alignItems: 'center', gap: 18, borderBottom: '1px solid #F0F0F0' }}>
            <div style={{ width: 180, height: 180, padding: 8, background: 'white', border: '1px solid #E0E0E0', borderRadius: 6, flexShrink: 0 }}>
              <div style={{ display: 'grid', gridTemplateColumns: `repeat(${qrRows}, 1fr)`, width: '100%', height: '100%', gap: 0 }}>
                {qrBits.map((b, i) => (
                  <div key={i} style={{ background: b ? '#0D1B2A' : 'transparent', aspectRatio: '1 / 1' }}/>
                ))}
              </div>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 9, color: '#9E9E9E', fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase' }}>Household ID</div>
              <div style={{ fontFamily: 'ui-monospace, Menlo', fontSize: 14, fontWeight: 800, color: '#1B5E20', marginTop: 4, letterSpacing: 0.6, lineHeight: 1.25 }}>BAGO-MARA<br/>-2025-00142</div>
              <div style={{ fontSize: 9, color: '#9E9E9E', fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase', marginTop: 14 }}>Head of household</div>
              <div style={{ fontSize: 14, fontWeight: 700, marginTop: 3, lineHeight: 1.25 }}>Maria S. Dela Cruz</div>
              <div style={{ fontSize: 11, color: '#424242', marginTop: 6, lineHeight: 1.4 }}>128 Rizal St., Purok 3<br/>Brgy. Marawoy, Lipa City<br/>Batangas 4217</div>
            </div>
          </div>

          {/* Schedule */}
          <div style={{ padding: '14px 24px', borderBottom: '1px solid #F0F0F0' }}>
            <div style={{ fontSize: 10, color: '#9E9E9E', fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase' }}>Regular pickup schedule · Purok 3</div>
            <div style={{ marginTop: 6 }}>
              {[
                ['Mon · Thu', '🟢 Biodegradable',    '7–9 am'],
                ['Tue · Fri', '🔵 Non-biodegradable', '7–9 am'],
                ['Wed',       '♻️ Recyclables',       '8–10 am'],
                ['Sat',       '🟢 Biodegradable',    '7–9 am'],
              ].map(([d, t, h], i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', fontSize: 11, borderBottom: i < 3 ? '1px dashed #F0F0F0' : 'none' }}>
                  <span style={{ width: 92, fontWeight: 700, color: '#212121' }}>{d}</span>
                  <span style={{ flex: 1 }}>{t}</span>
                  <span style={{ color: '#757575', fontWeight: 600 }}>{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* How to use */}
          <div style={{ padding: '14px 24px', background: '#F9FBF9', flex: 1 }}>
            <div style={{ fontSize: 10, color: '#9E9E9E', fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase' }}>How to use</div>
            <ol style={{ margin: '6px 0 0', paddingLeft: 18, fontSize: 10.5, color: '#424242', lineHeight: 1.65 }}>
              <li>Show this card to the collector at every pickup.</li>
              <li>Collector scans the QR from the BAGO.PH app.</li>
              <li>Earn <strong>+10 pts</strong> per pickup, +5 bonus for proper segregation.</li>
              <li>Lost or damaged? Reprint at <strong>bago.ph/qr</strong> or your barangay hall.</li>
            </ol>
          </div>

          {/* Footer */}
          <div style={{ padding: '10px 24px', borderTop: '1px solid #F0F0F0', display: 'flex', alignItems: 'center', fontSize: 9, color: '#9E9E9E' }}>
            <span>Issued under RA 9003 · Tampering voids card</span>
            <div style={{ flex: 1 }}/>
            <span style={{ fontFamily: 'ui-monospace, Menlo', fontWeight: 600 }}>v.2026.04</span>
          </div>
        </div>
      </div>

      {/* Print actions (visible on screen, hidden in print via opacity hint) */}
      <div style={{ marginTop: 24, display: 'flex', alignItems: 'center', gap: 10, padding: 14, background: '#F9FBF9', borderRadius: 8, border: '1px dashed #BDBDBD' }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#212121' }}>Printing tips</div>
          <div style={{ fontSize: 10, color: '#757575', marginTop: 2, lineHeight: 1.5 }}>Print on 250-gsm card stock · color · actual size · landscape OFF.<br/>Laminate for durability — collectors scan the card daily.</div>
        </div>
        <button style={{ height: 36, padding: '0 14px', border: '1px solid #BDBDBD', background: 'white', borderRadius: 6, fontFamily: 'Poppins', fontWeight: 600, fontSize: 12, cursor: 'pointer' }}>📥 Download PDF</button>
        <button style={{ height: 36, padding: '0 18px', background: '#2E7D32', color: 'white', border: 'none', borderRadius: 6, fontFamily: 'Poppins', fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>🖨️ Print</button>
      </div>
    </div>
  );
}

Object.assign(window, {
  ResidentWebReport, ResidentWebMyReports, ResidentWebWallet,
  ResidentWebMissions, ResidentWebRewards, ResidentWebLeaderboard,
  ResidentWebProfile, ResidentHouseholdQRCard,
});
