import React from 'react'
import { Skeleton } from './skeleton'

export default function Loading() {
  return (
    <div className="min-h-screen bg-white px-20 mt-6 font-consola">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Transaction Details</h1>
        <div className="flex flex-col items-center space-y-3">
          <Skeleton className="h-[125px] w-[500px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-10 w-[500px]" />
            <Skeleton className="h-10 w-[500px]" />
          </div>
        </div>
      </div>
  )
}
