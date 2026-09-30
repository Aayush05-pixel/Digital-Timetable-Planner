import { Routes, Route } from "react-router-dom";
import useLocalStorage from "./hooks/useLocalStorage.js";
import Navbar from "./components/Navbar.jsx";
import WeeklyView from "./pages/WeeklyView.jsx";
import SlotEditor from "./pages/SlotEditor.jsx";
import ManageSlots from "./pages/ManageSlots.jsx";

const ROOM = "IST-323";

// Unique id = course code + year + department + section + day + start time
const makeId = (s) => [s.code, s.year, s.dept, s.section, s.day, s.start].join("-");

// Period number -> [start, end] (24-hour format so times sort and compare correctly)
const PERIODS = {
  1: ["09:00", "09:50"], 2: ["09:50", "10:40"], 3: ["10:50", "11:40"],
  4: ["11:40", "12:30"], 5: ["12:30", "13:20"], 6: ["13:20", "14:10"],
  7: ["14:10", "15:00"], 8: ["15:10", "16:00"], 9: ["16:00", "16:50"],
};

// Slot letter -> course details (from the Batch1:FN timetable)
const COURSES = {
  A: { code: "21MAB302T", subject: "Discrete Mathematics", faculty: "Dr. R. Sowrirajan" },
  B: { code: "21CSC301T", subject: "Formal Language and Automata", faculty: "Dr. S. Rahmath Nisha" },
  C: { code: "21CSC302J", subject: "Computer Networks", faculty: "Dr. P. Senthilkumar" },
  D: { code: "21CSC305P", subject: "Machine Learning", faculty: "Dr. S. Karaga Suba Raja" },
  E: { code: "21GNP301L", subject: "Community Connect", faculty: "Dr. S. Rahmath Nisha" },
  F: { code: "21CSE354T", subject: "Full Stack Web Development", faculty: "Dr. Hariharan" },
  G: { code: "21LEE0306T", subject: "Sustainable Development Practices", faculty: "Dr. B. Veena Vani" },
  H: { code: "21LEM301T", subject: "Indian Art Form", faculty: "Dr. P. Senthilkumar" },
  CDC: { code: "21PDM301L", subject: "Analytical and Logical Thinking Skills", faculty: "CDC Trainer" },
};

// Builds one class: slot letter, day, first period, last period, optional overrides.
// Every class belongs to a year, department and section (this sample is III CSE-A).
const cls = (letter, day, from, to, extra = {}) => {
  const c = COURSES[letter];
  const start = PERIODS[from][0];
  const slot = { ...c, year: "III", dept: "CSE", section: "A", room: ROOM, day, start, end: PERIODS[to][1], ...extra };
  return { id: makeId(slot), ...slot };
};

const SAMPLE = [
  cls("F", "Monday", 1, 1), cls("A", "Monday", 2, 2), cls("C", "Monday", 3, 3), cls("D", "Monday", 4, 4),
  cls("B", "Tuesday", 1, 1), cls("C", "Tuesday", 2, 2), cls("G", "Tuesday", 3, 3), cls("A", "Tuesday", 4, 4),
  cls("E", "Tuesday", 6, 7),
  cls("C", "Tuesday", 8, 9, { subject: "Computer Networks Lab", room: "617" }),
  cls("C", "Wednesday", 1, 1), cls("G", "Wednesday", 2, 2), cls("H", "Wednesday", 3, 3), cls("A", "Wednesday", 4, 4),
  cls("F", "Thursday", 1, 1), cls("D", "Thursday", 2, 2), cls("B", "Thursday", 3, 3), cls("G", "Thursday", 4, 4),
  cls("CDC", "Thursday", 8, 9, { room: "625" }),
  cls("F", "Friday", 1, 1), cls("D", "Friday", 2, 2), cls("B", "Friday", 3, 3), cls("A", "Friday", 4, 4),
  cls("CDC", "Friday", 7, 7, { room: "625" }),
];

export default function App() {
  // Storage key v3 because the data now has year, department and section
  const [slots, setSlots] = useLocalStorage("timetable-slots-v3", SAMPLE);

  const addSlot = (slot) =>
    setSlots([...slots, { ...slot, id: makeId(slot) }]);
  const updateSlot = (slot) => setSlots(slots.map((s) => (s.id === slot.id ? { ...slot, id: makeId(slot) } : s)));
  const deleteSlot = (id) => setSlots(slots.filter((s) => s.id !== id));

  return (
    <>
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<WeeklyView slots={slots} />} />
          <Route path="/manage" element={<ManageSlots slots={slots} onDelete={deleteSlot} />} />
          <Route path="/add" element={<SlotEditor key="add" slots={slots} onSave={addSlot} />} />
          <Route path="/edit/:id" element={<SlotEditor key="edit" slots={slots} onSave={updateSlot} />} />
        </Routes>
      </main>
    </>
  );
}
