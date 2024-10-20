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

  const { borrower, amount, interestRate, interestType, startDate } = await req.json()

  try {
    const lender = await prisma.user.findUnique({ where: { email: session.user.email } })
    const borrowerUser = await prisma.user.findFirst({ where: { name: borrower } })

    if (!lender || !borrowerUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const [lentMoney, borrowedMoney] = await prisma.$transaction([
      prisma.lentMoney.create({
        data: {
          lenderId: lender.id,
          borrowerId: borrowerUser.id,
          amount: parseFloat(amount),
          interestRate: parseFloat(interestRate),
          interestType,
          startDate: new Date(startDate),
        },
      }),
      prisma.borrowedMoney.create({
        data: {
          borrowerId: borrowerUser.id,
          lenderId: lender.id,
          amount: parseFloat(amount),
          interestRate: parseFloat(interestRate),
          interestType,
          startDate: new Date(startDate),
        },
      }),
    ])

    return NextResponse.json({ success: true, lentMoney, borrowedMoney })
  } catch (error) {
    console.error('Error adding lending details:', error)
    return NextResponse.json({ error: 'Failed to add lending details' }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}