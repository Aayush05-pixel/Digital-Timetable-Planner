import { useState } from "react";
import SlotCard from "../components/SlotCard.jsx";

export const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
export const YEARS = ["I", "II", "III", "IV"];
export const DEPTS = ["CSE", "IT", "ECE", "EEE", "MECH", "CIVIL"];
export const SECTIONS = ["A", "B", "C", "D"];

export default function WeeklyView({ slots }) {
  const [year, setYear] = useState("III");
  const [dept, setDept] = useState("CSE");
  const [section, setSection] = useState("A");
  const [dayFilter, setDayFilter] = useState("All");

  // Only the classes that belong to the selected year, department and section
  const groupSlots = slots.filter(
    (s) => s.year === year && s.dept === dept && s.section === section
  );
  const shown = dayFilter === "All" ? DAYS : [dayFilter];

  return (
    <section>
      <div className="row">
        <h2>Weekly timetable</h2>
        <div className="filters">
          <select value={year} onChange={(e) => setYear(e.target.value)} aria-label="Year">
            {YEARS.map((y) => <option key={y} value={y}>{y} Year</option>)}
          </select>
          <select value={dept} onChange={(e) => setDept(e.target.value)} aria-label="Department">
            {DEPTS.map((d) => <option key={d}>{d}</option>)}
          </select>
          <select value={section} onChange={(e) => setSection(e.target.value)} aria-label="Section">
            {SECTIONS.map((s) => <option key={s} value={s}>Section {s}</option>)}
          </select>
          <select value={dayFilter} onChange={(e) => setDayFilter(e.target.value)} aria-label="Filter by day">
            <option>All</option>
            {DAYS.map((d) => <option key={d}>{d}</option>)}
          </select>
        </div>
      </div>

      {groupSlots.length === 0 ? (
        <p className="empty">
          No timetable added for {year} Year {dept}-{section} yet. Use “Add class” to create one.
        </p>
      ) : (
        <div className="week">
          {shown.map((day) => {
            const list = groupSlots
              .filter((s) => s.day === day)
              .sort((a, b) => a.start.localeCompare(b.start));
            return (
              <div className="day" key={day}>
                <h3 className="day-title">{day}</h3>
                {list.length === 0 && <p className="empty">No classes.</p>}
                {list.map((s) => <SlotCard key={s.id} slot={s} />)}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
