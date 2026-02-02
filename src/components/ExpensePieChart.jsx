import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";


const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AA336A"];


export function ExpensePieChart({ expenses }) {
    const categoryData = Object.values(
        expenses.reduce((acc, curr) => {
            acc[curr.category] = acc[curr.category] || {
                name: curr.category,
                value: 0,
            };
            acc[curr.category].value += curr.amount;
            return acc;
        }, {})
    );


    if (categoryData.length === 0) return null;


    return (
        <PieChart width={400} height={300}>
            <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label
            >
                {categoryData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
            <Tooltip />
            <Legend />
        </PieChart>
    );
}