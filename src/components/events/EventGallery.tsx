"use client";

import React, { useState } from "react";
import { Camera, Calendar, MapPin, X, ZoomIn, Eye } from "lucide-react";

interface GalleryPhoto {
  id: string;
  title: string;
  category: "Workshops" | "CTF Battles" | "Seminars";
  date: string;
  venue: string;
  image: string;
  description: string;
}

export function EventGallery() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);

  const photos: GalleryPhoto[] = [
    {
      id: "gal-1",
      title: "Intensive Web Application Penetration Testing Lab",
      category: "Workshops",
      date: "Fall Semester",
      venue: "NTU CS Lab 3",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
      description: "Students auditing live sandboxed OWASP Top 10 vulnerabilities and intercepting HTTP requests using Burp Suite Professional.",
    },
    {
      id: "gal-2",
      title: "24-Hour Intra-University CTF Championship War Room",
      category: "CTF Battles",
      date: "Spring Semester",
      venue: "Main Auditorium & Virtual Arena",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
      description: "Competitive hacking squads collaborating on reverse engineering and binary exploitation challenges under live scoreboard tracking.",
    },
    {
      id: "gal-3",
      title: "Industry Keynote: Zero Trust Architecture in Modern Clouds",
      category: "Seminars",
      date: "Executive Session",
      venue: "Executive Seminar Hall, NTU",
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80",
      description: "Guest security architects demonstrating micro-segmentation and enterprise identity federation to over 150 students.",
    },
    {
      id: "gal-4",
      title: "Hands-on Digital Forensics & RAM Memory Carving",
      category: "Workshops",
      date: "Specialized Lab",
      venue: "Software Engineering Lab 1",
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
      description: "Extracting process memory descriptors, suspicious network sockets, and command injection artifacts using Volatility 3.",
    },
    {
      id: "gal-5",
      title: "Collegiate Cyber Olympiad Qualifying Round",
      category: "CTF Battles",
      date: "National Qualifier",
      venue: "NTU Cyber Security Wing",
      image: "https://images.unsplash.com/photo-1510519138171-c70d76b640a4?auto=format&fit=crop&w=800&q=80",
      description: "The senior society team securing rank #7 in the national qualifying rounds against 40+ universities across Pakistan.",
    },
    {
      id: "gal-6",
      title: "Applied Cryptography & Post-Quantum Math Workshop",
      category: "Seminars",
      date: "Research Symposium",
      venue: "Auditorium Hall B",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
      description: "Analyzing lattice-based key encapsulation mechanisms and entropy degradation on embedded microcontrollers.",
    },
  ];

  const categories = ["All", "Workshops", "CTF Battles", "Seminars"];

  const filtered =
    activeCategory === "All"
      ? photos
      : photos.filter((p) => p.category === activeCategory);

  return (
    <section className="py-16 bg-cyber-950 border-b border-cyber-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono font-semibold bg-cyber-cyan/10 text-cyber-cyan border border-cyber-cyan/30 mb-2">
              <Camera className="w-3.5 h-3.5" />
              <span>Operational Archive</span>
            </div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              Past Events &amp; Lab Moments
            </h2>
            <p className="text-sm text-slate-300 mt-1 max-w-xl">
              Photographic highlights from our live physical workshops, collegiate CTF war rooms, and campus guest seminars.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 font-mono text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-lg border transition-all ${
                  activeCategory === cat
                    ? "bg-cyber-cyan/15 text-cyber-cyan border-cyber-cyan font-bold"
                    : "bg-cyber-900 text-slate-400 border-cyber-border hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Photo Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setSelectedPhoto(photo)}
              className="bento-card p-0 overflow-hidden cursor-pointer group flex flex-col justify-between"
            >
              <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-cyber-950">
                <img
                  src={photo.image}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-85 group-hover:opacity-100"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cyber-950 via-transparent to-transparent opacity-90" />
                
                <span className="absolute top-3 left-3 px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-cyber-950/90 text-cyber-cyan border border-cyber-cyan/40 backdrop-blur-md">
                  {photo.category}
                </span>

                <div className="absolute bottom-3 right-3 p-1.5 rounded-lg bg-cyber-900/90 border border-cyber-border text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ZoomIn className="w-4 h-4 text-cyber-cyan" />
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-cyber-cyan transition-colors mb-2">
                    {photo.title}
                  </h3>
                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    {photo.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-cyber-border/70 flex items-center justify-between font-mono text-[11px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-cyber-cyan" />
                    {photo.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-cyber-cyan" />
                    {photo.venue}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Zoom Modal */}
        {selectedPhoto && (
          <div className="fixed inset-0 z-50 bg-cyber-950/90 backdrop-blur-md flex items-center justify-center p-4">
            <div className="rounded-2xl bg-cyber-900 border border-cyber-cyan/40 max-w-2xl w-full overflow-hidden shadow-2xl animate-in zoom-in-95 duration-150">
              <div className="relative h-72 sm:h-80 w-full">
                <img
                  src={selectedPhoto.image}
                  alt={selectedPhoto.title}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-cyber-950/80 border border-cyber-border text-white hover:text-cyber-cyan transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-cyber-cyan font-bold">{selectedPhoto.category}</span>
                  <span>{selectedPhoto.date} // {selectedPhoto.venue}</span>
                </div>
                <h3 className="text-xl font-bold text-white font-sans">
                  {selectedPhoto.title}
                </h3>
                <p className="text-slate-300 font-sans text-sm leading-relaxed">
                  {selectedPhoto.description}
                </p>
                <div className="pt-3 border-t border-cyber-border flex justify-end">
                  <button
                    onClick={() => setSelectedPhoto(null)}
                    className="px-4 py-2 rounded-lg bg-cyber-cyan text-cyber-950 font-bold hover:bg-cyan-300 transition-colors"
                  >
                    Close Archive
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
