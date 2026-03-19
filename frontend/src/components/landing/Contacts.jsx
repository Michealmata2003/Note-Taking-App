import { Link } from "react-router-dom";
import contactImage from "../../assets/images/contact.png";

const Contact = () => {
  return (
    <>
      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">

            {/* Image */}
            <div className="flex-1 flex justify-center">
              <img src={contactImage} alt="Contact" className="w-full max-w-md drop-shadow-xl" />
            </div>

            {/* Info */}
            <div className="flex-1">
              <span className="text-sm font-semibold uppercase tracking-widest" style={{ color: "#1e646e" }}>Get In Touch</span>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mt-3 mb-6">
                Got questions?<br />We'd love to hear from you.
              </h2>

              <div className="space-y-4 mb-8">
                {[
                  { emoji: "📍", label: "Address", value: "1234 Street, City, Country" },
                  { emoji: "📞", label: "Phone", value: "+123 456 789" },
                  { emoji: "📧", label: "Email", value: "info@noteplus.com" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:border-teal-200 transition-colors">
                    <span className="text-2xl">{item.emoji}</span>
                    <div>
                      <p className="text-xs text-gray-400 font-medium">{item.label}</p>
                      <p className="text-sm font-semibold text-gray-700">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 mx-4 mb-8 rounded-3xl text-center" style={{ background: "linear-gradient(135deg, #002c2f 0%, #1e646e 100%)" }}>
        <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
          Ready to get organised?
        </h2>
        <p className="text-gray-300 mb-8 text-base max-w-md mx-auto">
          Join over 10,000 users who trust NotePlus to keep their ideas in order.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/signup"
            className="px-8 py-3.5 rounded-xl font-semibold text-sm bg-white hover:bg-gray-100 transition-colors"
            style={{ color: "#002c2f" }}
          >
            Start For Free
          </Link>
          <Link
            to="/signin"
            className="px-8 py-3.5 rounded-xl font-semibold text-sm border-2 border-white text-white hover:bg-white hover:text-gray-900 transition-colors"
          >
            Sign In
          </Link>
        </div>
      </section>
    </>
  );
};

export default Contact;
