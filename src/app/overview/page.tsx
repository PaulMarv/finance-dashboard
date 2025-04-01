'use client';
import { useUserContext } from '@/components/providers/user-provider';
import DashboardCard from '@/components/dashboard-card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Image from 'next/image';
import React from 'react'
import SavingsChart from '@/components/savings-chart';
import InvestmentChart from '@/components/investment-chart';

const Dashboard = () => {
  const { user, transactions, investments } = useUserContext();

  return (
    <div className='w-full flex flex-col lg:gap-8 gap-4'>
      <div className='flex  gap-4 justify-between'>
        <div>
          <p className='text-2xl font-bold'>Welcome back, {user?.name}!</p>
          <p className='text-slate-300'>It is the best time to manage your finances</p>
        </div>
        <div className="relative lg:w-16 w-12 lg:h-16 h-12">
          <Image
            src="/images/dummy-profile-pic.png"
            alt="image"
            fill
            className="rounded-full object-cover"
          />
        </div>
      </div>
      <div className='w-full mt-4 flex flex-col lg:flex-row gap-10 flex-wrap'>
        <DashboardCard title={'Total Balance'} amount={user?.totalBalance?.amount ?? 0} trend={user?.totalBalance?.monthlyTrend ?? 'upward'} percentageChange={user?.totalBalance?.percentageChange ?? 0} />
        <DashboardCard title={'Total Investments'} amount={user?.totalInvestment?.amount ?? 0} trend={user?.totalInvestment?.monthlyTrend ?? 'upward'} percentageChange={user?.totalInvestment?.percentageChange ?? 0} />
        <DashboardCard title={'Total Returns'} amount={user?.totalReturns?.amount ?? 0} trend={user?.totalReturns?.monthlyTrend ?? 'upward'} percentageChange={user?.totalReturns?.percentageChange ?? 0} />
      </div>
      <div className='mt-4 w-full flex flex-col lg:flex-row gap-10 lg:justify-between'>
        <div className='flex flex-col gap-2 w-full'>
          <div className='rounded-xl border-[1px] px-3 pt-4 border-slate-200 w-full'>
            <p className='text-[14px] font-medium px-2'>Recent Transactions</p>
            <div className='mt-4'>
              <Table>
                <TableHeader >
                  <TableRow className='bg-[#f6f4ff] text-[#8470ff] rounded-full border-none'>
                    <TableHead>S/N</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {transactions.map((item, index) => (
                    <TableRow key={item.id}>
                      <TableCell className="">
                        {index + 1}
                      </TableCell>
                      <TableCell>{item.description}</TableCell>
                      <TableCell>$ {item.amount}</TableCell>
                      <TableCell>{new Date(item.date).toLocaleDateString()}</TableCell>
                      <TableCell className=''>
                        <span className={`rounded-full py-1 px-2 ${item.type === 'credit' ? 'text-green-500 bg-green-50' : 'text-red-500 bg-red-50'}`}>
                          {item.type}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
          <SavingsChart />
        </div>
        <div className='rounded-xl border-[1px] border-slate-200 w-full h-fit lg:max-w-[300px]'>
          <h2 className='px-3 py-4 text-[14px] font-medium'>Your Invest Platform</h2>
          <div>
            <InvestmentChart />
          </div>
          <div className='mt-2'>
            {investments.slice(0, 4).map((item, index) => (
              <div key={index} className={`flex items-center justify-between px-3 py-2 ${index !== investments.length - 1 ? 'border-b border-slate-200' : ''}`}>
                <p className='text-[14px] flex flex-col'>
                  <span>
                    {item.platform}
                  </span>
                  <span className="text-[10px] font-normal">
                    {"*".repeat(5) + item?.account_number?.toString().slice(5)}
                  </span>
                </p>
                <p className='text-[14px]'>$ {item.investment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
export default Dashboard
