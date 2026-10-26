import React from "react";
import Link from "next/link";
import { Calendar, MapPin, ExternalLink, Clock, Tag, ArrowRight } from "lucide-react";
import { DataService } from "@/lib/data-service";
import { formatDate, formatDateTime } from "@/lib/utils";

export const metadata = {
  title: "Events & Workshops",
  description: "Browse upcoming and past cybersecurity workshops, CTFs, guest lectures, and seminars at NTU Faisalabad.",
};

export default async function EventsPage() {
  const events = await DataService.getEvents(true);

  const now = new Date();
  const upcomingEvents = events.filter((e) => new Date(e.event_date) >= now);
  const pastEvents = events.filter((e) => new Date(e.event_date) < now);

  return (
    <div className="bg-background min-h-screen pb-24">
      {/* Header */}
      <section className="bg-white border-b border-surface-border py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-mono font-medium text-brand-700 uppercase tracking-wider">
              Calendar & Engagements
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-charcoal-900 tracking-tight">
              Workshops, CTFs & Seminars
            </h1>
            <p className="text-base sm:text-lg text-charcoal-600 leading-relaxed">
              Participate in live hands-on security labs, competitive hackathons, and technical lectures 
              organized by the NTU Cyber Security Society.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-16">
        
        {/* Section 1: Upcoming Events */}
        <div>
          <div className="flex items-center justify-between mb-8 pb-3 border-b border-charcoal-200">
            <div>
              <h2 className="text-2xl font-bold text-charcoal-900">Upcoming Events</h2>
              <p className="text-xs text-charcoal-500 mt-1">Open for registration and participation</p>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-brand-50 text-brand-700 border border-brand-200">
              {upcomingEvents.length} Scheduled
            </span>
          </div>

          {upcomingEvents.length === 0 ? (
            <div className="surface-card p-12 text-center border-dashed border-charcoal-300">
              <Calendar className="w-12 h-12 text-charcoal-400 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-charcoal-900">No Upcoming Events Right Now</h3>
              <p className="text-sm text-charcoal-600 max-w-md mx-auto mt-1 mb-6">
                Our team is currently planning the upcoming semester workshop schedule. 
                Check back shortly or register your interest.
              </p>
              <Link
                href="/contact#join"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-brand-700 text-white text-sm font-medium hover:bg-brand-800 transition-colors"
              >
                <span>Notify Me for Next Workshop</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {upcomingEvents.map((evt) => (
                <div key={evt.id} className="surface-card p-7 surface-card-hover flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-brand-50 text-brand-700 border border-brand-200">
                        {evt.category}
                      </span>
                      <div className="flex items-center gap-1.5 text-xs font-mono text-charcoal-500">
                        <Clock className="w-3.5 h-3.5 text-brand-600" />
                        <span>{formatDateTime(evt.event_date)}</span>
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold text-charcoal-900 leading-snug">
                      {evt.title}
                    </h3>

                    <p className="text-sm text-charcoal-600 leading-relaxed">
                      {evt.description}
                    </p>

                    <div className="space-y-2 pt-2 text-xs text-charcoal-600">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-charcoal-400 flex-shrink-0" />
                        <span>{evt.venue}</span>
                      </div>
                      {evt.registration_deadline && (
                        <div className="flex items-center gap-2 text-amber-700">
                          <Tag className="w-4 h-4 flex-shrink-0" />
                          <span>Deadline: {formatDate(evt.registration_deadline)}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-charcoal-100 mt-6 flex items-center justify-between">
                    <span className="text-xs text-charcoal-500">Free for NTU Students</span>
                    {evt.registration_link ? (
                      <Link
                        href={evt.registration_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-brand-700 text-white text-xs font-medium hover:bg-brand-800 transition-colors shadow-sm"
                      >
                        <span>Register Now</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                    ) : (
                      <span className="text-xs text-charcoal-500 italic">Walk-ins Welcome</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Section 2: Past Events & Archival Recaps */}
        {pastEvents.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-8 pb-3 border-b border-charcoal-200">
              <div>
                <h2 className="text-2xl font-bold text-charcoal-900">Past Events & Sessions</h2>
                <p className="text-xs text-charcoal-500 mt-1">Archive of completed society activities</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pastEvents.map((evt) => (
                <div key={evt.id} className="surface-card p-6 bg-surface-muted/50 border-charcoal-200 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs text-charcoal-500">
                      <span className="font-medium text-charcoal-700">{evt.category}</span>
                      <span>{formatDate(evt.event_date)}</span>
                    </div>
                    <h3 className="text-lg font-bold text-charcoal-900">{evt.title}</h3>
                    <p className="text-xs text-charcoal-600 line-clamp-3 leading-relaxed">
                      {evt.description}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-charcoal-100 mt-4 text-xs text-charcoal-500 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    <span className="truncate">{evt.venue}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
