const BASE_URL = "https://expense-backend-eg90.onrender.com/api/expenses";

export const fetchExpenses = async () => {
  const res = await fetch(BASE_URL);
  return res.json();
};

export const saveExpense = async (expense) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(expense),
  });
  return res.json();
};

export const deleteExpenseApi = async (id) => {
  await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
};
