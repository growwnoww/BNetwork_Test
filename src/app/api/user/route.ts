import { db } from '@/db/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  console.log("url",url)
  const address = url.searchParams.get('wallet_address');
  console.log('address in user api',address)


  if(!address){
    return NextResponse.json({message:"user not found"})
  }

  const user = await db.user.findFirst({
    where:{
        //@ts-ignore
        wallet_address: address
    }
  })


  return NextResponse.json({
    user:user
  });
}