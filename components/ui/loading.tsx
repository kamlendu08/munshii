// import React from 'react'
// import { Skeleton } from './skeleton'

// export default function Loading() {
//     return (
//         <div className="flex justify-center  min-h-screen bg-white mx-5 mt-6 sm:px-20">
//             <div className="flex flex-col items-center space-y-3">
//                 <Skeleton className="h-[125px] w-[500px] rounded-xl" />
//                 <div className="space-y-2">
//                     <Skeleton className="h-10 w-[500px]" />
//                     <Skeleton className="h-10 w-[500px]" />
//                 </div>
//             </div>
//         </div>
//     )
// }


import React from 'react'
import { Skeleton } from './skeleton'

export default function Loading() {
    return (
        <div className="flex justify-center min-h-screen bg-white mx-5 mt-6 sm:px-20">
            <div className="flex flex-col items-center space-y-3 max-w-4xl w-full">
                <Skeleton className="h-[125px] w-full sm:w-[500px] max-w-[500px] rounded-xl" />
                <div className="space-y-2 w-full sm:w-[500px] max-w-[500px]">
                    <Skeleton className="h-10 w-full sm:w-[500px]" />
                    <Skeleton className="h-10 w-full sm:w-[500px]" />
                </div>
            </div>
        </div>
    )
}
