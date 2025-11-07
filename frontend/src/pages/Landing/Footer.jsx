import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import SectionWrapper from '../../components/layout/SectionWrapper';
import FloatingGraph from '../../components/three/FloatingGraph';

const Footer = () => {
  const socialLinks = [
    { icon: <FaGithub />, url: 'https://github.com/piyushpandey955/CodeVis' },
    { icon: <FaLinkedin />, url: 'https://www.linkedin.com/in/piyushpandey955/' },
    { icon: <FaTwitter />, url: 'https://twitter.com/piyushpandey955' },
  ];

  return (
    <SectionWrapper threeComponent={FloatingGraph}>
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">Connect With Us</h3>
          <div className="flex space-x-6 mb-6">
            {socialLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className="text-3xl text-white hover:text-brand-purple transition-colors duration-300"
              >
                {link.icon}
              </motion.a>
            ))}
          </div>
          <div className="border-t border-white/20 w-full my-6"></div>
          <p className="text-gray-400">&copy; {new Date().getFullYear()} CodeVis. All rights reserved.</p>
        </motion.div>
      </div>
    </SectionWrapper>
  );
};

export default Footer;
