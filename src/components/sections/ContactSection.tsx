import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, CheckCircle } from 'lucide-react';
import emailjs from 'emailjs-com';

const SOCIAL_LINKS = [
  {
    icon: Github,
    label: 'GitHub',
    url: 'https://github.com/1Nilesh0837',
    followers: '50+ projects',
    color: 'from-gray-800 to-black',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    url: 'https://linkedin.com/in/nilesh',
    followers: '500+ connections',
    color: 'from-blue-600 to-blue-800',
  },
  {
    icon: Mail,
    label: 'Email',
    url: 'mailto:contact@nilesh.dev',
    followers: 'Direct contact',
    color: 'from-red-600 to-pink-600',
  },
];

export const ContactSection = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const gradientRef = useRef<HTMLDivElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Using Formspree for email submission
      const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState),
      });

      if (response.ok) {
        setSuccess(true);
        setFormState({ name: '', email: '', message: '' });
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative w-full min-h-screen bg-slate-950 py-20 overflow-hidden">
      {/* Shader Gradient Background */}
      <div ref={gradientRef} className="absolute inset-0 z-0">
        <svg viewBox="0 0 1200 800" className="w-full h-full opacity-30">
          <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 0.5 }} />
              <stop offset="50%" style={{ stopColor: '#a855f7', stopOpacity: 0.5 }} />
              <stop offset="100%" style={{ stopColor: '#ec4899', stopOpacity: 0.5 }} />
            </linearGradient>
          </defs>
          <circle cx="200" cy="150" r="300" fill="url(#grad)" />
          <circle cx="900" cy="600" r="400" fill="url(#grad)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4">
        {/* Available Status */}
        <motion.div
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-3 bg-slate-900/50 backdrop-blur-md px-6 py-3 rounded-full border border-green-500/20">
            <motion.div
              className="w-3 h-3 bg-green-500 rounded-full"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <span className="text-green-400">Available for freelance & full-time opportunities</span>
          </div>
        </motion.div>

        <h2 className="text-5xl md:text-6xl font-bold mb-16 text-center">Let's Connect</h2>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-6"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
          >
            <div>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formState.name}
                onChange={handleChange}
                className="w-full bg-slate-900 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition"
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formState.email}
                onChange={handleChange}
                className="w-full bg-slate-900 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition"
              />
            </div>
            <div>
              <textarea
                name="message"
                placeholder="Your Message"
                rows={6}
                value={formState.message}
                onChange={handleChange}
                className="w-full bg-slate-900 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition resize-none"
              />
            </div>
            <motion.button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-semibold text-white hover:shadow-lg transition flex items-center justify-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading && <motion.div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
              {success && <CheckCircle size={20} />}
              {success ? 'Message Sent!' : loading ? 'Sending...' : 'Send Message'}
            </motion.button>
          </motion.form>

          {/* Social Links with 3D Flip */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
          >
            {SOCIAL_LINKS.map((link) => (
              <SocialCard key={link.label} link={link} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const SocialCard = ({ link }: { link: (typeof SOCIAL_LINKS)[0] }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const Icon = link.icon;

  return (
    <motion.div
      className="h-32 cursor-pointer perspective"
      onHoverStart={() => setIsFlipped(true)}
      onHoverEnd={() => setIsFlipped(false)}
      animate={{ rotateY: isFlipped ? 180 : 0 }}
      transition={{ duration: 0.6 }}
      style={{ perspective: '1000px' }}
    >
      <motion.a
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        className={`w-full h-full p-6 rounded-lg bg-gradient-to-br ${link.color} flex flex-col justify-between text-white hover:shadow-xl transition block`}
        style={{
          backfaceVisibility: 'hidden',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        <Icon size={32} />
        <h3 className="text-xl font-bold">{link.label}</h3>
      </motion.a>

      {/* Back Face */}
      <motion.div
        className={`absolute inset-0 p-6 rounded-lg bg-gradient-to-br ${link.color} flex flex-col justify-center items-center text-white text-center`}
        style={{
          backfaceVisibility: 'hidden',
          transform: isFlipped ? 'rotateY(0deg)' : 'rotateY(180deg)',
        }}
      >
        <p className="text-sm font-semibold">{link.followers}</p>
        <p className="text-xs mt-2 opacity-80">Follow & Connect</p>
      </motion.div>
    </motion.div>
  );
};