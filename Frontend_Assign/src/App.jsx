import "./App.css";
import React, { useState } from "react";

function App() {
  const [url, setUrl] = useState("");
  const [urls, setUrls] = useState(() => {
    const saved = localStorage.getItem("urls");
    return saved ? JSON.parse(saved) : [];
  });

  const generate = () => {
    if (!url.trim()) return;
    const shortUrl = Math.random().toString(36).substring(2, 8);
    const newEntry = {
      id: shortUrl,
      longUrl: url,
      shortUrl: `${window.location.origin}/${shortUrl}`,
      clicks: 0,
      createdAt: new Date().toLocaleString(),
    };
    const updated = [...urls, newEntry];
    setUrls(updated);
    localStorage.setItem("urls", JSON.stringify(updated));
    setUrl("");
  };
  const handleClick = (id) => {
    const updated = urls.map((entry) =>
      entry.id === id ? { ...entry, clicks: entry.clicks + 1 } : entry
    );
    setUrls(updated);
    localStorage.setItem("urls", JSON.stringify(updated));
  };

  return (
    <div className="app">
      <h1>🔗 Simple URL Shortener</h1>
      <div className="input-box">
        <input
          type="text"
          placeholder="Enter long URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button onClick={generate}>Shorten</button>
      </div>

      <div className="url-list">
        {urls.map((entry) => (
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
            <p>
              <strong>Clicks:</strong> {entry.clicks}
            </p>
            <p>
              <strong>Created:</strong> {entry.createdAt}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
