import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);
  useEffect(() => {
    (async () => {
      const user = await axios.get("http://localhost:8080/api/getUser");
      setData(user.data);
    })();
  }, []);

  const handleClick = async () => {
    try {
      const data = await axios.get(
        "https://jsonplaceholder.typicode.com/todos/1"
      );
      console.log(data?.data?.title);
      if (data?.data?.title) {
        window.open("https:/www.google.com");
      } else {
        window.open("https:/www.youtube.com");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="App">
      <table style={{ border: "1px solid grey" }}>
        <tbody>
          <tr>
            <th>Website</th>
            <th>URL</th>
          </tr>

          {data &&
            data.length > 0 &&
            data.length &&
            data.map((dt, idx) => {
              return (
                <tr key={idx}>
                  <td>{dt.name}</td>
                  <td>
                    {dt.url ? (
                      <a href="#" onClick={() => handleClick(dt.url)}>
                        Link
                      </a>
                    ) : (
                      <a href="#">N/A</a>
                    )}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
