export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: "1rem",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont",
      }}
    >
      <h1>Next.js is running</h1>

      <p>
        You are developing on a mobile environment using Termux.
      </p>

      <code
        style={{
          padding: "0.5rem 1rem",
          background: "#111",
          color: "#0f0",
          borderRadius: "6px",
        }}
      >
        app/page.tsx
      </code>
    </main>
  );
}
