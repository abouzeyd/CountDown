import React, { useState } from "react";
import "./App.css";

function App() {
  // const [count, setCount] = useState(0);
  const [value, setValue] = useState("");

  // const counter = () => {
  //   setCount(count + 1);
  // };
  const handleChange = (e) => {
    e.preventDefault();
    setValue(value);
  };

  return (
    <div className="App">
      <form onSubmit={handleChange} style={{ paddingTop: 72 }}>
        <label>
          Countdown:
          <input
            type="text"
            placeholder="(Min)"
            style={{ marginLeft: 12, height: 22 }}
          />
        </label>
        <input
          type="submit"
          value="START"
          style={{
            backgroundColor: "green",
            color: "white",
            marginLeft: 12,
            height: 27,
          }}
        />
        {/* <button onClick={counter}>Count</button>
      {count} */}
      </form>
    </div>
  );
}

export default App;
