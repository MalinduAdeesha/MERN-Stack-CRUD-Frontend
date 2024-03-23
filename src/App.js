import './App.css';
import {RouterProvider, createBrowserRouter} from 'react-router-dom'; 
import User from './components/get_user/User'; 
import Add from './components/add_user/Add';
import Edit from './components/update_user/Edit';
import SignIn from './components/login/SignIn';
import SignUp from './components/login/SignUp';

function App() {

  const route =createBrowserRouter([
    {
      path: "/",
      element:<SignUp/>
    },
    {
      path: "/login",
      element:<SignIn/>,
    },
    {
      path: "/add",
      element:<Add/>,
    },
    {
      path: "/edit/:id",
      element:<Edit/>,
    }
  ])
  return (
    <div className="App">
     
     <RouterProvider router={route}></RouterProvider>
    </div>
  );
}

export default App;
