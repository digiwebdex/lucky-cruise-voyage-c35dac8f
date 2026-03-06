import { motion } from "framer-motion";
import { Shield, Heart, Target, Users, Ship, Award, Globe, Compass } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { getTeamMembers } from "@/services/cmsStore";
import { useLanguage } from "@/contexts/LanguageContext";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };
const scaleIn = { hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 } };

export default function About() {
  const { t } = useLanguage();
  const teamMembers = getTeamMembers();

  return (
    <div className="overflow-hidden">
      <section className="gradient-hero py-20 md:py-28 text-center relative overflow-hidden">
        <div className="container relative">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary mb-6">
              <Compass className="h-4 w-4" /> {t.about.since}
            </span>
            <h1 className="font-display text-4xl md:text-6xl font-black text-secondary-foreground">
              {t.about.title} <span className="text-gradient">{t.about.titleHighlight}</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-secondary-foreground/60 leading-relaxed">
              {t.about.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <span className="text-sm font-bold uppercase tracking-widest text-primary">{t.about.ourStory}</span>
              <h2 className="mt-3 font-display text-3xl md:text-4xl font-black text-foreground">
                {t.about.journeyOf} <span className="text-gradient">{t.about.passion}</span>
              </h2>
              <p className="mt-6 text-muted-foreground leading-relaxed text-lg">{t.about.storyP1}</p>
              <p className="mt-4 text-muted-foreground leading-relaxed">{t.about.storyP2}</p>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn} className="grid grid-cols-2 gap-4">
              {[
                { value: "6+", label: t.about.cruiseShips, icon: Ship },
                { value: "5000+", label: t.about.happyTravellers, icon: Users },
                { value: "50+", label: t.about.toursCompleted, icon: Globe },
                { value: "15+", label: t.about.yearsExperience, icon: Award },
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

      <section className="bg-warm-bg py-20 relative overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
        <div className="container relative">
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { icon: Target, title: t.about.ourMission, desc: t.about.ourMissionDesc, color: "bg-primary/10 text-primary" },
              { icon: Heart, title: t.about.ourValues, desc: t.about.ourValuesDesc, color: "bg-emerald/10 text-emerald" },
              { icon: Shield, title: t.about.ourPromise, desc: t.about.ourPromiseDesc, color: "bg-gold/10 text-gold" },
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

      <section className="py-20">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-14">
            <span className="text-sm font-bold uppercase tracking-widest text-primary">{t.about.ourPeople}</span>
            <h2 className="mt-3 font-display text-4xl font-black text-foreground">{t.about.meetThe} <span className="text-gradient">{t.about.team}</span></h2>
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
