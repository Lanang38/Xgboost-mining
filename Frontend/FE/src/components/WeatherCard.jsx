import InputForm from "./InputForm";
import OutputDisplay from "./OutputDisplay";
import { motion, AnimatePresence } from "framer-motion";

const WeatherCard = ({
  data,
  display,
  onChange,
  onSubmit,
  imagePreview,
  onFileChange,
}) => {
  return (
    <div className="w-full max-w-5xl flex bg-black/40 rounded-2xl backdrop-blur-md shadow-xl">
      {/* Form Panel with motion */}
      <motion.div
        className="flex-1 p-8 text-white flex justify-center items-center"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.6 }} // Slower animation
      >
        <div className="w-full max-w-sm">
          <InputForm
            data={data}
            onChange={onChange}
            onSubmit={onSubmit}
            onFileChange={onFileChange}
          />
        </div>
      </motion.div>

      {/* Image Panel with motion */}
      <motion.div
        className="flex-1 p-8 text-white flex flex-col items-center justify-center text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }} // Slower animation
      >
        <img
          src={imagePreview || "/img/search.png"}
          alt="Icon"
          className="w-24 h-24 mb-4 object-contain"
        />
        <h2 className="text-2xl font-bold mb-4">Masukan Data</h2>

        <AnimatePresence>
          {display && (
            <motion.div
              key="output"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }} // Slower animation
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
