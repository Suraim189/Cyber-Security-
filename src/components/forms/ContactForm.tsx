"use client";

import React, { useState } from "react";
import { CheckCircle2, AlertCircle, Loader2, Send, Mail } from "lucide-react";
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
    <div className="cyber-card p-6 sm:p-8 border-cyber-border bg-cyber-850 shadow-xl">
      <div className="mb-6">
        <div className="flex items-center gap-2 text-xs font-mono text-cyber-cyan mb-1">
          <Mail className="w-4 h-4" />
          <span>DIRECT CORRESPONDENCE</span>
        </div>
        <h3 className="text-xl font-bold text-white font-mono">
          General Inquiries
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Have an inquiry regarding workshops, partnerships, or academic events?
        </p>
      </div>

      {status === "success" ? (
        <div className="p-5 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 space-y-2 font-mono">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <h4 className="font-semibold text-sm text-white">Message Transmitted</h4>
          </div>
          <p className="text-xs text-slate-300">
            Thank you for contacting NTU Cyber Security Society. An executive officer will review your dispatch.
          </p>
          <button
            onClick={() => setStatus("idle")}
            className="text-xs underline text-cyber-cyan font-medium pt-1"
          >
            Send another message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
          {status === "error" && (
            <div className="p-3 rounded bg-rose-950/60 border border-rose-500/40 text-rose-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div>
            <label className="block font-semibold text-slate-300 mb-1">
              Your Name <span className="text-cyber-cyan">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.full_name}
              onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-cyber-border bg-cyber-950 text-white focus:outline-none focus:border-cyber-cyan"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">
              Email Address <span className="text-cyber-cyan">*</span>
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-cyber-border bg-cyber-950 text-white focus:outline-none focus:border-cyber-cyan"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">
              Subject
            </label>
            <input
              type="text"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              placeholder="e.g. Workshop Inquiry / Partnership"
              className="w-full px-3 py-2 rounded-lg border border-cyber-border bg-cyber-950 text-white focus:outline-none focus:border-cyber-cyan"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">
              Message <span className="text-cyber-cyan">*</span>
            </label>
            <textarea
              rows={4}
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-cyber-border bg-cyber-950 text-white focus:outline-none focus:border-cyber-cyan"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-5 py-2.5 rounded-lg bg-cyber-cyan text-cyber-950 font-bold text-xs hover:bg-cyan-300 transition-colors flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Transmitting...</span>
              </>
            ) : (
              <>
                <span>Transmit Message</span>
                <Send className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
