import { Person } from "../models/person.model.js";


class PersonController {
    async getPerson(req, res) {

        try {
            const persons = await Person.find({
                userId: req.id
            }).sort({ createdAt: -1 })



            res.json({
                persons: persons
            })
        } catch (error) {
            res.status(404).send("Internal Server Error");
        }

    }

    async postPerson(req, res) {


        const { middleName, lastName, firstName, gender, phone } = req.body;


        try {

            const userId = req.id;

            const person = await Person.findOne({ phone, userId });

            if (person) {
                return res.status(404).json({
                    message: "Person with same phone already existed"
                })
            }

            const newPerson = new Person({
                middleName, lastName, firstName, gender, phone,
                userId: req.id
            })

            const savedPerson = await newPerson.save();

            res.status(200).json({
                person: savedPerson
            })
        } catch (error) {
            console.log("Error while posting the person", error);
            res.status(500).send('Internal Server Error');

        }
    }

    async editPerson(req, res) {

        const userId = req.id;
        const { middleName, lastName, firstName, gender, phone, } = req.body;

        const editPerson = {};
        if (middleName) editPerson.middleName = middleName;
        if (lastName) editPerson.lastName = lastName;
        if (firstName) editPerson.firstName = firstName;
        if (gender) editPerson.gender = gender;
        if (phone) editPerson.phone = phone;




        const { id } = req.params;

        try {
            const person = await Person.findById(id);

            if (!person) {
                return res.status(404).json({
                    message: "Person Not Found"
                })
            }

            if (person.userId.toString() !== userId) {
                return res.status(404).json({
                    message: "Unauthorized Edit"
                })
            }

            if (phone !== person.phone) {


                const personSame = await Person.find({ phone, userId });

                if (personSame.length >= 1) {
                    return res.status(404).json({
                        message: "Person with same phone already existed"
                    })
                }
            }






            const personInDB = await Person.findByIdAndUpdate(id, {
                $set: editPerson
            }, {
                new: true
            })




            res.status(200).json({
                person: personInDB
            })
        } catch (error) {
            console.log("Edit Error Contact", error).send("Server Error");
            res.status(500).send("Server Error");
        }

    }

    async deletePerson(req, res) {

        const personId = req.params.id;
        const userId = req.id;

        try {

            const person = await Person.findById(personId);
            if (!person) {
                return res.status(404).json({
                    message: "Person Doesn't Exist"
                })
            }
            if (person.userId.toString() !== userId) {
                return res.status(401).json({
                    message: "Unauthorized to perform action"
                })

            }


            await Person.findByIdAndDelete(personId);

            res.status(200).json({
                message: "Delete Successful"
            })

        } catch (error) {
            console.log("Delete Error Contact", error).send("Server Error");
            res.status(500).send("Server Error");
        }

    }
}

const personController = new PersonController();
export default personController;