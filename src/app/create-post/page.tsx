"use client"
import { useAuthContext } from '@/context/AuthContext';
import CreatePostsPage from '@/pages/Posts/CreatePostsPage'
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

const page = () => {
  const router = useRouter();

  const {authUser} = useAuthContext();
  useEffect(() => {
    if(!authUser) {
      router.push("/dashboard");
    }
  },[authUser, router])
  return (
    <div>
        <CreatePostsPage />
    </div>
  )
}

export default page