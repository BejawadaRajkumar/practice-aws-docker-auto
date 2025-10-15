// ...existing code...
import { useEffect, useState } from "react";
import axios from "axios";
import config from "./config";
import "./App.css";
// ...existing code...

function App() {
  const [cars, setCars] = useState([]);
  const [form, setForm] = useState({ brand: "", model: "", year: "", price: "" });

  const fetchCars = async () => {
    const res = await axios.get(config.baseUrl);
    setCars(res.data || []);
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // ensure numeric fields are numbers
    const payload = { 
      brand: form.brand.trim(), 
      model: form.model.trim(), 
      year: Number(form.year), 
      price: Number(form.price) 
    };
    await axios.post(config.baseUrl, payload);
    setForm({ brand: "", model: "", year: "", price: "" });
    fetchCars();
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this car?")) return;
    await axios.delete(`${config.baseUrl}/${id}`);
    fetchCars();
  };

  return (
    <div className="app-viewport">
      <div className="card">
        <h1>🚗 Car Management System</h1>

        <form onSubmit={handleSubmit} className="car-form">
          <input
            className="input"
            placeholder="Brand"
            value={form.brand}
            required
            onChange={(e) => setForm({ ...form, brand: e.target.value })}
          />
          <input
            className="input"
            placeholder="Model"
            value={form.model}
            required
            onChange={(e) => setForm({ ...form, model: e.target.value })}
          />
          <input
            className="input"
            placeholder="Year"
            type="number"
            value={form.year}
            required
            onChange={(e) => setForm({ ...form, year: e.target.value })}
          />
          <input
            className="input"
            placeholder="Price"
            type="number"
            value={form.price}
            required
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />
          <button type="submit" className="primary">Add Car</button>
        </form>

        <h2>All Cars</h2>

        {cars.length === 0 ? (
          <p className="muted">No cars found.</p>
        ) : (
          <div className="table-wrap">
            <table className="cars-table">
              <thead>
                <tr>
                  <th>Brand</th>
                  <th>Model</th>
                  <th>Year</th>
                  <th>Price (₹)</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {cars.map((car) => (
                  <tr key={car.id}>
                    <td>{car.brand}</td>
                    <td>{car.model}</td>
                    <td>{car.year}</td>
                    <td>{Number(car.price).toLocaleString()}</td>
                    <td>
                      <button className="danger" onClick={() => handleDelete(car.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
// ...existing code...