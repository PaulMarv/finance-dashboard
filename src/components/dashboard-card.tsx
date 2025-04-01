import React from 'react';
import { ArrowUp, ArrowDown } from '@phosphor-icons/react';

interface DashboardCardProps {
    title: string;
    amount: number;
    trend: 'upward' | 'downward';
    percentageChange: number;
}

const DashboardCard = ({ title, amount, trend, percentageChange }: DashboardCardProps) => {
    return (
        <div className='rounded-xl border-[1px] border-slate-200 min-h-[100px] p-3 lg:min-w-[330px] w-full lg:w-fit'>
            <p className='text-[14px] font-bold capitalize '>{title}</p>
            <div className=''>
                <p className='mt-4 text-2xl font-bold'>$ {amount} </p>
                <div className='flex gap-2 items-center'>
                    <div className={`flex text-[14px] items-center mt-2 rounded-full px-1 ${trend === 'upward' ? 'text-green-500 bg-green-50' : 'text-red-500 bg-red-50'}`}>
                        {
                            trend === 'upward' ?
                                <span className='flex items-center '>
                                    <ArrowUp size={14} /> <span className='text-green-500'>{percentageChange}%</span>
                                </span> :
                                <span className='flex items-center '>
                                    <ArrowDown size={14} /> <span className='text-red-500'>{percentageChange}%</span>
                                </span>
                        }
                    </div>
                    <span className='text-slate-300'>
                        vs last month
                    </span>
                </div>
            </div>
        </div>
    )
}

export default DashboardCard
