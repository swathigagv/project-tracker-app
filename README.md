# 🧩 Multi-View Project Tracker

A fully functional frontend project management tool built using React + TypeScript.  
This application supports multiple views, custom drag-and-drop, virtual scrolling, and simulated real-time collaboration.

---

## 🚀 Features

### 📌 Three Views
- **Kanban View**
  - 4 columns: To Do, In Progress, In Review, Done
  - Drag-and-drop between columns
  - Task count per column
  - Independent column scrolling

- **List View**
  - Flat table layout
  - Sorting by title, priority, due date
  - Inline status update
  - Virtual scrolling for large datasets (500+ tasks)

- **Timeline View**
  - Gantt-style visualization
  - Tasks rendered as horizontal bars
  - Start → Due date mapping
  - Today indicator line
  - Horizontal scroll support

---

### 🧠 Custom Drag-and-Drop
- Built using native drag events (no libraries)
- Placeholder rendering to avoid layout shift
- Smooth snap-back when dropped outside valid zones
- Works across columns

---

### ⚡ Virtual Scrolling
- Only renders visible rows + buffer
- Handles 500+ tasks efficiently
- Smooth scrolling without flicker
- Maintains correct scroll height

---

### 👥 Collaboration Simulation
- Simulated users moving between tasks
- Avatar indicators on active tasks
- Top bar showing active viewers
- Avatar stacking with overflow indicator

---

### 🔍 Filters & URL Sync
- Multi-select filters:
  - Status
  - Priority
- URL query sync
- Back/forward navigation support
- Shareable filtered views

---

### ⚠️ Edge Cases
- "Due Today" label
- Overdue tasks show days count
- Empty state handling
- Tasks without start date handled in timeline

---

## 🛠 Tech Stack

- React (with TypeScript)
- Zustand (state management)
- Tailwind CSS
- Vite

---

## 🧠 State Management Decision

Zustand was chosen for its simplicity and minimal boilerplate. It allows centralized state management without prop drilling and provides efficient updates across multiple views.

---

# ✍️ ✅ Explanation

The most challenging—and rewarding—part of this project was creating the drag-and-drop system. By using native events rather than libraries, I had to be resourceful in handling layout shifts. I finally solved this by using a placeholder element to "preserve" the position of the moved task, which helped maintain UI stability.

I also optimized performance by creating a custom virtual scroller. This only displays what's visible on the screen, ensuring the application runs smoothly, even with very long lists. For the timeline, I had to perform some calculations to map the dates to pixel positions and thus perfectly align the bars.

Ultimately, this was my first time using Zustand. Although AI guided me through the setup, I made sure not to use the technology blindly. My goal was not just to finish the project, but also to understand state management mechanisms in a new way.


## ⚙️ Setup Instructions

```bash
npm install
npm run dev

