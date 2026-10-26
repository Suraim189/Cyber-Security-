"use client";

import React, { useState } from "react";
import { CheckCircle2, AlertCircle, Loader2, Send } from "lucide-react";
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

    // Basic validation
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
    <div id="join" className="surface-card p-6 sm:p-10 border-brand-200 bg-white">
      <div className="mb-8">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-brand-50 text-brand-700 text-xs font-mono font-semibold mb-2">
          <span>Official Registration</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-charcoal-900">
          Apply for Society Membership
        </h2>
        <p className="text-sm text-charcoal-600 mt-1">
          Open to all currently enrolled students of National Textile University.
        </p>
      </div>

      {status === "success" ? (
        <div className="p-6 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0" />
            <h3 className="font-bold text-base">Application Received Successfully!</h3>
          </div>
          <p className="text-sm text-emerald-800 leading-relaxed">
            Thank you for applying to the NTU Cyber Security Society. Our executive team will review your application and contact you via your university student email regarding orientation and lab onboarding.
          </p>
          <button
            onClick={() => setStatus("idle")}
            className="mt-2 text-xs font-semibold text-emerald-800 hover:text-emerald-950 underline"
          >
            Submit Another Application
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {status === "error" && (
            <div className="p-4 rounded-lg bg-red-50 border border-red-200 flex items-center gap-2.5 text-sm text-red-800">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Full Name & Student ID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-charcoal-800 mb-1.5">
                Full Name <span className="text-brand-600">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.full_name}
                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                placeholder="e.g. Suraim Ahmad"
                className="w-full px-3.5 py-2.5 rounded-lg border border-charcoal-200 bg-white text-charcoal-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-charcoal-800 mb-1.5">
                NTU Student ID / Reg No. <span className="text-brand-600">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.student_id}
                onChange={(e) => setFormData({ ...formData, student_id: e.target.value })}
                placeholder="e.g. 25-NTU-CS-1201"
                className="w-full px-3.5 py-2.5 rounded-lg border border-charcoal-200 bg-white text-charcoal-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
              />
            </div>
          </div>

          {/* Email & Department */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-charcoal-800 mb-1.5">
                Email Address (University / Personal) <span className="text-brand-600">*</span>
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="student@student.ntu.edu.pk"
                className="w-full px-3.5 py-2.5 rounded-lg border border-charcoal-200 bg-white text-charcoal-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-charcoal-800 mb-1.5">
                Department
              </label>
              <select
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-charcoal-200 bg-white text-charcoal-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
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
            <label className="block text-xs font-semibold text-charcoal-800 mb-1.5">
              Current Year of Study
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {["1st Year", "2nd Year", "3rd Year", "4th Year / Final"].map((yr) => (
                <button
                  type="button"
                  key={yr}
                  onClick={() => setFormData({ ...formData, year_of_study: yr })}
                  className={`py-2 px-3 rounded-lg text-xs font-medium border text-center transition-all ${
                    formData.year_of_study === yr
                      ? "border-brand-600 bg-brand-50 text-brand-800 font-semibold"
                      : "border-charcoal-200 bg-white text-charcoal-600 hover:bg-charcoal-50"
                  }`}
                >
                  {yr}
                </button>
              ))}
            </div>
          </div>

          {/* Technical Interests */}
          <div>
            <label className="block text-xs font-semibold text-charcoal-800 mb-1.5">
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
                    className={`flex items-center gap-2 p-2.5 rounded-lg border text-left text-xs transition-all ${
                      isSelected
                        ? "border-brand-600 bg-brand-50/70 text-brand-900 font-medium"
                        : "border-charcoal-200 bg-white text-charcoal-700 hover:bg-charcoal-50"
                    }`}
                  >
                    <span
                      className={`w-4 h-4 rounded flex items-center justify-center border text-[10px] ${
                        isSelected
                          ? "bg-brand-600 border-brand-600 text-white"
                          : "border-charcoal-300 bg-white"
                      }`}
                    >
                      {isSelected ? "✓" : ""}
                    </span>
                    <span>{opt}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Prior Experience */}
          <div>
            <label className="block text-xs font-semibold text-charcoal-800 mb-1.5">
              Prior Experience or Relevant Tools (Optional)
            </label>
            <input
              type="text"
              value={formData.prior_experience}
              onChange={(e) => setFormData({ ...formData, prior_experience: e.target.value })}
              placeholder="e.g. Linux basics, TryHackMe beginner rooms, Python scripting"
              className="w-full px-3.5 py-2.5 rounded-lg border border-charcoal-200 bg-white text-charcoal-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
            />
          </div>

          {/* Motivation Statement */}
          <div>
            <label className="block text-xs font-semibold text-charcoal-800 mb-1.5">
              Why do you want to join NTU Cyber Security Society?
            </label>
            <textarea
              rows={3}
              required
              value={formData.motivation}
              onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
              placeholder="Tell us about your learning goals and what you hope to achieve with the society..."
              className="w-full px-3.5 py-2.5 rounded-lg border border-charcoal-200 bg-white text-charcoal-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
            />
          </div>

          {/* Privacy Notice */}
          <p className="text-[11px] text-charcoal-500 leading-normal border-t border-charcoal-100 pt-4">
            <strong>Privacy Assurance:</strong> Your student credentials and personal details are maintained strictly within society administrative records and are never shared with third parties or published publicly.
          </p>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto px-7 py-3 rounded-xl bg-brand-700 text-white font-medium text-sm hover:bg-brand-800 transition-colors shadow-sm disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Submitting Application...</span>
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
