'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function LendingPage() {
    const { data: session } = useSession()
    const router = useRouter()
    const [borrower, setBorrower] = useState('')
    const [amount, setAmount] = useState('')
    const [interestRate, setInterestRate] = useState('')
    const [interestType, setInterestType] = useState('SIMPLE')
    const [startDate, setStartDate] = useState('')
    const [searchResults, setSearchResults] = useState([])

    const handleSearch = async (query: string) => {
        const response = await fetch(`/api/searchUsers?query=${query}`)
        const data = await response.json()
        const temp = Array.isArray(data.users) ? data.users : [];
        const filteredResults: [] = temp.filter((user: { email: string | null | undefined }) => user.email !== session?.user?.email);
        setSearchResults(Array.isArray(filteredResults) ? filteredResults : [])
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const response = await fetch('/api/addLending', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ borrower, amount, interestRate, interestType, startDate }),
        })
        if (response.ok) {
            router.push('/dashboard')
        }
    }

    if (!session) {
        router.push('/')
        return null
    }

    return (
        <div className="min-h-screen bg-white flex  justify-center ">
            <div className=" mt-6 rounded-lg w-96 lg:ml-12">
                <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Add Lending Details</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="borrower" className="block text-sm font-medium text-gray-700 mb-1">
                            Lent To
                        </label>
                        <input
                            type="text"
                            id="borrower"
                            value={borrower}
                            onChange={(e) => {
                                setBorrower(e.target.value)
                                handleSearch(e.target.value)
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                            required
                        />
                        {searchResults.length > 0 && (
                            <ul className="mt-2 border border-gray-300 rounded-md">
                                {searchResults.map((user: { id: string; name: string; email: string | null | undefined }) => (
                                    <li
                                        key={user.id}
                                        className="px-3 py-2 hover:bg-gray-200 cursor-pointer"
                                        onClick={() => {
                                            setBorrower(user.name);
                                            setSearchResults([]);
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
                    <button
                        type="submit"
                        className="w-full bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition duration-200"
                    >
                        Save Lending Details
                    </button>
                </form>
            </div>
            <div>
                <Image src='/assets/innovation2.gif' unoptimized alt={"Money management illustration"} height={500} width={500} className="justify-center hidden lg:block  ml-20 mt-32" />
            </div>
        </div>
    )
}