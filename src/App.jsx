import { Fragment, useState } from 'react'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Layout from './layout/Layout';

const queryClient = new QueryClient();

function App() {
  
  return (
    <Fragment>
      <QueryClientProvider client={queryClient}>
        <Layout/>
      </QueryClientProvider>
    </Fragment>
  )
}

export default App
