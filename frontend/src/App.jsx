import { useState } from "react";
import "./App.css";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function login() {
    const response = await fetch("http://localhost:8000/api/login", {
      method: "POST",
      body: JSON.stringify({ username: username, password: password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    sessionStorage.setItem("token", data.token);
  }

  async function getEmail() {
    const token = sessionStorage.getItem("token");

    const response = await fetch("http://localhost:8000/api/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();

    console.log(data);
  }

  return (
    <main>
      <section>
        <input
          type="text"
          placeholder="Användarnamn"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Lösenord"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <button onClick={login}>Logga in</button>
        <button onClick={getEmail}>Hämta email</button>
      </section>
    </main>
  );
}

export default App;
