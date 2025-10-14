import { useEffect, useState } from "react";
import axios from "axios";
import config from "./config";

function App() {
  const [cars, setCars] = useState([]);
  const [form, setForm] = useState({ brand: "", model: "", year: "", price: "" });

  const fetchCars = async () => {
    const res = await axios.get(config.baseUrl);
    setCars(res.data);
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(config.baseUrl, form);
    setForm({ brand: "", model: "", year: "", price: "" });
    fetchCars();
  };

  const handleDelete = async (id) => {
    await axios.delete(`${config.baseUrl}/${id}`);
    fetchCars();
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>🚗 Car Management System</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
        <input
          placeholder="Brand"
          value={form.brand}
          onChange={(e) => setForm({ ...form, brand: e.target.value })}
        />
        <input
          placeholder="Model"
          value={form.model}
          onChange={(e) => setForm({ ...form, model: e.target.value })}
        />
        <input
          placeholder="Year"
          type="number"
          value={form.year}
          onChange={(e) => setForm({ ...form, year: e.target.value })}
        />
        <input
          placeholder="Price"
          type="number"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />
        <button type="submit">Add Car</button>
      </form>

      <h2>All Cars</h2>
      <ul>
        {cars.map((car) => (
          <li key={car.id}>
            {car.brand} {car.model} ({car.year}) — ₹{car.price}{" "}
            <button onClick={() => handleDelete(car.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
