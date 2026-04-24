// shared-screens.jsx — Web auth screens (login/register/otp)

function AuthShell({ leftTitle, leftBig, leftStat, leftStatSub, bullets, children }) {
  return (
    <div style={{ width: 1280, minHeight: 820, background: "#fff", borderRadius: 10, overflow: "hidden", fontFamily: "Poppins", boxShadow: "0 10px 35px rgba(0,0,0,0.14)" }}>
      <div style={{ height: 60, borderBottom: "1px solid #EAEAEA", display: "flex", alignItems: "center", padding: "0 26px", color: "#757575", fontSize: 14, gap: 30 }}>
        <Logo size={28} />
        <span>How it works</span>
        <span>For barangays</span>
        <span>RA 9003</span>
        <span>Help</span>
        <span style={{ marginLeft: "auto", fontSize: 13 }}>English · Tagalog</span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "49% 51%" }}>
        <div style={{ background: "linear-gradient(160deg,#1D7B2F,#2E7D32)", color: "white", padding: "48px 56px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", width: 360, height: 360, borderRadius: "50%", right: -40, top: -20, background: "rgba(255,255,255,0.1)" }} />
          <div style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: 1, opacity: 0.9, fontWeight: 700 }}>{leftTitle}</div>
          <div style={{ marginTop: 18, fontSize: 62, lineHeight: 0.98, fontWeight: 800, letterSpacing: -1.4 }}>{leftBig}</div>
          <div style={{ marginTop: 28, display: "flex", gap: 14, alignItems: "baseline" }}>
            <div style={{ fontSize: 72, fontWeight: 800, lineHeight: 1 }}>{leftStat}</div>
            <div style={{ fontSize: 29, fontWeight: 800, lineHeight: 1 }}> </div>
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

function RoleBtn({ active, icon, label, onClick }) {
  return (
    <button onClick={onClick} style={{
      width: 118, height: 76, borderRadius: 10, border: active ? "2px solid #2E7D32" : "1px solid #DDDDDD",
      background: active ? "#F5FBF6" : "white", color: active ? "#2E7D32" : "#424242", cursor: "pointer",
      fontFamily: "Poppins", fontWeight: 700, fontSize: 13, display: "flex", flexDirection: "column", gap: 6, justifyContent: "center", alignItems: "center"
    }}>
      <span style={{ fontSize: 18 }}>{icon}</span>
      <span>{label}</span>
    </button>
  );
}

function AuthInput({ label, value, onChange, type = "text", prefix, hint }) {
  return (
    <div>
      <div style={{ fontSize: 13, fontWeight: 700, color: "#333", marginBottom: 8 }}>{label}</div>
      <div style={{ display: "flex", alignItems: "center", border: "1px solid #D0D0D0", borderRadius: 8, background: "white", height: 50 }}>
        {prefix && <div style={{ width: 52, textAlign: "center", borderRight: "1px solid #E6E6E6", color: "#666", fontWeight: 600 }}>{prefix}</div>}
        <input value={value} onChange={onChange} type={type} style={{ width: "100%", border: "none", outline: "none", background: "transparent", fontSize: 16, fontFamily: "Poppins", padding: "0 14px" }} />
      </div>
      {hint && <div style={{ marginTop: 6, fontSize: 12, color: "#888" }}>{hint}</div>}
    </div>
  );
}

function LoginScreen() {
  const [role, setRole] = React.useState("Resident");
  const [mobile, setMobile] = React.useState("917 543 8821");
  const [pin, setPin] = React.useState("1234");

  return (
    <AuthShell
      leftTitle="Barangay app for garbage operations"
      leftBig={<>Clean barangays, built on data and community.</>}
      leftStat="142,850"
      leftStatSub={<>households already enrolled across 18 pilot barangays in Lipa City.</>}
      bullets={[
        { icon: "📅", title: "Pickup schedules that never surprise you", sub: "SMS + push alerts evening before every collection." },
        { icon: "🌿", title: "Earn eco-points for compliance", sub: "Redeem for GCash, mobile data, or groceries." },
        { icon: "📸", title: "Report illegal dumping in 30 seconds", sub: "Photos, GPS, and status updates all in one place." }
      ]}
    >
      <div style={{ maxWidth: 500, margin: "18px auto 0" }}>
        <div style={{ fontSize: 46, fontWeight: 800, color: "#1f1f1f" }}>Welcome back</div>
        <div style={{ color: "#666", marginTop: 8, fontSize: 15 }}>Log in to BAGO.PH to manage your household, route, or barangay.</div>

        <div style={{ display: "flex", gap: 10, marginTop: 22 }}>
          <RoleBtn icon="🏠" label="Resident" active={role === "Resident"} onClick={() => setRole("Resident")} />
          <RoleBtn icon="🚛" label="Collector" active={role === "Collector"} onClick={() => setRole("Collector")} />
          <RoleBtn icon="🏛️" label="LGU Admin" active={role === "LGU Admin"} onClick={() => setRole("LGU Admin")} />
        </div>

        <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 16 }}>
          <AuthInput label="Mobile number" value={mobile} onChange={(e) => setMobile(e.target.value)} prefix="+63" />
          <AuthInput label="PIN" value={pin} onChange={(e) => setPin(e.target.value)} type="password" hint="4-digit PIN" />
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12, fontSize: 13 }}>
          <label style={{ color: "#666", display: "flex", gap: 8, alignItems: "center" }}>
            <input type="checkbox" defaultChecked style={{ accentColor: "#2E7D32" }} />
            Keep me signed in on this device
          </label>
          <a style={{ color: "#2E7D32", fontWeight: 700, cursor: "pointer" }}>Forgot PIN?</a>
        </div>

        <button style={{ width: "100%", marginTop: 16, height: 52, border: "none", background: "#2E7D32", color: "white", fontSize: 18, fontWeight: 700, borderRadius: 8, fontFamily: "Poppins", cursor: "pointer" }}>
          Log in to {role}
        </button>

        <div style={{ marginTop: 16, textAlign: "center", color: "#666", fontSize: 15 }}>
          New to BAGO.PH? <a style={{ color: "#2E7D32", fontWeight: 700, cursor: "pointer" }}>Register your household →</a>
        </div>
      </div>
    </AuthShell>
  );
}

function RegisterScreen() {
  return (
    <AuthShell
      leftTitle="Barangay app for garbage operations"
      leftBig={<>Your barangay ID, a QR card, and eco-points — in 3 minutes.</>}
      leftStat="3 min"
      leftStatSub={<>average time to register verification via SMS OTP.</>}
      bullets={[
        { icon: "🪪", title: "Unique household ID", sub: "Printable QR card that collectors scan at pickup." },
        { icon: "🆓", title: "Free forever for residents", sub: "Your LGU funds BAGO.PH under municipal SWM plan." },
        { icon: "🔒", title: "Your data stays in Philippines", sub: "RA 10173-compliant processing with opt-out anytime." }
      ]}
    >
      <div style={{ maxWidth: 560, margin: "8px auto 0" }}>
        <div style={{ fontSize: 44, fontWeight: 800, color: "#1f1f1f" }}>Create your household account</div>
        <div style={{ color: "#666", marginTop: 8, fontSize: 15 }}>Step 3 of 4 — one form, then a quick SMS verification.</div>

        <div style={{ marginTop: 18, background: "white", border: "1px solid #E4E4E4", borderRadius: 12, padding: 18 }}>
          <UL style={{ color: "#1B5E20" }}>Personal details</UL>
          <div style={{ marginTop: 10, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <AuthInput label="Full name" value="Maria Santos Dela Cruz" onChange={() => {}} />
            <AuthInput label="Mobile number" value="917 543 8821" onChange={() => {}} prefix="+63" />
          </div>

          <UL style={{ color: "#1B5E20", marginTop: 14 }}>Address</UL>
          <div style={{ marginTop: 10, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <Select label="Barangay" value="Brgy. Marawoy" onChange={() => {}} options={["Brgy. Marawoy", "Brgy. San Sebastian", "Brgy. Balintawak", "Brgy. Tambo"]} />
            <AuthInput label="City" value="Lipa City, Batangas" onChange={() => {}} />
          </div>
          <AuthInput label="Street address & purok" value="128 Rizal St., Purok 3" onChange={() => {}} />

          <UL style={{ color: "#1B5E20", marginTop: 14 }}>Security PIN</UL>
          <div style={{ marginTop: 10, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <AuthInput label="Create PIN" value="1234" onChange={() => {}} type="password" hint="4 digits" />
            <AuthInput label="Confirm PIN" value="1234" onChange={() => {}} type="password" hint="Match required" />
          </div>

          <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginTop: 12, padding: 12, borderRadius: 8, background: "#E8F5E9", color: "#1B5E20", fontSize: 13 }}>
            <input type="checkbox" defaultChecked style={{ marginTop: 2, accentColor: "#2E7D32" }} />
            <span>I agree to BAGO.PH terms and consent to data processing under RA 10173.</span>
          </div>
        </div>

        <button style={{ width: "100%", marginTop: 14, height: 52, border: "none", background: "#2E7D32", color: "white", fontSize: 18, fontWeight: 700, borderRadius: 8, fontFamily: "Poppins", cursor: "pointer" }}>
          Continue to verification
        </button>
      </div>
    </AuthShell>
  );
}

function OTPScreen() {
  const digits = ["8", "3", "1", "", "", ""];
  return (
    <AuthShell
      leftTitle="Barangay app for garbage operations"
      leftBig={<>One more step — verify it's really you.</>}
      leftStat="99.4%"
      leftStatSub={<>of SMS codes deliver within 10 seconds via Globe + Smart integration.</>}
      bullets={[
        { icon: "📶", title: "Works on any network", sub: "Globe · Smart · Sun · DITO · PLDT mobile." },
        { icon: "⏱️", title: "Auto-expires in 5 minutes", sub: "Codes single-use and hashed at rest." },
        { icon: "🛟", title: "Stuck? Call your barangay desk", sub: "In-office registration available as fallback." }
      ]}
    >
      <div style={{ maxWidth: 480, margin: "40px auto 0", textAlign: "center" }}>
        <div style={{ width: 68, height: 68, borderRadius: "50%", background: "#E8F5E9", margin: "0 auto", display: "grid", placeItems: "center", fontSize: 30 }}>📱</div>
        <div style={{ marginTop: 14, fontSize: 44, fontWeight: 800, color: "#1f1f1f" }}>Verify your number</div>
        <div style={{ marginTop: 8, color: "#666", fontSize: 14 }}>We sent a 6-digit code to</div>
        <div style={{ marginTop: 4, color: "#1f1f1f", fontWeight: 700, fontSize: 22 }}>+63 917 ••• 8821 · <a style={{ color: "#2E7D32", cursor: "pointer" }}>change number</a></div>

        <div style={{ marginTop: 18, display: "flex", justifyContent: "center", gap: 10 }}>
          {digits.map((d, i) => (
            <div key={i} style={{
              width: 52, height: 62, borderRadius: 10, border: "1.5px solid " + (d ? "#7CBF84" : "#D7D7D7"),
              background: d ? "#F0FAF2" : "white", display: "grid", placeItems: "center", fontSize: 31, fontWeight: 700, color: "#1B5E20"
            }}>{d || (i === 3 ? "|" : "")}</div>
          ))}
        </div>

        <div style={{ marginTop: 14, color: "#777", fontSize: 14 }}>
          Didn't receive it? <a style={{ color: "#BDBDBD", textDecoration: "line-through" }}>Resend code</a> <span style={{ color: "#2E7D32", fontWeight: 700 }}>in 0:42</span>
        </div>

        <button style={{ width: "100%", marginTop: 18, height: 52, border: "none", background: "#2E7D32", color: "white", fontSize: 18, fontWeight: 700, borderRadius: 8, fontFamily: "Poppins", cursor: "pointer" }}>
          Verify & finish registration
        </button>

        <div style={{ marginTop: 12, fontSize: 13, color: "#666" }}>
          Wrong number? <a style={{ color: "#2E7D32", fontWeight: 700, cursor: "pointer" }}>Go back</a>
        </div>
      </div>
    </AuthShell>
  );
}

Object.assign(window, { LoginScreen, RegisterScreen, OTPScreen });
