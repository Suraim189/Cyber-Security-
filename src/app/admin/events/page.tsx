"use client";

import React, { useState, useEffect } from "react";
import { Plus, Trash2, Edit2, Search, Calendar, X, Loader2 } from "lucide-react";
import { DataService } from "@/lib/data-service";
import { SocietyEvent, EventCategory } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export default function AdminEventsPage() {
  const [events, setEvents] = useState<SocietyEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Partial<SocietyEvent> | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    setIsLoading(true);
    const data = await DataService.getEvents(false);
    setEvents(data);
    setIsLoading(false);
  };

  const handleOpenAdd = () => {
    setEditingEvent({
      title: "",
      slug: "",
      category: "Workshop",
      event_date: new Date().toISOString().slice(0, 16),
      venue: "Main Campus CS Lab, NTU",
      description: "",
      registration_link: "",
      is_published: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (e: SocietyEvent) => {
    setEditingEvent({ ...e });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string, title: string) => {
    if (confirm(`Delete event "${title}"?`)) {
      await DataService.deleteEvent(id);
      loadEvents();
    }
  };

  const handleTogglePublish = async (e: SocietyEvent) => {
    await DataService.saveEvent({ ...e, is_published: !e.is_published });
    loadEvents();
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEvent || !editingEvent.title) return;

    setIsSaving(true);
    const slug = editingEvent.slug || editingEvent.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    await DataService.saveEvent({ ...editingEvent, slug });
    setIsSaving(false);
    setIsModalOpen(false);
    loadEvents();
  };

  const filteredEvents = events.filter(
    (e) =>
      e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.category.toLowerCase().includes(search.toLowerCase()) ||
      e.venue.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-charcoal-900">Events & Workshops Management</h1>
          <p className="text-xs text-charcoal-500 mt-1">
            Schedule workshops, seminars, and CTF competitions.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-lg bg-brand-700 text-white text-xs font-semibold hover:bg-brand-800 transition-colors flex items-center gap-1.5 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Schedule New Event</span>
        </button>
      </div>

      <div className="surface-card p-4 border-charcoal-200 bg-white flex items-center gap-3">
        <Search className="w-4 h-4 text-charcoal-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by title, category, or venue..."
          className="w-full text-xs text-charcoal-900 focus:outline-none"
        />
      </div>

      <div className="surface-card border-charcoal-200 bg-white overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center text-xs text-charcoal-500 flex items-center justify-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin text-brand-700" />
            <span>Loading events...</span>
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="p-12 text-center text-xs text-charcoal-500">
            No events found matching your search.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-charcoal-700">
              <thead className="bg-surface-muted border-b border-surface-border text-charcoal-500 font-mono uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3 px-4">Title</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Event Date</th>
                  <th className="py-3 px-4">Venue</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-charcoal-100">
                {filteredEvents.map((evt) => (
                  <tr key={evt.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-charcoal-900">
                      {evt.title}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded bg-brand-50 text-brand-700 border border-brand-200 font-medium">
                        {evt.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-charcoal-600">
                      {formatDate(evt.event_date)}
                    </td>
                    <td className="py-3.5 px-4 text-charcoal-500">{evt.venue}</td>
                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => handleTogglePublish(evt)}
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium ${
                          evt.is_published
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-charcoal-100 text-charcoal-500 border border-charcoal-200"
                        }`}
                      >
                        {evt.is_published ? "Published" : "Draft"}
                      </button>
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-2">
                      <button
                        onClick={() => handleOpenEdit(evt)}
                        className="p-1.5 text-charcoal-600 hover:text-brand-700 hover:bg-brand-50 rounded"
                        title="Edit Event"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(evt.id, evt.title)}
                        className="p-1.5 text-charcoal-400 hover:text-red-600 hover:bg-red-50 rounded"
                        title="Delete Event"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {isModalOpen && editingEvent && (
        <div className="fixed inset-0 z-50 bg-charcoal-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="surface-card bg-white max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-charcoal-100">
              <h2 className="text-base font-bold text-charcoal-900">
                {editingEvent.id ? "Edit Event" : "Schedule New Event"}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-charcoal-400 hover:text-charcoal-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-charcoal-800 mb-1">Event Title</label>
                <input
                  type="text"
                  required
                  value={editingEvent.title || ""}
                  onChange={(e) => setEditingEvent({ ...editingEvent, title: e.target.value })}
                  className="w-full px-3 py-2 rounded border border-charcoal-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-charcoal-800 mb-1">Category</label>
                  <select
                    value={editingEvent.category || "Workshop"}
                    onChange={(e) => setEditingEvent({ ...editingEvent, category: e.target.value as EventCategory })}
                    className="w-full px-3 py-2 rounded border border-charcoal-200"
                  >
                    <option value="Workshop">Workshop</option>
                    <option value="CTF">CTF</option>
                    <option value="Seminar">Seminar</option>
                    <option value="Hackathon">Hackathon</option>
                    <option value="Guest Lecture">Guest Lecture</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-charcoal-800 mb-1">Date & Time</label>
                  <input
                    type="datetime-local"
                    required
                    value={editingEvent.event_date ? editingEvent.event_date.slice(0, 16) : ""}
                    onChange={(e) => setEditingEvent({ ...editingEvent, event_date: e.target.value })}
                    className="w-full px-3 py-2 rounded border border-charcoal-200"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-charcoal-800 mb-1">Venue / Location</label>
                <input
                  type="text"
                  required
                  value={editingEvent.venue || ""}
                  onChange={(e) => setEditingEvent({ ...editingEvent, venue: e.target.value })}
                  className="w-full px-3 py-2 rounded border border-charcoal-200"
                />
              </div>

              <div>
                <label className="block font-semibold text-charcoal-800 mb-1">Description</label>
                <textarea
                  rows={3}
                  required
                  value={editingEvent.description || ""}
                  onChange={(e) => setEditingEvent({ ...editingEvent, description: e.target.value })}
                  className="w-full px-3 py-2 rounded border border-charcoal-200"
                />
              </div>

              <div>
                <label className="block font-semibold text-charcoal-800 mb-1">Registration Link (URL)</label>
                <input
                  type="url"
                  value={editingEvent.registration_link || ""}
                  onChange={(e) => setEditingEvent({ ...editingEvent, registration_link: e.target.value })}
                  placeholder="https://forms.gle/..."
                  className="w-full px-3 py-2 rounded border border-charcoal-200"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="evt_pub_check"
                  checked={editingEvent.is_published ?? true}
                  onChange={(e) => setEditingEvent({ ...editingEvent, is_published: e.target.checked })}
                  className="rounded border-charcoal-300 text-brand-600 focus:ring-brand-500"
                />
                <label htmlFor="evt_pub_check" className="font-medium text-charcoal-800">
                  Visible on public events calendar
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-charcoal-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded border border-charcoal-300 text-charcoal-700 hover:bg-charcoal-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-4 py-2 rounded bg-brand-700 text-white font-medium hover:bg-brand-800 disabled:opacity-60 flex items-center gap-1.5"
                >
                  {isSaving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>Save Event</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
