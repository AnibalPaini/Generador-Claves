import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [numPalabras, setNumPalabras] = useState(1);
  const [frase, setFrase] = useState("");
  const [clave, setClave] = useState("");
  const [querys, setQuerys] = useState({
    min: true,
    may: true,
    num: false,
    esp: false,
  });

  const obtenerPalabra = async (num) => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/palabras/random?num=${num}`
      );
      let palabras = res.data
      setFrase(palabras);
    } catch (error) {
      console.log(error);
    }
  };
  const obtenerClave = async (num) => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/palabras/contrasena?caracteres=${num}&&min=${querys.min}&&may=${querys.may}&&esp=${querys.esp}&&num=${querys.num}`
      );
      console.log(querys);
      setClave(res.data);
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
    <div className="app">
      <input
        type="num"
        min={1}
        defaultValue={1}
        onChange={handleNumPalabras}
        value={numPalabras}
      />
      <button onClick={() => obtenerPalabra(numPalabras)}>Obtener frase</button>
      <button onClick={() => obtenerClave(numPalabras)}>Obtener clave</button>
      <div className="checkbox-group">
        <label>
          <input
            type="checkbox"
            name="may"
            checked={querys.may}
            onChange={handlerCheckBox}
          />
          Mayúsculas
        </label>
        <label>
          <input
            type="checkbox"
            name="min"
            checked={querys.min}
            onChange={handlerCheckBox}
          />
          Minúsculas
        </label>
        <label>
          <input
            type="checkbox"
            name="esp"
            checked={querys.esp}
            onChange={handlerCheckBox}
          />
          Especiales
        </label>
        <label>
          <input
            type="checkbox"
            name="num"
            checked={querys.num}
            onChange={handlerCheckBox}
          />
          Números
        </label>
      </div>
      {frase && <p className="resultado">{frase}</p>}
      {clave && <p className="resultado">{clave}</p>}
    </div>
  );
}

export default App;
