import { Router } from "express";
import { body } from "express-validator";
import { createAccount, login } from "./handlers";
import { handleInputErrors } from "./middleware/validations";

const router = Router()
// authentificacion y registro!!


router.post('/auth/register',
    
    body('handle')
        .notEmpty()
        .withMessage('Nombre de handle no puede ir vacio'),
    body('name')
        .notEmpty()
        .withMessage('El nombre no puede ir vacio'),
    body('email')
        .isEmail()
        .withMessage('Email no valido'),
    body('password')
        .isLength({ min: 8 })
        .withMessage('el pasword tiene que ser minimo 8 caracteres'),
        handleInputErrors,
    createAccount)
// Validaciones 

router.post('/auth/login',
    body('email')
        .isEmail()
        .withMessage('Email no valido'),
    body('password')
        .isLength({ min: 8 })
        .notEmpty()
        .withMessage('el pasword es obligatrio'),
    login)
export default router





/**
//Routing
router.get('/', (req, res) => {
    res.send('hola mundo en express');

})

router.post('/auth/register', async (req, res) => {
    const user = new User(req.body)// instanciamos nuestro midelo users 

    await user.save() // agrega el dato a unestra BD

    res.send('Registro creado correctamente')
    // res.json({msg:'registro creado correctamente'})
    // res.render('registro creado correctamente')

})



// otras rutas de ejmplo 
// router.get('/nosotros', ( req, res) => {
//     res.send('hola mundo en expres/typescript  sobre nosotros ')
// })

// router.get('/blog', ( req, res) => {
//     res.send('hola mundo en expres blog ')
// })

export default router
*/
