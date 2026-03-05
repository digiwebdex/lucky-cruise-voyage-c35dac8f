import { motion } from "framer-motion";
import { Shield, Heart, Target, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { teamMembers } from "@/services/mockData";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

export default function About() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-secondary py-20 text-center text-secondary-foreground">
        <div className="container">
          <motion.h1 initial="hidden" animate="visible" variants={fadeUp} className="text-4xl font-extrabold md:text-5xl">About <span className="text-primary">Lucky Tours & Travels</span></motion.h1>
          <motion.p initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.2 }} className="mx-auto mt-4 max-w-2xl text-secondary-foreground/80">
            Bringing you the finest cruise experiences across Bangladesh since 2010.
          </motion.p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16">
        <div className="container max-w-3xl">
          <h2 className="mb-6 text-2xl font-bold text-secondary">Our Story</h2>
          <p className="text-muted-foreground leading-relaxed">
            Lucky Tours & Travels was founded with a simple vision: to let everyone experience the incredible beauty of Bangladesh's waterways. 
            From the mystical Sundarbans to the serene rivers of the south, our cruise tours offer an unforgettable journey through nature's finest landscapes.
            Over the years, we have served thousands of happy travellers, and our commitment to safety, comfort, and exceptional service has made us one of the most trusted names in cruise tourism.
          </p>
        </div>
      </section>

      {/* Mission / Values */}
      <section className="bg-warm-bg py-16">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { icon: Target, title: "Our Mission", desc: "To provide world-class cruise experiences at affordable prices, making water tourism accessible to all." },
              { icon: Heart, title: "Our Values", desc: "Safety, integrity, customer satisfaction, and environmental responsibility guide everything we do." },
              { icon: Shield, title: "Our Promise", desc: "Every trip is backed by our commitment to quality, safety, and creating unforgettable memories." },
            ].map((item, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.1 }}>
                <Card className="border-border text-center">
                  <CardContent className="p-6">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                      <item.icon className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="mb-2 text-lg font-bold text-secondary">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {[
              { value: "10+", label: "Cruise Ships" },
              { value: "5000+", label: "Happy Travellers" },
              { value: "50+", label: "Routes" },
              { value: "15+", label: "Years Experience" },
            ].map((s, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.1 }} className="text-center">
                <div className="text-3xl font-extrabold text-primary">{s.value}</div>
                <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-warm-bg py-16">
        <div className="container">
          <h2 className="mb-10 text-center text-3xl font-bold text-secondary">Our Team</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.1 }}>
                <Card className="border-border text-center">
                  <CardContent className="p-6">
                    <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                      <Users className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-bold text-secondary">{member.name}</h3>
                    <p className="text-sm text-muted-foreground">{member.role}</p>
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
