import { Fragment } from 'react'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Routers from './routes/Routers';

const queryClient = new QueryClient();

function App() {
  
  return (
    <Fragment>
      <QueryClientProvider client={queryClient}>
        <Routers/>
      </QueryClientProvider>
    </Fragment>
  )
}

export default App
