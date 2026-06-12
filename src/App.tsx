import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';

// Layout
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Effects
import LoadingScreen from './components/effects/LoadingScreen';
import ParticleField from './components/effects/ParticleField';
import MouseFollower from './components/effects/MouseFollower';
import GradientMesh from './components/effects/GradientMesh';

// Sections
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import AIEngineer from './components/sections/AIEngineer';
import Projects from './components/sections/Projects';
import Achievements from './components/sections/Achievements';
import Experience from './components/sections/Experience';
import Services from './components/sections/Services';
import Contact from './components/sections/Contact';

// Features
import InteractiveTerminal from './components/features/InteractiveTerminal';
import GitHubStats from './components/features/GitHubStats';
import ThemeToggle from './components/features/ThemeToggle';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Prevent scroll during loading
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isLoading]);

  return (
    <>
      {/* Loading Screen */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {/* Background Effects Layer */}
      <ParticleField />
      <GradientMesh />

      {/* Custom Cursor */}
      <MouseFollower />

      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main>
        <Hero />
        <About />
        <Skills />
        <AIEngineer />
        <Projects />
        <Achievements />
        <Experience />

        {/* Interactive Terminal Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            <InteractiveTerminal />
          </div>
        </section>

        <Services />

        {/* GitHub Stats Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            <GitHubStats />
          </div>
        </section>

        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Theme Toggle */}
      <ThemeToggle />
    </>
  );
}

export default App;
