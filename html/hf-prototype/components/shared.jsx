// Local static-host auth helpers (Render root: html)
function UL({ children, style }) {
  return <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase", color: "#757575", ...style }}>{children}</div>;
}

function Select({ label, value, onChange, options, style }) {
  return (
    <div style={{ ...style }}>
      {label && <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6 }}>{label}</label>}
      <select
        value={value}
        onChange={(e) => onChange && onChange(e.target.value)}
        style={{ width: "100%", height: 48, border: "1px solid #BDBDBD", borderRadius: 8, padding: "0 12px", fontFamily: "Poppins", fontSize: 14, background: "white" }}
      >
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

function Logo({ color = "#2E7D32", size = 24, withLeaf = true }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 6, color, fontSize: size, fontWeight: 800, fontFamily: "Poppins", letterSpacing: -0.5 }}>
      {withLeaf && <span style={{ fontSize: size * 0.9 }}>🌿</span>}
      <span>BAGO.<span style={{ opacity: 0.85 }}>PH</span></span>
    </div>
  );
}

Object.assign(window, { UL, Select, Logo });
