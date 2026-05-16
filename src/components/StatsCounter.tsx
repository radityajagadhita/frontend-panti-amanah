"use client";

import { useEffect, useRef, useState } from "react";
import { Users, Calendar, Heart, BookOpen } from "lucide-react";
import type { StatItem } from "@/src/data/mockStats";

const iconMap = {
  users: Users,
  calendar: Calendar,
  heart: Heart,
  "book-open": BookOpen,
};

export default function StatsCounter({ stat }: { stat: StatItem }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

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
    if (!isVisible) return;
    const duration = 2000;
    const steps = 60;
    const increment = stat.value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= stat.value) {
        setCount(stat.value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isVisible, stat.value]);

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
        {count}
        <span className="text-primary-500">{stat.suffix}</span>
      </span>
      <span className="mt-1.5 text-sm font-medium text-gray-500">
        {stat.label}
      </span>
    </div>
  );
}
