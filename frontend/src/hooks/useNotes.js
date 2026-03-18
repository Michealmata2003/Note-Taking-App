import { useState, useEffect, useCallback } from "react";
import noteService from "../services/noteServices";

function useNotes(filter = "all") {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Build query params based on active filter
  const getParams = useCallback(() => {
    switch (filter) {
      case "pinned":    return { pinned: true };
      case "favourite": return { favourite: true };
      case "shared":    return { shared: true };
      default:          return {};
    }
  }, [filter]);

  // Fetch notes
  const fetchNotes = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await noteService.getAll(getParams());
      setNotes(res.data.data || res.data.notes || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch notes");
    } finally {
      setLoading(false);
    }
  }, [getParams]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  // Toggle pin
  const togglePin = async (id) => {
    try {
      await noteService.togglePin(id);
      setNotes((prev) =>
        prev.map((n) => (n._id === id ? { ...n, pinned: !n.pinned } : n))
      );
    } catch (err) {
      console.error("Toggle pin failed", err);
    }
  };

  // Toggle favourite
  const toggleFavourite = async (id) => {
    try {
      await noteService.toggleFavourite(id);
      setNotes((prev) =>
        prev.map((n) => (n._id === id ? { ...n, favourite: !n.favourite } : n))
      );
    } catch (err) {
      console.error("Toggle favourite failed", err);
    }
  };

  // Trash note
  const trashNote = async (id) => {
    try {
      await noteService.trash(id);
      setNotes((prev) => prev.filter((n) => n._id !== id));
    } catch (err) {
      console.error("Trash note failed", err);
    }
  };

  return {
    notes,
    loading,
    error,
    fetchNotes,
    togglePin,
    toggleFavourite,
    trashNote,
  };
}

export default useNotes;