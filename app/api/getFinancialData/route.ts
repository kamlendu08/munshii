import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { getServerSession } from "next-auth/next"
import { authOptions } from '../auth/[...nextauth]/route'

const prisma = new PrismaClient()
type Transaction = {
  amount: number
  interestRate: number
  interestType: 'SIMPLE' | 'COMPOUND'
  startDate: Date
  endDate: Date | null
}
function calculateInterest(transaction: Transaction) {
  const { amount, interestRate, interestType, startDate, endDate } = transaction
  const start = startDate ? new Date(startDate) : new Date()
  const end = endDate ? new Date(endDate) : new Date()
  
  if (!start.getTime() || !end.getTime()) {
    console.error('Invalid date for transaction:', transaction)
    return 0
  }

  const days = (end.getTime() - start.getTime()) / (1000 * 3600 * 24)
  
  if (interestType === 'SIMPLE') {
    return (amount * interestRate * days) / 36500
  } else {
    return amount * Math.pow(1 + interestRate / 36500, days) - amount
  }
}

export async function GET() {
  const session = await getServerSession(authOptions)
  
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  try {
    const user = await prisma.user.findUnique({ where: { email: session.user.email } })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const lentMoney = await prisma.lentMoney.findMany({ where: { lenderId: user.id, isRepaid: false } })
    const borrowedMoney = await prisma.borrowedMoney.findMany({ where: { borrowerId: user.id, isRepaid: false } })

    const totalLent = lentMoney.reduce((sum, transaction) => sum + transaction.amount, 0)
    const totalDebt = borrowedMoney.reduce((sum, transaction) => sum + transaction.amount, 0)
    const netBalance = totalLent - totalDebt

    const totalLentInterest = lentMoney.reduce((sum, transaction) => sum + calculateInterest(transaction), 0)
    const totalBorrowedInterest = borrowedMoney.reduce((sum, transaction) => sum + calculateInterest(transaction), 0)
    const totalInterest = totalLentInterest - totalBorrowedInterest

    return NextResponse.json({
      totalLent,
      totalDebt,
      netBalance,
      totalLentInterest,
      totalBorrowedInterest,
      totalInterest,
    })
  } catch (error) {
    console.error('Error calculating financial data:', error)
    if (error instanceof Error) {
      console.error('Error message:', error.message)
      console.error('Error stack:', error.stack)
    }
    return NextResponse.json({
      totalLent: 0,
      totalDebt: 0,
      netBalance: 0,
      totalLentInterest: 0,
      totalBorrowedInterest: 0,
      totalInterest: 0,
    }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}