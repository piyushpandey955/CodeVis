// eslint-disable-next-line no-unused-vars
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";
import PropTypes from 'prop-types';

export default function Typewriter({ text, delay = 0, speed = 0.05 }) {
// ...existing code...
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const displayText = useTransform(rounded, (latest) => text.slice(0, latest));

  useEffect(() => {
    const controls = animate(count, text.length, {
      type: "tween",
      delay: delay,
      duration: text.length * speed,
      ease: "linear",
    });
    return controls.stop;
  }, [text, speed, delay, count]);

  return (
    <>
      <motion.span>{displayText}</motion.span>
      <motion.span
        className="inline-block -translate-y-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 1, 0, 0] }}
        transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
      >
        |
      </motion.span>
    </>
  );
}

Typewriter.propTypes = {
    text: PropTypes.string.isRequired,
    delay: PropTypes.number,
    speed: PropTypes.number,
}