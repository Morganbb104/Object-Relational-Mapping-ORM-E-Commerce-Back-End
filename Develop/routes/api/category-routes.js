const router = require('express').Router();
const {Category, Product} = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
    // find all categories
    // be sure to include its associated Products
    Category.findAll({
        include: [
            {
                model: Product
            }
        ]

    }).then((results) => {
        res.json(results);
    }).catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });


});

router.get('/:id', (req, res) => { // find one category by its `id` value
    Category.findOne({
        where: {
            id: req.params.id
        },
        include: [

            {
                model: Product
            },
        ]
    })
    .then((results) => { // return 404 to status if there is no matching ID
        if (!results) {
            res.status(404).json({message: '${params.id} cannot be found. Please try another ID'});
            return;
        } // else return the results
        res.json(results);
    })
    // be sure to include its associated Products
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/', (req, res) => { // create a new category
    Category.create({ // create new category with category name from req.body
      category_name: req.body.category_name
    }).then((results) => {
        res.json(results);
    }).catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });

});

router.put('/:id', (req, res) => { // update the `id` value to category 
    Category.update({
        category_name: req.body.category_name
    }, {
        where: {
            id: req.params.id
        }
    }).then((results) => { // show status with 404 and tell user that id not found if we can't get results
        if (!results) {
            res.status(404).json({message: `No category with Id ${req.params.id} found. Please try again with different ID.`});
            return;
        }
        // else, respond with the results
        res.json(results);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });


});

router.delete('/:id', (req, res) => { // delete a category by its `id` value
    Category.destroy({
        where: {
            id: req.params.id
        }
    }).then((results) => { // show status with 404 and tell user that id not found if we can't get results
        if (!results) {
            res.status(404).json({message: `No category with Id ${
                    req.params.id
                } found. Please try again with different ID.`});
            return;
        }
        // else, respond with results
        res.json(results);
    }).catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });

});

module.exports = router;
