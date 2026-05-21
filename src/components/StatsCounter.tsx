"use client";

import { useEffect, useRef, useState } from "react";
import { Users, Calendar, Heart, BookOpen } from "lucide-react";
import { StatItem } from "../data/mockStats";
import statDashboard from "../data/statsDashboard";

const iconMap = {
  users: Users,
  calendar: Calendar,
  heart: Heart,
  "book-open": BookOpen,
};

const suffix = {
  anakAsuh: "+",
  tahunBerdiri: "+",
  donatur: "+",
  program: "+",
}

export default function StatsCounter({ stat }: { stat: StatItem }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { data, loading } = statDashboard();

  // Memetakan ID dari stat ke key di data dashboard
  const dataKeyMap: Record<string, keyof typeof data> = {
    children: "anakAsuh",
    years: "tahunBerdiri",
    donors: "donatur",
    programs: "program",
  };

  const targetValue = data[dataKeyMap[stat.id]] || 0;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || loading) return;
    const duration = 2000;
    const steps = 60;
    
    if (targetValue === 0) {
      setCount(0);
      return;
    }

    const increment = targetValue / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= targetValue) {
        setCount(targetValue);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isVisible, targetValue, loading]);

  const Icon = iconMap[stat.icon];

  return (
    <div
      ref={ref}
      className="group relative flex flex-col items-center rounded-2xl border border-primary-100 bg-white p-8 text-center shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/10 hover:-translate-y-1"
    >
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-50 to-primary-100 text-primary-600 transition-colors group-hover:from-primary-500 group-hover:to-primary-600 group-hover:text-white">
        <Icon className="h-7 w-7" />
      </div>
      <span className="text-4xl font-extrabold tracking-tight text-primary-800">
        {loading ? "-" : count}
        <span className="text-primary-500">{stat.suffix}</span>
      </span>
      <span className="mt-1.5 text-sm font-medium text-gray-500">
        {stat.label}
      </span>
    </div>
  );
}
