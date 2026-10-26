import React from "react";
import Link from "next/link";
import { ShieldAlert, ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 bg-background">
      <div className="surface-card max-w-md w-full p-8 text-center space-y-5 border-charcoal-200">
        <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center mx-auto shadow-sm">
          <ShieldAlert className="w-8 h-8 stroke-[1.8]" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono font-semibold text-brand-700 uppercase tracking-widest">
            HTTP 404 — Not Found
          </span>
          <h1 className="text-2xl font-bold text-charcoal-900">
            Page Does Not Exist
          </h1>
          <p className="text-xs text-charcoal-600 leading-relaxed">
            The requested university resource or endpoint could not be found or has been relocated.
          </p>
        </div>

        <div className="pt-4 border-t border-charcoal-100 flex items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-charcoal-900 text-white text-xs font-medium hover:bg-brand-700 transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Return Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
