"use client";

import React, { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowRight, Terminal, Globe, Shield, Sparkles, Activity, Download } from "lucide-react";
import { ScrambleText } from "@/components/cyber/ScrambleText";
import { MagneticButton } from "@/components/cyber/MagneticButton";
import { InteractiveTerminal } from "@/components/cyber/InteractiveTerminal";

// Dynamically import ThreeGlobe (client-only WebGL to prevent SSR errors and optimize initial load)
const ThreeGlobe = dynamic(
  () => import("@/components/cyber/ThreeGlobe").then((mod) => mod.ThreeGlobe),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[400px] sm:h-[460px] rounded-2xl bg-cyber-950/80 border border-cyber-border flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-xs font-mono text-slate-400">
          <Activity className="w-6 h-6 text-cyber-cyan animate-spin" />
          <span>INITIALIZING 3D DEFENSE MATRIX...</span>
        </div>
      </div>
    ),
  }
);

export function HeroSection() {
  const [activeTab, setActiveTab] = useState<"globe" | "terminal">("globe");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
      {/* Left Column: Mission Narrative, Scramble Headline & Magnetic CTAs */}
      <div className="lg:col-span-6 space-y-6">
        {/* Telemetry Status Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyber-950/90 border border-cyber-cyan/40 text-cyber-cyan text-xs font-mono font-semibold tracking-wide shadow-md shadow-cyan-950/50">
          <span className="w-2 h-2 rounded-full bg-cyber-cyan animate-pulse" />
          <span>NTU COMPUTER SCIENCE</span>
          <span className="text-slate-600">/</span>
          <span className="text-slate-300 font-sans font-medium">Cyber Security Society</span>
        </div>

        {/* Award-winning Decrypt / Scramble Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-extrabold text-white leading-[1.12] tracking-tight">
          <ScrambleText text="Think Like an Attacker." duration={1400} />
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan via-sky-400 to-blue-500">
            <ScrambleText text="Build Like a Defender." delay={600} duration={1600} />
          </span>
        </h1>

        {/* Narrative Description */}
        <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-xl">
          The premier cybersecurity research and defense wing of National Textile University, Faisalabad. 
          We train collegiate CTF competitors, conduct authorized vulnerability assessments, 
          and engineer resilient software and cryptographic systems.
        </p>

        {/* Magnetic Action Buttons */}
        <div className="flex flex-wrap items-center gap-4 pt-2 font-mono">
          <MagneticButton strength={0.25}>
            <Link
              href="/contact#join"
              className="btn-cyber-cyan text-xs sm:text-sm font-bold shadow-lg shadow-cyber-cyan/25 flex items-center gap-2"
            >
              <span>Enlist in Society</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </MagneticButton>

          <MagneticButton strength={0.2}>
            <Link
              href="/events"
              className="btn-cyber-secondary text-xs sm:text-sm font-semibold flex items-center gap-2"
            >
              <span>Explore Workshops</span>
              <Terminal className="w-3.5 h-3.5 text-cyber-cyan" />
            </Link>
          </MagneticButton>
        </div>

        {/* Live Operational Verification Indicators */}
        <div className="pt-6 border-t border-cyber-border/70 flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400">
          <span className="flex items-center gap-1.5">
            <Shield className="w-4 h-4 text-emerald-400" />
            Verified NTU CS Oversight
          </span>
          <span className="text-slate-600">•</span>
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-cyber-cyan" />
            Free for All NTU Students
          </span>
        </div>
      </div>

      {/* Right Column: Interactive 3D Globe & Terminal Switcher */}
      <div className="lg:col-span-6">
        <div className="relative mx-auto max-w-lg lg:max-w-none">
          {/* Ambient Lighting Glow Behind Canvas */}
          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-cyber-cyan/25 to-blue-600/25 blur-2xl opacity-60" />

          {/* Mode Switcher HUD Tabs */}
          <div className="relative z-10 flex items-center justify-between mb-3 px-2 font-mono text-xs">
            <div className="inline-flex rounded-xl bg-cyber-950 p-1 border border-cyber-border">
              <button
                onClick={() => setActiveTab("globe")}
                className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-all ${
                  activeTab === "globe"
                    ? "bg-cyber-cyan/15 text-cyber-cyan border border-cyber-cyan/40 shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Globe className="w-3.5 h-3.5" />
                <span>3D Attack Arc Matrix</span>
              </button>
              <button
                onClick={() => setActiveTab("terminal")}
                className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-all ${
                  activeTab === "terminal"
                    ? "bg-cyber-cyan/15 text-cyber-cyan border border-cyber-cyan/40 shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>Defense Terminal</span>
              </button>
            </div>

            <span className="text-[11px] text-slate-500 hidden sm:inline">
              {activeTab === "globe" ? "Drag to Rotate" : "Type 'help'"}
            </span>
          </div>

          {/* Display Container */}
          <div className="relative z-10">
            {activeTab === "globe" ? (
              <div className="rounded-2xl border border-cyber-border/80 bg-cyber-950/80 backdrop-blur-xl p-2 shadow-2xl">
                <ThreeGlobe />
              </div>
            ) : (
              <InteractiveTerminal />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
