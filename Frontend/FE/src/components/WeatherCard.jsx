import InputForm from "./InputForm";
import OutputDisplay from "./OutputDisplay";

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
      {/* Form Panel */}
      <div className="flex-1 p-8 text-white flex justify-center items-center">
        <div className="w-full max-w-sm">
          <InputForm
            data={data}
            onChange={onChange}
            onSubmit={onSubmit}
            onFileChange={onFileChange}
          />
        </div>
      </div>

      {/* Output Panel */}
      <div className="flex-1 p-8 text-white flex flex-col items-center justify-center text-center">
        <img
          src={imagePreview || "/img/search.png"}
          alt="Icon"
          className="w-24 h-24 mb-4 object-contain"
        />
        <h2 className="text-2xl font-bold mb-4">Masukan Data</h2>
        {display && <OutputDisplay data={display} />}
      </div>
    </div>
  );
};

export default WeatherCard;
