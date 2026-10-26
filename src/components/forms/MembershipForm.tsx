"use client";

import React, { useState } from "react";
import { CheckCircle2, AlertCircle, Loader2, Send, ShieldCheck, Terminal } from "lucide-react";
import { DataService } from "@/lib/data-service";

export function MembershipForm() {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    student_id: "",
    department: "Computer Science",
    year_of_study: "1st Year",
    prior_experience: "",
    motivation: "",
  });

  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    "Ethical Hacking & Pentesting",
  ]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const interestOptions = [
    "Ethical Hacking & Pentesting",
    "Defensive Security / SOC",
    "Digital Forensics & Triage",
    "CTF Competitions",
    "Hardware & IoT Security",
    "Secure Software Engineering",
  ];

  const handleInterestToggle = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("idle");
    setErrorMessage("");

    if (!formData.full_name.trim() || !formData.email.trim() || !formData.student_id.trim()) {
      setErrorMessage("Please complete all required fields (Name, Email, Student ID).");
      setIsSubmitting(false);
      setStatus("error");
      return;
    }

    try {
      const result = await DataService.submitMembershipApplication({
        full_name: formData.full_name.trim(),
        email: formData.email.trim(),
        student_id: formData.student_id.trim(),
        department: formData.department,
        year_of_study: formData.year_of_study,
        interests: selectedInterests,
        prior_experience: formData.prior_experience.trim(),
        motivation: formData.motivation.trim(),
      });

      if (result.success) {
        setStatus("success");
        setFormData({
          full_name: "",
          email: "",
          student_id: "",
          department: "Computer Science",
          year_of_study: "1st Year",
          prior_experience: "",
          motivation: "",
        });
        setSelectedInterests(["Ethical Hacking & Pentesting"]);
      } else {
        setStatus("error");
        setErrorMessage(result.error || "Submission failed. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("An unexpected network error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="join" className="cyber-card p-6 sm:p-10 border-cyber-border bg-cyber-850 shadow-2xl">
      <div className="mb-8">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-cyber-900 text-cyber-cyan text-xs font-mono font-semibold mb-2 border border-cyber-border">
          <Terminal className="w-3.5 h-3.5" />
          <span>Official Enlistment Terminal</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white font-mono">
          Apply for Society Membership
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Open to all currently enrolled students of National Textile University.
        </p>
      </div>

      {status === "success" ? (
        <div className="p-6 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 space-y-3 font-mono">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-6 h-6 text-emerald-400 flex-shrink-0" />
            <h3 className="font-bold text-base text-white">Application Received Successfully!</h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
            Thank you for applying to the NTU Cyber Security Society. Our executive council will review your student credentials and contact you via your university student email regarding orientation, Discord lab access, and onboarding.
          </p>
          <button
            onClick={() => setStatus("idle")}
            className="mt-2 text-xs font-semibold text-cyber-cyan hover:underline"
          >
            Submit Another Application
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {status === "error" && (
            <div className="p-4 rounded-lg bg-rose-950/60 border border-rose-500/40 flex items-center gap-2.5 text-xs text-rose-300 font-mono">
              <AlertCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Full Name & Student ID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-mono font-semibold text-slate-300 mb-1.5">
                Full Name <span className="text-cyber-cyan">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.full_name}
                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                placeholder="e.g. Suraim Ahmad"
                className="w-full px-3.5 py-2.5 rounded-lg border border-cyber-border bg-cyber-950 text-white text-xs sm:text-sm focus:outline-none focus:border-cyber-cyan transition-all font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-semibold text-slate-300 mb-1.5">
                NTU Student ID / Reg No. <span className="text-cyber-cyan">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.student_id}
                onChange={(e) => setFormData({ ...formData, student_id: e.target.value })}
                placeholder="e.g. 25-NTU-CS-1201"
                className="w-full px-3.5 py-2.5 rounded-lg border border-cyber-border bg-cyber-950 text-white text-xs sm:text-sm focus:outline-none focus:border-cyber-cyan transition-all font-mono"
              />
            </div>
          </div>

          {/* Email & Department */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-mono font-semibold text-slate-300 mb-1.5">
                Email Address (University / Personal) <span className="text-cyber-cyan">*</span>
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="student@student.ntu.edu.pk"
                className="w-full px-3.5 py-2.5 rounded-lg border border-cyber-border bg-cyber-950 text-white text-xs sm:text-sm focus:outline-none focus:border-cyber-cyan transition-all font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-semibold text-slate-300 mb-1.5">
                Department
              </label>
              <select
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-cyber-border bg-cyber-950 text-white text-xs sm:text-sm focus:outline-none focus:border-cyber-cyan transition-all font-mono"
              >
                <option value="Computer Science">Computer Science (CS)</option>
                <option value="Software Engineering">Software Engineering (SE)</option>
                <option value="Artificial Intelligence">Artificial Intelligence (AI)</option>
                <option value="Information Technology">Information Technology (IT)</option>
                <option value="Other NTU Department">Other NTU Department</option>
              </select>
            </div>
          </div>

          {/* Year of study */}
          <div>
            <label className="block text-xs font-mono font-semibold text-slate-300 mb-1.5">
              Current Year of Study
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {["1st Year", "2nd Year", "3rd Year", "4th Year / Final"].map((yr) => (
                <button
                  type="button"
                  key={yr}
                  onClick={() => setFormData({ ...formData, year_of_study: yr })}
                  className={`py-2 px-3 rounded-lg text-xs font-mono font-medium border text-center transition-all ${
                    formData.year_of_study === yr
                      ? "border-cyber-cyan bg-cyber-cyan/15 text-cyber-cyan font-bold"
                      : "border-cyber-border bg-cyber-950 text-slate-400 hover:text-white hover:bg-cyber-900"
                  }`}
                >
                  {yr}
                </button>
              ))}
            </div>
          </div>

          {/* Technical Interests */}
          <div>
            <label className="block text-xs font-mono font-semibold text-slate-300 mb-1.5">
              Primary Technical Interests
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {interestOptions.map((opt) => {
                const isSelected = selectedInterests.includes(opt);
                return (
                  <button
                    type="button"
                    key={opt}
                    onClick={() => handleInterestToggle(opt)}
                    className={`flex items-center gap-2 p-2.5 rounded-lg border text-left text-xs transition-all font-mono ${
                      isSelected
                        ? "border-cyber-cyan bg-cyber-cyan/10 text-white font-semibold shadow-sm"
                        : "border-cyber-border bg-cyber-950 text-slate-400 hover:text-slate-200 hover:bg-cyber-900"
                    }`}
                  >
                    <span
                      className={`w-4 h-4 rounded flex items-center justify-center border text-[10px] ${
                        isSelected
                          ? "bg-cyber-cyan border-cyber-cyan text-cyber-950 font-bold"
                          : "border-cyber-border bg-cyber-950 text-transparent"
                      }`}
                    >
                      ✓
                    </span>
                    <span>{opt}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Prior Experience */}
          <div>
            <label className="block text-xs font-mono font-semibold text-slate-300 mb-1.5">
              Prior Experience or Relevant Tools (Optional)
            </label>
            <input
              type="text"
              value={formData.prior_experience}
              onChange={(e) => setFormData({ ...formData, prior_experience: e.target.value })}
              placeholder="e.g. Linux basics, TryHackMe beginner rooms, Python scripting"
              className="w-full px-3.5 py-2.5 rounded-lg border border-cyber-border bg-cyber-950 text-white text-xs sm:text-sm focus:outline-none focus:border-cyber-cyan transition-all font-mono"
            />
          </div>

          {/* Motivation Statement */}
          <div>
            <label className="block text-xs font-mono font-semibold text-slate-300 mb-1.5">
              Why do you want to join NTU Cyber Security Society?
            </label>
            <textarea
              rows={3}
              required
              value={formData.motivation}
              onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
              placeholder="Tell us about your learning goals and what you hope to achieve with the society..."
              className="w-full px-3.5 py-2.5 rounded-lg border border-cyber-border bg-cyber-950 text-white text-xs sm:text-sm focus:outline-none focus:border-cyber-cyan transition-all font-mono"
            />
          </div>

          {/* Privacy Notice */}
          <div className="flex items-start gap-2.5 p-3 rounded-lg bg-cyber-900 border border-cyber-border text-[11px] text-slate-400 font-mono">
            <ShieldCheck className="w-4 h-4 text-cyber-cyan flex-shrink-0 mt-0.5" />
            <span>
              <strong>CONFIDENTIALITY GUARANTEE:</strong> Student credentials and submission records are stored in encrypted Supabase database records accessible only to authorized society administrators.
            </span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto px-7 py-3 rounded-lg bg-cyber-cyan text-cyber-950 font-mono font-bold text-xs sm:text-sm hover:bg-cyan-300 transition-all shadow-lg shadow-cyan-500/20 disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Encrypting &amp; Submitting...</span>
              </>
            ) : (
              <>
                <span>Submit Membership Application</span>
                <Send className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
