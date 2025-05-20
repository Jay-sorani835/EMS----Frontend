import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../index.css';

const Performance = () => {
  const [reviews, setReviews] = useState([
    { id: 1, employee: 'John Doe', rating: 4, feedback: 'Excellent team player' },
    { id: 2, employee: 'Jane Smith', rating: 3, feedback: 'Good, but needs improvement in deadlines' },
  ]);
  const [form, setForm] = useState({ employee: '', rating: '', feedback: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newReview = { id: Date.now(), ...form };
    setReviews([...reviews, newReview]);
    setForm({ employee: '', rating: '', feedback: '' });
  };

  return (
    <div className="min-h-screen p-4 relative overflow-hidden">
      {/* 🌈 Live Background */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-purple-600 via-blue-500 to-indigo-600 animate-gradient" />

      <div className="relative z-10 bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-xl">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">🌟 Performance Evaluation</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="employee" value={form.employee} onChange={handleChange} placeholder="Employee Name"
            className="border p-2 w-full rounded shadow focus:outline-none focus:ring focus:border-blue-300" required />
          <input name="rating" value={form.rating} onChange={handleChange} placeholder="Rating (1-5)" type="number" min="1" max="5"
            className="border p-2 w-full rounded shadow focus:outline-none focus:ring focus:border-blue-300" required />
          <textarea name="feedback" value={form.feedback} onChange={handleChange} placeholder="Feedback"
            className="border p-2 w-full rounded shadow focus:outline-none focus:ring focus:border-blue-300" required />
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-all">
            Submit Review
          </button>
        </form>

        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">📋 Review List</h3>
          {reviews.map(r => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
              className="border border-gray-300 bg-white rounded p-4 my-2 shadow hover:shadow-md"
            >
              <p className="font-bold text-gray-800">{r.employee} - ⭐ {r.rating}</p>
              <p className="text-gray-600">{r.feedback}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Performance;
