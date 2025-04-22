import { Router } from "express";
import { body } from "express-validator";
import { createAccount, getUser, getUserByHandle, login, searchByHandle, updateProfile, uploadImage, submitQuiz } from "./handlers";
import { handleInputErrors } from "./middleware/validations";
import { authenticate } from "./middleware/auth";

const router = Router()
// autentificación y registro!!

router.post('/auth/register',
    
    body('handle')
        .notEmpty()
        .withMessage('Nombre de handle no puede ir vacío'),
    body('name')
        .notEmpty()
        .withMessage('El nombre no puede ir vacío'),
    body('email')
        .isEmail()
        .withMessage('Email no válido'),
    body('password')
        .isLength({ min: 8 })
        .withMessage('El password tiene que ser mínimo 8 caracteres'),
        handleInputErrors,
    createAccount)
// Validaciones 

router.post('/auth/login',
    body('email')
        .isEmail()
        .withMessage('Email no válido'),
    body('password')
        .isLength({ min: 8 })
        .notEmpty()
        .withMessage('El password es obligatorio'),
    login)

router.get('/user', authenticate, getUser)

router.patch('/user', 
    body('handle')
    .notEmpty()
    .withMessage('Nombre de handle no puede ir vacío'),
    handleInputErrors,
    authenticate,
    updateProfile)// path, handle autentificación, handle information
//usamos el mismo patch por simplicidad pero deberíamos normalmente poner otro nombre

router.post('/user/image', authenticate, uploadImage)

router.get('/:handle', getUserByHandle)

router.post('/search', 
    body('handle')
    .notEmpty()
    .withMessage('El handle no puede ir vacío'),
    handleInputErrors,
    searchByHandle)

router.post('/quizt', 
    authenticate,// Asegura que el usuario esté autenticado
    body('score')
    .isNumeric(), 
    handleInputErrors,
    submitQuiz
);

export default router

//quizt@gmail.com pw : quizt666
/**
//Routing
router.get('/', (req, res) => {
    res.send('hola mundo en express');

})

router.post('/auth/register', async (req, res) => {
    const user = new User(req.body)// instanciamos nuestro modelo users 

    await user.save() // agrega el dato a nuestra BD

    res.send('Registro creado correctamente')
    // res.json({msg:'registro creado correctamente'})
    // res.render('registro creado correctamente')

})



// otras rutas de ejemplo 
// router.get('/nosotros', ( req, res) => {
//     res.send('hola mundo en express/typescript sobre nosotros ')
// })

// router.get('/blog', ( req, res) => {
//     res.send('hola mundo en express blog ')
// })

export default router
*/
