import React from "react";

const Footer = () => {
  return (
    <footer className="px-8 py-10 bg-gray-100 mt-16">
      <div className="container">
        <div className="grid md:grid-cols-3 gap-6 text-center md:text-left">
          <div>
            <h4 className="font-bold text-lg mb-2">SandNote</h4>
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} SandNote. All rights reserved.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-2">Get in Touch</h4>
            <p className="text-sm text-gray-600">1234 Street, City, Country</p>
            <p className="text-sm text-gray-600">+123 456 789</p>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-2">Newsletter</h4>
            <div className="flex justify-center md:justify-start">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-3 py-2 border rounded-l-lg"
              />
              <button className="px-4 py-2 bg-pink-500 text-white rounded-r-lg hover:bg-pink-600">
                Join
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
