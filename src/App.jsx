import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import { Terminal, Code2, Palette, ArrowUpRight } from "lucide-react";

export default function App() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div className="min-h-screen text-white font-sans selection:bg-metaOrange">
      {/* MetaMask Interactive Glow */}
      <div 
        className="fixed w-[500px] h-[500px] bg-metaOrange/10 rounded-full blur-[120px] pointer-events-none z-0"
        style={{ left: mousePos.x - 250, top: mousePos.y - 250, transition: 'all 0.15s ease-out' }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md border-b border-white/5 px-8 py-4 flex justify-between items-center">
        <div className="font-black text-xl tracking-tighter italic">SHYANI.</div>
        <div className="flex gap-8 text-sm font-medium text-gray-400">
          <a href="#work" className="hover:text-metaOrange transition">Projects</a>
          <a href="#about" className="hover:text-metaOrange transition">The Vibe</a>
          <button className="bg-metaOrange px-5 py-2 rounded-full text-white font-bold text-xs hover:bg-metaOrangeHover transition-transform active:scale-95">
            LET'S BUILD
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden pt-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] tracking-[0.3em] uppercase mb-8"
        >
          <Terminal size={12} className="text-metaOrange" />
          System Status: Optimal 
        </motion.div>

        <div className="text-center z-10 px-4">
          <h1 className="text-6xl md:text-[120px] font-black leading-[0.9] tracking-tighter mb-8">
            <motion.span 
              initial={{ filter: "blur(10px)", opacity: 0 }}
              animate={{ filter: "blur(0px)", opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="block text-gray-500 italic"
            >
              DESIGN VIBE
            </motion.span>
            <motion.span 
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
              className="block bg-gradient-to-r from-white via-metaOrange to-purple-500 bg-clip-text text-transparent"
            >
              CODER ONLY
            </motion.span>
          </h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="max-w-2xl mx-auto text-gray-400 text-lg md:text-xl font-light leading-relaxed"
          >
            Crafting high-fidelity interfaces with <span className="text-white font-mono">&lt;clean_code/&gt;</span>. 
            Focused on bridging the gap between aesthetic soul and technical performance.
          </motion.p>
        </div>

        {/* Playful Coder Animation: Floating Syntax Elements */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <FloatingElement delay={0} x="10%" y="20%" icon={<Code2 size={40}/>} />
          <FloatingElement delay={2} x="85%" y="15%" icon={<Palette size={40}/>} />
          <FloatingElement delay={1} x="15%" y="70%" icon={<ArrowUpRight size={40}/>} />
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 font-mono text-[10px] text-gray-600 tracking-widest"
        >
          SCROLL.TO_EXPLORE()
        </motion.div>
      </section>

      {/* Real Content Section: Selected Works */}
      <section id="work" className="py-32 px-8 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-16 tracking-tighter underline decoration-metaOrange decoration-4 underline-offset-8">Selected Builds</h2>
        <div className="grid md:grid-cols-2 gap-12">
          <ProjectCard 
            title="Meta-UX Redesign" 
            tags={["React", "Web3", "Framer"]} 
            desc="A complete overhaul of a decentralized exchange interface, prioritizing user onboarding and gas-efficiency visuals."
          />
          <ProjectCard 
            title="Vibe-Script Engine" 
            tags={["Node.js", "Canvas", "GLSL"]} 
            desc="A creative coding library for generating real-time interactive backgrounds for high-end SaaS landing pages."
          />
        </div>
      </section>
    </div>
  );
}

function FloatingElement({ icon, x, y, delay }) {
  return (
    <motion.div 
      style={{ left: x, top: y }}
      initial={{ y: 0 }}
      animate={{ y: [0, -40, 0], rotate: [0, 10, -10, 0] }}
      transition={{ delay, duration: 5, repeat: Infinity, ease: "easeInOut" }}
      className="absolute text-metaOrange"
    >
      {icon}
    </motion.div>
  );
}

function ProjectCard({ title, tags, desc }) {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="group bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/[0.08] transition-all cursor-pointer"
    >
      <div className="flex justify-between items-start mb-6">
        <div className="flex gap-2">
          {tags.map(t => <span key={t} className="text-[10px] font-mono border border-metaOrange/30 text-metaOrange px-2 py-1 rounded-md">{t}</span>)}
        </div>
        <ArrowUpRight className="text-gray-600 group-hover:text-metaOrange transition-colors" />
      </div>
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <p className="text-gray-400 font-light leading-relaxed">{desc}</p>
    </motion.div>
  );
}
