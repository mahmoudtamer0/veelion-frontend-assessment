"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { ReportsSummary } from "@/types/api";

export default function ReportsPage() {
    const [summary, setSummary] = useState<ReportsSummary | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        setLoading(true);
        setError("");

        fetch("/api/reports")
            .then((response) => response.json())
            .then((data: ReportsSummary) => {
                setSummary(data);
            })
            .catch(() => {
                setError("Could not load reports right now.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <main className="stack">
            <nav className="nav-row">
                <Link href="/" className="button">
                    Back
                </Link>
            </nav>

            <section className="card">
                <h1 className="card-title">Reports</h1>
            </section>

            {loading ? (
                <section className="card">
                    <p className="empty-text">Loading reports...</p>
                </section>
            ) : null}

            {error ? (
                <section className="card error-box">
                    <p className="error-text">{error}</p>
                </section>
            ) : null}

            {!loading && !error && summary ? (
                <div className="report-grid">
                    <section className="card">
                        <small className="stat-label">Total tasks</small>
                        <p className="stat-value">{summary.total}</p>
                    </section>

                    <section className="card">
                        <small className="stat-label">By status</small>
                        <ul className="status-list">
                            <li>To do: {summary.byStatus.todo}</li>
                            <li>In progress: {summary.byStatus["in-progress"]}</li>
                            <li>Done: {summary.byStatus.done}</li>
                        </ul>
                    </section>

                    <section className="card">
                        <small className="stat-label">Recent activity</small>
                        <p className="stat-value">{summary.recentActivityCount}</p>
                    </section>
                </div>
            ) : null}
        </main>
    );
}