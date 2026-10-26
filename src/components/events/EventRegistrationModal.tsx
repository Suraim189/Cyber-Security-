"use client";

import React, { useState } from "react";
import { X, Calendar, MapPin, User, Mail, Hash, CheckCircle2, Download, AlertCircle, Clock } from "lucide-react";
import { SocietyEvent } from "@/lib/types";
import { generateIcsFile } from "@/lib/calendar";
import { z } from "zod";

const registrationSchema = z.object({
  fullName: z.string().min(3, "Full name must be at least 3 characters"),
  email: z.string().email("Please provide a valid email address"),
  studentId: z.string().min(4, "Please provide your NTU Roll Number / Student ID"),
  department: z.string().min(2, "Department is required"),
  yearOfStudy: z.string().min(1, "Year of study is required"),
});

interface EventRegistrationModalProps {
  event: SocietyEvent | null;
  onClose: () => void;
}

export function EventRegistrationModal({ event, onClose }: EventRegistrationModalProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    studentId: "",
    department: "Computer Science",
    yearOfStudy: "3rd Year",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registeredSuccess, setRegisteredSuccess] = useState(false);
  const [regReference, setRegReference] = useState("");

  if (!event) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = registrationSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0].toString()] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    // Simulate real registration flow and confirmation code generation
    setTimeout(() => {
      const refCode = `NTU-SEC-${Math.floor(100000 + Math.random() * 900000)}`;
      setRegReference(refCode);
      setIsSubmitting(false);
      setRegisteredSuccess(true);
    }, 800);
  };

  const handleDownloadCalendar = () => {
    generateIcsFile({
      title: event.title,
      description: `${event.description}\n\nRegistration Reference: ${regReference}\nOrganized by NTU Cyber Security Society`,
      venue: event.venue,
      startDate: event.event_date,
      durationHours: 3,
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-cyber-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-xl rounded-2xl bg-cyber-900 border border-cyber-cyan/40 p-6 md:p-8 shadow-2xl shadow-cyan-950/50 animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white transition-colors p-1"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!registeredSuccess ? (
          <div>
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-semibold bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan mb-2">
                <span>Direct Event Registration</span>
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                {event.title}
              </h2>
              <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-slate-300 font-mono">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-cyber-cyan" />
                  {new Date(event.event_date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-cyber-cyan" />
                  {event.venue}
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Abdullah Khan"
                    className="w-full bg-cyber-950 border border-cyber-border rounded-lg pl-10 pr-3 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyber-cyan transition-colors"
                  />
                </div>
                {errors.fullName && <p className="text-xs text-amber-400 mt-1">{errors.fullName}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                    Student Email *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="student@ntu.edu.pk"
                      className="w-full bg-cyber-950 border border-cyber-border rounded-lg pl-10 pr-3 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyber-cyan transition-colors"
                    />
                  </div>
                  {errors.email && <p className="text-xs text-amber-400 mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                    NTU Roll Number *
                  </label>
                  <div className="relative">
                    <Hash className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      value={formData.studentId}
                      onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                      placeholder="e.g. 21-NTU-CS-1042"
                      className="w-full bg-cyber-950 border border-cyber-border rounded-lg pl-10 pr-3 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyber-cyan transition-colors"
                    />
                  </div>
                  {errors.studentId && <p className="text-xs text-amber-400 mt-1">{errors.studentId}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                    Department
                  </label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full bg-cyber-950 border border-cyber-border rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-cyber-cyan transition-colors"
                  >
                    <option value="Computer Science">Computer Science</option>
                    <option value="Software Engineering">Software Engineering</option>
                    <option value="Artificial Intelligence">Artificial Intelligence</option>
                    <option value="Information Technology">Information Technology</option>
                    <option value="Other Faculty">Other Faculty</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                    Year of Study
                  </label>
                  <select
                    value={formData.yearOfStudy}
                    onChange={(e) => setFormData({ ...formData, yearOfStudy: e.target.value })}
                    className="w-full bg-cyber-950 border border-cyber-border rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-cyber-cyan transition-colors"
                  >
                    <option value="1st Year">1st Year (Freshman)</option>
                    <option value="2nd Year">2nd Year (Sophomore)</option>
                    <option value="3rd Year">3rd Year (Junior)</option>
                    <option value="4th Year">4th Year (Senior)</option>
                    <option value="Postgraduate">Postgraduate / MS</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t border-cyber-border flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">
                  Admission: <strong className="text-emerald-400">Complimentary for NTU</strong>
                </span>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-cyber-cyan px-6 py-2.5 text-sm font-bold flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Clock className="w-4 h-4 animate-spin" />
                      <span>Confirming Seat...</span>
                    </>
                  ) : (
                    <span>Confirm Registration</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-6 space-y-5">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-2xl font-bold text-white">Registration Confirmed</h3>
              <p className="text-slate-300 text-sm mt-1">
                Your seat has been reserved for <strong className="text-cyber-cyan">{event.title}</strong>.
              </p>
            </div>

            <div className="bg-cyber-950 border border-cyber-border rounded-xl p-4 max-w-sm mx-auto font-mono text-xs text-left space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400">Ticket Ref:</span>
                <span className="text-cyber-cyan font-bold">{regReference}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Attendee:</span>
                <span className="text-white">{formData.fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Student ID:</span>
                <span className="text-white">{formData.studentId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Venue:</span>
                <span className="text-white">{event.venue}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={handleDownloadCalendar}
                className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-cyber-800 border border-cyber-cyan/40 text-cyber-cyan hover:bg-cyber-700 transition-colors font-mono text-xs font-semibold flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Add to Calendar (.ics)</span>
              </button>
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-cyber-cyan text-cyber-950 font-bold hover:bg-cyan-300 transition-colors text-xs font-mono"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
