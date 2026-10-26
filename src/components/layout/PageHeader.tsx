"use client";

import React from "react";
import { Shield, Activity, Radio } from "lucide-react";

interface PageHeaderProps {
  badge: string;
  title: string;
  description: string;
  rightBadgeText?: string;
}

export function PageHeader({
  badge,
  title,
  description,
  rightBadgeText = "TELEMETRY SYNCHRONIZED",
}: PageHeaderProps) {
  return (
    <section className="bg-cyber-gradient border-b border-cyber-border py-10 sm:py-12 lg:py-14 relative overflow-hidden">
      {/* Background Cyber Grid */}
      <div className="absolute inset-0 cyber-grid opacity-50 pointer-events-none" />
      <div className="absolute inset-0 cyber-radial-overlay pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Heading and Narrative */}
          <div className="lg:col-span-8 space-y-2.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyber-950/90 border border-cyber-cyan/30 text-cyber-cyan text-xs font-mono font-semibold tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-cyber-cyan animate-pulse" />
              <span>{badge}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
              {title}
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
              {description}
            </p>
          </div>

          {/* Right Column: Animated Radar & Telemetry HUD */}
          <div className="lg:col-span-4 flex justify-start lg:justify-end">
            <div className="relative w-44 h-44 sm:w-48 sm:h-48 rounded-2xl bg-cyber-950/80 border border-cyber-cyan/30 p-3 shadow-xl shadow-cyan-950/40 backdrop-blur-md overflow-hidden flex items-center justify-center">
              {/* Radar concentric rings */}
              <div className="absolute inset-3 rounded-full border border-cyber-cyan/20" />
              <div className="absolute inset-8 rounded-full border border-cyber-cyan/30" />
              <div className="absolute inset-14 rounded-full border border-cyber-cyan/40" />

              {/* Crosshairs */}
              <div className="absolute inset-x-0 top-1/2 h-px bg-cyber-cyan/20" />
              <div className="absolute inset-y-0 left-1/2 w-px bg-cyber-cyan/20" />

              {/* Animated Radar Sweep */}
              <div
                className="absolute inset-0 origin-center rounded-full pointer-events-none"
                style={{
                  background:
                    "conic-gradient(from 0deg, transparent 0deg, rgba(0, 240, 255, 0.25) 60deg, transparent 65deg)",
                  animation: "spin 4s linear infinite",
                }}
              />

              {/* Pulsing Blips */}
              <div className="absolute top-1/3 left-1/3 w-2 h-2 rounded-full bg-cyber-cyan animate-ping" />
              <div className="absolute bottom-1/3 right-1/4 w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />

              {/* Center Node */}
              <div className="relative z-10 w-6 h-6 rounded-full bg-cyber-900 border border-cyber-cyan text-cyber-cyan flex items-center justify-center shadow-lg shadow-cyan-500/20">
                <Radio className="w-3.5 h-3.5" />
              </div>

              {/* HUD Badge Label */}
              <div className="absolute bottom-2 left-2 right-2 text-center">
                <span className="text-[9px] font-mono text-slate-400 bg-cyber-900/90 px-2 py-0.5 rounded border border-cyber-border block truncate">
                  {rightBadgeText}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
