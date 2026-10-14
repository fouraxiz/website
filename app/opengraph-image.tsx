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
          background: "linear-gradient(135deg, #0a0e19 0%, #131a42 60%, #1f35b2 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ width: 64, height: 64, borderRadius: 16, background: "#2643dc", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40, fontWeight: 700 }}>
            +
          </div>
          <div style={{ fontSize: 44, fontWeight: 700, letterSpacing: -1 }}>4axiz</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 68, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2, maxWidth: 950 }}>
            Building intelligent software for a smarter business future.
          </div>
          <div style={{ marginTop: 28, fontSize: 28, color: "#bccdff" }}>ERP · AI & Automation · Custom Software · Web & Mobile</div>
        </div>
      </div>
    ),
    size,
  );
}
