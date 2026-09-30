// Small reusable card that shows one class
export default function SlotCard({ slot, children }) {
  return (
    <article className="card">
      <p className="time">{slot.start} – {slot.end}</p>
      <h3>{slot.subject}</h3>
      <p className="meta">{slot.code} · {slot.faculty} · Room {slot.room}</p>
      {children}
    </article>
  );
}
