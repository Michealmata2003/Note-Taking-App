import api from "../utils/api";

const noteService = {
  getAll:          (params = {}) => api.get("/notes", { params }),
  getOne:          (id)          => api.get(`/notes/${id}`),
  create:          (data)        => api.post("/notes", data),
  update:          (id, data)    => api.put(`/notes/${id}`, data),
  trash:           (id)          => api.delete(`/notes/${id}`),
  restore:         (id)          => api.put(`/notes/${id}/restore`),
  deletePermanent: (id)          => api.delete(`/notes/${id}/permanent`),
  getBin:          ()            => api.get("/notes/bin"),
  getReminders:    ()            => api.get("/notes/reminders"),
  togglePin:       (id)          => api.put(`/notes/${id}/pin`),
  toggleFavourite: (id)          => api.put(`/notes/${id}/favourite`),
};

export default noteService;