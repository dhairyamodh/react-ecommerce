const express = require("express")
const { User } = require("./models/user.model")
const { Brand } = require("./models/Brand.model")
const { Product } = require("./models/Product.model")
const url = "mongodb://localhost:27017/react-ecommerce"
const app = express()
const cors = require('cors')
const mongoose = require("mongoose")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { Checkout } = require("./models/checkout.model")

mongoose.connect(url)
    .then(() => console.log('Now connected to MongoDB!'))
    .catch(err => console.error('Something went wrong', err));

app.use(express.json())
app.use(cors())
app.post('/register', async (req, res) => {
    try {
        const data = req.body
        const exist = await User.findOne({ email: data.email })
        if (exist) {
            return res.status(500).send({ message: 'user exist' })
        }
        const encryptedPassword = await bcrypt.hash(data.password, 10);
        const user = await User.create({ ...data, password: encryptedPassword })

        const token = jwt.sign(
            { user_id: user._id },
            'abc123',
        );
        return res.status(200).send({ message: 'user registed', token: token, user: user })
    } catch (error) {
        console.log(error);
        return res.status(500).send(error)
    }
})


app.post('/login', async (req, res) => {
    try {
        const data = req.body
        const exist = await User.findOne({ email: data.email })
        if (!exist) {
            return res.status(500).send({ message: 'user not exist' })
        }
        const validPassword = await bcrypt.compare(data.password, exist.password);
        if (!validPassword) {
            return res.status(500).send({ message: 'password not match' })
        }
        const token = jwt.sign(
            { user_id: exist._id },
            'abc123',
        );
        return res.status(200).send({ message: 'user logged', token: token, user: exist })
    } catch (error) {
        console.log(error);
        return res.status(500).send(error)
    }
})


app.get('/details', async (req, res) => {
    try {
        const token = req.header("Authorization");
        const verified = jwt.verify(token, 'abc123');
        if (!verified) {
            return res.status(401).send({ message: "Access denied" });
        }
        const userId = verified.user_id;
        const user = await User.findOne({ _id: userId });
        if (!user) {
            return res.status(400).send({ message: "user does not exist" });
        }
        return res.status(200).send({
            user: user,
            message: "User details found successfully",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send(error)
    }
})

app.get('/get-brands', async (req, res) => {
    try {
        const brands = await Brand.find()
        return res.status(200).send({ data: brands })
    } catch (error) {
        console.log(error);
        return res.status(500).send(error)
    }
})

app.post('/add-brands', async (req, res) => {
    try {
        const data = req.body
        await Brand.create(data)
        return res.status(200).send({ message: 'Added successfully' })
    } catch (error) {
        console.log(error);
        return res.status(500).send(error)
    }
})

app.delete('/remove-brands', async (req, res) => {
    try {
        const { id } = req.query
        await Brand.findByIdAndDelete(id)
        return res.status(200).send({ message: 'Deleted successfully' })
    } catch (error) {
        console.log(error);
        return res.status(500).send(error)
    }
})



app.get('/get-products', async (req, res) => {
    try {
        const products = await Product.find()
        const newPro = await Promise.all(products.map(async p => {
            const brand = await Brand.findById(p.brand)
            return { ...p._doc, brandName: brand.name }
        }))
        return res.status(200).send({ data: newPro })
    } catch (error) {
        console.log(error);
        return res.status(500).send(error)
    }
})

app.post('/add-products', async (req, res) => {
    try {
        const data = req.body
        await Product.create(data)
        return res.status(200).send({ message: 'Added successfully' })
    } catch (error) {
        console.log(error);
        return res.status(500).send(error)
    }
})

app.delete('/remove-products', async (req, res) => {
    try {
        const { id } = req.query
        await Product.findByIdAndDelete(id)
        return res.status(200).send({ message: 'Deleted successfully' })
    } catch (error) {
        console.log(error);
        return res.status(500).send(error)
    }
})


app.post('/checkout', async (req, res) => {
    try {
        const data = req.body
        await Promise.all(data.items.map(async p => {
            await Product.findByIdAndUpdate(p.id || p._id, { $inc: { quantity: -p.quantity } })
        }))
        await Checkout.create(data)
        return res.status(200).send({ message: 'checkout successfully' })
    } catch (error) {
        console.log(error);
        return res.status(500).send(error)
    }
})

app.listen(4000, () => console.log("Server ready runing on port 4000"))
