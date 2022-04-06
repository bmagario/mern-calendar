import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { 
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"
import { startCheckingIsAuthenicated } from "../actions/auth"
import { LoginScreen } from "../components/auth/LoginScreen"
import { CalendarScreen } from "../components/calendar/CalendarScreen"
import { NotMatchScreen } from "../components/errors/NotMatchScreen"
import { PrivateRoute } from "./PrivateRoute"
import { PublicRoute } from "./PublicRoute"

export const AppRoute = () => {
  const dispatch = useDispatch();

  // Check if user is autheticated othercase renew token.
  useEffect(() => {
    dispatch(startCheckingIsAuthenicated())
  
  });
  
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={ 
            <PublicRoute>
              <LoginScreen />
            </PublicRoute> 
          } />
          <Route path='/*' element={ 
            <PrivateRoute>
              <CalendarScreen />
            </PrivateRoute> 
          } />

          <Route exact path="*" element={<NotMatchScreen />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
