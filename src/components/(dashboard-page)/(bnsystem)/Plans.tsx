import React from 'react'
import CosmosLevel from './(cosmosnetwork)/CosmosLevel'
import CosMosPackage from './(cosmosnetwork)/CosMosPackage'
import { PackagesList } from './(cosmosnetwork)/packages-list'

type Props = {
    planname:number
}

const Plans = (props: Props) => {
    
    const renderPlan = ():React.ReactNode =>{
        if(props.planname == 1){
            return <PackagesList/>
        }

        return <CosmosLevel/>
    }
  return (
    <div>
        {renderPlan()}
    </div>
  )
}

export default Plans