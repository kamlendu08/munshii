import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { getServerSession } from "next-auth/next"
import { authOptions } from '@/app/lib/auth'

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
    const result = await prisma.$transaction(async (prisma) => {
      const lentTransaction = await prisma.lentMoney.findUnique({ where: { id } })
      const borrowedTransaction = await prisma.borrowedMoney.findUnique({ where: { id } })

      if (!lentTransaction && !borrowedTransaction) {
        throw new Error('Transaction not found')
      }

      const updateData = {
        amount: parseFloat(amount),
        interestRate: parseFloat(interestRate),
        interestType,
        startDate: formattedStartDate,
        isRepaid,
        endDate: formattedEndDate,
      }

      if (lentTransaction) {
        // Update lentMoney table
        await prisma.lentMoney.update({
          where: { id },
          data: updateData,
        })

        // Update corresponding borrowedMoney entry
        await prisma.borrowedMoney.updateMany({
          where: {
            borrowerId: lentTransaction.borrowerId,
            lenderId: lentTransaction.lenderId,
            amount: lentTransaction.amount,
            startDate: lentTransaction.startDate,
          },
          data: {
            amount: updateData.amount,
            interestRate: updateData.interestRate,
            interestType: updateData.interestType,
            startDate: updateData.startDate,
            isRepaid: updateData.isRepaid,
            endDate: updateData.endDate,
          },
        })
      } else if (borrowedTransaction) {
        // Update borrowedMoney table
        await prisma.borrowedMoney.update({
          where: { id },
          data: updateData,
        })

        // Update corresponding lentMoney entry
        await prisma.lentMoney.updateMany({
          where: {
            borrowerId: borrowedTransaction.borrowerId,
            lenderId: borrowedTransaction.lenderId,
            amount: borrowedTransaction.amount,
            startDate: borrowedTransaction.startDate,
          },
          data: {
            amount: updateData.amount,
            interestRate: updateData.interestRate,
            interestType: updateData.interestType,
            startDate: updateData.startDate,
            isRepaid: updateData.isRepaid,
            endDate: updateData.endDate,
          },
        })
      }

      return { success: true }
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error('Error updating transaction:', error)
    return NextResponse.json({ error: 'Failed to update transaction' }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}