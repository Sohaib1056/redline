export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 11 }} aria-label="RedLine Ambulance">
      <span className="brand-mark">+</span>
      <span style={{ lineHeight: 1 }}>
        <span style={{ display: "block", fontSize: 15, fontWeight: 800, letterSpacing: "-0.02em" }}>
          RedLine
        </span>
        {!compact && (
          <span style={{ display: "block", marginTop: 3, fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.18em", color: "#64748b" }}>
            Ambulance Services
          </span>
        )}
      </span>
    </div>
  );
}
