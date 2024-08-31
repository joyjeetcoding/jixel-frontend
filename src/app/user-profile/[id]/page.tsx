"use client"
import { useAuthContext } from '@/context/AuthContext';
import UserHomePage from '@/allpages/User-Profile/UserHomePage'
import { NextPage } from 'next';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import dynamic from 'next/dynamic'

interface UserProfileProps {
  params: {
    id: string
  }
}


const DynamicUserHomePage = dynamic(() => import('../../../allpages/User-Profile/UserHomePage'), { ssr: false })


const UserProfile: NextPage<UserProfileProps> = () => {

  const router = useRouter();
  const params = useParams();
  
  const userId = params?.id
  
  
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