import { Navigate } from "react-router-dom";

import { cs } from "../../common/chain-services";
import { consumeContext } from "../../common/react/context";


export const ProtectedRoute = ({children}) => {
  return cs(
    consumeContext("auth"),
    ({ auth }) => {
      if (auth.user) {
        return  children;
      }
      return <Navigate to="/login" />
    }
  )
}
