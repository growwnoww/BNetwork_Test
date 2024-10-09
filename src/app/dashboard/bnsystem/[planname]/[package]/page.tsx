
import SinglePackage from '@/components/(dashboard-page)/(bnsystem)/(cosmosnetwork)/SinglePackage'
import React from 'react'

export default function AutopoolPage({params}:{params:{package:number}}) {
  console.log('params',params.package)
  return (
    <div>

      <SinglePackage planetId={params.package}/>
    </div>
  )
}

