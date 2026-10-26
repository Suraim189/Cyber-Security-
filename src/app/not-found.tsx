import React from "react";
import Link from "next/link";
import { ShieldAlert, ArrowLeft, Home, Terminal } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 bg-cyber-900 text-slate-100">
      <div className="cyber-card max-w-md w-full p-8 text-center space-y-5 border-cyber-border bg-cyber-850">
        <div className="w-16 h-16 rounded-2xl bg-cyber-900 border border-amber-500/40 text-amber-400 flex items-center justify-center mx-auto shadow-md">
          <ShieldAlert className="w-8 h-8 stroke-[1.8]" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono font-semibold text-cyber-cyan uppercase tracking-widest">
            HTTP 404 // ROUTE NOT FOUND
          </span>
          <h1 className="text-2xl font-bold text-white font-mono">
            Endpoint Non-Existent
          </h1>
          <p className="text-xs text-slate-400 leading-relaxed">
            The requested university resource or network endpoint could not be mapped to an active socket.
          </p>
        </div>

        <div className="pt-4 border-t border-cyber-border flex items-center justify-center gap-3">
          <Link
            href="/"
            className="btn-cyber-cyan text-xs font-mono font-bold"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Return to Command Center</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
