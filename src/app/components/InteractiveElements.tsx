'use client';

import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';

// Cursor follower with trail
export function CursorFollower() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [trail, setTrail] = useState<Array<{ x: number; y: number; id: number }>>([]);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [x, y]);

  // Create trail effect
  useEffect(() => {
    const interval = setInterval(() => {
      setTrail(prev => [...prev.slice(-19), { x: x.get(), y: y.get(), id: Date.now() }]);
    }, 30);
    return () => clearInterval(interval);
  }, [x]);

  const trailElements = trail.map((point, i) => {
    const scale = useSpring(useTransform(i, [0, trail.length - 1], [1, 0.1]), { stiffness: 300, damping: 30 });
    const opacity = useSpring(useTransform(i, [0, trail.length - 1], [0.6, 0]), { stiffness: 300, damping: 30 });
    
    return (
      <motion.div
        key={point.id}
        className="fixed pointer-events-none z-40 w-2 h-2 rounded-full bg-emerald/50"
        style={{
          left: point.x,
          top: point.y,
          transformOrigin: 'center',
          scale,
          opacity,
        }}
      />
    );
  });

  return <>{trailElements}</>;
}

// Magnetic button effect
export function MagneticButton({ children, href, className = '', ...props }: { 
  children: React.ReactNode; 
  href?: string;
  className?: string;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      x.set((e.clientX - centerX) * 0.3);
      y.set((e.clientY - centerY) * 0.3);
    };

    const handleLeave = () => {
      x.set(0);
      y.set(0);
    };

    element.addEventListener('mousemove', handleMove);
    element.addEventListener('mouseleave', handleLeave);
    return () => {
      element.removeEventListener('mousemove', handleMove);
      element.removeEventListener('mouseleave', handleLeave);
    };
  }, [x, y]);

  if (href) {
    return (
      <motion.a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        style={{ x, y }}
        className={`relative inline-flex items-center justify-center overflow-hidden ${className}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        {...props}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref as React.Ref<HTMLButtonElement>}
      style={{ x, y }}
      className={`relative inline-flex items-center justify-center overflow-hidden ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      {...props}
    >
      {children}
    </motion.button>
  );
}

// Scroll progress indicator
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 10 });

  return (
    <motion.div
      className="fixed top-0 left-0 h-1 bg-gradient-to-r from-emerald to-emerald-dim z-50 origin-left"
      style={{ transformOrigin: 'left center', scaleX: progress }}
    />
  );
}

// Interactive particle background
export function ParticleBackground() {
  const [particles] = useState(() => 
    Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.5 + 0.1,
    }))
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-emerald"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
          }}
          animate={{
            x: [0, p.speedX * 100, 0],
            y: [0, p.speedY * 100, 0],
          }}
          transition={{
            duration: 20 + Math.random() * 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
}

// Typewriter effect
export function Typewriter({ 
  texts, 
  speed = 50, 
  deleteSpeed = 30, 
  pause = 2000,
  className = '',
  cursor = true
}: { 
  texts: string[];
  speed?: number;
  deleteSpeed?: number;
  pause?: number;
  className?: string;
  cursor?: boolean;
}) {
  const [text, setText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[textIndex];
    
    const type = () => {
      if (!isDeleting) {
        setText(prev => currentText.slice(0, prev.length + 1));
        if (text.length === currentText.length) {
          setTimeout(() => setIsDeleting(true), pause);
        } else {
          setTimeout(type, speed);
        }
      } else {
        setText(prev => prev.slice(0, -1));
        if (text.length === 0) {
          setIsDeleting(false);
          setTextIndex(prev => (prev + 1) % texts.length);
          setTimeout(type, 500);
        } else {
          setTimeout(type, deleteSpeed);
        }
      }
    };

    type();
  }, [text, textIndex, isDeleting, texts, speed, deleteSpeed, pause]);

  return (
    <span className={className}>
      {text}
      {cursor && <motion.span className="ml-1" animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1, repeat: Infinity }}>|</motion.span>}
    </span>
  );
}

// Parallax scroll component
export function Parallax({ children, speed = 0.5, className = '' }: { 
  children: React.ReactNode;
  speed?: number;
  className?: string;
}) {
  const { scrollY } = useScroll();
  // Using an effect or checking window to prevent SSR errors on window.innerHeight
  const [innerHeight, setInnerHeight] = useState(1000);
  
  useEffect(() => {
    setInnerHeight(window.innerHeight);
  }, []);

  const y = useTransform(scrollY, [0, innerHeight], [0, innerHeight * speed]);

  return (
    <motion.div className={className} style={{ y }}>
      {children}
    </motion.div>
  );
}

// Interactive card with 3D tilt
export function TiltCard({ children, className = '', maxTilt = 15 }: { 
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - centerX) / (rect.width / 2);
      const deltaY = (e.clientY - centerY) / (rect.height / 2);
      x.set(deltaX * maxTilt);
      y.set(-deltaY * maxTilt);
    };

    const handleLeave = () => {
      x.set(0);
      y.set(0);
    };

    element.addEventListener('mousemove', handleMove);
    element.addEventListener('mouseleave', handleLeave);
    return () => {
      element.removeEventListener('mousemove', handleMove);
      element.removeEventListener('mouseleave', handleLeave);
    };
  }, [x, y, maxTilt]);

  return (
    <motion.div
      ref={ref}
      className={`relative rounded-2xl bg-forest-light/50 backdrop-blur-sm border border-white/10 overflow-hidden ${className}`}
      style={{
        transform: `perspective(1000px) rotateX(${y.get()}deg) rotateY(${x.get()}deg)`,
        transformStyle: 'preserve-3d',
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <motion.div
        style={{
          transform: `translateZ(20px)`,
        }}
      >
        {children}
      </motion.div>
      {/* Shine effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
        style={{
          transform: `translateX(${(x.get() / maxTilt) * 100}%) translateZ(10px)`,
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      />
    </motion.div>
  );
}
