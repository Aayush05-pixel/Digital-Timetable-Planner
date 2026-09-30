import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DAYS, YEARS, DEPTS, SECTIONS } from "./WeeklyView.jsx";

const EMPTY = { year: "III", dept: "CSE", section: "A", code: "", subject: "", faculty: "", room: "IST-323", day: "Monday", start: "", end: "" };

// Returns an object of error messages (empty object = valid)
function validate(f, slots, editingId) {
  const e = {};
  if (!/^[A-Za-z0-9]{6,12}$/.test(f.code.trim())) e.code = "Enter the course code, e.g. 21CSE354T.";
  if (f.subject.trim().length < 3) e.subject = "Enter a subject name (at least 3 characters).";
  if (!/^[A-Za-z .]{3,}$/.test(f.faculty.trim())) e.faculty = "Faculty name must use letters only (min 3).";
  if (!f.room.trim()) e.room = "Enter a classroom, e.g. B-204.";
  if (!f.start) e.start = "Choose a start time.";
  if (!f.end) e.end = "Choose an end time.";
  if (f.start && f.end && f.end <= f.start) e.end = "End time must be after start time.";
  if (!e.start && !e.end) {
    const clash = slots.find(
      (s) => s.id !== editingId && s.year === f.year && s.dept === f.dept && s.section === f.section && s.day === f.day && f.start < s.end && f.end > s.start
    );
    if (clash) e.start = `Clashes with "${clash.subject}" (${clash.start}–${clash.end}).`;
  }
  return e;
}

export default function SlotEditor({ slots, onSave }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const editing = id ? slots.find((s) => s.id === id) : null;

  const [form, setForm] = useState(editing ?? EMPTY);
  const [errors, setErrors] = useState({});

  if (id && !editing) return <p className="empty">This class no longer exists.</p>;

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    const errs = validate(form, slots, editing?.id);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    onSave({ ...form, code: form.code.trim().toUpperCase(), subject: form.subject.trim(), faculty: form.faculty.trim(), room: form.room.trim().toUpperCase() });
    navigate("/manage");
  };

  const field = (name, label, props = {}) => (
    <label>
      {label}
      <input name={name} value={form[name]} onChange={change} {...props} />
      {errors[name] && <span className="error">{errors[name]}</span>}
    </label>
  );

  return (
    <section>
      <h2>{editing ? "Edit class" : "Add class"}</h2>
      <form className="form" onSubmit={submit} noValidate>
        <div className="triple">
          <label>
            Year
            <select name="year" value={form.year} onChange={change}>
              {YEARS.map((y) => <option key={y} value={y}>{y} Year</option>)}
            </select>
          </label>
          <label>
            Department
            <select name="dept" value={form.dept} onChange={change}>
              {DEPTS.map((d) => <option key={d}>{d}</option>)}
            </select>
          </label>
          <label>
            Section
            <select name="section" value={form.section} onChange={change}>
              {SECTIONS.map((s) => <option key={s}>{s}</option>)}
            </select>
          </label>
        </div>
        {field("code", "Course code", { placeholder: "e.g. 21CSE354T" })}
        {field("subject", "Subject", { placeholder: "e.g. Data Structures" })}
        {field("faculty", "Faculty name", { placeholder: "e.g. Dr. Anitha" })}
        {field("room", "Classroom", { placeholder: "e.g. B-204" })}
        <label>
          Day
          <select name="day" value={form.day} onChange={change}>
            {DAYS.map((d) => <option key={d}>{d}</option>)}
          </select>
        </label>
        {field("start", "Start time", { type: "time" })}
        {field("end", "End time", { type: "time" })}
        <button className="btn primary" type="submit">{editing ? "Save changes" : "Add class"}</button>
      </form>
    </section>
  );
}
