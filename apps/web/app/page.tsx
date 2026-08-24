'use client'
import React from 'react'
import { useSession } from "@/lib/auth-client"
const Page = () => {
  const { data, isPending } = useSession() 
  return (
    <div>
      {isPending && <p>Loading...</p>}
      {!isPending && !data && <p>You are not logged in.</p>}
      {!isPending && data && (
        <div>
          <p>Welcome, {data.user.name}!</p>
          <p>Email: {data.user.email}</p>
        </div>
      )}
    </div>
  )
}
export default Page