'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function BorrowingPage() {
    const { data: session } = useSession()
    const router = useRouter()
    const [lender, setLender] = useState('')
    const [amount, setAmount] = useState('')
    const [interestRate, setInterestRate] = useState('')
    const [interestType, setInterestType] = useState('SIMPLE')
    const [startDate, setStartDate] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const handleSearch = async (query: string) => {
        const response = await fetch(`/api/searchUsers?query=${query}`)
        const data = await response.json()
        // setSearchResults(data.users)
        const temp = Array.isArray(data.users) ? data.users : [];
        const filteredResults: [] = temp.filter((user: { email: string | null | undefined }) => user.email !== session?.user?.email);
        setSearchResults(Array.isArray(filteredResults) ? filteredResults : [])
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        const response = await fetch('/api/addBorrowing', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ lender, amount, interestRate, interestType, startDate }),
        })
        setIsLoading(false)
        if (response.ok) {
            router.push('/dashboard')
        }
    }

    if (!session) {
        router.push('/')
        return null
    }
    type User = {
        id: string;
        name: string;
        email?: string; // Since the email could be `null` or `undefined` as per the filter
    };

    return (
        <div className="min-h-screen bg-white flex  justify-center ">
            <div className=" rounded-lg w-96 p-4 mt-6 lg:ml-12">
                <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Add Borrowing Details</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="lender" className="block text-sm font-medium text-gray-700 mb-1">
                            Borrowed From
                        </label>
                        <input
                            type="text"
                            id="lender"
                            value={lender}
                            onChange={(e) => {
                                setLender(e.target.value)
                                handleSearch(e.target.value)
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                            required
                        />
                        {searchResults.length > 0 && (
                            <ul className="mt-2 border border-gray-300 rounded-md">
                                {searchResults.map((user: User) => (
                                    <li
                                        key={user.id}
                                        className="px-3 py-2 hover:bg-gray-200 cursor-pointer"
                                        onClick={() => {
                                            setLender(user.name);
                                            setSearchResults([])
                                        }}
                                    >
                                        {user.name}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
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
                    {/* <button
                        type="submit"
                        className="w-full bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition duration-200"
                    >
                        Save Borrowing Details
                    </button> */}
                    <button
                        type="submit"
                        className="w-full bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition duration-200"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <div className="flex items-center justify-center">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Saving...
                            </div>
                        ) : (
                            'Save Borrowing Details'
                        )}
                    </button>
                </form>
            </div>
            <div>
                <Image src='/assets/innovation.gif' unoptimized alt={"Money management illustration"} height={500} width={500} className="justify-center hidden lg:block  ml-20 mt-32" />
            </div>
        </div>
    )
}