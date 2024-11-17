
// 'use client'

// import { useState, useEffect, useCallback } from 'react'
// import { useSession } from 'next-auth/react'
// import { useRouter } from 'next/navigation'
// import { Button } from "@/components/ui/button"
// import { Skeleton } from '@/components/ui/skeleton'

// interface Transaction {
//   id: string
//   type: 'LENT' | 'BORROWED'
//   name: string
//   amount: number
//   startDate: string
//   interestRate: number
//   interestType: 'SIMPLE' | 'COMPOUND'
//   isRepaid: boolean
// }

// export default function DetailsPage() {
//   const { data: session, status } = useSession()
//   const router = useRouter()
//   const [searchName, setSearchName] = useState('')
//   const [filterType, setFilterType] = useState('ALL')
//   const [allTransactions, setAllTransactions] = useState<Transaction[]>([])
//   const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([])
//   const [isLoading, setIsLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)

//   const fetchTransactions = useCallback(async () => {
//     setIsLoading(true)
//     setError(null)
//     try {
//       const response = await fetch('/api/getTransactions')
//       if (!response.ok) {
//         throw new Error('Failed to fetch transactions')
//       }
//       const data = await response.json()
//       setAllTransactions(data.transactions)
//     } catch (err) {
//       setError('An error occurred while fetching transactions')
//       console.error('Error fetching transactions:', err)
//     } finally {
//       setIsLoading(false)
//     }
//   }, [])

//   useEffect(() => {
//     if (status === 'authenticated') {
//       fetchTransactions()
//     } else if (status === 'unauthenticated') {
//       router.push('/')
//     }
//   }, [status, fetchTransactions, router])

//   useEffect(() => {
//     const filtered = allTransactions.filter(transaction => {
//       const nameMatch = transaction.name.toLowerCase().includes(searchName.toLowerCase())
//       const typeMatch = filterType === 'ALL' || transaction.type === filterType
//       return nameMatch && typeMatch
//     })
//     setFilteredTransactions(filtered)
//   }, [allTransactions, searchName, filterType])

//   const calculateTotalAmount = (transaction: Transaction) => {
//     const { amount, interestRate, interestType, startDate } = transaction
//     const currentDate = new Date()
//     const timeDiff = currentDate.getTime() - new Date(startDate).getTime()
//     const daysDiff = timeDiff / (1000 * 3600 * 24)

//     if (interestType === 'SIMPLE') {
//       return amount + (amount * interestRate * daysDiff) / 36500
//     } else {
//       return amount * Math.pow(1 + interestRate / 36500, daysDiff)
//     }
//   }

//   const calculateSummary = (transactions: Transaction[]) => {
//     return transactions.reduce((acc, transaction) => {
//       acc.totalAmount += transaction.amount
//       acc.totalWithInterest += calculateTotalAmount(transaction)
//       return acc
//     }, { totalAmount: 0, totalWithInterest: 0 })
//   }

//   const handleRowClick = (id: string) => {
//     router.push(`/editdetail/${id}`)
//   }

//   if (status === 'loading' || isLoading) {
//     return (
//       <div className="min-h-screen bg-white px-20 mt-6 font-consola">
//         <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Transaction Details</h1>
//         <div className="flex flex-col items-center space-y-3">
//           <Skeleton className="h-[125px] w-[500px] rounded-xl" />
//           <div className="space-y-2">
//             <Skeleton className="h-10 w-[500px]" />
//             <Skeleton className="h-10 w-[500px]" />
//           </div>
//         </div>
//       </div>
//     )
//   }

//   if (error) {
//     return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>
//   }

//   return (
//     <div className="min-h-screen bg-white p-8">
//       <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Transaction Details</h1>
//       <div className="mb-4 flex space-x-4">
//         <input
//           type="text"
//           placeholder="Search by name"
//           value={searchName}
//           onChange={(e) => setSearchName(e.target.value)}
//           className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
//         />
//         <select
//           value={filterType}
//           onChange={(e) => setFilterType(e.target.value)}
//           className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
//         >
//           <option value="ALL">All</option>
//           <option value="LENT">Lent</option>
//           <option value="BORROWED">Borrowed</option>
//         </select>
//       </div>
//       {filteredTransactions.length === 0 ? (
//         <div className="text-center text-gray-500 mt-8">No transactions found.</div>
//       ) : (
//         <table className="w-full border-collapse border border-gray-500">
//           <thead>
//             <tr className="bg-gray-300">
//               <th className="border border-gray-500 px-4 py-2">Edit</th>
//               <th className="border border-gray-500 px-4 py-2">Type</th>
//               <th className="border border-gray-500 px-4 py-2">Name</th>
//               <th className="border border-gray-500 px-4 py-2">Amount</th>
//               <th className="border border-gray-500 px-4 py-2">Date</th>
//               <th className="border border-gray-500 px-4 py-2">Interest</th>
//               <th className="border border-gray-500 px-4 py-2">Total Amount</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredTransactions.map((transaction: Transaction) => (
//               <tr
//                 key={transaction.id}
//                 className={`${transaction.isRepaid ? 'bg-green-100' : 'bg-red-100'} hover:bg-gray-100`}
//               >
//                 <td className="border border-gray-500 px-4 py-2">
//                   <button onClick={() => handleRowClick(transaction.id)} className="text-blue-500 hover:text-blue-700">
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                       <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
//                     </svg>
//                   </button>
//                 </td>
//                 <td className="border border-gray-500 px-4 py-2">{transaction.type}</td>
//                 <td className="border border-gray-500 px-4 py-2">{transaction.name}</td>
//                 <td className="border border-gray-500 px-4 py-2">₹{transaction.amount.toFixed(2)}</td>
//                 <td className="border border-gray-500 px-4 py-2">{new Date(transaction.startDate).toLocaleDateString()}</td>
//                 <td className="border border-gray-500 px-4 py-2">
//                   {transaction.interestRate}% {transaction.interestType === 'SIMPLE' ? 'S' : 'C'}
//                 </td>
//                 <td className="border border-gray-500 px-4 py-2">₹{calculateTotalAmount(transaction).toFixed(2)}</td>
//               </tr>
//             ))}
//             <tr className="border-t-1 border-gray-700 font-bold">
//               <td className="border border-gray-500 px-4 py-2" colSpan={3}>Total</td>
//               <td className="border border-gray-500 px-4 py-2">₹{calculateSummary(filteredTransactions).totalAmount.toFixed(2)}</td>
//               <td className="border border-gray-500 px-4 py-2" colSpan={2}></td>
//               <td className="border border-gray-500 px-4 py-2">₹{calculateSummary(filteredTransactions).totalWithInterest.toFixed(2)}</td>
//             </tr>
//           </tbody>
//         </table>
//       )}
//     </div>
//   )
// }

'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Skeleton } from '@/components/ui/skeleton'
import Loading from '@/components/ui/loading'

interface Transaction {
  id: string
  type: 'LENT' | 'BORROWED'
  name: string
  amount: number
  startDate: string
  interestRate: number
  interestType: 'SIMPLE' | 'COMPOUND'
  isRepaid: boolean
}

export default function DetailsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [searchName, setSearchName] = useState('')
  const [filterType, setFilterType] = useState('ALL')
  const [paymentStatusFilter, setPaymentStatusFilter] = useState('ALL')
  const [allTransactions, setAllTransactions] = useState<Transaction[]>([])
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchTransactions = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/getTransactions')
      if (!response.ok) {
        throw new Error('Failed to fetch transactions')
      }
      const data = await response.json()
      setAllTransactions(data.transactions)
    } catch (err) {
      setError('An error occurred while fetching transactions')
      console.error('Error fetching transactions:', err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    if (status === 'authenticated') {
      fetchTransactions()
    } else if (status === 'unauthenticated') {
      router.push('/')
    }
  }, [status, fetchTransactions, router])

  useEffect(() => {
    const filtered = allTransactions.filter(transaction => {
      const nameMatch = transaction.name.toLowerCase().includes(searchName.toLowerCase())
      const typeMatch = filterType === 'ALL' || transaction.type === filterType
      const paymentStatusMatch = 
        paymentStatusFilter === 'ALL' || 
        (paymentStatusFilter === 'PAID' && transaction.isRepaid) ||
        (paymentStatusFilter === 'UNPAID' && !transaction.isRepaid)
      return nameMatch && typeMatch && paymentStatusMatch
    })
    setFilteredTransactions(filtered)
  }, [allTransactions, searchName, filterType, paymentStatusFilter])

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

  const calculateSummary = (transactions: Transaction[]) => {
    return transactions.reduce((acc, transaction) => {
      acc.totalAmount += transaction.amount
      acc.totalWithInterest += calculateTotalAmount(transaction)
      return acc
    }, { totalAmount: 0, totalWithInterest: 0 })
  }

  const handleRowClick = (id: string) => {
    router.push(`/editdetail/${id}`)
  }

  if (status === 'loading' || isLoading) {
    return (
      <Loading/>
    )
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>
  }

  return (
    <div className="min-h-screen bg-white p-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Transaction Details</h1>
      <div className="mb-4 flex space-x-4">
        <input
          type="text"
          placeholder="Search by name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
        />
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
        >
          <option value="ALL">All</option>
          <option value="LENT">Lent</option>
          <option value="BORROWED">Borrowed</option>
        </select>
        <select
          value={paymentStatusFilter}
          onChange={(e) => setPaymentStatusFilter(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
        >
          <option value="ALL">All</option>
          <option value="PAID">Paid</option>
          <option value="UNPAID">Unpaid</option>
        </select>
      </div>
      {filteredTransactions.length === 0 ? (
        <div className="text-center text-gray-500 mt-8">No transactions found.</div>
      ) : (
        <table className="w-full border-collapse border border-gray-500">
          <thead>
            <tr className="bg-gray-300">
              <th className="border border-gray-500 px-4 py-2">Edit</th>
              <th className="border border-gray-500 px-4 py-2">Type</th>
              <th className="border border-gray-500 px-4 py-2">Name</th>
              <th className="border border-gray-500 px-4 py-2">Amount</th>
              <th className="border border-gray-500 px-4 py-2">Date</th>
              <th className="border border-gray-500 px-4 py-2">Interest</th>
              <th className="border border-gray-500 px-4 py-2">Total Amount</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((transaction: Transaction) => (
              <tr
                key={transaction.id}
                className={`${transaction.isRepaid ? 'bg-green-100' : 'bg-red-100'} hover:bg-gray-100`}
              >
                <td className="border border-gray-500 px-4 py-2">
                  <button onClick={() => handleRowClick(transaction.id)} className="text-blue-500 hover:text-blue-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                  </button>
                </td>
                <td className="border border-gray-500 px-4 py-2">{transaction.type}</td>
                <td className="border border-gray-500 px-4 py-2">{transaction.name}</td>
                <td className="border border-gray-500 px-4 py-2">₹{transaction.amount.toFixed(2)}</td>
                <td className="border border-gray-500 px-4 py-2">{new Date(transaction.startDate).toLocaleDateString()}</td>
                <td className="border border-gray-500 px-4 py-2">
                  {transaction.interestRate}% {transaction.interestType === 'SIMPLE' ? 'S' : 'C'}
                </td>
                <td className="border border-gray-500 px-4 py-2">₹{calculateTotalAmount(transaction).toFixed(2)}</td>
              </tr>
            ))}
            <tr className="border-t-2 border-gray-700 font-bold">
              <td className="border border-gray-500 px-4 py-2" colSpan={3}>Total</td>
              <td className="border border-gray-500 px-4 py-2">₹{calculateSummary(filteredTransactions).totalAmount.toFixed(2)}</td>
              <td className="border border-gray-500 px-4 py-2" colSpan={2}></td>
              <td className="border border-gray-500 px-4 py-2">₹{calculateSummary(filteredTransactions).totalWithInterest.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  )
}