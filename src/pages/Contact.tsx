import { motion } from "framer-motion";
import { Phone, Mail, MapPin, MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { getSettings } from "@/services/cmsStore";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

export default function Contact() {
  const { t } = useLanguage();
  const settings = getSettings();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const data = new FormData(form);
    const msg = encodeURIComponent(
      `Contact Inquiry\n\nName: ${data.get("name")}\nEmail: ${data.get("email")}\nMessage: ${data.get("message")}`
    );
    window.open(`https://wa.me/${settings.whatsapp}?text=${msg}`, "_blank");
  };

  return (
    <div>
      <section className="gradient-hero py-16 md:py-20 text-center relative overflow-hidden">
        <div className="container relative">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <h1 className="font-display text-4xl md:text-5xl font-black text-secondary-foreground">
              {t.contact.title} <span className="text-gradient">{t.contact.titleHighlight}</span>
            </h1>
            <p className="mt-3 text-secondary-foreground/60 max-w-md mx-auto">{t.contact.subtitle}</p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-2">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="space-y-6">
              <div>
                <span className="text-sm font-bold uppercase tracking-widest text-primary">{t.contact.getInTouch}</span>
                <h2 className="mt-2 font-display text-3xl font-black text-foreground">{t.contact.planAdventure} <span className="text-gradient">{t.contact.adventureHighlight}</span></h2>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { icon: Phone, label: t.contact.phone, value: settings.phone, color: "bg-primary/10 text-primary" },
                  { icon: MessageCircle, label: t.contact.whatsapp, value: settings.phone, link: `https://wa.me/${settings.whatsapp}`, color: "bg-emerald/10 text-emerald" },
                  { icon: Mail, label: t.contact.email, value: settings.email, color: "bg-gold/10 text-gold" },
                  { icon: MapPin, label: t.contact.address, value: settings.address, color: "bg-accent/10 text-accent" },
                ].map((item, i) => (
                  <Card key={i} className="border-border/50 hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 bg-card">
                    <CardContent className="flex items-center gap-4 p-5">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${item.color} flex-shrink-0`}>
                        <item.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">{item.label}</p>
                        {item.link ? (
                          <a href={item.link} target="_blank" rel="noopener noreferrer" className="font-display font-bold text-foreground hover:text-primary transition-colors">{item.value}</a>
                        ) : (
                          <p className="font-display font-bold text-foreground">{item.value}</p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="overflow-hidden rounded-2xl shadow-elevated">
                <iframe
                  title="Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d233668.38703692693!2d90.27923710646989!3d23.780573258035943!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b087026b81%3A0x8fa563b5c6e9a1ab!2sDhaka!5e0!3m2!1sen!2sbd!4v1711871072"
                  width="100%"
                  height="250"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: 0.1 }}>
              <Card className="border-border/50 shadow-elevated bg-card">
                <CardContent className="p-5 sm:p-8">
                  <h2 className="mb-2 font-display text-2xl font-bold text-foreground">{t.contact.sendMessage}</h2>
                  <p className="mb-6 text-sm text-muted-foreground">{t.contact.messageSentVia}</p>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <Label htmlFor="name" className="text-sm font-semibold">{t.booking.name}</Label>
                      <Input id="name" name="name" placeholder={t.contact.yourName} required className="mt-1.5 rounded-xl h-12" />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-sm font-semibold">{t.contact.email}</Label>
                      <Input id="email" name="email" type="email" placeholder={t.contact.yourEmail} required className="mt-1.5 rounded-xl h-12" />
                    </div>
                    <div>
                      <Label htmlFor="message" className="text-sm font-semibold">{t.contact.messageLabel}</Label>
                      <Textarea id="message" name="message" placeholder={t.contact.messagePlaceholder} rows={5} required className="mt-1.5 rounded-xl" />
                    </div>
                    <Button type="submit" size="lg" className="w-full gradient-primary text-primary-foreground font-bold text-base rounded-xl h-13 gap-2 hover:scale-[1.02] transition-transform">
                      <Send className="h-5 w-5" /> {t.contact.sendViaWhatsApp}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
