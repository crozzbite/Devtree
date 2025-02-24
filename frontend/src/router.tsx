
import { Routes, Route, BrowserRouter } from "react-router-dom";
import LoginView from "./views/LoginView";
import RegisterView from "./views/RegisterView";
import AuthLayout from "./layouts/AuthLayout";
import AppLayout from "./layouts/AppLayout";
import LinkTreeView from "./views/LinkTreeView";
import ProfileView from "./views/ProfileView";


// Archivo router.tsx
const AppRouter: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AuthLayout />}>
                    <Route path="/auth/login" element={<LoginView />} />
                    <Route path="/auth/register" element={<RegisterView />} />
                </Route>
                {/* Ruta para manejar páginas no encontradas */}
                <Route path ="/admin" element={<AppLayout />}>
                    <Route index = {true} element ={<LinkTreeView/>} />
                    <Route path="profile" element ={<ProfileView/>} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;

