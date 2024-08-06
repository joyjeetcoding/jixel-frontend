"use client"
import { useAuthContext } from '@/context/AuthContext';
import UserHomePage from '@/pages/User-Profile/UserHomePage'
import { NextPage } from 'next';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

interface UserProfileProps {
  params: {
    id: string
  }
}

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
      <UserHomePage userId={userId as string} />
    </div>
  )
}

export default UserProfile