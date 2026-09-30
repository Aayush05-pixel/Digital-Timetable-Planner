# Digital Timetable Planner

A responsive ReactJS application to plan and manage a weekly class timetable. Users can add classes with course code, subject, faculty name, classroom and time slot, then view, search, edit and delete them. The sample data is a real Batch1:FN timetable.

Built for **Task 2: Interactive JavaScript and ReactJS Application Development** (Full Stack Web Development), Problem Statement 4.

**Author:** Aayush, B.Tech CSE (III Year, Section A), SRM Institute of Science and Technology, Tiruchirappalli

## Features

- **Section-wise timetables**: choose Year, Department and Section from dropdowns beside the heading (default III Year CSE-A)
- **Weekly timetable view** with classes sorted by time and a day filter
- **Add and edit classes** through a validated form (course code, subject, faculty, classroom, day, start and end time)
- **Time-clash detection**: a class cannot overlap another class on the same day
- **Search** by course code, subject, faculty, classroom or day
- **Delete** with a confirmation prompt
- **Data persistence**: the timetable is saved in the browser (localStorage) and survives a refresh
- **Responsive layout** for mobile, tablet and desktop, with visible keyboard focus

## Tech stack

| Technology        | Purpose                                           |
| ----------------- | ------------------------------------------------- |
| React 18          | Component-based UI (JSX, `useState`, `useEffect`) |
| React Router 6    | Multiple views without page reloads               |
| Vite              | Development server and build tool                 |
| JavaScript (ES6+) | Application logic                                 |
| HTML5 and CSS3    | Semantic markup, Flexbox, Grid, media queries     |

## Getting started

Requirements: [Node.js](https://nodejs.org) 18 or later.

```bash
git clone <your-repository-url>
cd timetable-planner
npm install
npm run dev
```

Open the address printed in the terminal (usually `http://localhost:5173`).

Other scripts:

```bash
npm run build     # production build in /dist
npm run preview   # preview the production build
```

## Pages

| Route       | Page           | What it does                              |
| ----------- | -------------- | ----------------------------------------- |
| `/`         | Weekly view    | Shows the timetable by day; filter by day |
| `/manage`   | Manage classes | Search, edit and delete classes           |
| `/add`      | Add class      | Form to create a class                    |
| `/edit/:id` | Edit class     | Same form, pre-filled                     |

## Project structure

```
timetable-planner/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx                  # Entry point, mounts App inside HashRouter
    ├── App.jsx                   # Timetable data, state, add/update/delete, routes
    ├── index.css                 # Styling and responsive rules
    ├── hooks/
    │   └── useLocalStorage.js    # useState + useEffect persistence hook
    ├── components/
    │   ├── Navbar.jsx            # Navigation links
    │   └── SlotCard.jsx          # Reusable card for one class
    └── pages/
        ├── WeeklyView.jsx        # View 1: timetable + day filter
        ├── ManageSlots.jsx       # View 2: search, edit, delete
        └── SlotEditor.jsx        # View 3: add/edit form + validation
```

## Data model

Each class is stored as an object:

```js
{
    id: "CS101-Tuesday-10:00",
    code: "CS101",
    subject: "Web Development",
    faculty: "Prof. Arjun Mehta",
    room: "CSE-201",
    day: "Tuesday",
    start: "10:00",
    end: "10:50"
}
```

A course appears several times a week, so the id combines the course code, year, department, section, day and start time.

## Validation rules

| Field              | Rule                                                                                           |
| ------------------ | ---------------------------------------------------------------------------------------------- |
| Course code        | 6 to 12 letters or digits                                                                      |
| Subject            | At least 3 characters                                                                          |
| Faculty            | Letters, spaces and dots only, at least 3 characters                                           |
| Classroom          | Required                                                                                       |
| Start and end time | Both required; end must be after start                                                         |
| Clash              | Rejected if it overlaps another class of the same year, department and section on the same day |

Two time ranges overlap when `newStart < existingEnd && newEnd > existingStart`, so back-to-back classes (09:00 to 09:50, then 09:50 to 10:40) are allowed.

## How it works

1. `App.jsx` keeps all classes in state through the `useLocalStorage` hook and passes data and handlers to pages as props.
2. `useLocalStorage` reads saved data on first load and uses `useEffect` to save it whenever it changes.
3. `SlotEditor` validates the form on submit. If it is valid, it calls the add or update handler and returns to the Manage page.
4. State is never modified directly. New arrays are created with the spread operator, `map` and `filter`, so React re-renders correctly.

## Editing the sample timetable

The default timetable is defined in `src/App.jsx`. Each class is one `cls(...)` call: slot letter, day, first period, last period, and optional overrides.

```js
cls("F", "Monday", 1, 1); // Full Stack, period 1
cls("E", "Tuesday", 6, 7); // Community Connect, periods 6 to 7
cls("CDC", "Thursday", 8, 9, { room: "625" }); // CDC with a different room
```

If you change the sample data or the data model, change the storage key (`timetable-slots-v3`) in `App.jsx`, or clear the site data in your browser, because the browser keeps the older saved timetable.

## Screenshots

Add screenshots of the Weekly view, Manage page, Add class form, a validation error and a clash message here.

## Possible improvements

- Backend (Node.js, Express) and a database instead of localStorage
- User login
- Export the timetable as PDF
- Colour per subject and drag-and-drop editing

## Academic note

Developed individually as part of the Full Stack Web Development coursework.
