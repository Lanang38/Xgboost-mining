import { useState } from "react";
import WeatherCard from "./components/WeatherCard";

function App() {
  const [formData, setFormData] = useState({
    radiation: "",
    temperature: "",
    humidity: "",
    windSpeed: "",
  });

  const [displayData, setDisplayData] = useState({
    radiation: "",
    temperature: "",
    humidity: "",
    windSpeed: "",
  });
  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setDisplayData(formData);
    setFormData({
      radiation: "",
      temperature: "",
      humidity: "",
      windSpeed: "",
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
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
        imagePreview={imagePreview}
        onFileChange={handleFileChange}
      />
    </div>
  );
}

export default App;
