import { MdOutlineNoteAlt } from "react-icons/md";
import { BsBellFill, BsShareFill, BsTagFill, BsBookFill, BsShieldFill } from "react-icons/bs";

const services = [
  { icon: <MdOutlineNoteAlt />, title: "Smart Notes", desc: "Create blank, todo, essay, or daily reflection notes with a clean editor." },
  { icon: <BsBellFill />, title: "Reminders", desc: "Set reminders on any note so you never miss an important task or event." },
  { icon: <BsShareFill />, title: "Share Notes", desc: "Collaborate by sharing notes with friends, colleagues or teammates." },
  { icon: <BsTagFill />, title: "Tags", desc: "Organise your notes with custom tags for lightning fast filtering." },
  { icon: <BsBookFill />, title: "Notebooks", desc: "Group related notes into notebooks like Project Plans or Daily Routines." },
  { icon: <BsShieldFill />, title: "Secure", desc: "Your notes are protected with JWT authentication and encrypted storage." },
];

const Services = () => {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-sm font-semibold uppercase tracking-widest" style={{ color: "#1e646e" }}>What We Offer</span>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mt-3">Everything you need to</h2>
          <h2 className="text-3xl lg:text-4xl font-bold mt-1" style={{ color: "#1e646e" }}>stay organised</h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl border border-gray-100 hover:border-teal-200 hover:shadow-md transition-all duration-300 group"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl mb-4 group-hover:scale-110 transition-transform"
                style={{ backgroundColor: "#002c2f" }}
              >
                {service.icon}
              </div>
              <h3 className="text-base font-bold text-gray-800 mb-2">{service.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{service.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Services;