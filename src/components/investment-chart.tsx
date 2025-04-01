import React from 'react'
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from "recharts";
import { useUserContext } from './providers/user-provider';

const InvestmentChart = () => {
    const { investments, loading } = useUserContext();

    const COLORS = ["#8470ff", "#6a5acd", "#483d8b", "#7b68ee", "#9370db", "#b39ddb", "#d1c4e9", "#d8bfd8", "#e6e6fa", "#f0f8ff"];
    if (loading) return <p className='p-4'>Loading chart...</p>;
    return (
        <div className="">
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={investments}
                        dataKey="investment"
                        nameKey="platform"
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        fill="#8470ff"
                        label={false}
                    >
                        {investments.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip formatter={(value) => `$${value}`} />
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}

export default InvestmentChart