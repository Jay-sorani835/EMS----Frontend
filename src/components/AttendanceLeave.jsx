import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../index.css';
const AttendanceLeave = () => {
  const [attendance, setAttendance] = useState([]);
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [leaveForm, setLeaveForm] = useState({ employee: '', date: '', reason: '' });

  const markAttendance = (employee) => {
    if (!employee.trim()) return;
    const date = new Date().toLocaleDateString();
    setAttendance([...attendance, { id: Date.now(), employee, date }]);
  };

  const handleLeaveChange = (e) => {
    setLeaveForm({ ...leaveForm, [e.target.name]: e.target.value });
  };

  const submitLeave = (e) => {
    e.preventDefault();
    setLeaveRequests([
      ...leaveRequests,
      { ...leaveForm, id: Date.now(), status: 'Pending' },
    ]);
    setLeaveForm({ employee: '', date: '', reason: '' });
  };

  const updateLeaveStatus = (id, status) => {
    setLeaveRequests(leaveRequests.map(l => (l.id === id ? { ...l, status } : l)));
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-green-100 via-blue-100 to-purple-100 relative">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">
          📋 Attendance & Leave Management
        </h2>

        {/* Attendance Input */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Enter Employee Name & Press Enter"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                markAttendance(e.target.value);
                e.target.value = '';
              }
            }}
            className="border border-gray-300 p-3 w-full rounded shadow focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
          <h4 className="mt-6 font-semibold text-lg text-gray-700">✅ Today's Attendance</h4>
          <div className="mt-2 space-y-2">
            {attendance.map(a => (
              <motion.div
                key={a.id}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="p-3 bg-green-100 rounded shadow text-sm"
              >
                {a.employee} - {a.date}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Leave Form */}
        <form onSubmit={submitLeave} className="space-y-4">
          <h3 className="text-xl font-semibold text-indigo-600">📝 Leave Request</h3>
          <input
            name="employee"
            value={leaveForm.employee}
            onChange={handleLeaveChange}
            placeholder="Employee Name"
            className="border p-3 w-full rounded shadow focus:outline-none focus:ring focus:border-indigo-400"
            required
          />
          <input
            name="date"
            value={leaveForm.date}
            onChange={handleLeaveChange}
            type="date"
            className="border p-3 w-full rounded shadow focus:outline-none focus:ring focus:border-indigo-400"
            required
          />
          <textarea
            name="reason"
            value={leaveForm.reason}
            onChange={handleLeaveChange}
            placeholder="Reason for leave"
            className="border p-3 w-full rounded shadow focus:outline-none focus:ring focus:border-indigo-400"
            required
          />
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded shadow transition-all"
          >
            Request Leave
          </button>
        </form>

        {/* Leave Requests */}
        <div className="mt-8">
          <h4 className="text-lg font-semibold text-gray-700 mb-2">📨 Leave Requests</h4>
          {leaveRequests.length === 0 && (
            <p className="text-gray-500">No leave requests submitted yet.</p>
          )}
          {leaveRequests.map((lr) => (
            <motion.div
              key={lr.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`border-l-4 p-4 rounded shadow mb-4 ${
                lr.status === 'Approved'
                  ? 'border-green-500 bg-green-50'
                  : lr.status === 'Rejected'
                  ? 'border-red-500 bg-red-50'
                  : 'border-yellow-500 bg-yellow-50'
              }`}
            >
              <p className="font-bold">{lr.employee} - {lr.date}</p>
              <p className="text-sm text-gray-700">{lr.reason}</p>
              <p className="mt-1 text-sm">
                <span className="font-semibold">Status:</span>{' '}
                <span
                  className={`font-bold ${
                    lr.status === 'Approved'
                      ? 'text-green-600'
                      : lr.status === 'Rejected'
                      ? 'text-red-600'
                      : 'text-yellow-600'
                  }`}
                >
                  {lr.status}
                </span>
              </p>
              {lr.status === 'Pending' && (
                <div className="mt-2 space-x-2">
                  <button
                    onClick={() => updateLeaveStatus(lr.id, 'Approved')}
                    className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => updateLeaveStatus(lr.id, 'Rejected')}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                  >
                    Reject
                  </button>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default AttendanceLeave;
