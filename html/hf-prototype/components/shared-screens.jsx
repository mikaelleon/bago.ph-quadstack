// shared-screens.jsx — Web auth screens (static-host copy)

function AuthShell({ leftTitle, leftBig, leftStat, leftStatSub, bullets, children }) {
  return (
    <div style={{ width: "100vw", minHeight: "100vh", background: "#fff", overflow: "hidden", fontFamily: "Poppins", display: "flex", flexDirection: "column" }}>
      <div style={{ height: 60, borderBottom: "1px solid #EAEAEA", display: "flex", alignItems: "center", padding: "0 26px", color: "#757575", fontSize: 14, gap: 30 }}>
        <Logo size={28} />
        <span>How it works</span>
        <span>For barangays</span>
        <span>RA 9003</span>
        <span>Help</span>
        <span style={{ marginLeft: "auto", fontSize: 13 }}>English · Tagalog</span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "49% 51%", flex: 1 }}>
        <div style={{ background: "linear-gradient(160deg,#1D7B2F,#2E7D32)", color: "white", padding: "48px 56px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", width: 360, height: 360, borderRadius: "50%", right: -40, top: -20, background: "rgba(255,255,255,0.1)" }} />
          <div style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: 1, opacity: 0.9, fontWeight: 700 }}>{leftTitle}</div>
          <div style={{ marginTop: 18, fontSize: 62, lineHeight: 0.98, fontWeight: 800, letterSpacing: -1.4 }}>{leftBig}</div>
          <div style={{ marginTop: 28, display: "flex", gap: 14, alignItems: "baseline" }}>
            <div style={{ fontSize: 72, fontWeight: 800, lineHeight: 1 }}>{leftStat}</div>
            <div style={{ maxWidth: 220, lineHeight: 1.35, fontSize: 28 }}>{leftStatSub}</div>
          </div>

          <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 16 }}>
            {bullets.map((b, i) => (
              <div key={i} style={{ display: "flex", gap: 12 }}>
                <div style={{ width: 26, height: 26, borderRadius: 8, background: "rgba(255,255,255,0.15)", display: "grid", placeItems: "center", fontSize: 14 }}>{b.icon}</div>
                <div>
                  <div style={{ fontSize: 21, fontWeight: 700 }}>{b.title}</div>
                  <div style={{ fontSize: 16, opacity: 0.86 }}>{b.sub}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 24, borderTop: "1px solid rgba(255,255,255,0.2)", paddingTop: 16, display: "flex", gap: 12 }}>
            {["RA 9003", "RA 10173", "DILG"].map((x, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.15)", borderRadius: 8, padding: "8px 14px", fontSize: 12, fontWeight: 700 }}>{x}</div>
            ))}
          </div>
        </div>

        <div style={{ background: "#F9F9F9", padding: "34px 40px 30px" }}>{children}</div>
      </div>

      <div style={{ height: 40, borderTop: "1px solid #EAEAEA", fontSize: 12, color: "#9E9E9E", display: "flex", alignItems: "center", padding: "0 20px" }}>
        <span>© 2026 LGU Lipa City · Piloted with DENR Region IV-A</span>
        <span style={{ marginLeft: "auto" }}>Privacy · Terms · Accessibility · Contact</span>
      </div>
    </div>
  );
}

function RoleBtn({ active, icon, label, onClick, activeColor = "#2E7D32" }) {
  return (
    <button onClick={onClick} style={{ width: 118, height: 76, borderRadius: 10, border: active ? "2px solid " + activeColor : "1px solid #DDDDDD", background: active ? "#F5FBF6" : "white", color: active ? activeColor : "#424242", cursor: "pointer", fontFamily: "Poppins", fontWeight: 700, fontSize: 13 }}>
      <div style={{ fontSize: 18 }}>{icon}</div>
      <div>{label}</div>
    </button>
  );
}

function AuthInput({ label, value, onChange, type = "text", prefix, hint, placeholder }) {
  return (
    <div>
      <div style={{ fontSize: 13, fontWeight: 700, color: "#333", marginBottom: 8 }}>{label}</div>
      <div style={{ display: "flex", alignItems: "center", border: "1px solid #D0D0D0", borderRadius: 8, background: "white", height: 50 }}>
        {prefix && <div style={{ width: 52, textAlign: "center", borderRight: "1px solid #E6E6E6", color: "#666", fontWeight: 600 }}>{prefix}</div>}
        <input value={value} onChange={onChange} type={type} placeholder={placeholder || ""} style={{ width: "100%", border: "none", outline: "none", background: "transparent", fontSize: 16, fontFamily: "Poppins", padding: "0 14px" }} />
      </div>
      {hint && <div style={{ marginTop: 6, fontSize: 12, color: "#888" }}>{hint}</div>}
    </div>
  );
}

function LoginScreen() {
  const [role, setRole] = React.useState("Resident");
  const [mobile, setMobile] = React.useState("");
  const [pin, setPin] = React.useState("");
  const roleTheme = role === "Collector"
    ? { accent: "#1565C0", deep: "#0D47A1", light: "#E3F2FD", hero: "linear-gradient(160deg,#1565C0,#1E88E5,#26A69A)", label: "field crew · depot operators" }
    : role === "LGU Admin"
    ? { accent: "#0D1B2A", deep: "#0D1B2A", light: "#ECEFF1", hero: "linear-gradient(160deg,#0D1B2A,#1B263B,#1B5E20)", label: "city hall · barangay officials" }
    : { accent: "#2E7D32", deep: "#1B5E20", light: "#E8F5E9", hero: "linear-gradient(160deg,#1D7B2F,#2E7D32,#43A047)", label: "households · barangay residents" };

  const leftBullets = [
    { icon: "📅", title: "Pickup schedules that never surprise you", sub: "SMS + push alerts evening before every collection." },
    { icon: "🌿", title: "Earn eco-points for compliance", sub: "Redeem for GCash, mobile data, or groceries." },
    { icon: "📸", title: "Report illegal dumping in 30 seconds", sub: "Photos, GPS, and status updates all in one place." }
  ];
  return (
    <div style={{ width: "100vw", minHeight: "100vh", background: "#fff", overflow: "hidden", fontFamily: "Poppins", display: "flex", flexDirection: "column" }}>
      <div style={{ height: 60, borderBottom: "1px solid #EAEAEA", display: "flex", alignItems: "center", padding: "0 26px", color: "#757575", fontSize: 14, gap: 30 }}>
        <Logo size={28} />
        <span>How it works</span>
        <span>For barangays</span>
        <span>RA 9003</span>
        <span>Help</span>
        <span style={{ marginLeft: "auto", fontSize: 13 }}>English · Tagalog</span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "49% 51%", flex: 1 }}>
        <div style={{ background: roleTheme.hero, color: "white", padding: "48px 56px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", width: 360, height: 360, borderRadius: "50%", right: -40, top: -20, background: "rgba(255,255,255,0.1)" }} />
          <div style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: 1, opacity: 0.9, fontWeight: 700 }}>Barangay app for garbage operations</div>
          <div style={{ marginTop: 18, fontSize: 62, lineHeight: 0.98, fontWeight: 800, letterSpacing: -1.4 }}>Clean barangays, built on data and community.</div>
          <div style={{ marginTop: 28, display: "flex", gap: 14, alignItems: "baseline" }}>
            <div style={{ fontSize: 72, fontWeight: 800, lineHeight: 1 }}>142,850</div>
            <div style={{ maxWidth: 220, lineHeight: 1.35, fontSize: 28 }}>households already enrolled across 18 pilot barangays in Lipa City.</div>
          </div>
          <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 16 }}>
            {leftBullets.map((b, i) => (
              <div key={i} style={{ display: "flex", gap: 12 }}>
                <div style={{ width: 26, height: 26, borderRadius: 8, background: "rgba(255,255,255,0.15)", display: "grid", placeItems: "center", fontSize: 14 }}>{b.icon}</div>
                <div>
                  <div style={{ fontSize: 21, fontWeight: 700 }}>{b.title}</div>
                  <div style={{ fontSize: 16, opacity: 0.86 }}>{b.sub}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 24, borderTop: "1px solid rgba(255,255,255,0.2)", paddingTop: 16, display: "flex", gap: 12 }}>
            {["RA 9003", "RA 10173", "DILG"].map((x, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.15)", borderRadius: 8, padding: "8px 14px", fontSize: 12, fontWeight: 700 }}>{x}</div>
            ))}
          </div>
        </div>

        <div style={{ background: "#F9F9F9", padding: "34px 40px 30px" }}>
      <div style={{ maxWidth: 500, margin: "18px auto 0" }}>
        <div style={{ fontSize: 46, fontWeight: 800, color: "#1f1f1f" }}>Welcome back</div>
        <div style={{ color: "#666", marginTop: 8, fontSize: 15 }}>Log in to BAGO.PH to manage your household, route, or barangay.</div>
        <div style={{ display: "flex", gap: 10, marginTop: 22 }}>
          <RoleBtn icon="🏠" label="Resident" active={role === "Resident"} activeColor={role === "Resident" ? roleTheme.accent : "#2E7D32"} onClick={() => setRole("Resident")} />
          <RoleBtn icon="🚛" label="Collector" active={role === "Collector"} activeColor={role === "Collector" ? roleTheme.accent : "#1565C0"} onClick={() => setRole("Collector")} />
          <RoleBtn icon="🏛️" label="LGU Admin" active={role === "LGU Admin"} activeColor={role === "LGU Admin" ? roleTheme.accent : "#0D1B2A"} onClick={() => setRole("LGU Admin")} />
        </div>
        <div style={{ marginTop: 8, fontSize: 12, color: "#9E9E9E", textAlign: "center" }}>{roleTheme.label}</div>
        <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 16 }}>
          <AuthInput label="Mobile number" value={mobile} onChange={(e) => setMobile(e.target.value)} prefix="+63" placeholder="917 543 8821" />
          <AuthInput label="PIN" value={pin} onChange={(e) => setPin(e.target.value)} type="password" hint="4-digit PIN" placeholder="Enter 4-digit PIN" />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12, fontSize: 13 }}>
          <label style={{ color: "#666", display: "flex", gap: 8, alignItems: "center" }}><input type="checkbox" defaultChecked style={{ accentColor: "#2E7D32" }} />Keep me signed in on this device</label>
          <a style={{ color: roleTheme.deep, fontWeight: 700, cursor: "pointer" }}>{role === "LGU Admin" ? "Forgot password?" : "Forgot PIN?"}</a>
        </div>
        <button style={{ width: "100%", marginTop: 16, height: 52, border: "none", background: roleTheme.accent, color: "white", fontSize: 18, fontWeight: 700, borderRadius: 8, fontFamily: "Poppins", cursor: "pointer" }}>{role === "LGU Admin" ? "Log in to LGU Admin" : "Log in to " + role}</button>
        {role === "LGU Admin" && (
          <div style={{ marginTop: 10, textAlign: "center", color: "#999", fontSize: 12 }}>OR</div>
        )}
        {role === "LGU Admin" && (
          <button style={{ width: "100%", marginTop: 8, height: 44, border: "1px solid #D9D9D9", background: "white", color: "#4B5563", fontSize: 15, fontWeight: 600, borderRadius: 8, fontFamily: "Poppins", cursor: "pointer" }}>Continue with GovPH SSO</button>
        )}
        <div style={{ marginTop: 16, textAlign: "center", color: "#666", fontSize: 15 }}>New to BAGO.PH? <a style={{ color: roleTheme.deep, fontWeight: 700, cursor: "pointer" }}>Register your household →</a></div>
      </div>
        </div>
      </div>

      <div style={{ height: 40, borderTop: "1px solid #EAEAEA", fontSize: 12, color: "#9E9E9E", display: "flex", alignItems: "center", padding: "0 20px" }}>
        <span>© 2026 LGU Lipa City · Piloted with DENR Region IV-A</span>
        <span style={{ marginLeft: "auto" }}>Privacy · Terms · Accessibility · Contact</span>
      </div>
    </div>
  );
}

function RegisterScreen() {
  const [fullName, setFullName] = React.useState("");
  const [mobile, setMobile] = React.useState("");
  const [barangay, setBarangay] = React.useState("Brgy. Marawoy");
  const [city, setCity] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [pin, setPin] = React.useState("");
  const [confirmPin, setConfirmPin] = React.useState("");
  return (
    <AuthShell leftTitle="Barangay app for garbage operations" leftBig={<>Your barangay ID, a QR card, and eco-points — in 3 minutes.</>} leftStat="3 min" leftStatSub={<>average time to register verification via SMS OTP.</>} bullets={[{ icon: "🪪", title: "Unique household ID", sub: "Printable QR card that collectors scan at pickup." }, { icon: "🆓", title: "Free forever for residents", sub: "Your LGU funds BAGO.PH under municipal SWM plan." }, { icon: "🔒", title: "Your data stays in Philippines", sub: "RA 10173-compliant processing with opt-out anytime." }]}>
      <div style={{ maxWidth: 560, margin: "8px auto 0" }}>
        <div style={{ fontSize: 44, fontWeight: 800, color: "#1f1f1f" }}>Create your household account</div>
        <div style={{ color: "#666", marginTop: 8, fontSize: 15 }}>Step 3 of 4 — one form, then a quick SMS verification.</div>
        <div style={{ marginTop: 18, background: "white", border: "1px solid #E4E4E4", borderRadius: 12, padding: 18 }}>
          <UL style={{ color: "#1B5E20" }}>Personal details</UL>
          <div style={{ marginTop: 10, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <AuthInput label="Full name" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Enter full name" />
            <AuthInput label="Mobile number" value={mobile} onChange={(e) => setMobile(e.target.value)} prefix="+63" placeholder="917 543 8821" />
          </div>
          <UL style={{ color: "#1B5E20", marginTop: 14 }}>Address</UL>
          <div style={{ marginTop: 10, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <Select label="Barangay" value={barangay} onChange={setBarangay} options={["Brgy. Marawoy", "Brgy. San Sebastian", "Brgy. Balintawak", "Brgy. Tambo"]} />
            <AuthInput label="City" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Enter city" />
          </div>
          <AuthInput label="Street address & purok" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="House no., street, purok" />
          <UL style={{ color: "#1B5E20", marginTop: 14 }}>Security PIN</UL>
          <div style={{ marginTop: 10, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <AuthInput label="Create PIN" value={pin} onChange={(e) => setPin(e.target.value)} type="password" hint="4 digits" placeholder="Enter PIN" />
            <AuthInput label="Confirm PIN" value={confirmPin} onChange={(e) => setConfirmPin(e.target.value)} type="password" hint="Match required" placeholder="Re-enter PIN" />
          </div>
        </div>
        <button style={{ width: "100%", marginTop: 14, height: 52, border: "none", background: "#2E7D32", color: "white", fontSize: 18, fontWeight: 700, borderRadius: 8, fontFamily: "Poppins", cursor: "pointer" }}>Continue to verification</button>
      </div>
    </AuthShell>
  );
}

function OTPScreen() {
  const digits = ["8", "3", "1", "", "", ""];
  return (
    <AuthShell leftTitle="Barangay app for garbage operations" leftBig={<>One more step — verify it's really you.</>} leftStat="99.4%" leftStatSub={<>of SMS codes deliver within 10 seconds via Globe + Smart integration.</>} bullets={[{ icon: "📶", title: "Works on any network", sub: "Globe · Smart · Sun · DITO · PLDT mobile." }, { icon: "⏱️", title: "Auto-expires in 5 minutes", sub: "Codes single-use and hashed at rest." }, { icon: "🛟", title: "Stuck? Call your barangay desk", sub: "In-office registration available as fallback." }]}>
      <div style={{ maxWidth: 480, margin: "40px auto 0", textAlign: "center" }}>
        <div style={{ width: 68, height: 68, borderRadius: "50%", background: "#E8F5E9", margin: "0 auto", display: "grid", placeItems: "center", fontSize: 30 }}>📱</div>
        <div style={{ marginTop: 14, fontSize: 44, fontWeight: 800, color: "#1f1f1f" }}>Verify your number</div>
        <div style={{ marginTop: 8, color: "#666", fontSize: 14 }}>We sent a 6-digit code to</div>
        <div style={{ marginTop: 4, color: "#1f1f1f", fontWeight: 700, fontSize: 22 }}>+63 917 ••• 8821</div>
        <div style={{ marginTop: 18, display: "flex", justifyContent: "center", gap: 10 }}>
          {digits.map((d, i) => <div key={i} style={{ width: 52, height: 62, borderRadius: 10, border: "1.5px solid " + (d ? "#7CBF84" : "#D7D7D7"), background: d ? "#F0FAF2" : "white", display: "grid", placeItems: "center", fontSize: 31, fontWeight: 700, color: "#1B5E20" }}>{d || (i === 3 ? "|" : "")}</div>)}
        </div>
        <button style={{ width: "100%", marginTop: 18, height: 52, border: "none", background: "#2E7D32", color: "white", fontSize: 18, fontWeight: 700, borderRadius: 8, fontFamily: "Poppins", cursor: "pointer" }}>Verify & finish registration</button>
        <div style={{ marginTop: 12, fontSize: 13, color: "#666" }}>Wrong number? <a style={{ color: "#2E7D32", fontWeight: 700, cursor: "pointer" }}>Go back</a></div>
      </div>
    </AuthShell>
  );
}

Object.assign(window, { LoginScreen, RegisterScreen, OTPScreen });
