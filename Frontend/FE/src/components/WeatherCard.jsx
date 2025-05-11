import InputForm from "./InputForm";
import OutputDisplay from "./OutputDisplay";
import { motion, AnimatePresence } from "framer-motion";

const WeatherCard = ({
  data,
  display,
  onChange,
  onSubmit,
  predictionResult,
}) => {
  // Judul default
  const title = predictionResult ?? "Masukan Data";

  // Tentukan icon berdasarkan prediksi
  let iconSrc = "/img/search.png";
  if (predictionResult === "Hujan") iconSrc = "/img/rain.png";
  else if (predictionResult === "Cerah") iconSrc = "/img/clouds.png";

  return (
    <div className="w-full max-w-5xl flex bg-black/40 rounded-2xl backdrop-blur-md shadow-xl overflow-hidden">
      {/* Form Panel */}
      <motion.div
        className="flex-1 p-8 text-white flex justify-center items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-full max-w-sm">
          <InputForm data={data} onChange={onChange} onSubmit={onSubmit} />
        </div>
      </motion.div>

      {/* Display Panel */}
      <motion.div
        className="flex-1 p-8 text-white flex flex-col items-center justify-center text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Container tetap ukuran tetap */}
        <div className="relative w-32 h-40 mb-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={title}
              className="absolute inset-0 flex flex-col items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <img
                src={iconSrc}
                alt={title}
                className="w-24 h-24 object-contain"
              />
              <h2 className="text-2xl font-bold mt-2">{title}</h2>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Output Data */}
        <AnimatePresence>
          {display && (
            <motion.div
              key="output"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-sm"
            >
              <OutputDisplay data={display} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default WeatherCard;
