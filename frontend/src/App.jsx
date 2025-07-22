import { useState } from "react";
import axios from "axios";

function App() {
  const [numPalabras, setNumPalabras] = useState(1);
  const [frase, setFrase] = useState("");
  const [clave, setClave] = useState("");
  const [fuerza, setFuerza] = useState(0);
  const [querys, setQuerys] = useState({
    min: true,
    may: true,
    num: false,
    esp: false,
  });

  const niveles = ["Muy débil", "Débil", "Media", "Fuerte", "Muy fuerte"];

  const obtenerPalabra = async (num) => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/palabras/random?num=${num}`
      );
      setFrase(res.data);
      setClave("");
      setFuerza(0);
    } catch (error) {
      console.log(error);
    }
  };

  const obtenerClave = async (num) => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/palabras/contrasena?caracteres=${num}&&min=${querys.min}&&may=${querys.may}&&esp=${querys.esp}&&num=${querys.num}`
      );
      setFrase("");
      setFuerza(res.data.fuerza);
      setClave(res.data.payload);
    } catch (error) {
      console.log(error);
    }
  };

  const handleNumPalabras = (e) => {
    setNumPalabras(e.target.value);
  };

  const handlerCheckBox = (e) => {
    const { name, checked } = e.target;
    setQuerys((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center gap-6 text-gray-800">
      <h1 className="text-2xl font-bold">Generador de Claves y Frases</h1>

      <div className="flex items-center gap-4">
        <label htmlFor="num" className="text-sm font-medium">
          Cantidad:
        </label>
        <input
          id="num"
          type="number"
          min={1}
          max={20}
          className="w-20 px-2 py-1 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-400"
          onChange={handleNumPalabras}
          value={numPalabras}
        />
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => obtenerPalabra(numPalabras)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 shadow"
        >
          Obtener frase
        </button>
        <button
          onClick={() => obtenerClave(numPalabras)}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 shadow"
        >
          Obtener clave
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
        {[
          { name: "may", label: "Mayúsculas" },
          { name: "min", label: "Minúsculas" },
          { name: "esp", label: "Especiales" },
          { name: "num", label: "Números" },
        ].map((opt) => (
          <label key={opt.name} className="flex items-center gap-2">
            <input
              type="checkbox"
              name={opt.name}
              checked={querys[opt.name]}
              onChange={handlerCheckBox}
              className="accent-blue-500"
            />
            {opt.label}
          </label>
        ))}
      </div>

      {frase && (
        <p className="bg-white px-4 py-2 rounded shadow text-center text-blue-600">
          Frase: <strong>{frase}</strong>
        </p>
      )}

      {clave && (
        <p className="bg-white px-4 py-2 rounded shadow text-center text-green-600">
          Clave generada: <strong>{clave}</strong>
        </p>
      )}

      {clave && fuerza >= 0 && (
        <p className="text-center px-4 py-2 rounded bg-yellow-100 text-yellow-800 font-medium">
          Fuerza de la clave: {fuerza} - {niveles[fuerza]}
        </p>
      )}
    </div>
  );
}

export default App;
