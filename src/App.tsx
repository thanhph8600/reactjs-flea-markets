import ScrollToTopOnMount from './components/client/scrollToTop';
import { InfoUserProvider } from './hook/admin/contexts';
import CategoryProvider from './hook/admin/contexts/categories';
import ListUserProvider from './hook/admin/contexts/listUser';
import LoaderProvider from './hook/admin/contexts/loader';
import { Router } from './routers';

function App() {
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
