import { DialogContent } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/text-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import React, { Dispatch, SetStateAction } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

type LoanFormInputs = {
    amount: number;
    tenure: number;
    purpose: string;
    fullDescription: string;
    type: "secure" | "insecure";
};
interface RequestDialogProp {
    setOpenDialog: Dispatch<SetStateAction<boolean>>
}

export const RequestLoanDialog = ({ setOpenDialog }: RequestDialogProp) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting, isValid },
    } = useForm<LoanFormInputs>(
        {
            mode: "all",
        }
    );


    const onSubmit: SubmitHandler<LoanFormInputs> = async (data) => {
        try {
            const response = await fetch('/api/loans', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                alert(errorData.error || 'Failed to submit loan request.');
                return;
            }

            alert('Loan request submitted successfully!');
            reset();
            setOpenDialog(false);

        } catch (error) {
            console.error('Error submitting loan request:', error);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <DialogContent>
            <div>
                <h2 className="font-medium text-lg">Submit a Loan Request</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
                    {/* Amount Field */}
                    <div>
                        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                            Loan Amount:
                        </label>
                        <Input
                            id="amount"
                            type="number"
                            {...register('amount', {
                                required: 'Loan amount is required.',
                                min: { value: 1, message: 'Amount must be a positive number.' },
                            })}
                        />
                        {errors.amount && <p className="text-sm text-red-600 mt-1">{errors.amount.message}</p>}
                    </div>

                    {/* Tenure Field */}
                    <div>
                        <label htmlFor="tenure" className="block text-sm font-medium text-gray-700">
                            Tenure (months):
                        </label>
                        <Input
                            id="tenure"
                            type="number"
                            {...register('tenure', {
                                required: 'Tenure is required.',
                                min: { value: 1, message: 'Tenure must be a positive number.' },
                            })}
                        />
                        {errors.tenure && <p className="text-sm text-red-600 mt-1">{errors.tenure.message}</p>}
                    </div>

                    {/* Purpose Field */}
                    <div>
                        <label htmlFor="purpose" className="block text-sm font-medium text-gray-700">
                            Purpose:
                        </label>
                        <Input
                            id="purpose"
                            type="text"
                            {...register('purpose', { required: 'Purpose is required.' })}
                        />
                        {errors.purpose && <p className="text-sm text-red-600 mt-1">{errors.purpose.message}</p>}
                    </div>

                    {/* Full Description Field */}
                    <div>
                        <label htmlFor="fullDescription" className="block text-sm font-medium text-gray-700">
                            Full Description:
                        </label>
                        <Textarea
                            id="fullDescription"
                            rows={4}
                            {...register('fullDescription', {
                                required: 'Full description is required.',
                            })}
                        />
                        {errors.fullDescription && (
                            <p className="text-sm text-red-600 mt-1">{errors.fullDescription.message}</p>
                        )}
                    </div>

                    {/* Loan Type Field */}
                    <div>
                        <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                            Type:
                        </label>
                        <Select
                            onValueChange={(value) => {
                                register('type').onChange({ target: { value } });
                            }}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select loan type" />
                            </SelectTrigger>
                            <SelectContent className='z-[1000] bg-white'>
                                <SelectItem value="secure">Secure</SelectItem>
                                <SelectItem value="insecure">Insecure</SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.type && <p className="text-sm text-red-600 mt-1">{errors.type.message}</p>}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isSubmitting || !isValid}
                        className="w-full py-2 px-4  text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 bg-[#8470ff]"
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit'}
                    </button>
                </form>
            </div>
        </DialogContent>
    );
};
