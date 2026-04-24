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

const BATANGAS_CITY_BARANGAYS = {
  "Batangas City": [
    "Alangilan", "Balagtas", "Balete", "Banaba Center", "Banaba Ibaba", "Banaba Kanluran", "Banaba Silangan",
    "Barangay 1 (Poblacion)", "Barangay 2 (Poblacion)", "Barangay 3 (Poblacion)", "Barangay 4 (Poblacion)",
    "Barangay 5 (Poblacion)", "Barangay 6 (Poblacion)", "Barangay 7 (Poblacion)", "Barangay 8 (Poblacion)",
    "Barangay 9 (Poblacion)", "Barangay 10 (Poblacion)", "Barangay 11 (Poblacion)", "Barangay 12 (Poblacion)",
    "Barangay 13 (Poblacion)", "Barangay 14 (Poblacion)", "Barangay 15 (Poblacion)", "Barangay 16 (Poblacion)",
    "Barangay 17 (Poblacion)", "Barangay 18 (Poblacion)", "Barangay 19 (Poblacion)", "Barangay 20 (Poblacion)",
    "Barangay 21 (Poblacion)", "Barangay 22 (Poblacion)", "Barangay 23 (Poblacion)", "Barangay 24 (Poblacion)",
    "Bilogo", "Bolbok", "Bukal", "Calicanto", "Catandala", "Concepcion", "Conde Itaas", "Conde Labak", "Cuta",
    "Dalig", "Dela Paz", "Dela Paz Pulot Aplaya", "Dela Paz Pulot Itaas", "Domoclay", "Dumantay", "Gulod Itaas",
    "Gulod Labak", "Haligue Kanluran", "Haligue Silangan", "Ilihan", "Isla Verde", "Kumba", "Kumintang Ibaba",
    "Kumintang Ilaya", "Libjo", "Liponpon", "Maapas", "Mabacong (Matoco)", "Mahabang Dahilig", "Mahabang Parang",
    "Mahacot Kanluran", "Mahacot Silangan", "Malalim", "Malibayo", "Malitam", "Maruclap", "Pagkilatan",
    "Paharang Kanluran", "Paharang Silangan", "Pallocan Kanluran", "Pallocan Silangan", "Pinamucan",
    "Pinamucan Ibaba", "Pinamucan Silangan", "Sampaga", "San Agapito", "San Agustin Kanluran",
    "San Agustin Silangan", "San Andres", "San Antonio", "San Isidro", "San Jose Sico", "San Miguel", "San Pedro",
    "Santa Clara", "Santa Rita Aplaya", "Santa Rita Karsada", "Santo Domingo", "Santo Niño", "Simlong",
    "Sirang Lupa", "Sorosoro Ibaba", "Sorosoro Ilaya", "Sorosoro Karsada", "Tabangao Ambulong",
    "Tabangao Aplaya (Tabangao Proper)", "Tabangao Dao", "Talahib Pandayan", "Talahib Payapa", "Talumpok Kanluran",
    "Talumpok Silangan", "Tinga Itaas", "Tinga Labak", "Tulo", "Wawa"
  ],
  "Calaca City": [
    "Baclas", "Bagong Tubig", "Balimbing", "Bambang", "Barangay 1 (Poblacion)", "Barangay 2 (Poblacion)",
    "Barangay 3 (Poblacion)", "Barangay 4 (Poblacion)", "Barangay 5 (Poblacion)", "Barangay 6 (Poblacion)", "Bisaya",
    "Cahil", "Calantas", "Caluangan", "Camastilisan", "Coral Ni Bacal", "Coral Ni Lopez (Sugod)", "Dacanlao", "Dila",
    "Loma", "Lumbang Calzada", "Lumbang Na Bata", "Lumbang Na Matanda", "Madalunot", "Makina", "Matipok",
    "Munting Coral", "Niyugan", "Pantay", "Puting Bato East", "Puting Bato West", "Puting Kahoy", "Quisumbing",
    "Salong", "San Rafael", "Sinisian", "Taklang Anak", "Talisay", "Tamayo", "Timbain"
  ],
  "Lipa City": [
    "Adya", "Anilao", "Anilao-Labac", "Antipolo Del Norte", "Antipolo Del Sur", "Bagong Pook", "Balintawak",
    "Banaybanay", "Bolbok", "Bugtong na Pulo", "Bulacnin", "Bulaklakan", "Calamias", "Cumba", "Dagatan", "Duhatan",
    "Halang", "Inosloban", "Kayumanggi", "Latag", "Lodlod", "Lumbang", "Mabini", "Malagonlong", "Malitlit", "Marauoy",
    "Mataas Na Lupa", "Munting Pulo", "Pagolingin Bata", "Pagolingin East", "Pagolingin West", "Pangao",
    "Pinagkawitan", "Pinagtongulan", "Plaridel", "Poblacion Barangay 1-8", "Poblacion Barangay 9",
    "Poblacion Barangay 9-A", "Poblacion Barangay 10-12", "Pusil", "Quezon", "Rizal", "Sabang", "Sampaguita",
    "San Benito", "San Carlos", "San Celestino", "San Francisco", "San Guillermo", "San Jose", "San Lucas",
    "San Salvador", "San Sebastian (Balagbag)", "Santo Niño", "Santo Toribio", "Sapac", "Sico", "Talisay", "Tambo",
    "Tangob", "Tanguay", "Tibig", "Tipacan"
  ],
  "Santo Tomas City": [
    "Barangay I (Poblacion)", "Barangay II (Poblacion)", "Barangay III (Poblacion)", "Barangay IV (Poblacion)",
    "San Agustin", "San Antonio", "San Bartolome", "San Felix", "San Fernando", "San Francisco", "San Isidro Norte",
    "San Isidro Sur", "San Joaquin", "San Jose", "San Juan", "San Luis", "San Miguel", "San Pablo", "San Pedro",
    "San Rafael", "San Roque", "San Vicente", "Santa Ana", "Santa Anastacia", "Santa Clara", "Santa Cruz",
    "Santa Elena", "Santa Maria", "Santa Teresita", "Santiago"
  ],
  "Tanauan City": [
    "Altura Bata", "Altura Matanda", "Altura-South", "Ambulong", "Bagbag", "Bagumbayan", "Balele", "Banadero",
    "Banjo East", "Banjo Laurel (Banjo West)", "Bilog-bilog", "Boot", "Cale", "Darasa", "Gonzales", "Hidalgo",
    "Janopol", "Janopol Oriental", "Laurel", "Luyos", "Mabini", "Malaking Pulo", "Maria Paz", "Maugat",
    "Montaña (Ik-ik)", "Natatas", "Pagaspas", "Pantay Bata", "Pantay Matanda", "Poblacion Barangay 1",
    "Poblacion Barangay 2", "Poblacion Barangay 3", "Poblacion Barangay 4", "Poblacion Barangay 5",
    "Poblacion Barangay 6", "Poblacion Barangay 7", "Sala", "Sambat", "San Jose", "Santol (Doña Jacoba Garcia)",
    "Santor", "Sulpoc", "Suplang", "Talaga", "Tinurik", "Trapiche", "Ulango", "Wawa"
  ]
};

function LoginScreen() {
  const [role, setRole] = React.useState("Resident");
  const [mobile, setMobile] = React.useState("");
  const [pin, setPin] = React.useState("");
  function onMobileChange(value) {
    const digits = String(value || "").replace(/\D/g, "").slice(0, 10);
    setMobile(digits);
  }
  function onPinChange(value) {
    const digits = String(value || "").replace(/\D/g, "").slice(0, 4);
    setPin(digits);
  }
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
          <AuthInput label="Mobile number" value={mobile} onChange={(e) => onMobileChange(e.target.value)} type="tel" prefix="+63" placeholder="9175438821" />
          <AuthInput label="PIN" value={pin} onChange={(e) => onPinChange(e.target.value)} type="password" hint="4-digit PIN" placeholder="Enter 4-digit PIN" />
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
  const cityOptions = Object.keys(BATANGAS_CITY_BARANGAYS);
  const [fullName, setFullName] = React.useState("");
  const [mobile, setMobile] = React.useState("");
  const [city, setCity] = React.useState("Lipa City");
  const [barangay, setBarangay] = React.useState(BATANGAS_CITY_BARANGAYS["Lipa City"][0]);
  const [address, setAddress] = React.useState("");
  const [pin, setPin] = React.useState("");
  const [confirmPin, setConfirmPin] = React.useState("");
  const barangayOptions = BATANGAS_CITY_BARANGAYS[city] || [];

  function onCityChange(nextCity) {
    setCity(nextCity);
    var nextBarangays = BATANGAS_CITY_BARANGAYS[nextCity] || [];
    setBarangay(nextBarangays.length ? nextBarangays[0] : "");
  }
  function onMobileChange(value) {
    const digits = String(value || "").replace(/\D/g, "").slice(0, 10);
    setMobile(digits);
  }
  function onPinChange(value) {
    const digits = String(value || "").replace(/\D/g, "").slice(0, 4);
    setPin(digits);
  }
  function onConfirmPinChange(value) {
    const digits = String(value || "").replace(/\D/g, "").slice(0, 4);
    setConfirmPin(digits);
  }

  return (
    <AuthShell leftTitle="Barangay app for garbage operations" leftBig={<>Your barangay ID, a QR card, and eco-points — in 3 minutes.</>} leftStat="3 min" leftStatSub={<>average time to register verification via SMS OTP.</>} bullets={[{ icon: "🪪", title: "Unique household ID", sub: "Printable QR card that collectors scan at pickup." }, { icon: "🆓", title: "Free forever for residents", sub: "Your LGU funds BAGO.PH under municipal SWM plan." }, { icon: "🔒", title: "Your data stays in Philippines", sub: "RA 10173-compliant processing with opt-out anytime." }]}>
      <div style={{ maxWidth: 560, margin: "8px auto 0" }}>
        <div style={{ fontSize: 44, fontWeight: 800, color: "#1f1f1f" }}>Create your household account</div>
        <div style={{ color: "#666", marginTop: 8, fontSize: 15 }}>Step 3 of 4 — one form, then a quick SMS verification.</div>
        <div style={{ marginTop: 18, background: "white", border: "1px solid #E4E4E4", borderRadius: 12, padding: 18 }}>
          <UL style={{ color: "#1B5E20" }}>Personal details</UL>
          <div style={{ marginTop: 10, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <AuthInput label="Full name" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Enter full name" />
            <AuthInput label="Mobile number" value={mobile} onChange={(e) => onMobileChange(e.target.value)} type="tel" prefix="+63" placeholder="9175438821" />
          </div>
          <UL style={{ color: "#1B5E20", marginTop: 14 }}>Address</UL>
          <div style={{ marginTop: 10, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <Select label="City" value={city} onChange={onCityChange} options={cityOptions} />
            <Select label="Barangay" value={barangay} onChange={setBarangay} options={barangayOptions} />
          </div>
          <AuthInput label="Street address & purok" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="House no., street, purok" />
          <UL style={{ color: "#1B5E20", marginTop: 14 }}>Security PIN</UL>
          <div style={{ marginTop: 10, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <AuthInput label="Create PIN" value={pin} onChange={(e) => onPinChange(e.target.value)} type="password" hint="4 digits" placeholder="Enter PIN" />
            <AuthInput label="Confirm PIN" value={confirmPin} onChange={(e) => onConfirmPinChange(e.target.value)} type="password" hint="Match required" placeholder="Re-enter PIN" />
          </div>
        </div>
        <button style={{ width: "100%", marginTop: 14, height: 52, border: "none", background: "#2E7D32", color: "white", fontSize: 18, fontWeight: 700, borderRadius: 8, fontFamily: "Poppins", cursor: "pointer" }}>Continue to verification</button>
      </div>
    </AuthShell>
  );
}

function OTPScreen() {
  const [digits, setDigits] = React.useState(["", "", "", "", "", ""]);
  const [mobileDisplay, setMobileDisplay] = React.useState("+63 9•• ••• ••••");
  const [debugOtp, setDebugOtp] = React.useState("");

  React.useEffect(() => {
    var pendingMobile = String(localStorage.getItem("bagoPendingMobile") || "").replace(/\D/g, "");
    var pendingOtp = String(localStorage.getItem("bagoPendingOtp") || "");
    if (pendingMobile.length >= 11 && pendingMobile.indexOf("0") === 0) {
      var masked = "+63 " + pendingMobile.slice(1, 4) + " ••• " + pendingMobile.slice(-4);
      setMobileDisplay(masked);
    }
    if ((location.hostname === "localhost" || location.hostname === "127.0.0.1") && /^\d{6}$/.test(pendingOtp)) {
      setDebugOtp(pendingOtp);
    }
  }, []);

  function onDigitChange(index, value) {
    var next = String(value || "").replace(/\D/g, "").slice(0, 1);
    var copy = digits.slice();
    copy[index] = next;
    setDigits(copy);
    if (next && index < 5) {
      var nxt = document.querySelector('[data-otp-digit="' + (index + 1) + '"]');
      if (nxt) nxt.focus();
    }
  }

  function onDigitKeyDown(index, event) {
    if (event.key === "Backspace" && !digits[index] && index > 0) {
      var prev = document.querySelector('[data-otp-digit="' + (index - 1) + '"]');
      if (prev) prev.focus();
    }
  }

  return (
    <AuthShell leftTitle="Barangay app for garbage operations" leftBig={<>One more step — verify it's really you.</>} leftStat="99.4%" leftStatSub={<>of SMS codes deliver within 10 seconds via Globe + Smart integration.</>} bullets={[{ icon: "📶", title: "Works on any network", sub: "Globe · Smart · Sun · DITO · PLDT mobile." }, { icon: "⏱️", title: "Auto-expires in 5 minutes", sub: "Codes single-use and hashed at rest." }, { icon: "🛟", title: "Stuck? Call your barangay desk", sub: "In-office registration available as fallback." }]}>
      <div style={{ maxWidth: 480, margin: "40px auto 0", textAlign: "center" }}>
        <div style={{ width: 68, height: 68, borderRadius: "50%", background: "#E8F5E9", margin: "0 auto", display: "grid", placeItems: "center", fontSize: 30 }}>📱</div>
        <div style={{ marginTop: 14, fontSize: 44, fontWeight: 800, color: "#1f1f1f" }}>Verify your number</div>
        <div style={{ marginTop: 8, color: "#666", fontSize: 14 }}>We sent a 6-digit code to</div>
        <div style={{ marginTop: 4, color: "#1f1f1f", fontWeight: 700, fontSize: 22 }}>{mobileDisplay}</div>
        <div style={{ marginTop: 18, display: "flex", justifyContent: "center", gap: 10 }}>
          {digits.map((d, i) => (
            <input
              key={i}
              data-otp-digit={i}
              value={d}
              onChange={(e) => onDigitChange(i, e.target.value)}
              onKeyDown={(e) => onDigitKeyDown(i, e)}
              inputMode="numeric"
              maxLength={1}
              style={{
                width: 52,
                height: 62,
                borderRadius: 10,
                border: "1.5px solid " + (d ? "#7CBF84" : "#D7D7D7"),
                background: d ? "#F0FAF2" : "white",
                fontSize: 31,
                fontWeight: 700,
                color: "#1B5E20",
                textAlign: "center",
                outline: "none",
                fontFamily: "Poppins"
              }}
            />
          ))}
        </div>
        <button style={{ width: "100%", marginTop: 18, height: 52, border: "none", background: "#2E7D32", color: "white", fontSize: 18, fontWeight: 700, borderRadius: 8, fontFamily: "Poppins", cursor: "pointer" }}>Verify & finish registration</button>
        {debugOtp && (
          <div style={{ marginTop: 10, fontSize: 12, color: "#1B5E20", background: "#E8F5E9", border: "1px dashed #66BB6A", borderRadius: 8, padding: "8px 10px" }}>
            Localhost test OTP: <strong>{debugOtp}</strong>
          </div>
        )}
        <div style={{ marginTop: 12, fontSize: 13, color: "#666" }}>Wrong number? <a style={{ color: "#2E7D32", fontWeight: 700, cursor: "pointer" }}>Go back</a></div>
      </div>
    </AuthShell>
  );
}

Object.assign(window, { LoginScreen, RegisterScreen, OTPScreen });
