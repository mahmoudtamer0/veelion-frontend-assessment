"use client";

import { useState } from "react";

type CreateTaskFormProps = {
    creating: boolean;
    onCreate: (title: string) => void;
};

export function CreateTaskForm({ creating, onCreate }: CreateTaskFormProps) {
    const [title, setTitle] = useState("");

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        if (!title.trim()) {
            return;
        }

        onCreate(title.trim());
        setTitle("");
    };

    return (
        <section className="card">
            <form onSubmit={handleSubmit} className="create-task-row">
                <input
                    className="input"
                    placeholder="New task title"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    disabled={creating}
                />
                <button type="submit" className="button primary" disabled={creating || !title.trim()}>
                    {creating ? "Adding..." : "Add Task"}
                </button>
            </form>
        </section>
    );
}