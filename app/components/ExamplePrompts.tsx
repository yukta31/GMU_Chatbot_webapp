"use client";

export default function ExamplePrompts({ onClick }: any) {
  const prompts = [
    "When is the last day to drop a class?",
    "Where is the CS department?",
    "How can I get shuttle timings?",
    "What are the housing deadlines?"
  ];

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "15px" }}>
      {prompts.map((p, i) => (
        <button
          key={i}
          onClick={() => onClick(p)}
          style={{
            padding: "8px 12px",
            borderRadius: "20px",
            border: "1px solid #ccc",
            backgroundColor: "white",
            cursor: "pointer",
            transition: "0.3s",
          }}
          onMouseEnter={(e) =>
            ((e.target as HTMLButtonElement).style.backgroundColor = "#FFCC33")
          }
          onMouseLeave={(e) =>
            ((e.target as HTMLButtonElement).style.backgroundColor = "white")
          }
        >
          {p}
        </button>
      ))}
    </div>
  );
}
