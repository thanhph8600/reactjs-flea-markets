import './App.css'

import { RouterProvider} from "react-router-dom";
import { PrivateRoutes } from './routers';

function App() {

  return (
    <RouterProvider router={PrivateRoutes()} />
  )
}

export default App
