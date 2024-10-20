import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { getServerSession } from "next-auth/next"
import { authOptions } from '@/app/lib/auth'

const prisma = new PrismaClient()

export async function GET(req: Request) {
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
    const lentTransaction = await prisma.lentMoney.findUnique({ where: { id } })
    const borrowedTransaction = await prisma.borrowedMoney.findUnique({ where: { id } })

    const transaction = lentTransaction || borrowedTransaction

    if (!transaction) {
      return NextResponse.json({ error: 'Transaction not found' }, { status: 404 })
    }

    return NextResponse.json({ transaction })
  } catch (error) {
    console.error('Error fetching transaction details:', error)
    return NextResponse.json({ error: 'Failed to fetch transaction details' }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}