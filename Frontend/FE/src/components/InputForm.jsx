const InputForm = ({ data, onChange, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <input
        type="number"
        name="radiation"
        value={data.radiation}
        onChange={onChange}
        placeholder="Radiasi Matahari (W/m²)"
        className="bg-white/10 text-white p-3 rounded-md outline-none"
        required
      />
      <input
        type="number"
        name="temperature"
        value={data.temperature}
        onChange={onChange}
        placeholder="Suhu udara (°C)"
        className="bg-white/10 text-white p-3 rounded-md outline-none"
        required
      />
      <input
        type="number"
        name="humidity"
        value={data.humidity}
        onChange={onChange}
        placeholder="Kelembaban udara (%)"
        className="bg-white/10 text-white p-3 rounded-md outline-none"
        required
      />
      <input
        type="number"
        name="windSpeed"
        value={data.windSpeed}
        onChange={onChange}
        placeholder="Kecepatan angin (m/s)"
        className="bg-white/10 text-white p-3 rounded-md outline-none"
        required
      />
      <button
        type="submit"
        className="bg-purple-600 hover:bg-purple-700 transition-colors text-white py-2 rounded-md"
      >
        Tampilkan
      </button>
    </form>
  );
};

export default InputForm;
