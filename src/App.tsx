import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";
import RouterApp from "../routes";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <RouterApp />
    </QueryClientProvider>
  );
}

export default App;
