const priorityOptions = ["Default", "Very Low", "Low", "Medium", "High", "Very High"];

const priorityColors = {
  Default:    "bg-gray-100 text-gray-600",
  "Very Low": "bg-blue-50 text-blue-500",
  Low:        "bg-teal-50 text-teal-600",
  Medium:     "bg-yellow-50 text-yellow-600",
  High:       "bg-orange-50 text-orange-600",
  "Very High":"bg-red-50 text-red-500",
};

function PriorityPicker({ value, onChange }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
      <h3 className="text-sm font-semibold text-gray-700 mb-3">🎯 Priority</h3>
      <div className="space-y-2">
        {priorityOptions.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => onChange(p)}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg border text-sm transition-all ${
              value === p
                ? "border-teal-300 " + priorityColors[p]
                : "border-gray-100 text-gray-500 hover:border-gray-200 hover:bg-gray-50"
            }`}
          >
            <span>{p}</span>
            {value === p && (
              <svg className="w-4 h-4 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

export default PriorityPicker;