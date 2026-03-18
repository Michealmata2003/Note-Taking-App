import { FiPlus, FiTrash2 } from "react-icons/fi";

function NoteFormFields({ type, formData, onChange }) {
  const { description, essayContent, todoItems, morningReflection, eveningReflection, gratitude, mood } = formData;

  const updateTodo = (index, value) =>
    onChange("todoItems", todoItems.map((item, i) => (i === index ? { ...item, text: value } : item)));

  const toggleTodo = (index) =>
    onChange("todoItems", todoItems.map((item, i) => (i === index ? { ...item, completed: !item.completed } : item)));

  const removeTodo = (index) => {
    if (todoItems.length === 1) return;
    onChange("todoItems", todoItems.filter((_, i) => i !== index));
  };

  const addTodo = () =>
    onChange("todoItems", [...todoItems, { text: "", completed: false }]);

  if (type === "blank") return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
      <textarea
        value={description}
        onChange={(e) => onChange("description", e.target.value)}
        placeholder="Write your note here..."
        rows={6}
        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-50 transition-all resize-none"
      />
    </div>
  );

  if (type === "essay") return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">Essay Content</label>
      <textarea
        value={essayContent}
        onChange={(e) => onChange("essayContent", e.target.value)}
        placeholder="Write your essay here..."
        rows={12}
        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-50 transition-all resize-none leading-relaxed"
      />
      <p className="text-xs text-gray-400 mt-1">{essayContent.length} characters</p>
    </div>
  );

  if (type === "todo") return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Tasks</label>
      <div className="space-y-2">
        {todoItems.map((item, index) => (
          <div key={index} className="flex items-center gap-3 group">
            <input
              type="checkbox"
              checked={item.completed}
              onChange={() => toggleTodo(index)}
              className="w-4 h-4 rounded accent-teal-600 flex-shrink-0 cursor-pointer"
            />
            <input
              type="text"
              value={item.text}
              onChange={(e) => updateTodo(index, e.target.value)}
              placeholder={`Task ${index + 1}...`}
              className={`flex-1 px-3 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-teal-400 transition-all ${
                item.completed ? "line-through text-gray-400" : ""
              }`}
            />
            <button
              type="button"
              onClick={() => removeTodo(index)}
              className="p-1.5 text-gray-300 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
            >
              <FiTrash2 className="text-sm" />
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={addTodo}
        className="mt-3 flex items-center gap-2 text-sm font-medium transition-colors"
        style={{ color: "#1e646e" }}
      >
        <FiPlus /> Add Task
      </button>
    </div>
  );

  if (type === "daily") return (
    <div className="space-y-4">
      {[
        { label: "🌅 Morning — What do you want to achieve today?", key: "morningReflection", value: morningReflection, placeholder: "Set your intentions for the day...", rows: 3 },
        { label: "🌙 Evening — How did your day go?", key: "eveningReflection", value: eveningReflection, placeholder: "Reflect on your day...", rows: 3 },
        { label: "🙏 Gratitude — What are you grateful for?", key: "gratitude", value: gratitude, placeholder: "List 3 things you are grateful for...", rows: 2 },
      ].map((field) => (
        <div key={field.key}>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">{field.label}</label>
          <textarea
            value={field.value}
            onChange={(e) => onChange(field.key, e.target.value)}
            placeholder={field.placeholder}
            rows={field.rows}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-50 transition-all resize-none"
          />
        </div>
      ))}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">😊 Mood — How are you feeling?</label>
        <div className="flex flex-wrap gap-2">
          {["😄 Great", "🙂 Good", "😐 Okay", "😔 Low", "😰 Stressed", "😴 Tired"].map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => onChange("mood", m)}
              className={`px-3 py-1.5 rounded-full text-sm border transition-all ${
                mood === m
                  ? "border-teal-400 bg-teal-50 text-teal-700 font-medium"
                  : "border-gray-200 text-gray-500 hover:border-gray-300"
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return null;
}

export default NoteFormFields;