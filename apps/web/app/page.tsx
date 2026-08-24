'use client'
import {  useSession } from "@/lib/auth-client"
import { useTRPC } from '@/lib/trpc'
import { useQuery } from '@tanstack/react-query'
const Page =  () => {
  const { data, error } = useSession()
  const { github } = useTRPC()
  const {data : s , isPending} = useQuery(github.getGithubData.queryOptions())
  return (
    <div>
      {error && <p>Error: {error.message}</p>}
      {!error && data && (
        <div>
          <p>Welcome, {data.user.name}!</p>
          <p>Email: {data.user.email}</p>
        <div>
          {isPending ? (
            <p>Loading...</p>
          ) : (
            <p>Github Message: {s?.message}</p>
          )}
        </div>
        </div>
      )}
    </div>
  )
}
export default Page