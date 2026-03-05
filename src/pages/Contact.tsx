import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

export default function Contact() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const data = new FormData(form);
    const msg = encodeURIComponent(
      `Contact Inquiry\n\nName: ${data.get("name")}\nEmail: ${data.get("email")}\nMessage: ${data.get("message")}`
    );
    window.open(`https://wa.me/8801711871072?text=${msg}`, "_blank");
  };

  return (
    <div>
      <section className="bg-secondary py-12 text-center text-secondary-foreground">
        <div className="container">
          <h1 className="text-3xl font-extrabold md:text-4xl">Contact <span className="text-primary">Us</span></h1>
          <p className="mt-2 text-secondary-foreground/80">We'd love to hear from you</p>
        </div>
      </section>

      <section className="py-12">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Contact Info */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-secondary">Get in Touch</h2>
              {[
                { icon: Phone, label: "Phone", value: "01711871072" },
                { icon: MessageCircle, label: "WhatsApp", value: "01711871072", link: "https://wa.me/8801711871072" },
                { icon: Mail, label: "Email", value: "info@luckytoursbd.com" },
                { icon: MapPin, label: "Address", value: "Dhaka, Bangladesh" },
              ].map((item, i) => (
                <Card key={i} className="border-border">
                  <CardContent className="flex items-center gap-4 p-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">{item.label}</p>
                      {item.link ? (
                        <a href={item.link} target="_blank" rel="noopener noreferrer" className="font-medium text-secondary hover:text-primary">{item.value}</a>
                      ) : (
                        <p className="font-medium text-secondary">{item.value}</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Embedded Map */}
              <div className="overflow-hidden rounded-lg">
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
            </div>

            {/* Contact Form */}
            <Card className="border-border">
              <CardContent className="p-6">
                <h2 className="mb-6 text-2xl font-bold text-secondary">Send a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" name="name" placeholder="Your name" required />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" placeholder="your@email.com" required />
                  </div>
                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" name="message" placeholder="How can we help?" rows={5} required />
                  </div>
                  <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">Send via WhatsApp</Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
