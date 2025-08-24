import React from "react";
import cloud from "../../../assets/svgs/cloud.svg";
import desktop from "../../../assets/svgs/desktop.svg";
import networking from "../../../assets/svgs/networking.svg";
import server from "../../../assets/svgs/server.svg";
import shield from "../../../assets/svgs/shield.svg";
import solution from "../../../assets/svgs/solution.svg";

const services = [
  {
    id: 1,
    img: desktop,
    title: "Software & Integration",
    desc: "Seamless software integration and tailored solutions.",
  },
  {
    id: 2,
    img: shield,
    title: "Network Security",
    desc: "Protect your business with top-notch security solutions.",
  },
  {
    id: 3,
    img: cloud,
    title: "Cloud Services",
    desc: "Scalable cloud infrastructure for modern businesses.",
  },

  {
    id: 4,
    img: networking,
    title: "Wireless Networking",
    desc: "Reliable wireless networking solutions for large scale usage.",
  },
  {
    id: 5,
    img: solution,
    title: "IT Solutions",
    desc: "Comprehensive IT support for businesses of all sizes.",
  },
  {
    id: 1,
    img: server,
    title: "Server Configuration",
    desc: "Efficient server setup and maintenance.",
  },
];

const Services = () => {
  return (
    <section id="services" className="px-8 py-16 text-center">
      <h3 className="text-2xl font-semibold mb-10">
        The service we offer is specifically designed to meet your needs.
      </h3>
      <div className="grid gap-8 md:grid-cols-3">
        {services.map((service, index) => (
          <div
            key={index}
            className="p-6 border rounded-2xl shadow hover:shadow-lg transition"
          >
            <div className="w-12 h-12 mx-auto bg-pink-100 rounded-full mb-4">
              <img src={server.img} alt="" />
            </div>

            <h4 className="font-bold text-lg">{service.title}</h4>
            <p className="text-gray-600 text-sm mt-2">{service.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
