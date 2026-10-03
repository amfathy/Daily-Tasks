import { useState } from "react";
import DayCard from "../components/DayCard";
import useTasks from "../hooks/useTasks";
import { daysList } from "../dateHelpers";

const OPTIONS = [3, 7, 15, 30];
const COLS = { 3: "cols-3 size-big", 7: "cols-4 size-medium", 15: "cols-5 size-small", 30: "cols-6 size-small" };

function HeadPage() {
  const [count, setCount] = useState(3);
  const days = daysList(new Date(), count);
  const { error, tasksOfDay, handleToggle, handleDelete } = useTasks(days);

  return (
    <div className="page">
      <div className="tabs">
        {OPTIONS.map((n) => (
          <button key={n} className={count === n ? "active" : ""} onClick={() => setCount(n)}>
            {n} أيام
          </button>
        ))}
      </div>

      {error && <p className="error">{error}</p>}

      <div className={"cards-grid " + COLS[count]}>
        {days.map((day) => (
          <DayCard
            key={day.toISOString()}
            date={day}
            tasks={tasksOfDay(day)}
            canAdd={false}
            onToggle={handleToggle}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default HeadPage;
