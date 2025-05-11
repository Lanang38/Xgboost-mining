import { motion, animate, useMotionValue } from "framer-motion";
import { useEffect, useState } from "react";

const AnimatedNumber = ({ value, suffix = "" }) => {
  const motionValue = useMotionValue(0);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const controls = animate(motionValue, value, {
      duration: 0.8,
      ease: "easeOut",
      onUpdate: (latest) => setDisplayValue(latest.toFixed(0)),
    });
    return () => controls.stop();
  }, [value]);

  return (
    <motion.p className="text-lg font-medium">
      {displayValue} {suffix}
    </motion.p>
  );
};

const OutputDisplay = ({ data }) => {
  const items = [
    { label: "Solar Radiation", value: +data.radiation || 0, suffix: "W/m²" },
    { label: "Temperature", value: +data.temperature || 0, suffix: "℃" },
    { label: "Humidity", value: +data.humidity || 0, suffix: "%" },
    { label: "Wind Speed", value: +data.windSpeed || 0, suffix: "Km/h" },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
      {items.map((item) => (
        <div key={item.label} className="bg-white/10 p-4 rounded-lg">
          <AnimatedNumber value={item.value} suffix={item.suffix} />
          <p className="text-sm">{item.label}</p>
        </div>
      ))}
    </div>
  );
};

export default OutputDisplay;
