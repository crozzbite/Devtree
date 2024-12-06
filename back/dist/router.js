"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const handlers_1 = require("./handlers");
const router = (0, express_1.Router)();
// authentificacion y registro!!
router.post('/auth/register', handlers_1.createAccount);
exports.default = router;
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
//# sourceMappingURL=router.js.map