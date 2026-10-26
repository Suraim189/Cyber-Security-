"use client";

import React, { useState } from "react";
import { CheckCircle2, AlertCircle, Loader2, Send } from "lucide-react";
import { DataService } from "@/lib/data-service";

export function ContactForm() {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("idle");
    setErrorMessage("");

    if (!formData.full_name || !formData.email || !formData.message) {
      setErrorMessage("Please complete all required fields.");
      setIsSubmitting(false);
      setStatus("error");
      return;
    }

    try {
      const res = await DataService.submitContact(formData);
      if (res.success) {
        setStatus("success");
        setFormData({ full_name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
        setErrorMessage(res.error || "Failed to send message.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Network error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="surface-card p-6 sm:p-10 border-charcoal-200 bg-white">
      <div className="mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-charcoal-900">
          General Inquiries & Correspondence
        </h2>
        <p className="text-xs sm:text-sm text-charcoal-600 mt-1">
          Have an inquiry regarding society workshops, partnerships, or events?
        </p>
      </div>

      {status === "success" ? (
        <div className="p-5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-2">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <h4 className="font-semibold text-sm">Message Sent</h4>
          </div>
          <p className="text-xs text-emerald-800">
            Thank you for contacting NTU Cyber Security Society. An executive officer will review your message.
          </p>
          <button
            onClick={() => setStatus("idle")}
            className="text-xs underline text-emerald-900 font-medium pt-1"
          >
            Send another message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {status === "error" && (
            <div className="p-3 rounded bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-600" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-charcoal-800 mb-1">
              Your Name <span className="text-brand-600">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.full_name}
              onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-charcoal-200 bg-white text-charcoal-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-charcoal-800 mb-1">
              Email Address <span className="text-brand-600">*</span>
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-charcoal-200 bg-white text-charcoal-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-charcoal-800 mb-1">
              Subject
            </label>
            <input
              type="text"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              placeholder="e.g. Workshop Registration Inquiry / Industry Collaboration"
              className="w-full px-3 py-2 rounded-lg border border-charcoal-200 bg-white text-charcoal-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-charcoal-800 mb-1">
              Message <span className="text-brand-600">*</span>
            </label>
            <textarea
              rows={4}
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-charcoal-200 bg-white text-charcoal-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="px-5 py-2.5 rounded-lg bg-charcoal-900 text-white font-medium text-xs hover:bg-brand-700 transition-colors flex items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Sending...</span>
              </>
            ) : (
              <>
                <span>Send Message</span>
                <Send className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
