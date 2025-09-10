import "./App.css";
import { useState } from "react";

function App() {
  const [url, setUrl] = useState("");
  const [AllUrls, setAllUrls] = useState(() => {
    const saved = localStorage.getItem("AllUrls");
    return saved ? JSON.parse(saved) : [];
  });

  const generate = () => {
    if (!url.trim()) return;
    const shortUrl = Math.random().toString(36).substring(2, 8);
    const cardNew = {
      id: shortUrl,
      longUrl: url,
      shortUrl: `${window.location.origin}/${shortUrl}`,
    };
    const updated = [...AllUrls, cardNew];
    setAllUrls(updated);
    localStorage.setItem("AllUrls", JSON.stringify(updated));
    setUrl("");
  };
  const handleClick = (id) => {
    const updated = AllUrls.map((entry) =>
      entry.id === id ? { ...entry } : entry
    );
    setAllUrls(updated);
    localStorage.setItem("AllUrls", JSON.stringify(updated));
  };

  return (
    <div className="app">
      <h1> URL Shortener</h1>
      <div className="input">
        <input
          type="text"
          placeholder="Enter long URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button onClick={generate}>Shorten</button>
      </div>

      <div className="url-list">
        {AllUrls.map((entry) => (
          <div key={entry.id} className="url-card">
            <p>
              <strong>Short:</strong>{" "}
              <a
                href={entry.longUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() => handleClick(entry.id)}
              >
                {entry.shortUrl}
              </a>
            </p>
            <p>
              <strong>Original:</strong> {entry.longUrl}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
