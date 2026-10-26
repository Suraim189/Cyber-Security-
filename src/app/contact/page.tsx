import React from "react";
import { MapPin, Mail, Clock, ShieldCheck, Terminal, Activity } from "lucide-react";
import { MembershipForm } from "@/components/forms/MembershipForm";
import { ContactForm } from "@/components/forms/ContactForm";
import { PageHeader } from "@/components/layout/PageHeader";

export const metadata = {
  title: "Contact & Membership Application // NTU Cyber Security Society",
  description: "Join NTU Cyber Security Society or submit an inquiry to the executive council at National Textile University.",
};

export default function ContactPage() {
  return (
    <div className="bg-cyber-900 text-slate-100 min-h-screen pb-24 selection:bg-cyber-cyan/20 selection:text-cyber-cyan">
      {/* Header */}
      <PageHeader
        badge="// Enlistment & Direct Dispatch"
        title="Connect With NTU CSS"
        description="Submit your student membership application or get in touch with our executive council for partnerships, workshops, and event registrations."
        rightBadgeText="COMMUNICATIONS ONLINE"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Column: Membership Form */}
          <div className="lg:col-span-7">
            <MembershipForm />
          </div>

          {/* Right Column: General Contact & Location Information */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Campus Contact Details */}
            <div className="cyber-card p-6 sm:p-8 border-cyber-border bg-cyber-850">
              <div className="flex items-center gap-2 text-xs font-mono text-cyber-cyan mb-2">
                <Terminal className="w-4 h-4" />
                <span>COMMAND STATION</span>
              </div>
              <h3 className="text-lg font-bold text-white font-mono mb-4">
                Society Headquarters
              </h3>

              <div className="space-y-4 text-xs sm:text-sm text-slate-400">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-cyber-cyan flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-mono text-xs mb-0.5">Campus Laboratory</strong>
                    <span>Department of Computer Science, National Textile University, Sheikhupura Road, Faisalabad, 37610, Pakistan</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-cyber-cyan flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-mono text-xs mb-0.5">Official Dispatch</strong>
                    <span className="font-mono text-cyber-cyan">cybersecurity@ntu.edu.pk</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-cyber-cyan flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-mono text-xs mb-0.5">Lab &amp; Meeting Hours</strong>
                    <span>Monday – Friday, 02:00 PM – 05:00 PM (CS Lab 3)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* General Contact Form */}
            <ContactForm />

          </div>
        </div>
      </div>
    </div>
  );
}
