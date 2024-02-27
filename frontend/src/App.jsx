import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Chat from "./Components/Chat";
import ProtectedRoute from "./Routing/ProtectedRoute";
import Home from "./Components/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  { path: "/signup", element: <Signup /> },

  {
    path: "",
    element: <ProtectedRoute />,
    children: [
      {
        path: "/chat",
        element: <Chat />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
