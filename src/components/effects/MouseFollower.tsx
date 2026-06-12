import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const MouseFollower: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Inner orb — fast spring
  const springX = useSpring(mouseX, { stiffness: 500, damping: 28, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 500, damping: 28, mass: 0.5 });

  // Outer ring — slower, more elastic spring
  const ringX = useSpring(mouseX, { stiffness: 150, damping: 20, mass: 0.8 });
  const ringY = useSpring(mouseY, { stiffness: 150, damping: 20, mass: 0.8 });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const handleMouseLeave = () => setVisible(false);
    const handleMouseEnter = () => setVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [mouseX, mouseY, visible]);

  if (isMobile) return null;

  return (
    <>
      {/* Inner glowing orb */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
        style={{
          x: springX,
          y: springY,
          width: 20,
          height: 20,
          translateX: '-50%',
          translateY: '-50%',
          background: 'radial-gradient(circle, rgba(0,212,255,0.8), rgba(0,212,255,0.2))',
          boxShadow:
            '0 0 10px rgba(0,212,255,0.6), 0 0 20px rgba(0,212,255,0.3), 0 0 40px rgba(0,212,255,0.15)',
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
      />

      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full"
        style={{
          x: ringX,
          y: ringY,
          width: 40,
          height: 40,
          translateX: '-50%',
          translateY: '-50%',
          border: '1.5px solid rgba(0,212,255,0.35)',
          boxShadow: '0 0 15px rgba(0,212,255,0.1)',
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
      />
    </>
  );
};

export default MouseFollower;
