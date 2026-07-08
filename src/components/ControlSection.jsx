import React from 'react';
import { motion } from 'framer-motion';
import { HiMap, HiUserGroup, HiLightningBolt } from 'react-icons/hi';
import NeonJoystick from './NeonJoystick';

export default function ControlSection() {
  const cards = [
    {
      title: "Explore Map",
      description: "Navigate the massive open world of Leonida, from the neon streets of Vice City to the swampy depths.",
      icon: <HiMap className="w-6 h-6 text-[#FF5FAF]" />,
      border: "hover:border-[#FF5FAF]/50",
      delay: 0.1
    },
    {
      title: "Discover Characters",
      description: "Uncover the stories of Jason, Lucia, and the vast network of criminals running the underworld.",
      icon: <HiUserGroup className="w-6 h-6 text-[#FF8A2A]" />,
      border: "hover:border-[#FF8A2A]/50",
      delay: 0.2
    },
    {
      title: "Follow GTA VI Updates",
      description: "Stay plugged into the latest official news, trailers, and community rumors.",
      icon: <HiLightningBolt className="w-6 h-6 text-[#9D4EDD]" />,
      border: "hover:border-[#9D4EDD]/50",
      delay: 0.3
    }
  ];

  return (
    <section className="relative py-24 bg-[#0B0B0D] overflow-hidden border-t border-white/5">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FF5FAF]/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-24">
          
          {/* Mobile Text (Hidden on Desktop) */}
          <div className="w-full block lg:hidden order-1 mb-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display font-black text-white uppercase tracking-tighter mb-4 leading-tight" style={{ fontSize: 'clamp(2rem, 10vw, 4rem)' }}>
                Take Control of <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5FAF] to-[#FF8A2A]">Vice City</span>
              </h2>
              <p className="text-[#9A9AA3] text-base mb-2 font-light leading-relaxed">
                Experience the ultimate fan hub. Interact with the elements below to navigate the neon-soaked streets of Leonida and uncover all the intel we have on the next generation of Grand Theft Auto.
              </p>
            </motion.div>
          </div>

          {/* Joystick Side */}
          <div className="w-full lg:w-[42%] flex items-center justify-center lg:pl-12 order-2 lg:order-1 mt-4 lg:mt-0 mb-4 lg:mb-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="relative w-full flex justify-center"
            >
              <NeonJoystick />
            </motion.div>
          </div>

          {/* Text/Cards Side */}
          <div className="w-full lg:w-[58%] order-3 lg:order-2">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <div className="hidden lg:block">
                <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-white uppercase tracking-tighter mb-6 leading-tight">
                  Take Control of <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5FAF] to-[#FF8A2A]">Vice City</span>
                </h2>
                <p className="text-[#9A9AA3] text-lg mb-12 max-w-xl font-light leading-relaxed">
                  Experience the ultimate fan hub. Interact with the elements below to navigate the neon-soaked streets of Leonida and uncover all the intel we have on the next generation of Grand Theft Auto.
                </p>
              </div>
              
              <div className="flex flex-col gap-6 max-w-lg">
                {cards.map((card, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: card.delay }}
                    className={`group p-6 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-md flex gap-5 transition-all duration-300 ${card.border}`}
                  >
                    <div className="w-12 h-12 rounded-full bg-black/50 border border-white/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                      {card.icon}
                    </div>
                    <div>
                      <h4 className="text-white font-bold font-display text-xl uppercase tracking-wider mb-2 transition-colors">
                        {card.title}
                      </h4>
                      <p className="text-[#9A9AA3] text-sm leading-relaxed transition-colors">
                        {card.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
