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

      // Build payload based on note type
      const payload = {
        title: formData.title,
        type,
        priority: formData.priority,
        icon: formData.selectedIcon,
        reminderDate: formData.reminderDate || undefined,
      };

      if (type === "blank") {
        payload.content = formData.description;
      } else if (type === "essay") {
        payload.content = formData.essayContent;
      } else if (type === "todo") {
        payload.todoItems = formData.todoItems.filter((i) => i.text.trim());
      } else if (type === "daily") {
        payload.content = [
          formData.morningReflection,
          formData.eveningReflection,
          formData.gratitude,
        ].join("\n\n");
        payload.mood = formData.mood;
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