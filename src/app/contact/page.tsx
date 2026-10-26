import React from "react";
import { MapPin, Mail, Clock, ShieldCheck } from "lucide-react";
import { MembershipForm } from "@/components/forms/MembershipForm";
import { ContactForm } from "@/components/forms/ContactForm";

export const metadata = {
  title: "Contact & Membership Application",
  description: "Join NTU Cyber Security Society or submit an inquiry to the executive team at National Textile University.",
};

export default function ContactPage() {
  return (
    <div className="bg-background min-h-screen pb-24">
      {/* Header */}
      <section className="bg-white border-b border-surface-border py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-mono font-medium text-brand-700 uppercase tracking-wider">
              Engagement & Admissions
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-charcoal-900 tracking-tight">
              Connect With NTU CSS
            </h1>
            <p className="text-base sm:text-lg text-charcoal-600 leading-relaxed">
              Submit your student membership application or get in touch with our executive council 
              for partnerships, workshops, and event registrations.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Column: Membership Form */}
          <div className="lg:col-span-7">
            <MembershipForm />
          </div>

          {/* Right Column: General Contact & Location Information */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Campus Contact Details */}
            <div className="surface-card p-6 sm:p-8 border-charcoal-200 bg-white">
              <h3 className="text-lg font-bold text-charcoal-900 mb-4">
                Society Headquarters
              </h3>

              <div className="space-y-4 text-xs sm:text-sm text-charcoal-600">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-brand-700 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-charcoal-900 block font-medium">Campus Address</strong>
                    <span>Department of Computer Science, National Textile University, Sheikhupura Road, Faisalabad, 37610, Pakistan</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-brand-700 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-charcoal-900 block font-medium">Official Email</strong>
                    <span>cybersecurity@ntu.edu.pk</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-brand-700 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-charcoal-900 block font-medium">Lab & Meeting Hours</strong>
                    <span>Monday – Friday, 02:00 PM – 05:00 PM (CS Labs)</span>
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
