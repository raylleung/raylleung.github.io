"use client";

import { useEffect, useState } from "react";

// NOTE: this is a light client-side gate, not real security. On a static site
// the password lives in the page source — it only keeps casual visitors out.
const PASSWORD = "RayPortfolio2026";
const KEY = "rl_unlocked";

export default function Gate({ children }: { children: React.ReactNode }) {
  const [unlocked, setUnlocked] = useState(false);
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(KEY) === "1") setUnlocked(true);
    } catch {}
  }, []);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (value === PASSWORD) {
      try {
        sessionStorage.setItem(KEY, "1");
      } catch {}
      setUnlocked(true);
    } else {
      setError(true);
      setValue("");
    }
  }

  if (unlocked) return <>{children}</>;

  return (
    <div className="gate">
      <div className="gate-inner">
        <p className="gate-brand mono">
          <span className="gate-dot" aria-hidden="true" />
          ray leung
        </p>
        <h1 className="gate-title">
          this site is private<span className="hl">.</span>
        </h1>
        <p className="gate-sub">enter the password to view the portfolio.</p>
        <form className="gate-form" onSubmit={submit}>
          <input
            type="password"
            className="gate-input"
            placeholder="password"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              setError(false);
            }}
            autoFocus
            aria-label="Password"
            aria-invalid={error}
          />
          <button type="submit" className="gate-btn">
            Enter <span aria-hidden="true">→</span>
          </button>
        </form>
        <p className={`gate-error${error ? " show" : ""}`} role="alert">
          incorrect password — try again.
        </p>
      </div>
    </div>
  );
}
