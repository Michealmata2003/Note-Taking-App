import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiRotateCcw, FiSave } from "react-icons/fi";
import NoteFormFields from "./form/NoteFormField";
import ReminderPicker from "./form/ReminderPicker";
import IconPicker from "./form/IconPicker";
import PriorityPicker from "./form/PriorityPicker";
import useEditNote from "../../hooks/useEditNote";

const noteTypeConfig = {
  blank: { label: "Blank Note",       color: "#002c2f" },
  todo:  { label: "To-do Note",       color: "#1e646e" },
  essay: { label: "Essay Note",       color: "#6366f1" },
  daily: { label: "Daily Reflection", color: "#f59e0b" },
};

function EditNoteForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { note, loading, saving, error, updateNote } = useEditNote(id);
  const [form, setForm] = useState(null);

  // Populate form when note loads
  useEffect(() => {
    if (!note) return;
    setForm({
      title:             note.title || "",
      description:       note.type === "blank" ? note.content || "" : "",
      essayContent:      note.type === "essay" ? note.content || "" : "",
      reminderDate:      note.reminderAt ? note.reminderAt.slice(0, 16) : "",
      priority:          note.priority || "Default",
      selectedIcon:      note.icon || "📝",
      todoItems:         note.todoItems?.length > 0 ? note.todoItems : [{ text: "", completed: false }],
      morningReflection: "",
      eveningReflection: "",
      gratitude:         "",
      mood:              "",
    });
  }, [note]);

  const handleChange = (key, value) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSave = async (e) => {
    e.preventDefault();
    await updateNote(form);
  };

  if (loading) return (
    <main className="p-6 flex-1">
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-gray-200 rounded w-48" />
        <div className="h-64 bg-gray-200 rounded-2xl" />
      </div>
    </main>
  );

  if (!form) return null;

  const config = noteTypeConfig[note?.type] || noteTypeConfig.blank;

  return (
    <main className="p-4 lg:p-6 flex-1">

      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-lg hover:bg-gray-200 text-gray-500 hover:text-gray-800 transition-colors"
          >
            <FiArrowLeft className="text-lg" />
          </button>
          <div>
            <h1 className="text-lg font-bold text-gray-800">Edit Note</h1>
            <p className="text-xs text-gray-400">{config.label}</p>
          </div>
        </div>
        <span
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-white"
          style={{ backgroundColor: config.color }}
        >
          {form.selectedIcon} {config.label}
        </span>
      </div>

      {error && (
        <div className="mb-4 px-4 py-3 bg-red-50 border border-red-100 rounded-xl">
          <p className="text-red-500 text-sm">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* Main Form */}
        <div className="xl:col-span-2">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <form onSubmit={handleSave} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Title</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-50 transition-all"
                />
              </div>

              <NoteFormFields type={note?.type} formData={form} onChange={handleChange} />

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  <FiArrowLeft className="text-sm" /> Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-white text-sm font-medium transition-colors shadow-sm disabled:opacity-60"
                  style={{ backgroundColor: "#002c2f" }}
                >
                  {saving ? (
                    <>
                      <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      Saving...
                    </>
                  ) : (
                    <><FiSave className="text-sm" /> Save Changes</>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="xl:col-span-1 space-y-4">
          <ReminderPicker value={form.reminderDate} onChange={(v) => handleChange("reminderDate", v)} />
          <IconPicker value={form.selectedIcon} onChange={(v) => handleChange("selectedIcon", v)} />
          <PriorityPicker value={form.priority} onChange={(v) => handleChange("priority", v)} />
        </div>

      </div>
    </main>
  );
}

export default EditNoteForm;