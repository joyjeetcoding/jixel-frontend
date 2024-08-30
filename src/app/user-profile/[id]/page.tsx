"use client"
import { useAuthContext } from '@/context/AuthContext';
import UserHomePage from '@/pages/User-Profile/UserHomePage'
import { NextPage } from 'next';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import dynamic from 'next/dynamic'

interface UserProfileProps {
  params: {
    id: string
  }
}


const DynamicUserHomePage = dynamic(() => import('../../../pages/User-Profile/UserHomePage'), { ssr: false })


const UserProfile: NextPage<UserProfileProps> = () => {

  const router = useRouter();
  const params = useParams();
  console.log("Params", params);
  
  const userId = params?.id
  console.log("userId", userId);
  
  
  const {authUser} = useAuthContext();
  useEffect(() => {
    if(!authUser) {
      router.push("/");
    }
  },[authUser, router])

  return (
    
    <div>
      <DynamicUserHomePage userId={userId as string} />
    </div>
  )
}

export default UserProfile