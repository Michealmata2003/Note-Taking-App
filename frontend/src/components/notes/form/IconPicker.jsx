import { useState } from "react";
import { BsEmojiSmile } from "react-icons/bs";

const iconOptions = ["📝", "📌", "⭐", "🔥", "💡", "🎯", "📅", "🏆", "💼", "🎓", "❤️", "🚀"];

function IconPicker({ value, onChange }) {
  const [showPicker, setShowPicker] = useState(false);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
      <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
        <BsEmojiSmile /> Icon
      </h3>
      <button
        type="button"
        onClick={() => setShowPicker(!showPicker)}
        className="flex items-center gap-3 w-full px-3 py-2.5 border border-gray-200 rounded-xl hover:border-teal-300 transition-colors"
      >
        <span className="text-2xl">{value}</span>
        <span className="text-sm text-gray-500">Click to change</span>
      </button>

      {showPicker && (
        <div className="mt-3 grid grid-cols-6 gap-2">
          {iconOptions.map((icon) => (
            <button
              key={icon}
              type="button"
              onClick={() => { onChange(icon); setShowPicker(false); }}
              className={`text-xl p-2 rounded-lg hover:bg-gray-100 transition-colors ${
                value === icon ? "bg-teal-50 ring-2 ring-teal-300" : ""
              }`}
            >
              {icon}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default IconPicker;