import { DialogContent } from '@/components/ui/dialog'
import { Loan } from '@/types'
import React from 'react'

type LoanDetailsDialogProps = {
    userLoan: Loan;
};

export const LoanDetailsDialog = ({ userLoan }: LoanDetailsDialogProps) => {
    return (
        <DialogContent className='overflow-y-auto'>
            <p className='font-bold'>Loan Details</p>
            <div className='flex flex-col gap-2'>
                <div>
                    <p className='font-medium'>Status</p>
                    <p className='text-slate-300'>{userLoan?.status}</p>
                </div>
                <div>
                    <p className='font-medium'>Amount</p>
                    <p className='text-slate-300'>${userLoan?.amount}</p>
                </div>
                <div>
                    <p className='font-medium'>Loan Description</p>
                    <p className='text-slate-300'>{userLoan?.fullDescription}</p>
                </div>
                <div>
                    <p className='font-medium'>Interest Rate</p>
                    <p className='text-slate-300'>{userLoan?.interestRate}%</p>
                </div>
                <div>
                    <p className='font-medium'>Loan Type</p>
                    <p className='text-slate-300 capitalize'>{userLoan?.type}</p>
                </div>
                <div>
                    <p className='font-medium'>Loan DUration</p>
                    <p className='text-slate-300'>{userLoan?.tenure} month(s)</p>
                </div>
            </div>
        </DialogContent>
    )
}
