"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Shield } from "lucide-react";

export function ThreeGlobe() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // 1. Accessibility: Check prefers-reduced-motion
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) {
      setReducedMotion(true);
      return;
    }

    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth || 500;
    const height = container.clientHeight || 450;

    // Detect mobile or low-concurrency devices
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 450 : 1100;
    const arcCount = isMobile ? 3 : 6;
    const sphereSegments = isMobile ? 24 : 36;

    // 2. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 220;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: !isMobile });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
    container.appendChild(renderer.domElement);

    // 3. Globe Group
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // Core Sphere Wireframe
    const coreGeo = new THREE.SphereGeometry(78, sphereSegments, sphereSegments);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x071126,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    globeGroup.add(coreMesh);

    // Particle Cloud on Sphere Surface
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const cyanColor = new THREE.Color(0x00f0ff);
    const blueColor = new THREE.Color(0x2563eb);
    const amberColor = new THREE.Color(0xf59e0b);

    for (let i = 0; i < particleCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / particleCount);
      const theta = Math.sqrt(particleCount * Math.PI) * phi;
      const radius = 80 + (Math.random() - 0.5) * 2;

      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);

      particlePositions[i * 3] = x;
      particlePositions[i * 3 + 1] = y;
      particlePositions[i * 3 + 2] = z;

      const rand = Math.random();
      const col = rand > 0.85 ? amberColor : rand > 0.4 ? cyanColor : blueColor;
      particleColors[i * 3] = col.r;
      particleColors[i * 3 + 1] = col.g;
      particleColors[i * 3 + 2] = col.b;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute("color", new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: isMobile ? 2.5 : 2.0,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    globeGroup.add(particles);

    // 4. Simulated Attack Arcs
    interface AttackArc {
      curve: THREE.CubicBezierCurve3;
      mesh: THREE.Line;
      pulseMesh: THREE.Mesh;
      color: number;
      progress: number;
      speed: number;
    }

    const arcs: AttackArc[] = [];

    const getRandomPointOnSphere = (r: number) => {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const sinPhi = Math.sin(phi);
      return new THREE.Vector3(
        r * sinPhi * Math.cos(theta),
        r * sinPhi * Math.sin(theta),
        r * Math.cos(phi)
      );
    };

    for (let i = 0; i < arcCount; i++) {
      const p1 = getRandomPointOnSphere(80);
      const p2 = getRandomPointOnSphere(80);

      const mid = p1.clone().add(p2).multiplyScalar(0.5);
      const dist = p1.distanceTo(p2);
      mid.normalize().multiplyScalar(80 + dist * 0.45);

      const curve = new THREE.CubicBezierCurve3(
        p1,
        p1.clone().lerp(mid, 0.5),
        p2.clone().lerp(mid, 0.5),
        p2
      );

      const points = curve.getPoints(36);
      const lineGeo = new THREE.BufferGeometry().setFromPoints(points);

      const isAttack = i % 2 === 0;
      const arcColor = isAttack ? 0xf59e0b : 0x00f0ff;

      const lineMat = new THREE.LineBasicMaterial({
        color: arcColor,
        transparent: true,
        opacity: 0.35,
      });

      const line = new THREE.Line(lineGeo, lineMat);
      globeGroup.add(line);

      const pulseGeo = new THREE.SphereGeometry(1.8, 8, 8);
      const pulseMat = new THREE.MeshBasicMaterial({ color: arcColor });
      const pulseMesh = new THREE.Mesh(pulseGeo, pulseMat);
      globeGroup.add(pulseMesh);

      arcs.push({
        curve,
        mesh: line,
        pulseMesh,
        color: arcColor,
        progress: Math.random(),
        speed: 0.005 + Math.random() * 0.006,
      });
    }

    // 5. Mouse Interaction
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      globeGroup.rotation.y += deltaX * 0.004;
      globeGroup.rotation.x += deltaY * 0.004;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    container.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    // 6. Animation Loop
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      if (!isDragging) {
        globeGroup.rotation.y += 0.002;
        globeGroup.rotation.x += 0.0006;
      }

      arcs.forEach((arc) => {
        arc.progress += arc.speed;
        if (arc.progress > 1) arc.progress = 0;
        const pt = arc.curve.getPoint(arc.progress);
        arc.pulseMesh.position.copy(pt);
      });

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth || 500;
      const newH = container.clientHeight || 450;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);

      renderer.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      arcs.forEach((a) => {
        a.mesh.geometry.dispose();
        (a.mesh.material as THREE.Material).dispose();
        a.pulseMesh.geometry.dispose();
        (a.pulseMesh.material as THREE.Material).dispose();
      });

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  if (reducedMotion) {
    return (
      <div className="relative w-full h-[380px] sm:h-[460px] rounded-2xl bg-cyber-950/90 border border-cyber-border flex flex-col items-center justify-center p-6 text-center font-mono">
        <div className="w-20 h-20 rounded-full border border-cyber-cyan/40 flex items-center justify-center text-cyber-cyan mb-4 shadow-lg shadow-cyan-950">
          <Shield className="w-10 h-10" />
        </div>
        <h4 className="text-sm font-bold text-white font-sans">
          Static Telemetry Mode
        </h4>
        <p className="text-xs text-slate-400 mt-1 max-w-xs font-sans">
          3D animation paused per user accessibility settings (prefers-reduced-motion).
        </p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[380px] sm:h-[460px] flex items-center justify-center">
      <div
        ref={containerRef}
        className="w-full h-full cursor-grab active:cursor-grabbing select-none"
      />

      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-cyber-950/90 border border-cyber-border/80 backdrop-blur-md text-[10px] font-mono text-slate-300 flex items-center gap-2 pointer-events-none shadow-lg whitespace-nowrap">
        <span className="w-1.5 h-1.5 rounded-full bg-cyber-cyan animate-pulse" />
        <span>SIMULATED DEFENSE TELEMETRY // NTU CS LAB</span>
      </div>
    </div>
  );
}
