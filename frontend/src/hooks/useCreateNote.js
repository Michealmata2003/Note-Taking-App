import { useState } from "react";
import { useNavigate } from "react-router-dom";
import noteService from "../services/noteServices";

function useCreateNote() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createNote = async (type, formData) => {
    try {
      setLoading(true);
      setError(null);

      const payload = {
        title:    formData.title,
        type,
        priority: formData.priority,
        icon:     formData.selectedIcon,
        reminderAt: formData.reminderDate || undefined,
      };

      if (type === "blank") {
        payload.content = formData.description;
      } else if (type === "essay") {
        payload.content = formData.essayContent;
      } else if (type === "todo") {
        payload.todoItems = formData.todoItems.filter((i) => i.text.trim());
      } else if (type === "daily") {
        payload.content = [
          `🌅 Morning:\n${formData.morningReflection}`,
          `🌙 Evening:\n${formData.eveningReflection}`,
          `🙏 Gratitude:\n${formData.gratitude}`,
          `😊 Mood: ${formData.mood}`,
        ].join("\n\n");
      }

      await noteService.create(payload);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create note");
    } finally {
      setLoading(false);
    }
  };

  return { createNote, loading, error };
}

export default useCreateNote;