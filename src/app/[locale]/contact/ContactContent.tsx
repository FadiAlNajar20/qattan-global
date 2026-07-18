"use client";

import { motion, Variants } from "framer-motion";
import { Phone, Mail, Globe, MapPin } from "lucide-react";
import ContactForm from "@/components/forms/ContactForm";
import type { Dictionary } from "@/types";

interface Props {
  dict: Dictionary;
}

const leftContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const leftItemVariants: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const mapVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.4 },
  },
};

export default function ContactContent({ dict }: Props) {
  const c = dict.contact;

  return (
    <section className="bg-white pt-28 lg:pt-32 pb-12 relative z-0">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 pb-8 items-start">
          {/* Left Column (lg:col-span-4) - Corporate Metadata */}
          <motion.div
            className="lg:col-span-4 flex flex-col gap-12"
            variants={leftContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <div>
              <motion.h2
                variants={leftItemVariants}
                className="font-bold text-slate-900 text-3xl mb-8 tracking-tight"
              >
                {c.detailsTitle}
              </motion.h2>
              <motion.ul
                variants={leftContainerVariants}
                className="space-y-6"
                role="list"
              >
                <motion.li variants={leftItemVariants}>
                  <a
                    href="tel:+96279709066"
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-12 h-12 rounded-sm border border-slate-500 flex items-center justify-center shrink-0 group-hover:border-amber-500 group-hover:text-amber-500 transition-colors">
                      <Phone
                        size={18}
                        className="text-slate-500 group-hover:text-amber-500 transition-colors"
                      />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-amber-500 mb-1">
                        {c.phoneLabel}
                      </p>
                      <p
                        className="text-slate-900 font-medium tracking-wide"
                        dir="ltr"
                      >
                        +962 79 709 0660
                      </p>
                    </div>
                  </a>
                </motion.li>
                <motion.li variants={leftItemVariants}>
                  <a
                    href="mailto:contact@qattanglobal.com"
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-12 h-12 rounded-sm border border-slate-500 flex items-center justify-center shrink-0 group-hover:border-amber-500 transition-colors">
                      <Mail
                        size={18}
                        className="text-slate-500 group-hover:text-amber-500 transition-colors"
                      />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-amber-500 mb-1">
                        {c.emailLabel}
                      </p>
                      <p className="text-slate-900 font-medium tracking-wide">
                        contact@qattanglobal.com
                      </p>
                    </div>
                  </a>
                </motion.li>
                <motion.li variants={leftItemVariants}>
                  <a
                    href="https://www.qattanglobal.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-12 h-12 rounded-sm border border-slate-500 flex items-center justify-center shrink-0 group-hover:border-amber-500 transition-colors">
                      <Globe
                        size={18}
                        className="text-slate-500 group-hover:text-amber-500 transition-colors"
                      />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-amber-500 mb-1">
                        {c.websiteLabel}
                      </p>
                      <p className="text-slate-900 font-medium tracking-wide">
                        www.qattanglobal.com
                      </p>
                    </div>
                  </a>
                </motion.li>
                <motion.li
                  variants={leftItemVariants}
                  className="flex items-start gap-4"
                >
                  <div className="w-12 h-12 rounded-sm border border-slate-500 flex items-center justify-center shrink-0">
                    <MapPin size={18} className="text-slate-500" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-amber-500 mb-1">
                      {c.addressLabel}
                    </p>
                    <p className="text-slate-900 font-medium leading-relaxed max-w-[200px]">
                      {c.address}
                    </p>
                  </div>
                </motion.li>
              </motion.ul>
            </div>

            {/* Typography-driven Operating Hours */}
            <motion.div
              variants={leftItemVariants}
              className="pt-8 border-t border-slate-100"
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-500 mb-3">
                Headquarters Operating Hours
              </p>
              <div className="space-y-1">
                <p className="font-serif text-slate-900 text-lg">
                  Sunday - Thursday
                </p>
                <p className="text-slate-500 font-medium tracking-wide">
                  9:00 AM - 5:30 PM (AST)
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column (lg:col-span-8) - The Premium Form Canvas */}
          <div className="lg:col-span-8">
            <div className="bg-white p-0 lg:pl-10">
              <ContactForm dict={dict} />
            </div>
          </div>
        </div>

        {/* Full-Bleed Monochrome Interactive Map Integration */}
        <motion.div
          className="w-full h-[450px] mt-24 mb-24 rounded-xl overflow-hidden relative shadow-inner"
          variants={mapVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d108269.80532731114!2d35.84566373752538!3d31.95460592931818!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151b5f7e7f722a55%3A0x2dbf4e0c4e7ab56a!2sAmman%2C%20Jordan!5e0!3m2!1sen!2sus!4v1714578912345!5m2!1sen!2sus"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full border-0"
            title="Qattan Global Headquarters Location"
          />
        </motion.div>
      </div>
    </section>
  );
}
