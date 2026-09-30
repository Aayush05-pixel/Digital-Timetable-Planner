import { useState } from "react";
import { Link } from "react-router-dom";
import SlotCard from "../components/SlotCard.jsx";

export default function ManageSlots({ slots, onDelete }) {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();

  const results = slots.filter((s) =>
    [s.code, s.subject, s.faculty, s.room, s.day].some((f) => f.toLowerCase().includes(q))
  );

  const remove = (s) => {
    if (window.confirm(`Delete "${s.subject}" on ${s.day}?`)) onDelete(s.id);
  };

  return (
    <section>
      <div className="row">
        <h2>Manage classes ({results.length})</h2>
        <input
          type="search"
          placeholder="Search subject, faculty, room or day"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      {results.length === 0 && <p className="empty">No classes match your search.</p>}
      <div className="grid">
        {results.map((s) => (
          <SlotCard key={s.id} slot={s}>
            <p className="meta">{s.day} · {s.year} Year {s.dept}-{s.section}</p>
            <div className="actions">
              <Link className="btn" to={`/edit/${s.id}`}>Edit</Link>
              <button className="btn danger" onClick={() => remove(s)}>Delete</button>
            </div>
          </SlotCard>
        ))}
      </div>
    </section>
  );
}
