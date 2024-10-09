import Plans from '@/components/(dashboard-page)/(bnsystem)/Plans'
import React from 'react'


const BNSystemPlanPage = ({params}:{params :{planname:number}}) => {
    console.log(params.planname)
  return (
    <div className='text-white'>
      <p className='text-center font-semibold text-4xl mt-4'>CosMos Network</p>
        <Plans planname={params.planname} />
    </div>
  )
}

export default BNSystemPlanPage