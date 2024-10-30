'use client'

import Tweets from '@/components/Tweets/Tweets'
import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient();


export default function Home() {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <Tweets />
      </QueryClientProvider>
    </div>
  )
}
