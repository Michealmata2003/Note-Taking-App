import React from "react";
import contactImage from "../../../assets/images/contact.png";

const Contact = () => {
  return (
    <div>
      <div id="contact" className=" py-8">
        <div className="container">
          <section className=" flex flex-col md:flex-row items-center gap-4 justify-between">
            <div className="md:w-1/2">
              <img src={contactImage} alt="Contact" className="w-[100%]" />
            </div>
            <div className="md:w-1/2 mt-8 md:mt-0 flex flex-col justify-right w-full">
              <h2 className="mb-4 text-pink-500">Contact Us</h2>
              <h3 className="text-[34px] font-bold mb-4">
                Got any questions? Don’t hesitate to get in touch.
              </h3>
              <p className="mb-2">📍 Address: 1234 Street, City, Country</p>
              <p className="mb-2">📞 Phone: +123 456 789</p>
              <p className="mb-2">📧 Email: info@company.com</p>
            </div>
          </section>

          
        </div>
        <section className=" py-16 text-center bg-gradient-to-r from-blue-100 to-pink-100 rounded-2xl mx-4">
            <h3 className="text-2xl font-semibold mb-4">
              We are trusted by over 5000+ clients.
            </h3>
            <p className="mb-6">Join them now and grow your business.</p>
            <button className="px-6 py-3 bg-pink-500 text-white rounded-lg shadow-md hover:bg-pink-600 transition">
              Get Started
            </button>
          </section>
      </div>

    </div>
  );
};

export default Contact;
