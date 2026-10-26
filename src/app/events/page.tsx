import React from "react";
import { DataService } from "@/lib/data-service";
import { EventsListClient } from "@/components/events/EventsListClient";
import { PageHeader } from "@/components/layout/PageHeader";
import { EventGallery } from "@/components/events/EventGallery";

export const metadata = {
  title: "Workshops & CTF Calendar // NTU Cyber Security Society",
  description: "Browse upcoming and past cybersecurity workshops, CTF wargames, guest lectures, and seminars at NTU Faisalabad.",
};

export default async function EventsPage() {
  const events = await DataService.getEvents(true);

  return (
    <div className="bg-cyber-900 text-slate-100 min-h-screen pb-24 selection:bg-cyber-cyan/20 selection:text-cyber-cyan">
      {/* Header */}
      <PageHeader
        badge="// Operations & Engagement Schedule"
        title="Workshops, CTFs & Seminars"
        description="Participate in live hands-on security labs, competitive collegiate hackathons, and technical lectures organized by the NTU Cyber Security Society."
        rightBadgeText="RADAR SWEEP ONLINE"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <EventsListClient initialEvents={events} />
      </div>

      {/* Past Event Photo Gallery */}
      <div className="mt-16 border-t border-cyber-border/80">
        <EventGallery />
      </div>
    </div>
  );
}
