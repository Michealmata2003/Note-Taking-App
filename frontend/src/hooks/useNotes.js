import { useState, useEffect, useCallback } from "react";
import noteService from "../services/noteServices";

function useNotes(filter = "all") {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getParams = useCallback(() => {
    switch (filter) {
      case "pinned":    return { isPinned: true };
      case "favourite": return { isFavourite: true };
      case "shared":    return { shared: true };
      default:          return {};
    }
  }, [filter]);

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

  useEffect(() => { fetchNotes(); }, [fetchNotes]);

  const togglePin = async (id) => {
    try {
      await noteService.togglePin(id);
      setNotes((prev) =>
        prev.map((n) => (n._id === id ? { ...n, isPinned: !n.isPinned } : n))
      );
    } catch (err) { console.error("Toggle pin failed", err); }
  };

  const toggleFavourite = async (id) => {
    try {
      await noteService.toggleFavourite(id);
      setNotes((prev) =>
        prev.map((n) => (n._id === id ? { ...n, isFavourite: !n.isFavourite } : n))
      );
    } catch (err) { console.error("Toggle favourite failed", err); }
  };

  const trashNote = async (id) => {
    try {
      await noteService.trash(id);
      setNotes((prev) => prev.filter((n) => n._id !== id));
    } catch (err) { console.error("Trash note failed", err); }
  };

  return { notes, loading, error, fetchNotes, togglePin, toggleFavourite, trashNote };
}

export default useNotes;