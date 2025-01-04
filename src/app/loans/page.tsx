'use client';

import { useUserContext } from '@/components/providers/user-provider';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import React, { useState } from 'react'
import { RequestLoanDialog } from './requestLoanDialog';
import { LoanDetailsDialog } from './loanDetailsDialog';

const Loans = () => {
  const { loans, loading, error } = useUserContext();
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  return (
    <div>
      <div className='mt-4 rounded-xl border-[1px] px-3 pt-4 border-slate-200 w-full'>
        <div className='flex justify-between items-center '>
          <p className='font-medium px-2'>Loan History</p>
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger>
              <button className='border-none p-2 px-4 rounded-full text-[14px] bg-[#8470ff] text-white font-medium'>Request Loan</button>
            </DialogTrigger>
            <RequestLoanDialog setOpenDialog={setOpenDialog} />
          </Dialog>
        </div>
        <div className='mt-4'>
          <Table>
            <TableHeader>
              <TableRow className='bg-[#f6f4ff] text-[#8470ff] rounded-full border-none'>
                <TableHead>S/N</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Tenure</TableHead>
                <TableHead>Status</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
            {loading && <p className="text-slate-400 w-full text-center p-4">Loading transactions...</p>}
            {error && <p className="error">{error}</p>}
              {loans.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell className="">
                    {index + 1}
                  </TableCell>
                  <TableCell>{item.purpose}</TableCell>
                  <TableCell>$ {item.amount}</TableCell>
                  <TableCell>{item.tenure} months</TableCell>
                  <TableCell className=''>
                    <span className={`capitalize rounded-full py-1 px-2 ${item.status === 'active' ? 'text-green-500 bg-green-50' : item.status === 'inactive' ? 'text-slate-500 bg-slate-100' : 'text-yellow-600 bg-yellow-100'}`}>
                      {item.status}
                    </span>
                  </TableCell>
                  <TableCell>{item.status === 'active' &&
                    <Dialog>
                      <DialogTrigger>
                        <span className='cursor-pointer text-[#8470ff]'>View</span>
                      </DialogTrigger>
                      <LoanDetailsDialog userLoan= {item} />
                    </Dialog>
                  }</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}

export default Loans
