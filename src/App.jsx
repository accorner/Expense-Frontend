import React, { useState, useEffect } from "react";
import "./App.css";

import { ExpensePieChart } from "./components/ExpensePieChart";
import DailyExpenseChart from "./components/DailyExpenseChart";
import WeeklyExpenseChart from "./components/WeeklyExpenseChart";
import MonthlyExpenseChart from "./components/MonthlyExpenseChart";

import {
  fetchExpenses,
  saveExpense,
  deleteExpenseApi,
} from "./api/expenseApi";
import ViewAllExpenses from "./components/ViewAllExpenses";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");

  // 🔹 FETCH from Spring Boot on load
  useEffect(() => {
    fetchExpenses().then(setExpenses);
  }, []);

  const addExpense = async (e) => {
    e.preventDefault();
    if (!title || !amount) return;

    const expense = {
      title,
      amount: Number(amount),
      category,
    };

    const saved = await saveExpense(expense);
    setExpenses((prev) => [...prev, saved]);

    setTitle("");
    setAmount("");
  };

  const deleteExpense = async (id) => {
    await deleteExpenseApi(id);
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  };

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div style={{ maxWidth: "650px", margin: "40px auto" ,fontFamily: "Arial"}}>
      <h2>My Expense Dashboard</h2>

      <form onSubmit={addExpense}>
        <input
          placeholder="Expense title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />
        <br />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />
      <br />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        >
          <option>Food</option>
          <option>Travel</option>
          <option>Shopping</option>
          <option>Bills</option>
          <option>Medical</option>
          <option>Rent</option>
          <option>Other</option>
        </select>
    <br />
        <button style={{ width: "100%", padding: "10px" }}>Add Expense</button>
      </form>

      <h3>Total Expense: ₹{total}</h3>

      
      <ExpensePieChart expenses={expenses} />
      <DailyExpenseChart expenses={expenses} />
      <WeeklyExpenseChart expenses={expenses} />
      <MonthlyExpenseChart expenses={expenses} />
      <ViewAllExpenses/>
      <a href="https://expense-backend-eg90.onrender.com/"> Run Application</a>
    </div>
  );
}

export default App;
