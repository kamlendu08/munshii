import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { getServerSession } from "next-auth/next"
import { authOptions } from '@/app/lib/auth'

const prisma = new PrismaClient()

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions)
  
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')

  if (!id) {
    return NextResponse.json({ error: 'Transaction ID is required' }, { status: 400 })
  }

  try {
    const result = await prisma.$transaction(async (prisma) => {
      const lentTransaction = await prisma.lentMoney.findUnique({ where: { id } })
      const borrowedTransaction = await prisma.borrowedMoney.findUnique({ where: { id } })

      if (lentTransaction) {
        await prisma.lentMoney.delete({ where: { id } })
        await prisma.borrowedMoney.deleteMany({
          where: {
            borrowerId: lentTransaction.borrowerId,
            lenderId: lentTransaction.lenderId,
            amount: lentTransaction.amount,
            startDate: lentTransaction.startDate,
          },
        })
      } else if (borrowedTransaction) {
        await prisma.borrowedMoney.delete({ where: { id } })
        await prisma.lentMoney.deleteMany({
          where: {
            borrowerId: borrowedTransaction.borrowerId,
            lenderId: borrowedTransaction.lenderId,
            amount: borrowedTransaction.amount,
            startDate: borrowedTransaction.startDate,
          },
        })
      } else {
        throw new Error('Transaction not found')
      }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting transaction:', error)
    return NextResponse.json({ error: 'Failed to delete transaction' }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}