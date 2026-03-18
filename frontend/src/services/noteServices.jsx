import api from "../utils/api";

const noteService = {
  getAll: (params = {}) => api.get("/notes", { params }),

  // Get single note
  getOne: (id) => api.get(`/notes/${id}`),

  // Create note
  create: (data) => api.post("/notes", data),

  // Update note
  update: (id, data) => api.put(`/notes/${id}`, data),

  // Soft delete (move to bin)
  trash: (id) => api.delete(`/notes/${id}`),

  // Restore from bin
  restore: (id) => api.put(`/notes/${id}/restore`),

  // Permanent delete
  deletePermanent: (id) => api.delete(`/notes/${id}/permanent`),

  // Get bin
  getBin: () => api.get("/notes/bin"),

  // Get reminders
  getReminders: () => api.get("/notes/reminders"),

  // Toggle pin
  togglePin: (id) => api.put(`/notes/${id}/pin`),

  // Toggle favourite
  toggleFavourite: (id) => api.put(`/notes/${id}/favourite`),
};

export default noteService;