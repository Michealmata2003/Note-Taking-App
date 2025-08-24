import React from "react";
import contactImage from '../../../assets/images/contact.png';

const Contact = () => {
  return (
    <section
      id="contact"
      className="px-8 py-16 flex flex-col md:flex-row items-center justify-between"
    >
      <div className="md:w-1/2">
        <img src={contactImage} alt="Contact" className="w-80" />
      </div>
      <div className="md:w-1/2 mt-8 md:mt-0">
        <h3 className="text-2xl font-semibold mb-4">Got any questions?</h3>
        <p className="mb-4">Don’t hesitate to get in touch.</p>
        <p className="mb-2">📍 Address: 1234 Street, City, Country</p>
        <p className="mb-2">📞 Phone: +123 456 789</p>
        <p className="mb-2">📧 Email: info@company.com</p>
      </div>
    </section>
  );
};

export default Contact;
