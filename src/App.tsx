import ScrollToTopOnMount from './components/client/scrollToTop';
import { InfoUserProvider } from './hook/admin/contexts';
import CategoryProvider from './hook/admin/contexts/categories';
import ListUserProvider from './hook/admin/contexts/listUser';
import LoaderProvider from './hook/admin/contexts/loader';
import { fetchDistrict, fetchWard } from './redux/features/address';
import { useAppDispatch } from './redux/hook';
import { Router } from './routers';
import { useEffect } from "react";

function App() {
  const dispatch = useAppDispatch()
  useEffect(()=>{
    dispatch(fetchDistrict())    
    dispatch(fetchWard())    
  },[dispatch])
  return (
    <LoaderProvider>
        <InfoUserProvider>
            <ListUserProvider>
              <CategoryProvider>
                <ScrollToTopOnMount />
                <Router />
              </CategoryProvider>
            </ListUserProvider>
        </InfoUserProvider>
    </LoaderProvider>
  )
}

export default App
