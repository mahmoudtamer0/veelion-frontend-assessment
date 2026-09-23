"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { ActivityLog } from "@/types/api";

function formatTime(value: string) {
  return new Date(value).toLocaleString();
}

function filterActivity(items: ActivityLog[], text: string) {
  if (!text) {
    return items;
  }

  const lower = text.toLowerCase();
  return items.filter(
    (item) =>
      (item.action || "").toLowerCase().includes(lower) ||
      (item.info || "").toLowerCase().includes(lower)
  );
}

export default function ActivityPage() {
  const [allActivity, setAllActivity] = useState<ActivityLog[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");

    fetch("/api/activity")
      .then((response) => response.json())
      .then((data: ActivityLog[]) => {
        setAllActivity(data || []);
      })
      .catch(() => {
        setError("Could not load activity right now.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const shownActivity = useMemo(() => filterActivity(allActivity, query), [allActivity, query]);

  return (
    <main className="stack">
      <nav className="nav-row">
        <Link href="/" className="button">
          Back
        </Link>
      </nav>

      <section className="card">
        <h1 className="card-title">Activity Feed</h1>
        <input
          className="input"
          placeholder="Search activity"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </section>

      {loading ? (
        <section className="card">
          <p className="empty-text">Loading activity...</p>
        </section>
      ) : null}

      {error ? (
        <section className="card error-box">
          <p className="error-text">{error}</p>
        </section>
      ) : null}

      {!loading && !error ? (
        <>
          <section className="card">
            <small className="meta-text">
              Total: {allActivity.length} | Visible: {shownActivity.length}
            </small>
          </section>

          <section className="card">
            <ul className="list-plain">
              {shownActivity.map((item) => (
                <li key={item.id} className="activity-item">
                  <div className="activity-action">{item.action || "(no action)"}</div>
                  <div>{item.info || "(no info)"}</div>
                  <small className="meta-text">{formatTime(item.when)}</small>
                </li>
              ))}
            </ul>
          </section>
        </>
      ) : null}
    </main>
  );
}