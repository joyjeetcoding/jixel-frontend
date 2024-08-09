"use client"
import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

interface Props {
    children: ReactNode;
}
const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false
      }
    }
  })

const QueryWrapper = ({children}: Props) => {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}

export default QueryWrapper;