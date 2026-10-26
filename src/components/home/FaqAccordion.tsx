"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle, Shield, Sparkles } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FaqItem[] = [
    {
      category: "MEMBERSHIP",
      question: "Who is eligible to join the NTU Cyber Security Society?",
      answer:
        "Any actively enrolled student of National Textile University (across Computer Science, Software Engineering, Artificial Intelligence, Information Technology, or other departments) is eligible to apply. Both undergraduate and postgraduate students are welcome.",
    },
    {
      category: "PREREQUISITES",
      question: "Do I need prior hacking or programming experience to join?",
      answer:
        "No prior offensive security experience is required. We maintain dedicated Beginner/Foundational roadmaps that teach Linux, basic networking, and scripting from scratch. All that is required is curiosity, consistency, and an ethical mindset.",
    },
    {
      category: "ETHICS & LEGALITY",
      question: "Is participating in society penetration testing labs legal?",
      answer:
        "Yes, 100%. All society drills, workshops, and attack simulations occur exclusively on strictly isolated, private local lab targets (Docker containers, vulnerable VMs like Metasploitable, and authorized CTF platforms). Unauthorized scanning or exploitation of production university networks is strictly forbidden.",
    },
    {
      category: "EQUIPMENT",
      question: "What laptop specifications are required for workshops?",
      answer:
        "A standard laptop running 8GB+ RAM, a multi-core 64-bit processor, and at least 30GB of free SSD storage is sufficient to run Kali Linux inside VirtualBox or WSL2. For university lab sessions, desktop machines in CS Lab 3 are pre-configured.",
    },
    {
      category: "COMPETITIONS",
      question: "How are students selected for national CTF squads?",
      answer:
        "Squad selection is transparent and purely merit-based: regular participation in our internal Friday CTF wargames, solve consistency, and collaboration during collegiate qualifiers (such as the National Cyber Olympiad and Ignite CTFs).",
    },
    {
      category: "FEES & ACCESS",
      question: "Are membership and workshop registrations free for NTU students?",
      answer:
        "Yes. The society operates under the patronage of the Department of Computer Science. All standard curriculum workshops, CTF training, mentorship sessions, and student meetups are completely free of charge for NTU students.",
    },
  ];

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-16 bg-cyber-900 border-b border-cyber-border">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-cyber-cyan/10 text-cyber-cyan border border-cyber-cyan/30 mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Frequently Answered Inquiries</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-xl mx-auto">
            Everything you need to know about society membership, lab access, CTF wargames, and academic oversight.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`bento-card p-0 transition-all duration-200 overflow-hidden ${
                  isOpen ? "border-cyber-cyan/50 shadow-md shadow-cyan-950/40" : "hover:border-slate-700"
                }`}
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-cyber-950 text-cyber-cyan border border-cyber-border hidden sm:inline-block">
                      {faq.category}
                    </span>
                    <span className="text-sm sm:text-base font-bold text-white font-sans">
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-cyber-cyan flex-shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-sm text-slate-300 leading-relaxed font-sans border-t border-cyber-border/60 pt-3 animate-in fade-in-50 duration-150">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
