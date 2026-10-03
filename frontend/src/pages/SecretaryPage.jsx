import { useState } from "react";
import DayCard from "../components/DayCard";
import useTasks from "../hooks/useTasks";
import { addDays, daysList } from "../dateHelpers";

function getDays(tab) {
  const today = new Date();
  if (tab === "past") return daysList(addDays(today, -15), 15);
  if (tab === "upcoming") return daysList(today, 15);
  const first = new Date(today.getFullYear(), today.getMonth() + 1, 1);
  const count = new Date(today.getFullYear(), today.getMonth() + 2, 0).getDate();
  return daysList(first, count);
}

function SecretaryPage() {
  const [tab, setTab] = useState("upcoming");
  const days = getDays(tab);
  const { error, tasksOfDay, handleAdd, handleEdit, handleToggle, handleDelete } = useTasks(days);

  return (
    <div className="page">
      <div className="tabs">
        <button className={tab === "past" ? "active" : ""} onClick={() => setTab("past")}>الأيام الفائتة</button>
        <button className={tab === "upcoming" ? "active" : ""} onClick={() => setTab("upcoming")}>اليوم والأيام القادمة</button>
        <button className={tab === "month" ? "active" : ""} onClick={() => setTab("month")}>الشهر القادم</button>
      </div>

      {error && <p className="error">{error}</p>}

      <div className="cards-grid cols-4">
        {days.map((day) => (
          <DayCard
            key={day.toISOString()}
            date={day}
            tasks={tasksOfDay(day)}
            canAdd={true}
            canEdit={true}
            onAdd={handleAdd}
            onEdit={handleEdit}
            onToggle={handleToggle}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default SecretaryPage;
