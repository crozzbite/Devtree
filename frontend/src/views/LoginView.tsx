import React from "react";
import { NavLink, Link}  from "react-router-dom";

const LoginView: React.FC = () => {
    return (
//  <> es un fragment y sirve para retornar mas de un elemento como ahora que tenemos el div y el nabar 
        <> 
        <div>
            <h1 className=" text-center text-4xl text-white font-bold" >Iniciar sesion</h1>
        </div>

        <nav>
           <Link className=" text-center text-white text-lg block " to="/auth/register">No tienes cuenta? registrate aqui</Link>
        </nav>
        </>
            );
};

export default LoginView;