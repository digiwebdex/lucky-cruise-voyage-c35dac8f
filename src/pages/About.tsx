import { motion } from "framer-motion";
import { Shield, Heart, Target, Users, Ship, Award, Globe, Compass } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { teamMembers } from "@/services/mockData";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };
const scaleIn = { hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 } };

export default function About() {
  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="gradient-hero py-20 md:py-28 text-center relative overflow-hidden">
        <div className="container relative">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary mb-6">
              <Compass className="h-4 w-4" /> Since 2010
            </span>
            <h1 className="font-display text-4xl md:text-6xl font-black text-secondary-foreground">
              About <span className="text-gradient">Lucky Tours & Travels</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-secondary-foreground/60 leading-relaxed">
              Bringing you the finest cruise experiences across Bangladesh's magnificent waterways.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <span className="text-sm font-bold uppercase tracking-widest text-primary">Our Story</span>
              <h2 className="mt-3 font-display text-3xl md:text-4xl font-black text-foreground">
                A Journey of <span className="text-gradient">Passion</span>
              </h2>
              <p className="mt-6 text-muted-foreground leading-relaxed text-lg">
                Lucky Tours & Travels was founded with a simple vision: to let everyone experience the incredible beauty of Bangladesh's waterways. 
                From the mystical Sundarbans to the serene rivers of the south, our cruise tours offer an unforgettable journey through nature's finest landscapes.
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Over the years, we have served thousands of happy travellers, and our commitment to safety, comfort, and exceptional service has made us one of the most trusted names in cruise tourism.
              </p>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn} className="grid grid-cols-2 gap-4">
              {[
                { value: "6+", label: "Cruise Ships", icon: Ship },
                { value: "5000+", label: "Happy Travellers", icon: Users },
                { value: "50+", label: "Tours Completed", icon: Globe },
                { value: "15+", label: "Years Experience", icon: Award },
              ].map((s, i) => (
                <Card key={i} className="border-border/50 hover:shadow-elevated transition-all duration-500 hover:-translate-y-1 bg-card text-center">
                  <CardContent className="p-6">
                    <s.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                    <div className="text-3xl font-display font-black text-primary">{s.value}</div>
                    <div className="mt-1 text-sm text-muted-foreground font-medium">{s.label}</div>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission / Values */}
      <section className="bg-warm-bg py-20 relative overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
        <div className="container relative">
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { icon: Target, title: "Our Mission", desc: "To provide world-class cruise experiences at affordable prices, making water tourism accessible to all Bangladeshis and international visitors.", color: "bg-primary/10 text-primary" },
              { icon: Heart, title: "Our Values", desc: "Safety, integrity, customer satisfaction, and environmental responsibility guide everything we do on and off the water.", color: "bg-emerald/10 text-emerald" },
              { icon: Shield, title: "Our Promise", desc: "Every trip is backed by our commitment to quality, safety, and creating unforgettable memories that last a lifetime.", color: "bg-gold/10 text-gold" },
            ].map((item, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.1 }}>
                <Card className="border-border/50 hover:shadow-elevated transition-all duration-500 hover:-translate-y-2 h-full text-center bg-card">
                  <CardContent className="p-8">
                    <div className={`mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl ${item.color}`}>
                      <item.icon className="h-8 w-8" />
                    </div>
                    <h3 className="mb-3 font-display text-xl font-bold text-foreground">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-14">
            <span className="text-sm font-bold uppercase tracking-widest text-primary">Our People</span>
            <h2 className="mt-3 font-display text-4xl font-black text-foreground">Meet the <span className="text-gradient">Team</span></h2>
          </motion.div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn} transition={{ delay: i * 0.08 }}>
                <Card className="border-border/50 hover:shadow-elevated transition-all duration-500 hover:-translate-y-2 text-center bg-card">
                  <CardContent className="p-6">
                    <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl gradient-primary text-primary-foreground">
                      <Users className="h-8 w-8" />
                    </div>
                    <h3 className="font-display font-bold text-foreground">{member.name}</h3>
                    <p className="text-sm text-primary font-medium">{member.role}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
