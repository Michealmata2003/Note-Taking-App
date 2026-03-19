import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import noteService from "../services/noteServices";

function useEditNote(id) {
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  // Fetch existing note
  useEffect(() => {
    if (!id) return;
    const fetchNote = async () => {
      try {
        setLoading(true);
        const res = await noteService.getOne(id);
        setNote(res.data.data || res.data.note);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch note");
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [id]);

  const updateNote = async (formData) => {
    try {
      setSaving(true);
      setError(null);

      const payload = {
        title:      formData.title,
        priority:   formData.priority,
        icon:       formData.selectedIcon,
        reminderAt: formData.reminderDate || undefined,
      };

      if (note?.type === "blank") {
        payload.content = formData.description;
      } else if (note?.type === "essay") {
        payload.content = formData.essayContent;
      } else if (note?.type === "todo") {
        payload.todoItems = formData.todoItems.filter((i) => i.text.trim());
      } else if (note?.type === "daily") {
        payload.content = [
          `🌅 Morning:\n${formData.morningReflection}`,
          `🌙 Evening:\n${formData.eveningReflection}`,
          `🙏 Gratitude:\n${formData.gratitude}`,
          `😊 Mood: ${formData.mood}`,
        ].join("\n\n");
      }

      await noteService.update(note._id, payload);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update note");
    } finally {
      setSaving(false);
    }
  };

  return { note, loading, saving, error, updateNote };
}

export default useEditNote;