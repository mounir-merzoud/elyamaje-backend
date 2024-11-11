const Employee = require('../models/Employee');

exports.createEmployee = async (req, res) => {
    try {
        const { name, email, poste, dateOfEntry } = req.body; // Assurez-vous que "dateOfEntry" est ici
        const profileImage = req.file ? req.file.path : null;
        const employee = new Employee({ name, email, poste, dateOfEntry, profileImage });
        await employee.save();
        res.status(201).send(employee);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};


exports.getEmployee = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.send(employees);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.updateEmployee = async (req, res) => {
    try {
        const updates = req.body;
        if (req.file) updates.profileImage = req.file.path;
        const employee = await Employee.findByIdAndUpdate(req.params.id, updates, { new: true });
        if (!employee) return res.status(404).send({ error: 'Employee not found' });
        res.send(employee);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

exports.deleteEmployee = async (req, res) => {
    try {
        const employee = await Employee.findByIdAndDelete(req.params.id);
        if (!employee) return res.status(404).send({ error: 'Employee not found' });
        res.send({ message: 'Employee deleted' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};
