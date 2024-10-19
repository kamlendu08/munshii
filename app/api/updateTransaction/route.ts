import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { getServerSession } from "next-auth/next"
import { authOptions } from '../auth/[...nextauth]/route'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const { id, amount, interestRate, interestType, startDate, isRepaid, endDate } = await req.json()

  // Convert startDate and endDate to Date objects
  const formattedStartDate = new Date(startDate)
  const formattedEndDate = endDate ? new Date(endDate) : null

  try {
    const lentTransaction = await prisma.lentMoney.findUnique({ where: { id } })
    const borrowedTransaction = await prisma.borrowedMoney.findUnique({ where: { id } })

    const updateData = {
      amount: parseFloat(amount),
      interestRate: parseFloat(interestRate),
      interestType,
      startDate: formattedStartDate,
      isRepaid,
      endDate: formattedEndDate,
    }

    if (lentTransaction) {
      await prisma.lentMoney.update({
        where: { id },
        data: updateData,
      })
    } else if (borrowedTransaction) {
      await prisma.borrowedMoney.update({
        where: { id },
        data: updateData,
      })
    } else {
      return NextResponse.json({ error: 'Transaction not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating transaction:', error)
    return NextResponse.json({ error: 'Failed to update transaction' }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}