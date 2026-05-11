import Button from "@/components/Button";

export default function Home() {
  return (
    <main className="min-h-screen bg-dawn text-white px-6 md:px-16 py-24 max-w-7xl mx-auto">
      <p className="text-eyebrow text-dragon-fire mb-6">Design tokens — Stage 2 check</p>

      <h1 className="font-display text-display text-white mb-2">
        Work that
      </h1>
      <h1 className="font-display text-display italic text-dusk mb-16">
        builds brands.
      </h1>

      <section className="mb-16">
        <h2 className="text-h2 font-bold mb-6">Type scale</h2>
        <div className="space-y-4">
          <p className="text-h3 font-bold">H3 — Satoshi Bold</p>
          <p className="text-[1.125rem] text-white/70">Body large — Satoshi Regular, 1.125rem, lh 1.6</p>
          <p className="text-base text-white/60">Body — Satoshi Regular, 1rem, lh 1.6</p>
          <p className="text-sm font-medium text-white/50 uppercase tracking-wider">Small / caption — Satoshi Medium</p>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-h2 font-bold mb-6">Colour</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: "Dawn", hex: "#191919", bg: "bg-dawn", border: true },
            { name: "Dragon Fire", hex: "#FE6D4C", bg: "bg-dragon-fire" },
            { name: "Dusk", hex: "#FAF8F7", bg: "bg-dusk" },
            { name: "Dawn-80", hex: "#303030", bg: "bg-dawn-80" },
            { name: "Fire-80", hex: "#FE7C5E", bg: "bg-fire-80" },
            { name: "Pixie Pink", hex: "#FE86F6", bg: "bg-pixie-pink" },
            { name: "Curious Blue", hex: "#3052F9", bg: "bg-curious-blue" },
            { name: "Mindaro", hex: "#C4FE79", bg: "bg-mindaro" },
          ].map((c) => (
            <div
              key={c.name}
              className={`${c.bg} ${c.border ? "border border-dawn-80" : ""} rounded-card p-4 h-24 flex flex-col justify-end`}
            >
              <p className="text-xs font-bold text-dawn mix-blend-difference">{c.name}</p>
              <p className="text-xs text-dawn/60 mix-blend-difference">{c.hex}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-h2 font-bold mb-6">Buttons</h2>
        <div className="flex flex-wrap gap-4">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="primary" size="small">Primary small</Button>
          <Button variant="secondary" size="small">Secondary small</Button>
        </div>
      </section>
    </main>
  );
}
