'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Initial() {
  const router = useRouter()
  // TODO: REMOVE THIS COMMENT FOR DUMMY DEPLOY
  useEffect(() => {
    router.replace('/development')
  }, [])
  return <></>
}
