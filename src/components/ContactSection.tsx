import { useState } from "react";
import { Send, Mail, Phone, MapPin, Linkedin, Twitter, Github, CheckCircle } from "lucide-react";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    const response = await fetch(
      `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/Form%20Submissions`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fields: {
            Name: formData.name,
            Email: formData.email,
            Subject: formData.subject,
            Message: formData.message,
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to submit form");
    }

    // Successful submission
    setIsSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "" });

    // Reset submission state after animation
    setTimeout(() => setIsSubmitted(false), 3000);
  } catch (error) {
    console.error(error);
    alert("There was an error submitting the form. Please try again.");
  } finally {
    setIsSubmitting(false);
  }
};


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section id="contact" className="py-24 bg-card relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-accent/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Let's Build <span className="text-gradient">Together</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Ready to transform your ideas into reality? Get in touch and let's discuss your next project.
          </p>
        </div>

       <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto px-6">

          {/* Contact Info */}
          <div className="space-y-8">
  <div>
    <h3 className="text-xl font-semibold text-foreground mb-6">
      Get in Touch
    </h3>

    <div className="space-y-6">
      {/* EMAIL (ONLY ON TOP) */}
      <a
        href="mailto:sadamashrafdev@gmail.com"
        className="flex items-center gap-4 group"
      >
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
          <Mail className="text-primary" size={20} />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Email</p>
          <p className="text-foreground group-hover:text-primary transition-colors">
            sadamashrafdev@gmail.com
          </p>
        </div>
      </a>

      {/* PAKISTAN */}
      <div className="flex items-start gap-4 group">
        <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
          <Phone className="text-accent" size={20} />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Pakistan Office</p>
          <p className="text-foreground mb-1">
            +92 304 695 8943
          </p>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin size={16} />
            <span>28 E, 2nd Floor, Gulberg 2, Lahore, Pakistan</span>
          </div>
        </div>
      </div>

      {/* BAKU */}
      <div className="flex items-start gap-4 group">
        <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
          <Phone className="text-accent" size={20} />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Baku Office</p>
          <p className="text-foreground mb-1">
            +944 706 675 597
          </p>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin size={16} />
            <span>
              4th Floor, 69 Nizami St, Baku 1005, Azerbaijan
            </span>
          </div>
        </div>
      </div>

      {/* USA */}
      <div className="flex items-start gap-4 group">
        <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
          <Phone className="text-accent" size={20} />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">USA Office</p>
          <p className="text-foreground mb-1">
            +1 307 310 5878
          </p>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin size={16} />
            <span>
              30 N Gould Ste R, Sheridan WY 82801
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>

  {/* Social Links (same as before) */}
  <div>
    <h4 className="text-sm text-muted-foreground mb-4">Follow Us</h4>
    <div className="flex gap-3">
      {[
        { icon: Linkedin, href: "https://www.linkedin.com/company/qubixn", label: "LinkedIn" },
        { icon: Twitter, href: "https://x.com/qubixen", label: "Twitter" },
        { icon: Github, href: "https://github.com/qubixen?tab=repositories", label: "GitHub" },
      ].map(({ icon: Icon, href, label }) => (
        <a
          key={label}
          href={href}
          aria-label={label}
          target="blank" 
          className="w-10 h-10 glass glass-hover  rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
        >
          <Icon size={18} />
        </a>
      ))}
    </div>
  </div>
</div>


          {/* Contact Form */}
          <div className="glass rounded-2xl p-6 md:p-8">
            {isSubmitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 fade-in">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                  <CheckCircle className="text-primary" size={32} />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Message Sent!</h3>
                <p className="text-muted-foreground">We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-sm text-muted-foreground mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm text-muted-foreground mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm text-muted-foreground mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                    placeholder="Project Inquiry"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm text-muted-foreground mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-foreground text-background rounded-xl font-medium hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 disabled:opacity-70 group"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send size={16} className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
