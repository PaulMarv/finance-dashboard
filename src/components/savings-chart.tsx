import React from 'react'
import { useUserContext } from './providers/user-provider';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from "recharts";

const SavingsChart = () => {
    const { savings, loading } = useUserContext();

    if (loading) return <p className='p-4'>Loading chart...</p>;
    return (
        <div className="rounded-xl border-[1px] p-4 border-slate-200">
            <h2 className="text-[14px] font-medium px-2">Savings Performance</h2>
            <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={savings} margin={{ top: 20, right: 20, left: 0, bottom: 10 }}>
                    <defs>
                        <linearGradient id="colorSavings" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8470ff" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#8470ff" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <XAxis
                        dataKey="month"
                        stroke="transparent"
                        tick={{ fill: "black", fontSize: "12px" }}
                    />
                    <Tooltip formatter={(value) => `$${value}`} />
                    <Area
                        type="monotone"
                        dataKey="savings"
                        stroke="#8470ff"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorSavings)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    )
}

export default SavingsChart
