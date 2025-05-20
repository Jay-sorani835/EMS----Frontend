import React, { useState } from 'react';

const AttendanceLeave = () => {
  const [attendance, setAttendance] = useState([]);
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [leaveForm, setLeaveForm] = useState({ employee: '', date: '', reason: '' });

  const markAttendance = (employee) => {
    const date = new Date().toLocaleDateString();
    setAttendance([...attendance, { id: Date.now(), employee, date }]);
  };

  const handleLeaveChange = (e) => {
    setLeaveForm({ ...leaveForm, [e.target.name]: e.target.value });
  };

  const submitLeave = (e) => {
    e.preventDefault();
    setLeaveRequests([...leaveRequests, { ...leaveForm, id: Date.now(), status: 'Pending' }]);
    setLeaveForm({ employee: '', date: '', reason: '' });
  };

  const updateLeaveStatus = (id, status) => {
    setLeaveRequests(leaveRequests.map(l => (l.id === id ? { ...l, status } : l)));
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Attendance & Leave Management</h2>

      {/* Mark Attendance */}
      <div className="mb-6">
        <input type="text" placeholder="Employee Name" onKeyDown={(e) => e.key === 'Enter' && markAttendance(e.target.value)} className="border p-2 w-full" />
        <h4 className="mt-4 font-semibold">Today's Attendance</h4>
        {attendance.map(a => (
          <div key={a.id}>{a.employee} - {a.date}</div>
        ))}
      </div>

      {/* Leave Request Form */}
      <form onSubmit={submitLeave} className="space-y-2 mb-4">
        <input name="employee" value={leaveForm.employee} onChange={handleLeaveChange} placeholder="Employee Name" className="border p-2 w-full" required />
        <input name="date" value={leaveForm.date} onChange={handleLeaveChange} placeholder="Leave Date" type="date" className="border p-2 w-full" required />
        <textarea name="reason" value={leaveForm.reason} onChange={handleLeaveChange} placeholder="Reason for leave" className="border p-2 w-full" required />
        <button type="submit" className="bg-green-500 text-white px-4 py-2">Request Leave</button>
      </form>

      {/* Leave Requests */}
      <h4 className="font-semibold">Leave Requests</h4>
      {leaveRequests.map(lr => (
        <div key={lr.id} className="border p-2 my-2">
          <p><strong>{lr.employee}</strong> - {lr.date}</p>
          <p>{lr.reason}</p>
          <p>Status: {lr.status}</p>
          {lr.status === 'Pending' && (
            <div className="space-x-2">
              <button onClick={() => updateLeaveStatus(lr.id, 'Approved')} className="bg-blue-500 text-white px-2">Approve</button>
              <button onClick={() => updateLeaveStatus(lr.id, 'Rejected')} className="bg-red-500 text-white px-2">Reject</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AttendanceLeave;
