import React from 'react';
import { m as motion } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  color?: string;
  onClick?: () => void;
}

const MotionDiv = motion.div as any;

const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', hoverEffect = true, color = 'blue', onClick }) => {
  return (
    <MotionDiv
      className={`glass-panel rounded-3xl p-6 ${hoverEffect ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={hoverEffect ? { y: -4 } : {}}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </MotionDiv>
  );
};

export default GlassCard;
