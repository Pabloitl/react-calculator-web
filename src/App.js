import { useState } from "react";
import api from "./utils/api";

const URLS = {
  Sumar: "add/",
  Restar: "substract/",
  Multiplicar: "multiply/",
  Dividir: "divide/",
};

function App() {
  const [success, setSuccess] = useState();
  const [error, setError] = useState();
  const [input, setInput] = useState({
    first: 10,
    second: 20,
    action: "Sumar",
  });

  const cleanResponses = () => {
    setSuccess();
    setError();
  };

  const onChange = (name) => (e) => {
    cleanResponses();
    setInput({ ...input, [name]: e.target.value });
  };

  const onPost = (e) => {
    e.preventDefault();

    api
      .post(URLS[input.action], {
        first: input.first,
        second: input.second,
      })
      .then(({ data: { result } }) => setSuccess(result))
      .catch(
        ({
          response: {
            data: { error },
          },
        }) => setError(error)
      );
  };

  return (
    <div className="App">
      <form onSubmit={onPost}>
        <label htmlFor="first">Primer operando: </label>
        <input
          type="number"
          step="any"
          name="first"
          id="first"
          value={input.first}
          onChange={onChange("first")}
        />

        <br />

        <label htmlFor="second">Segundo operando:</label>
        <input
          type="number"
          step="any"
          name="second"
          id="second"
          value={input.second}
          onChange={onChange("second")}
        />

        <br />

        <select
          id="operation"
          name="operation"
          value={input.action}
          onChange={onChange("action")}
        >
          <option value="Sumar">Sumar</option>
          <option value="Restar">Restar</option>
          <option value="Multiplicar">Multiplicar</option>
          <option value="Dividir">Dividir</option>
        </select>

        <button type="submit">Calcular</button>
      </form>

      {success && <div>Resultado: {success}</div>}

      {error && <div>Error: {error}</div>}
    </div>
  );
}

export default App;
