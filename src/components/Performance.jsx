import React, { useState } from 'react';

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
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Performance Evaluation</h2>
      <form onSubmit={handleSubmit} className="space-y-2">
        <input name="employee" value={form.employee} onChange={handleChange} placeholder="Employee Name" className="border p-2 w-full" required />
        <input name="rating" value={form.rating} onChange={handleChange} placeholder="Rating (1-5)" type="number" min="1" max="5" className="border p-2 w-full" required />
        <textarea name="feedback" value={form.feedback} onChange={handleChange} placeholder="Feedback" className="border p-2 w-full" required />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">Submit Review</button>
      </form>

      <div className="mt-6">
        <h3 className="text-lg font-semibold">Review List</h3>
        {reviews.map(r => (
          <div key={r.id} className="border p-2 my-2">
            <p><strong>{r.employee}</strong> - ⭐ {r.rating}</p>
            <p>{r.feedback}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Performance;
