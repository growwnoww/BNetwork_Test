import { auth } from '@/auth'
import ExampleComponent from '@/components/(dashboard-page)/Example'
import { redirect } from 'next/navigation'
import React, { Suspense } from 'react'

type Props = {}

const AboutPage  = async(props: Props) => {
  const session = await auth()

  if(!session){
    console.log('bro got redirect')
    redirect('/')
  }
  return (
    <Suspense>
          <div><ExampleComponent/></div>
          <p>session:{JSON.stringify(session)}</p>
    </Suspense>
  )
}

export default AboutPage