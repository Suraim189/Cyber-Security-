"use client";

import React, { useState } from "react";
import { TeamMember, SecurityWing } from "@/lib/types";
import { TeamMemberCard } from "@/components/team/TeamMemberCard";
import { Users, Shield, Terminal, Trophy, Cpu } from "lucide-react";

interface TeamListClientProps {
  members: TeamMember[];
}

export function TeamListClient({ members }: TeamListClientProps) {
  const [selectedWing, setSelectedWing] = useState<string>("All");

  const wings = [
    { id: "All", label: "All Divisions", icon: Users },
    { id: "Executive", label: "Executive Council", icon: Cpu },
    { id: "Red Team", label: "Red Team (Offensive)", icon: Terminal },
    { id: "Blue Team", label: "Blue Team (SOC/Forensics)", icon: Shield },
    { id: "CTF", label: "CTF Wargames", icon: Trophy },
    { id: "Advisor", label: "Faculty Patron", icon: Shield },
  ];

  const filteredMembers = selectedWing === "All"
    ? members
    : members.filter((m) => m.wing === selectedWing);

  return (
    <div>
      {/* Wing Filter Buttons */}
      <div className="flex flex-wrap items-center gap-2 mb-10 font-mono text-xs">
        <span className="text-slate-400 mr-2 uppercase tracking-wider">Filter Wing:</span>
        {wings.map((w) => {
          const Icon = w.icon;
          const isActive = selectedWing === w.id;
          return (
            <button
              key={w.id}
              onClick={() => setSelectedWing(w.id)}
              className={`px-3.5 py-2 rounded-xl border flex items-center gap-2 transition-all ${
                isActive
                  ? "bg-cyber-cyan/15 text-cyber-cyan border-cyber-cyan shadow-sm shadow-cyan-950/50 font-bold"
                  : "bg-cyber-950/70 text-slate-400 border-cyber-border hover:border-slate-600 hover:text-white"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{w.label}</span>
            </button>
          );
        })}
      </div>

      {/* Team Roster Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMembers.map((member) => (
          <TeamMemberCard key={member.id} member={member} />
        ))}
      </div>
    </div>
  );
}
