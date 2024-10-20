'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import Image from 'next/image'
import { Skeleton } from '@/components/ui/skeleton'

export default function EditDetailPage({ params }: { params: { id: string } }) {
    const { data: session } = useSession()
    const router = useRouter()
    // const [transaction, setTransaction] = useState<any>(null)
    type Transaction = {
        id: string;
        amount: number;
        interestRate: number;
        interestType: 'SIMPLE' | 'COMPOUND';
        startDate: string; // or Date if you're using Date objects
        isRepaid: boolean;
    };

    const [transaction, setTransaction] = useState<Transaction | null>(null);

    const [amount, setAmount] = useState('')
    const [interestRate, setInterestRate] = useState('')
    const [interestType, setInterestType] = useState('')
    const [startDate, setStartDate] = useState('')
    const [isRepaid, setIsRepaid] = useState(false)

    useEffect(() => {
        if (session) {
            fetchTransactionDetails()
        }
    }, [session, params.id])

    const fetchTransactionDetails = async () => {
        const response = await fetch(`/api/getTransactionDetail?id=${params.id}`)
        const data = await response.json()
        if (data.transaction) {
            setTransaction(data.transaction)
            setAmount(data.transaction.amount.toString())
            setInterestRate(data.transaction.interestRate.toString())
            setInterestType(data.transaction.interestType)
            setStartDate(new Date(data.transaction.startDate).toISOString().split('T')[0])
            setIsRepaid(data.transaction.isRepaid)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const response = await fetch('/api/updateTransaction', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: params.id,
                amount: parseFloat(amount),
                interestRate: parseFloat(interestRate),
                interestType,
                startDate: new Date(startDate).toISOString(),
                isRepaid,
                endDate: isRepaid ? new Date().toISOString() : null,
            }),
        })
        if (response.ok) {
            router.push('/dashboard')
        } else {
            const errorData = await response.json()
            console.error('Failed to update transaction:', errorData.error)
            // You might want to show an error message to the user here
        }
    }

    if (!session || !transaction) {
        return (
            <div className="min-h-screen bg-white px-20 mt-6 font-consola">
                <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Transaction Details</h1>
                <div className="flex flex-col items-center space-y-3">
                    <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                    <div className="space-y-2">
                        <Skeleton className="h-20 w-[500px]" />
                        <Skeleton className="h-20 w-[500px]" />
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-white flex  justify-center font-consola">
            <div className=" rounded-lg w-96 mt-6 lg:ml-12">
                <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Edit Transaction</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                            Amount
                        </label>
                        <input
                            type="number"
                            id="amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="interestRate" className="block text-sm font-medium text-gray-700 mb-1">
                            Interest Rate
                        </label>
                        <input
                            type="number"
                            id="interestRate"
                            value={interestRate}
                            onChange={(e) => setInterestRate(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="interestType" className="block text-sm font-medium text-gray-700 mb-1">
                            Interest Type
                        </label>
                        <select
                            id="interestType"
                            value={interestType}
                            onChange={(e) => setInterestType(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                            required
                        >
                            <option value="SIMPLE">Simple</option>
                            <option value="COMPOUND">Compound</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                            Start Date
                        </label>
                        <input
                            type="date"
                            id="startDate"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                            required
                        />
                    </div>
                    <div>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={isRepaid}
                                onChange={(e) => setIsRepaid(e.target.checked)}
                                className="mr-2"
                            />
                            <span className="text-sm font-medium text-gray-700">Mark as Repaid</span>
                        </label>
                    </div>
                    <Button
                        type="submit"
                        className="w-full bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition duration-200"
                    >
                        Update Transaction
                    </Button>
                </form>
            </div>
            <div>
                <Image src='/assets/innovation3.gif' unoptimized alt={"Money management illustration"} height={600} width={600} className="justify-center hidden lg:block  ml-2 mt-8" />
            </div>
        </div>
    )
}