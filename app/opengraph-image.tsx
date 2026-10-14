import { ImageResponse } from "next/og";

export const alt = "4axiz IT Limited — Enterprise software, ERP and AI solutions";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "linear-gradient(135deg, #121517 0%, #2e3337 70%, #40464b 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ display: "flex", fontSize: 56, fontWeight: 800, letterSpacing: -1 }}>
            <span style={{ color: "#ffffff" }}>4a</span>
            <span style={{ color: "#e4603a" }}>x</span>
            <span style={{ color: "#ffffff" }}>iz</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 68, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2, maxWidth: 950 }}>
            Building intelligent software for a smarter business future.
          </div>
          <div style={{ marginTop: 28, fontSize: 28, color: "#f5a386" }}>ERP · AI & Automation · Custom Software · Web & Mobile</div>
        </div>
      </div>
    ),
    size,
  );
}
