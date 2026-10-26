"use client";

import React, { useState } from "react";
import { Calendar, MapPin, Clock, Tag, ExternalLink, Trophy, Shield, Download } from "lucide-react";
import { SocietyEvent, EventCategory } from "@/lib/types";
import { formatDate, formatDateTime } from "@/lib/utils";
import { EventRegistrationModal } from "@/components/events/EventRegistrationModal";
import { generateIcsFile } from "@/lib/calendar";

interface EventsListClientProps {
  initialEvents: SocietyEvent[];
}

export function EventsListClient({ initialEvents }: EventsListClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeModalEvent, setActiveModalEvent] = useState<SocietyEvent | null>(null);

  const now = new Date();
  const upcomingEvents = initialEvents.filter((e) => new Date(e.event_date) >= now);
  const pastEvents = initialEvents.filter((e) => new Date(e.event_date) < now);

  const categories = ["All", "Workshop", "CTF", "Seminar"];

  const filteredUpcoming = selectedCategory === "All"
    ? upcomingEvents
    : upcomingEvents.filter((e) => e.category === selectedCategory);

  const getDaysRemaining = (dateStr: string) => {
    const diff = new Date(dateStr).getTime() - Date.now();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    if (days <= 0) return "Today / Tomorrow";
    return `In ${days} days`;
  };

  return (
    <>
      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-2 mb-8 font-mono text-xs">
        <span className="text-slate-400 mr-2 uppercase tracking-wider">Filter By:</span>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-lg border transition-all ${
              selectedCategory === cat
                ? "bg-cyber-cyan/15 text-cyber-cyan border-cyber-cyan shadow-sm shadow-cyan-950"
                : "bg-cyber-950/60 text-slate-400 border-cyber-border hover:border-slate-600 hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Section 1: Upcoming Events */}
      <div className="space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-cyber-border font-mono">
          <div>
            <h2 className="text-2xl font-bold text-white">Upcoming Operations</h2>
            <p className="text-xs text-slate-400 mt-1">Open for student registration and participation</p>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-cyber-950 text-cyber-cyan border border-cyber-cyan/40">
            {filteredUpcoming.length} ACTIVE
          </span>
        </div>

        {filteredUpcoming.length === 0 ? (
          <div className="cyber-card p-12 text-center border-dashed border-cyber-border">
            <Calendar className="w-12 h-12 text-slate-500 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white font-mono">No Scheduled Drills in this Category</h3>
            <p className="text-sm text-slate-400 max-w-md mx-auto mt-1 mb-4">
              Try selecting another category or check back as new operational workshops are published.
            </p>
            <button
              onClick={() => setSelectedCategory("All")}
              className="btn-cyber-cyan text-xs font-bold py-2 px-4"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUpcoming.map((evt) => (
              <div
                key={evt.id}
                className="cyber-card p-6 flex flex-col justify-between border-cyber-border/80 hover:border-cyber-cyan/50 hover:shadow-card-hover transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4 font-mono text-xs">
                    <span className="px-2.5 py-1 rounded text-[11px] font-semibold bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan">
                      {evt.category}
                    </span>
                    <span className="text-emerald-400 font-medium flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {getDaysRemaining(evt.event_date)}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-cyber-cyan transition-colors line-clamp-2 mb-3">
                    {evt.title}
                  </h3>

                  <p className="text-slate-300 text-sm leading-relaxed line-clamp-3 mb-6">
                    {evt.description}
                  </p>

                  <div className="space-y-2.5 text-xs text-slate-300 font-mono border-t border-cyber-border/60 pt-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-cyber-cyan flex-shrink-0" />
                      <span>{formatDateTime(evt.event_date)}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-cyber-cyan flex-shrink-0" />
                      <span className="truncate">{evt.venue}</span>
                    </div>

                    {evt.registration_deadline && (
                      <div className="flex items-center gap-2 text-amber-400">
                        <Tag className="w-4 h-4 flex-shrink-0" />
                        <span>Deadline: {formatDate(evt.registration_deadline)}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-6 border-t border-cyber-border mt-6 flex items-center justify-between text-xs font-mono">
                  <button
                    onClick={() =>
                      generateIcsFile({
                        title: evt.title,
                        description: evt.description,
                        venue: evt.venue,
                        startDate: evt.event_date,
                      })
                    }
                    className="text-slate-400 hover:text-cyber-cyan transition-colors flex items-center gap-1.5"
                    title="Add to Calendar (.ics)"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>.ics</span>
                  </button>

                  <button
                    onClick={() => setActiveModalEvent(evt)}
                    className="btn-cyber-cyan text-xs font-bold py-2 px-4 flex items-center gap-1.5"
                  >
                    <span>Register Now</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Section 2: Completed Archive */}
      {pastEvents.length > 0 && (
        <div className="mt-16 pt-8 border-t border-cyber-border/60">
          <div className="flex items-center justify-between mb-8 pb-3 border-b border-cyber-border font-mono">
            <div>
              <h2 className="text-2xl font-bold text-white">Completed Operations</h2>
              <p className="text-xs text-slate-400 mt-1">Archive of completed society activities</p>
            </div>
            <span className="text-xs font-mono text-slate-500">
              {pastEvents.length} ARCHIVED
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastEvents.map((evt) => (
              <div
                key={evt.id}
                className="bg-cyber-950/60 border border-cyber-border rounded-xl p-5 flex flex-col justify-between opacity-80 hover:opacity-100 transition-opacity"
              >
                <div>
                  <div className="flex items-center justify-between mb-3 text-xs font-mono">
                    <span className="px-2 py-0.5 rounded text-[10px] bg-cyber-800 text-slate-400 border border-cyber-border">
                      {evt.category}
                    </span>
                    <span className="text-slate-500">{formatDate(evt.event_date)}</span>
                  </div>

                  <h3 className="text-base font-bold text-slate-200 mb-2">
                    {evt.title}
                  </h3>
                  <p className="text-slate-400 text-xs line-clamp-2">
                    {evt.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-cyber-border flex items-center justify-between text-xs font-mono text-slate-500">
                  <span>{evt.venue}</span>
                  <span className="text-slate-500 flex items-center gap-1">
                    <Shield className="w-3.5 h-3.5 text-cyber-cyan" />
                    Archived
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Event Registration Modal */}
      <EventRegistrationModal
        event={activeModalEvent}
        onClose={() => setActiveModalEvent(null)}
      />
    </>
  );
}
