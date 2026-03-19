const stats = [
  { value: "10,000+", label: "Active Users", desc: "People organizing their lives with NotePlus" },
  { value: "500K+",   label: "Notes Created", desc: "Ideas captured and tasks completed" },
  { value: "99.9%",   label: "Uptime",        desc: "Always available when you need it" },
  { value: "4.9 ★",   label: "User Rating",   desc: "Loved by users worldwide" },
];

const Stats = () => {
  return (
    <section id="stats" className="py-20" style={{ backgroundColor: "#002c2f" }}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-3xl lg:text-4xl font-bold text-white">Trusted by thousands</h2>
          <p className="text-gray-400 mt-3 text-base">Join a growing community of organised thinkers</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="text-center p-6 rounded-2xl" style={{ backgroundColor: "rgba(255,255,255,0.05)" }}>
              <p className="text-3xl lg:text-4xl font-bold text-white mb-1">{stat.value}</p>
              <p className="text-sm font-semibold mb-1" style={{ color: "#1e646e" }}>{stat.label}</p>
              <p className="text-xs text-gray-500 leading-relaxed">{stat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;