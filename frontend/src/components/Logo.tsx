import { Link } from "react-router-dom";


export default function Logo() {
    return (
        <Link to={'/'}>
            <img src="../../Materiales DevTree/logo.svg" className="w-full block" alt='Logotipo Devtree' />
        </Link>
    )
}
