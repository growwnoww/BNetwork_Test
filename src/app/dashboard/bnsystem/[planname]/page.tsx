import Plans from '@/components/(dashboard-page)/(bnsystem)/Plans'
import React from 'react'


const BNSystemPlanPage = ({params}:{params :{planname:number}}) => {
    console.log(params.planname)
  return (
    <div className='text-white'>
        <Plans planname={params.planname} />
    </div>
  )
}

export default BNSystemPlanPage