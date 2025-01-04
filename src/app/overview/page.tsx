'use client';
import { useUserContext } from '@/components/providers/user-provider';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowUp } from '@phosphor-icons/react';
import Image from 'next/image';
import React from 'react'

const Dashboard = () => {
  const { user, transactions } = useUserContext();

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
      <div className='w-full mt-4'>
        <div className='rounded-xl border-[1px] border-slate-200 min-h-[100px] p-3 w-full lg:max-w-[400px]'>
          <p className='text-[14px] font-bold'>Total balance</p>
          <div>
            <p className='mt-4 text-2xl font-bold'>$ {user?.accountBalance} </p>
            <div className='flex gap-2 items-center'>
              <div className={`flex text-[14px] items-center mt-2 rounded-full px-1 ${user?.monthlyTrend === 'upward' ? 'text-green-500 bg-green-50' : 'text-red-500 bg-red-50'}`}>
                {
                  user?.monthlyTrend === 'upward' ?
                    <span className='flex items-center '>
                      <ArrowUp size={14} /> <span className='text-green-500'>{user?.percentageChange}%</span>
                    </span> :
                    <span className='flex items-center '>
                      <ArrowUp size={14} /> <span className='text-red-500'>{user?.percentageChange}%</span>
                    </span>
                }
              </div>
              <span className='text-slate-300'>
                vs last month
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className='mt-4 rounded-xl border-[1px] px-3 pt-4 border-slate-200 w-full'>
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
    </div>
  )
}

export default Dashboard
