declare const router: import("express-serve-static-core").Router;
export default router;
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
