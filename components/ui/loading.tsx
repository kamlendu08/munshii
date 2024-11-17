import React from 'react'
import { Skeleton } from './skeleton'

export default function Loading() {
    return (
        <div className="flex justify-center  min-h-screen bg-white px-5 mt-6 sm:px-20">
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
