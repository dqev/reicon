import React from 'react';

interface FeatureCardProps {
  title: string;
  icon: React.ReactNode;
}

export default function FeatureCard({ title, icon }: FeatureCardProps) {
  return (
    <div className="group bg-white/10 text-white text-[13.5px] px-4.5 py-2.5 rounded-full border border-white/25 backdrop-blur-md flex items-center gap-2 hover:bg-white/20 transition-colors cursor-default select-none">
      <div className="w-4 h-4 shrink-0 [&>svg]:w-full [&>svg]:h-full text-white/85">
        {icon}
      </div>
      {title}
    </div>
  );
}
