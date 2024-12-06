
import { Routes, Route, BrowserRouter } from "react-router-dom";
import LoginView from "./views/LoginView";
import RegisterView from "./views/RegisterView";
import AuthLayout from "./layouts/AuthLayout";


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
                <Route path="*" element={<LoginView />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;

