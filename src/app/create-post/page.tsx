"use client"
import { useAuthContext } from '@/context/AuthContext';
import CreatePostsPage from '@/pages/Posts/CreatePostsPage'
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

const DynamicCreatePostsPage = dynamic(() => import('../../pages/Posts/CreatePostsPage'), { ssr: false })

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
        <DynamicCreatePostsPage />
    </div>
  )
}

export default page