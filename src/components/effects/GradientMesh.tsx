const GradientMesh: React.FC = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Cyber-blue blob — top left */}
      <div
        className="absolute -top-[25%] -left-[15%] w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] rounded-full opacity-[0.12] animate-blob"
        style={{
          background: 'radial-gradient(circle, #00D4FF 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      {/* Neon-purple blob — center right */}
      <div
        className="absolute top-[30%] -right-[10%] w-[45vw] h-[45vw] max-w-[650px] max-h-[650px] rounded-full opacity-[0.10] animate-blob"
        style={{
          background: 'radial-gradient(circle, #7B61FF 0%, transparent 70%)',
          filter: 'blur(80px)',
          animationDelay: '2s',
          animationDirection: 'reverse',
        }}
      />

      {/* Neon-green blob — bottom left */}
      <div
        className="absolute -bottom-[20%] left-[10%] w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] rounded-full opacity-[0.10] animate-blob"
        style={{
          background: 'radial-gradient(circle, #00FF88 0%, transparent 70%)',
          filter: 'blur(80px)',
          animationDelay: '4s',
        }}
      />

      {/* Secondary cyber-blue blob — bottom right */}
      <div
        className="absolute bottom-[10%] right-[20%] w-[30vw] h-[30vw] max-w-[450px] max-h-[450px] rounded-full opacity-[0.08] animate-blob"
        style={{
          background: 'radial-gradient(circle, #00D4FF 0%, transparent 70%)',
          filter: 'blur(100px)',
          animationDelay: '3s',
          animationDirection: 'reverse',
        }}
      />

      {/* Subtle purple accent — top right */}
      <div
        className="absolute -top-[10%] right-[30%] w-[25vw] h-[25vw] max-w-[400px] max-h-[400px] rounded-full opacity-[0.08] animate-float-slow"
        style={{
          background: 'radial-gradient(circle, #7B61FF 0%, transparent 70%)',
          filter: 'blur(90px)',
        }}
      />
    </div>
  );
};

export default GradientMesh;
