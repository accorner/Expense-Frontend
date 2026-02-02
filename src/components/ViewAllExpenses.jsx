import React, { useEffect, useState } from "react";
import { fetchExpenses, deleteExpenseApi } from "../api/expenseApi";

function ViewAllExpenses() {
  const [expenses, setExpenses] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("date");

  useEffect(() => {
    loadExpenses();
  }, []);

  const loadExpenses = async () => {
    const data = await fetchExpenses();
    setExpenses(data);
  };

  // 🔹 Delete expense and update state immediately
  const deleteExpense = async (id) => {
    await deleteExpenseApi(id);

    // Remove deleted expense from state (auto-reload)
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  };

  // 🔍 Filter + Search + Sort
  const filteredExpenses = expenses
    .filter((e) => (category === "All" ? true : e.category === category))
    .filter((e) => e.title.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "amount") return b.amount - a.amount;
      return new Date(b.date) - new Date(a.date);
    });

  return (
    <div style={{ marginTop: "40px" }}>
      <h3>📋 View All Expenses</h3>

      {/* 🔧 OPTIONS */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
        <input
          placeholder="Search title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option>All</option>
          <option>Food</option>
          <option>Travel</option>
          <option>Shopping</option>
          <option>Bills</option>
          <option>Medical</option>
          <option>Seeds</option>
          <option>Fertilizer</option>
          <option>Other</option>
        </select>

        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="date">Sort by Date</option>
          <option value="amount">Sort by Amount</option>
        </select>
      </div>

      {/* 📊 TABLE */}
      <table border="1" width="100%" cellPadding="8">
        <thead>
          <tr>
            <th>Date</th>
            <th>Title</th>
            <th>Category</th>
            <th>Amount (₹)</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredExpenses.length === 0 ? (
            <tr>
              <td colSpan="5" align="center">
                No expenses found
              </td>
            </tr>
          ) : (
            filteredExpenses.map((e) => (
              <tr key={e.id}>
                <td>{e.date}</td>
                <td>{e.title}</td>
                <td>{e.category}</td>
                <td>{e.amount}</td>
                <td>
                  <button onClick={() => deleteExpense(e.id)}>❌ Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ViewAllExpenses;
