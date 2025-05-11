import { useState } from "react";
import WeatherCard from "./components/WeatherCard";

function App() {
  const [formData, setFormData] = useState({
    radiation: "", temperature: "", humidity: "", windSpeed: ""
  });
  const [displayData, setDisplayData] = useState(null);
  const [predictionResult, setPredictionResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const fetchPrediction = async (dataToSend) => {
    try {
      const res = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });

      const json = await res.json();
      if (!res.ok) {
        console.warn("BE error:", json.error);
        setPredictionResult(null);      // fallback ke "Masukan Data"
      } else {
        setPredictionResult(json.prediction ? "Hujan" : "Cerah");
      }
    } catch (err) {
      console.warn("Fetch error:", err);
      setPredictionResult(null);        // fallback
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchPrediction(formData).then(() => {
      setDisplayData(formData);
      setFormData({ radiation: "", temperature: "", humidity: "", windSpeed: "" });
    });
  };

  return (
    <div
      className="h-screen w-screen bg-cover bg-center flex justify-center items-center"
      style={{ backgroundImage: "url('/img/wallpaper.jpg')" }}
    >
      <WeatherCard
        data={formData}
        display={displayData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        predictionResult={predictionResult}
      />
    </div>
  );
}

export default App;
