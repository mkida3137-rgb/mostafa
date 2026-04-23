import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { Camera, Shield, BarChart3, ChevronRight, Cpu, Zap, Activity } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export function Overlay() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const opacity1 = useTransform(scrollYProgress, [0, 0.15, 0.25], [1, 1, 0]);
  const opacity2 = useTransform(scrollYProgress, [0.2, 0.3, 0.45, 0.55], [0, 1, 1, 0]);
  const opacity3 = useTransform(scrollYProgress, [0.5, 0.6, 0.75, 0.85], [0, 1, 1, 0]);
  const opacity4 = useTransform(scrollYProgress, [0.8, 0.9, 1], [0, 1, 1]);

  return (
    <div ref={containerRef} className="relative z-10">
      {/* SECTION 1: HERO */}
      <section className="h-[100vh] flex flex-col items-center justify-center relative overflow-hidden">
        <motion.div 
          style={{ opacity: opacity1 }}
          className="text-center px-6 max-w-4xl"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-accent/30 bg-brand-accent/10 text-brand-accent text-xs font-medium tracking-widest uppercase mb-8"
          >
            <Activity className="w-3 h-3" />
            AI Intelligence Pulse Active
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-5xl md:text-8xl font-display font-bold tracking-tighter mb-6 bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent"
          >
            AUTO CAST
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-lg md:text-2xl text-white/50 font-light max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            The next generation of automotive intelligence. Real-time diagnostics, damage analysis, and cost projection.
          </motion.p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.5, delay: 0.8 }}
              className="h-[1px] w-32 bg-gradient-to-r from-transparent to-brand-accent"
            />
            <span className="text-[10px] uppercase tracking-[0.4em] text-brand-accent/60 font-medium">Scroll to explore</span>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.5, delay: 0.8 }}
              className="h-[1px] w-32 bg-gradient-to-l from-transparent to-brand-accent"
            />
          </div>
        </motion.div>
        
        {/* Decorative holographic frames */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
            <div className="absolute top-10 left-10 w-64 h-64 border-t border-l border-brand-accent/40 rounded-tl-3xl" />
            <div className="absolute bottom-10 right-10 w-64 h-64 border-b border-r border-brand-accent/40 rounded-br-3xl" />
        </div>
      </section>

      {/* SECTION 2: AI DETECTION */}
      <section className="h-[100vh] flex items-center justify-end px-6 md:px-24">
        <motion.div 
          style={{ opacity: opacity2 }}
          className="max-w-xl glass p-8 md:p-12 rounded-[2rem] border border-white/5 shadow-2xl relative"
        >
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-brand-accent/20 blur-[60px] rounded-full" />
          
          <Shield className="w-12 h-12 text-brand-accent mb-6" />
          <h2 className="text-3xl md:text-5xl font-display font-medium mb-6 tracking-tight">AI Collision <br/><span className="text-brand-accent">Precision Scan</span></h2>
          <p className="text-lg text-white/60 font-light leading-relaxed mb-8">
            Our computer vision model identifies structural damage with 99.8% accuracy. Instant telemetry and deformation analysis for rapid reporting.
          </p>
          
          <div className="space-y-4">
            {[
              { label: 'Surface Scanning', value: 87, icon: Camera },
              { label: 'Structural Integrity', value: 94, icon: Cpu },
              { label: 'Deformation Logic', value: 99, icon: Zap },
            ].map((item, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-xs font-display uppercase tracking-widest text-white/40">
                  <span className="flex items-center gap-2"><item.icon className="w-3 h-3"/> {item.label}</span>
                  <span className="text-brand-accent">{item.value}%</span>
                </div>
                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.value}%` }}
                    className="h-full bg-brand-accent"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* SECTION 3: COST DASHBOARD */}
      <section className="h-[100vh] flex items-center justify-start px-6 md:px-24">
        <motion.div 
          style={{ opacity: opacity3 }}
          className="max-w-2xl w-full"
        >
          <div className="glass p-8 md:p-12 rounded-[2rem] border border-white/5 shadow-2xl overflow-hidden relative">
            <div className="absolute top-0 right-0 p-8">
               <Activity className="w-8 h-8 text-brand-neon animate-pulse" />
            </div>
            
            <BarChart3 className="w-12 h-12 text-brand-neon mb-6" />
            <h2 className="text-3xl md:text-5xl font-display font-medium mb-6 tracking-tight">Predictive <br/><span className="text-brand-neon">Cost Projection</span></h2>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                    <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Repairs Est.</p>
                    <p className="text-2xl font-display font-bold text-white">$12,450.00</p>
                </div>
                <div className="p-4 rounded-2xl bg-brand-neon/10 border border-brand-neon/20">
                    <p className="text-[10px] uppercase tracking-widest text-brand-neon/60 mb-1">Time to Restore</p>
                    <p className="text-2xl font-display font-bold text-brand-neon">42 Hours</p>
                </div>
            </div>

            <div className="h-40 flex items-end gap-2 px-2">
                {[40, 70, 45, 90, 65, 80, 50, 85, 95, 75].map((h, i) => (
                    <motion.div 
                        key={i}
                        className="flex-1 bg-brand-neon/40 rounded-t-sm"
                        initial={{ height: 0 }}
                        whileInView={{ height: `${h}%` }}
                        transition={{ delay: i * 0.05 }}
                    />
                ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* SECTION 4: CTA */}
      <section className="h-[100vh] flex flex-col items-center justify-center">
        <motion.div 
          style={{ opacity: opacity4 }}
          className="text-center px-6"
        >
          <h2 className="text-4xl md:text-7xl font-display font-bold mb-12 tracking-tight">Ready for the <br/><span className="text-brand-accent">Autocast Future?</span></h2>
          
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(0, 245, 255, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-5 bg-brand-accent text-brand-blue font-display font-bold text-xl uppercase tracking-widest rounded-full inline-flex items-center gap-3 transition-all cursor-pointer group"
          >
            Start Auto Cast
            <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </motion.button>
          
          <p className="mt-8 text-white/30 text-sm font-light tracking-[0.2em] uppercase">Join the 15,000+ logistics partners</p>
        </motion.div>
      </section>

      {/* Global Scroll Indicator */}
      <motion.div 
        className="fixed bottom-0 left-0 h-1 bg-brand-accent z-50 origin-left"
        style={{ scaleX: scrollYProgress }}
      />
      
      {/* Decorative Particles handled by Scene but we could add some UI ones */}
    </div>
  );
}
