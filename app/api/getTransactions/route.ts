// import { NextResponse } from 'next/server'
// import { PrismaClient } from '@prisma/client'
// import { getServerSession } from "next-auth/next"
// import { authOptions } from '../auth/[...nextauth]/route'

// const prisma = new PrismaClient()

// export async function GET(req: Request) {
//   const session = await getServerSession(authOptions)
  
//   if (!session || !session.user?.email) {
//     return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
//   }

//   const { searchParams } = new URL(req.url)
//   // const name = searchParams.get('name') || ''
//   const type = searchParams.get('type') || 'ALL'

//   try {
//     const user = await prisma.user.findUnique({ where: { email: session.user.email } })

//     if (!user) {
//       return NextResponse.json({ error: 'User not found' }, { status: 404 })
//     }

//     let lentMoney: any[] = [];
//     let borrowedMoney: any[] = [];

//     if (type === 'ALL' || type === 'LENT') {
//       lentMoney = await prisma.lentMoney.findMany({
//         where: {
//           lenderId: user.id,
//         },
//       })

//       // Fetch borrower names separately
//       const borrowerIds = lentMoney.map(transaction => transaction.borrowerId)
//       const borrowers = await prisma.user.findMany({
//         where: {
//           id: { in: borrowerIds },
//         },
//         select: {
//           id: true,
//           name: true,
//         },
//       })

//       lentMoney = lentMoney.map(transaction => ({
//         ...transaction,
//         borrowerName: borrowers.find(b => b.id === transaction.borrowerId)?.name || 'Unknown',
//       }))
//     }

//     if (type === 'ALL' || type === 'BORROWED') {
//       borrowedMoney = await prisma.borrowedMoney.findMany({
//         where: {
//           borrowerId: user.id,
//         },
//       })

//       // Fetch lender names separately
//       const lenderIds = borrowedMoney.map(transaction => transaction.lenderId)
//       const lenders = await prisma.user.findMany({
//         where: {
//           id: { in: lenderIds },
//         },
//         select: {
//           id: true,
//           name: true,
//         },
//       })

//       borrowedMoney = borrowedMoney.map(transaction => ({
//         ...transaction,
//         lenderName: lenders.find(l => l.id === transaction.lenderId)?.name || 'Unknown',
//       }))
//     }

//     const transactions = [
//       ...lentMoney.map(t => ({ ...t, type: 'LENT', name: t.borrowerName })),
//       ...borrowedMoney.map(t => ({ ...t, type: 'BORROWED', name: t.lenderName })),
//     ]

//     return NextResponse.json({ transactions })
//   } catch (error) {
//     console.error('Error fetching transactions:', error)
//     return NextResponse.json({ error: 'Failed to fetch transactions' }, { status: 500 })
//   } finally {
//     await prisma.$disconnect()
//   }
// }

import { NextResponse } from 'next/server'
import { PrismaClient, LentMoney, BorrowedMoney } from '@prisma/client'
import { getServerSession } from "next-auth/next"
import { authOptions } from '../auth/[...nextauth]/route'

const prisma = new PrismaClient()

// Define extended types for lentMoney and borrowedMoney
interface LentMoneyWithBorrower extends LentMoney {
  borrowerName: string;
}

interface BorrowedMoneyWithLender extends BorrowedMoney {
  lenderName: string;
}

export async function GET(req: Request) {
  const session = await getServerSession(authOptions)
  
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const type = searchParams.get('type') || 'ALL'

  try {
    const user = await prisma.user.findUnique({ where: { email: session.user.email } })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    let lentMoney: LentMoneyWithBorrower[] = [];
    let borrowedMoney: BorrowedMoneyWithLender[] = [];

    if (type === 'ALL' || type === 'LENT') {
      const lentTransactions = await prisma.lentMoney.findMany({
        where: {
          lenderId: user.id,
        },
      })

      const borrowerIds = lentTransactions.map(transaction => transaction.borrowerId)
      const borrowers = await prisma.user.findMany({
        where: {
          id: { in: borrowerIds },
        },
        select: {
          id: true,
          name: true,
        },
      })

      lentMoney = lentTransactions.map(transaction => ({
        ...transaction,
        borrowerName: borrowers.find(b => b.id === transaction.borrowerId)?.name || 'Unknown',
      }))
    }

    if (type === 'ALL' || type === 'BORROWED') {
      const borrowedTransactions = await prisma.borrowedMoney.findMany({
        where: {
          borrowerId: user.id,
        },
      })

      const lenderIds = borrowedTransactions.map(transaction => transaction.lenderId)
      const lenders = await prisma.user.findMany({
        where: {
          id: { in: lenderIds },
        },
        select: {
          id: true,
          name: true,
        },
      })

      borrowedMoney = borrowedTransactions.map(transaction => ({
        ...transaction,
        lenderName: lenders.find(l => l.id === transaction.lenderId)?.name || 'Unknown',
      }))
    }

    const transactions = [
      ...lentMoney.map(t => ({ ...t, type: 'LENT' as const, name: t.borrowerName })),
      ...borrowedMoney.map(t => ({ ...t, type: 'BORROWED' as const, name: t.lenderName })),
    ]

    return NextResponse.json({ transactions })
  } catch (error) {
    console.error('Error fetching transactions:', error)
    return NextResponse.json({ error: 'Failed to fetch transactions' }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}