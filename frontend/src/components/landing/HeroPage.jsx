import { Link } from "react-router-dom";
import { MdOutlineNoteAlt } from "react-icons/md";
import { BsCheckCircleFill } from "react-icons/bs";
import heroimage from "../../assets/images/heroimage.png";

const HeroPage = () => {
  return (
    <section id="hero" className="min-h-screen flex items-center py-16" style={{ background: "linear-gradient(135deg, #f0f9f9 0%, #ffffff 60%, #e8f4f5 100%)" }}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">

          {/* Left */}
          <div className="flex-1 text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6" style={{ backgroundColor: "#e8f4f5", color: "#1e646e" }}>
              <MdOutlineNoteAlt className="text-base" />
              Smart Note Taking App
            </div>

            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Organize your
              <span className="block" style={{ color: "#1e646e" }}>thoughts better</span>
            </h1>

            <p className="text-lg text-gray-500 mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              NotePlus helps you capture ideas, set reminders, and collaborate with others — all in one clean, simple workspace.
            </p>

            {/* Features */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8 max-w-md mx-auto lg:mx-0">
              {["Free to use", "No credit card", "Sync everywhere"].map((f) => (
                <div key={f} className="flex items-center gap-2 text-sm text-gray-600">
                  <BsCheckCircleFill style={{ color: "#1e646e" }} />
                  {f}
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <Link
                to="/signup"
                className="px-8 py-3.5 rounded-xl text-white font-semibold text-sm shadow-lg hover:opacity-90 transition-all"
                style={{ backgroundColor: "#002c2f" }}
              >
                Get Started Free
              </Link>
              <Link
                to="/signin"
                className="px-8 py-3.5 rounded-xl font-semibold text-sm border-2 hover:bg-gray-50 transition-all"
                style={{ borderColor: "#002c2f", color: "#002c2f" }}
              >
                Sign In
              </Link>
            </div>
          </div>

          {/* Right — Image */}
          <div className="flex-1 flex justify-center relative">
            <div className="absolute inset-0 rounded-3xl opacity-20 blur-3xl" style={{ backgroundColor: "#1e646e" }} />
            <img
              src={heroimage}
              alt="NotePlus App"
              className="relative z-10 w-full max-w-lg drop-shadow-2xl"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroPage;