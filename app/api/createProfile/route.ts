// import { NextResponse } from 'next/server'
// import { PrismaClient } from '@prisma/client'
// import { getServerSession } from "next-auth/next"
// import { authOptions } from '../auth/[...nextauth]/route'

// const prisma = new PrismaClient()

// export async function POST(req: Request) {
//   const session = await getServerSession(authOptions)
  
//   if (!session || !session.user?.email) {
//     return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
//   }

//   const { name, phone, dob } = await req.json()

//   try {
//     const newUser = await prisma.user.create({
//       data: {
//         email: session.user.email,
//         name,
//         phone,
//         dateOfBirth: new Date(dob),
//       },
//     })

//     return NextResponse.json({ success: true, user: newUser })
//   } catch (error) {
//     console.error('Error creating user profile:', error)
//     return NextResponse.json({ error: 'Failed to create profile' }, { status: 500 })
//   } finally {
//     await prisma.$disconnect()
//   }
// }


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

  const { name, phone, dob } = await req.json()

  try {
    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: { 
        name, 
        phone, 
        dateOfBirth: new Date(dob)
      },
     
    })

    return NextResponse.json({ success: true, user: updatedUser })
  } catch (error) {
    console.error('Error updating user profile:', error)
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}