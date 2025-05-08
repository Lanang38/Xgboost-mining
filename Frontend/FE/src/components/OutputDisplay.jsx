const OutputDisplay = ({ data }) => {
  return (
    <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
      <div className="bg-white/10 p-4 rounded-lg">
        <p className="text-lg font-medium">{data.radiation || "0"} W/m²</p>
        <p className="text-sm">Solar Radiation</p>
      </div>
      <div className="bg-white/10 p-4 rounded-lg">
        <p className="text-lg font-medium">{data.temperature || "0"} ℃</p>
        <p className="text-sm">Temperature</p>
      </div>
      <div className="bg-white/10 p-4 rounded-lg">
        <p className="text-lg font-medium">{data.humidity || "0"} %</p>
        <p className="text-sm">Humidity</p>
      </div>
      <div className="bg-white/10 p-4 rounded-lg">
        <p className="text-lg font-medium">{data.windSpeed || "0"} Km/h</p>
        <p className="text-sm">Wind Speed</p>
      </div>
    </div>
  );
};

export default OutputDisplay;
