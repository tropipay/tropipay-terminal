const express = require('express');
const router = express.Router();

router.use(express.json());

router.get('/', async (req, res, next) => {
    res.json([{
            "name": "Pedro Picapiedras",
            "amount": 410,
            "coin": "EUR",
            "date": "2021-08-23 18:30",
            "description": "",
            "code": "34123"
        }, 
        {
            "name": "La Pili",
            "amount": 456,
            "coin": "EUR",
            "date": "2021-08-23 18:30",
            "description": "",
            "code": "34123"
        }, 
        {
            "name": "Pedro Sánchez",
            "amount": 10,
            "coin": "EUR",
            "date": "2021-08-23 18:30",
            "description": "",
            "code": "34123"
        }, 
        {
            "name": "Chucho Valdéz",
            "amount": 45,
            "coin": "EUR",
            "date": "2021-08-23 18:30",
            "description": "",
            "code": "34123"
        }, 
        {
            "name": "Rita Montaner",
            "amount": 15,
            "coin": "EUR",
            "date": "2021-08-23 18:30",
            "description": "",
            "code": "34123"
        },
        {
            "name": "Chucho Valdés",
            "amount": 456,
            "coin": "EUR",
            "date": "2021-08-23 18:30",
            "description": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit",
            "code": "34123"
        },
        {
            "name": "Formula Quinta",
            "amount": 456,
            "coin": "EUR",
            "date": "2021-08-23 18:30",
            "description": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit",
            "code": "34123"
        },
        {
            "name": "Ricardo Montaner",
            "amount": 456,
            "coin": "EUR",
            "date": "2021-08-23 18:30",
            "description": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit",
            "code": "34123"
        },
        {
            "name": "Los Billy",
            "amount": 456,
            "coin": "EUR",
            "date": "2021-08-23 18:30",
            "description": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit",
            "code": "34123"
        },
        {
            "name": "Juan Gabriel",
            "amount": 689,
            "coin": "EUR",
            "date": "2021-08-23 18:30",
            "description": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit",
            "code": "34123"
        },
        {
            "name": "Los Mojados",
            "amount": 12,
            "coin": "EUR",
            "date": "2021-08-23 18:30",
            "description": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit",
            "code": "34123"
        },
        {
            "name": "Eros Ramasosote",
            "amount": 1025,
            "coin": "EUR",
            "date": "2021-08-23 18:30",
            "description": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit",
            "code": "34123"
        }
    ]);
});

module.exports = router;