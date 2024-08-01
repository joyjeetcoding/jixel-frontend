"use client"
import UserHomePage from '@/pages/User-Profile/UserHomePage'
import { NextPage } from 'next';
import { useParams, useRouter } from 'next/navigation';
import React from 'react'

interface UserProfileProps {
  params: {
    id: string
  }
}

const UserProfile: NextPage<UserProfileProps> = () => {

  const params = useParams();
  console.log("Params", params);
  
  const userId = params?.id
  console.log("userId", userId);
  

  return (
    <div>
      <UserHomePage userId={userId as string} />
    </div>
  )
}

export default UserProfile