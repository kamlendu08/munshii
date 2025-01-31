'use client'
import { Button } from "@/components/ui/button"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton"
import Loading from "@/components/ui/loading";

export default function Dashboard() {
  type FinancialData = {
    totalDebt: number;
    totalLent: number;
    netBalance: number;
    totalLentInterest: number;
    totalBorrowedInterest: number;
    totalInterest: number;
  };
  const router = useRouter();
  // const { data: session, status } = useSession()
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/');
    },
  })
  const [financialData, setFinancialData] = useState<FinancialData>({
    totalDebt: 0,
    totalLent: 0,
    netBalance: 0,
    totalLentInterest: 0,
    totalBorrowedInterest: 0,
    totalInterest: 0,
  })

  useEffect(() => {
    if (session) {
      fetchFinancialData()
    }
  }, [session])

  const [, setError] = useState<string | null>(null);
  const fetchFinancialData = async () => {
    try {
      setError(null)
      const response = await fetch('/api/getFinancialData')
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      setFinancialData(data)
    } catch (error) {
      console.error('Error fetching financial data:', error)
      setError('Failed to fetch financial data. Please try again later.')
      setFinancialData({
        totalDebt: 0,
        totalLent: 0,
        netBalance: 0,
        totalLentInterest: 0,
        totalBorrowedInterest: 0,
        totalInterest: 0,
      })
    }
  }
  if (!session) {
    router.push('/');
  }
  
  if (status === 'loading' || !financialData) {
    return (
      <Loading/>
    )
  }
  // Placeholder data - replace with actual data in your implementation
  const totalDebt = 5000000
  const totalLent = 3000000
  const netBalance = totalLent - totalDebt


  return (
    <div className="min-h-screen bg-white text-black px-8 flex flex-col items-center mt-8">
      <h1 className="text-4xl   lg:text-5xl font-normal  text-center">WELCOME {session?.user?.name}</h1>
      <h1 className="text-2xl  p-2 lg:text-4xl font-extralight  text-center"> SUMMARY</h1>
      <canvas id="myCanvas"   className="bg-gray-300 w-96 h-1" ></canvas>

      <div className="flex flex-wrap justify-center gap-8 mb-8 mt-12">
        <div className=" p-6 mx-6 rounded-lg r ">
          <h2 className="text-2xl mb-2">Total Debt</h2>
          <p className="text-5xl font-bold ">₹{(Number((financialData.totalDebt + financialData.totalBorrowedInterest).toFixed(1))).toLocaleString()}</p>
        </div>
        <div className=" p-6 rounded-lg  ">
          <h2 className="text-2xl mb-2">Total Lent</h2>
          <p className="text-5xl font-bold ">₹{(Number((financialData.totalLent + financialData.totalLentInterest).toFixed(1))).toLocaleString()}</p>
        </div>
        <div className=" p-6 mx-4 rounded-lg  ">
          <h2 className="text-2xl mb-2">Net Balance</h2>
          <p className={`text-5xl font-bold  ${netBalance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            ₹{(Number(financialData.netBalance + financialData.totalInterest).toFixed(1)).toLocaleString()}
          </p>
        </div>
      </div>

      <div className="mb-12 ">
        <Button onClick={() => { router.push('/details') }} variant="outline" className="text-xl bg-gray-200 hover:bg-gray-300 outline outline-gray-400">
          Show More Details
        </Button>
      </div>

      <div className="flex gap-4 flex-wrap justify-center">
        <Button onClick={() => { router.push('/lending') }} variant="outline" className="h-16 w-56 px-8  text-lg bg-gray-200 hover:bg-gray-300 outline outline-gray-400">
          New Lent Entry
        </Button>
        <Button onClick={() => { router.push('/borrowing') }} variant="outline" className="h-16 w-56 px-8 text-lg bg-gray-200 hover:bg-gray-300 outline outline-gray-400">
          New Borrow Entry
        </Button>
      </div>
      <div className=" mt-16 text-center text-xl">
        <div>
          <h2 className="text-2xl font-bold mb-4 text-center">Additional Information</h2>
        </div>
        <div className="  rounded-lg">
          <p className=""><strong>Total Lent Interest:</strong> ₹{financialData.totalLentInterest.toLocaleString()}</p>
          <p className=""><strong>Total Borrowed Interest:</strong> ₹{financialData.totalBorrowedInterest.toLocaleString()}</p>
          <p className=""><strong>Total Interest:</strong> ₹{financialData.totalInterest.toLocaleString()}</p>
        </div>
      </div>
    </div>
  )
}