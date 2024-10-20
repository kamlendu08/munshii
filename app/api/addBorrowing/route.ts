// import { NextResponse } from 'next/server'
// import { PrismaClient } from '@prisma/client'
// import { getServerSession } from "next-auth/next"
// import { authOptions } from '@/app/lib/auth'

// const prisma = new PrismaClient()

// export async function POST(req: Request) {
//   const session = await getServerSession(authOptions)
  
//   if (!session || !session.user?.email) {
//     return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
//   }

//   const { lender, amount, interestRate, interestType, startDate } = await req.json()

//   try {
//     const borrower = await prisma.user.findUnique({ where: { email: session.user.email } })
//     const lenderUser = await prisma.user.findFirst({ where: { name: lender } })

//     if (!borrower || !lenderUser) {
//       return NextResponse.json({ error: 'User not found' }, { status: 404 })
//     }

//     const [borrowedMoney, lentMoney] = await prisma.$transaction([
//       prisma.borrowedMoney.create({
//         data: {
//           borrowerId: borrower.id,
//           lenderId: lenderUser.id,
//           amount: parseFloat(amount),
//           interestRate: parseFloat(interestRate),
//           interestType,
//           startDate: new Date(startDate),
//         },
//       }),
//       prisma.lentMoney.create({
//         data: {
//           lenderId: lenderUser.id,
//           borrowerId: borrower.id,
//           amount: parseFloat(amount),
//           interestRate: parseFloat(interestRate),
//           interestType,
//           startDate: new Date(startDate),
//         },
//       }),
//     ])

//     return NextResponse.json({ success: true, borrowedMoney, lentMoney })
//   } catch (error) {
//     console.error('Error adding borrowing details:', error)
//     return NextResponse.json({ error: 'Failed to add borrowing details' }, { status: 500 })
//   } finally {
//     await prisma.$disconnect()
//   }
// }

import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { getServerSession } from "next-auth/next"
import { authOptions } from '@/app/lib/auth'

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
let prisma: PrismaClient

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient()
} else {
  if (!(global as any).prisma) {
    (global as any).prisma = new PrismaClient()
  }
  prisma = (global as any).prisma
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const { lender, amount, interestRate, interestType, startDate } = await req.json()

  try {
    const borrower = await prisma.user.findUnique({ where: { email: session.user.email } })
    const lenderUser = await prisma.user.findFirst({ where: { name: lender } })

    if (!borrower || !lenderUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const [borrowedMoney, lentMoney] = await prisma.$transaction([
      prisma.borrowedMoney.create({
        data: {
          borrowerId: borrower.id,
          lenderId: lenderUser.id,
          amount: parseFloat(amount),
          interestRate: parseFloat(interestRate),
          interestType,
          startDate: new Date(startDate),
        },
      }),
      prisma.lentMoney.create({
        data: {
          lenderId: lenderUser.id,
          borrowerId: borrower.id,
          amount: parseFloat(amount),
          interestRate: parseFloat(interestRate),
          interestType,
          startDate: new Date(startDate),
        },
      }),
    ])

    return NextResponse.json({ success: true, borrowedMoney, lentMoney })
  } catch (error) {
    console.error('Error adding borrowing details:', error)
    return NextResponse.json({ error: 'Failed to add borrowing details' }, { status: 500 })
  }
}