import React from "react";

const Stats = () => {
  return (
    <section
      id="stats"
      className="px-8 py-16 bg-gradient-to-r from-blue-100 to-pink-100 text-center rounded-2xl mx-4"
    >
      <h3 className="text-2xl font-semibold mb-6">We are proud of our works</h3>
      <div className="grid md:grid-cols-3 gap-6 text-lg font-semibold">
        <div>
          1,000+
          <p className="text-sm text-gray-600">Completed Projects</p>
        </div>
        <div>
          4x
          <p className="text-sm text-gray-600">Revenue Growth</p>
        </div>
        <div>
          100%
          <p className="text-sm text-gray-600">Customer Satisfaction</p>
        </div>
      </div>
    </section>
  );
};

export default Stats;
