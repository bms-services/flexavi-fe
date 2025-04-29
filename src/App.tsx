import "./App.css";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./lib/auth-provider";
import baseRouter from "./layouts/BaseRouter";

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={baseRouter} />
    </AuthProvider>
  );
}

export default App;
