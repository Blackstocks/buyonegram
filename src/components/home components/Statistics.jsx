import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const stats = [
  { label: 'Verified Suppliers', value: 1000, suffix: '+' },
  { label: 'Products Available', value: 500, suffix: '+' },
  { label: 'Countries Served', value: 50, suffix: '+' },
  { label: 'Active Buyers', value: 5000, suffix: '+' }
];

const StatCounter = ({ value, suffix }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 50;
    const increment = value / steps;
    const interval = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      if (currentStep === steps) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(currentStep * increment));
      }
    }, interval);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <span className="text-4xl font-bold text-primary">
      {count}{suffix}
    </span>
  );
};

const Statistics = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <StatCounter value={stat.value} suffix={stat.suffix} />
              <p className="mt-2 text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;