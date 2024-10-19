'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function DetailsPage() {
    const { data: session } = useSession()
    const router = useRouter()
    const [searchName, setSearchName] = useState('')
    const [filterType, setFilterType] = useState('ALL')
    const [transactions, setTransactions] = useState([])

    useEffect(() => {
        if (session) {
            fetchTransactions()
        }
    }, [session, searchName, filterType])


    interface Transaction {
        id: number;
        type: string;
        name: string;
        amount: number;
        startDate: string;
        interestRate: number;
        interestType: 'SIMPLE' | 'COMPOUND';
        isRepaid: boolean
    }
    const fetchTransactions = async () => {
        const response = await fetch(`/api/getTransactions?name=${searchName}&type=${filterType}`)
        const data = await response.json()
        setTransactions(data.transactions)
    }

    const handleRowClick = (id: number) => {
        router.push(`/editdetail/${id}`)
    }

    const calculateTotalAmount = (transaction: Transaction) => {
        const { amount, interestRate, interestType, startDate } = transaction
        const currentDate = new Date()
        const timeDiff = currentDate.getTime() - new Date(startDate).getTime()
        const daysDiff = timeDiff / (1000 * 3600 * 24)

        if (interestType === 'SIMPLE') {
            return amount + (amount * interestRate * daysDiff) / 36500
        } else {
            return amount * Math.pow(1 + interestRate / 36500, daysDiff)
        }
    }

    if (!session) {
        router.push('/')
        return null
    }

    return (
        <div className="min-h-screen bg-white px-20 mt-6 font-consola">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Transaction Details</h1>
            <div className="mb-4 flex space-x-4">
                <input
                    type="text"
                    placeholder="Search by name"
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                    className="px-3 py-2 border border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                />
                <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="px-3 py-2 border border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                >
                    <option value="ALL">All</option>
                    <option value="LENT">Lent</option>
                    <option value="BORROWED">Borrowed</option>
                </select>
            </div>
            <table className="w-full border-collapse border border-gray-500">
                <thead>
                    <tr className="bg-gray-300">
                        <th className="border border-gray-500 px-4 py-2">Type</th>
                        <th className="border border-gray-500 px-4 py-2">Name</th>
                        <th className="border border-gray-500 px-4 py-2">Amount</th>
                        <th className="border border-gray-500 px-4 py-2">Date</th>
                        <th className="border border-gray-500 px-4 py-2">Interest</th>
                        <th className="border border-gray-500 px-4 py-2">Total Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction: Transaction) => (
                        <tr
                            key={transaction.id}
                            className={`${transaction.isRepaid ? 'bg-green-100' : 'bg-red-100'} cursor-pointer hover:bg-gray-100`}
                            onClick={() => handleRowClick(transaction.id )}
                        >
                            <td className="border border-gray-500 px-4 py-2">{transaction.type}</td>
                            <td className="border border-gray-500 px-4 py-2">{transaction.name}</td>
                            <td className="border border-gray-500 px-4 py-2">₹{transaction.amount.toFixed(2)}</td>
                            <td className="border border-gray-500 px-4 py-2">{new Date(transaction.startDate).toLocaleDateString()}</td>
                            <td className="border border-gray-500 px-4 py-2">
                                {transaction.interestRate}%      {transaction.interestType === 'SIMPLE' ? 'S' : 'C'}
                            </td>
                            <td className="border border-gray-500 px-4 py-2">₹{calculateTotalAmount(transaction).toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}