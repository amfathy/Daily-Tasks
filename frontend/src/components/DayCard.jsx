import { useState } from "react";
import { dayName, dateText, toISO } from "../dateHelpers";

function DayCard({ date, tasks, canAdd, canEdit, onAdd, onEdit, onToggle, onDelete }) {
  const [text, setText] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const isToday = toISO(date) === toISO(new Date());

  function handleAdd() {
    if (text.trim() === "") return;
    onAdd(text.trim(), toISO(date));
    setText("");
  }

  function startEdit(task) {
    setEditingId(task.id);
    setEditText(task.text);
  }

  function saveEdit() {
    if (editText.trim() === "") return;
    onEdit(editingId, editText.trim());
    setEditingId(null);
  }

  return (
    <div className={isToday ? "day-card today" : "day-card"}>
      <div className="day-header">
        <strong>{dayName(date)}</strong>
        <small>{dateText(date)}</small>
      </div>

      {tasks.length === 0 && <p className="empty">لا توجد مهام</p>}

      <ul>
        {tasks.map((task) => (
          <li key={task.id} className={task.done ? "done" : ""}>
            {editingId === task.id ? (
              <>
                <input
                  className="edit-input"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && saveEdit()}
                />
                <button className="edit-btn" onClick={saveEdit}>✓</button>
                <button className="delete-btn" onClick={() => setEditingId(null)}>✕</button>
              </>
            ) : (
              <>
                <input type="checkbox" checked={task.done} onChange={() => onToggle(task.id)} />
                <span>{task.text}</span>
                {canEdit && <button className="edit-btn" onClick={() => startEdit(task)}>✎</button>}
                <button className="delete-btn" onClick={() => onDelete(task.id)}>✕</button>
              </>
            )}
          </li>
        ))}
      </ul>

      {canAdd && (
        <div className="add-row">
          <input
            placeholder="مهمة جديدة..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          />
          <button onClick={handleAdd}>إضافة</button>
        </div>
      )}
    </div>
  );
}

export default DayCard;
