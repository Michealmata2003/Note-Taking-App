function ReminderPicker({ value, onChange }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
      <h3 className="text-sm font-semibold text-gray-700 mb-3">📅 Reminder Date</h3>
      <input
        type="datetime-local"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-50 transition-all"
      />
    </div>
  );
}

export default ReminderPicker;