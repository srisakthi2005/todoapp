import { useEffect, useState } from "react";
import { fetchSummary } from "../services/task.service.js";

const DailySummaryPage = () => {
  const [summary, setSummary] = useState(null);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [error, setError] = useState("");

  const loadSummary = async (selectedDate) => {
    try {
      setError("");
      const data = await fetchSummary(selectedDate);
      setSummary(data);
    } catch (err) {
      setError(err.response?.data?.error || "Could not load summary.");
    }
  };

  useEffect(() => {
    loadSummary(date);
  }, [date]);

  return (
    <div className="container">
      <div className="card">
        <h2>Daily Summary</h2>
        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        {error && <div className="error-message">{error}</div>}
        {summary ? (
          <div>
            <p>
              <strong>Date:</strong> {summary.date}
            </p>
            <p>
              <strong>Total:</strong> {summary.total}
            </p>
            <p>
              <strong>Completed:</strong> {summary.completed}
            </p>
            <p>
              <strong>Pending:</strong> {summary.pending}
            </p>
          </div>
        ) : (
          <p>Loading summary...</p>
        )}
      </div>
    </div>
  );
};

export default DailySummaryPage;
