// context/ReportContext.jsx
import React, { createContext, useContext, useState } from 'react';

const ReportContext = createContext();

export function ReportProvider({ children }) {
  const [reports, setReports] = useState([]);

  const makeId = () => Math.random().toString(36).slice(2, 9);

  const addReport = (report) => {
    const item = {
      id: makeId(),
      title: report.title || 'Untitled',
      description: report.description || '',
      image: report.image || null,
      status: report.status || 'Pending',
      history: report.history || ['Pending'],
      upvotes: typeof report.upvotes === 'number' ? report.upvotes : 0,
      coworker: report.coworker || null,
      createdAt: Date.now(),
    };
    setReports((prev) => [item, ...prev]);
  };

  const updateStatus = (index, newStatus) => {
    setReports((prev) =>
      prev.map((r, i) => {
        if (i !== index) return r;
        const history = Array.isArray(r.history) ? [...r.history, newStatus] : [newStatus];
        return { ...r, status: newStatus, history };
      })
    );
  };

  const assignWork = (index, coworkerName) => {
    setReports((prev) =>
      prev.map((r, i) => {
        if (i !== index) return r;
        const history = Array.isArray(r.history) ? [...r.history, `Assigned to ${coworkerName}`] : [`Assigned to ${coworkerName}`];
        return { ...r, status: 'Assigned', coworker: coworkerName, history };
      })
    );
  };

  const undoStatus = (index) => {
    setReports((prev) =>
      prev.map((r, i) => {
        if (i !== index) return r;
        const history = Array.isArray(r.history) ? [...r.history] : [];
        if (history.length > 1) {
          history.pop();
          const status = history[history.length - 1] || 'Pending';
          const coworker = status === 'Assigned' ? r.coworker : null;
          return { ...r, status, history, coworker: coworker || null };
        }
        return { ...r, status: 'Pending', history: ['Pending'], coworker: null };
      })
    );
  };

  const upvoteReport = (index) => {
    setReports((prev) =>
      prev.map((r, i) => (i === index ? { ...r, upvotes: (r.upvotes || 0) + 1 } : r))
    );
  };

  return (
    <ReportContext.Provider
      value={{ reports, addReport, updateStatus, assignWork, undoStatus, upvoteReport }}
    >
      {children}
    </ReportContext.Provider>
  );
}

export function useReports() {
  return useContext(ReportContext);
}
