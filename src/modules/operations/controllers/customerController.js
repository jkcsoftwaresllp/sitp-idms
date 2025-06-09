import {
    createCustomerService,
    getAllCustomersService,
    getCustomerByIdService,
    updateCustomerService,
    deleteCustomerService
} from '../service/customerService.js';

export const createCustomer = (req, res) => {
    const data = req.body;
    createCustomerService(data, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: "Customer created", data: results });
    });
};

export const getAllCustomers = (req, res) => {
    getAllCustomersService((err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

export const getCustomerById = (req, res) => {
    getCustomerByIdService(req.params.id, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) {
            return res.status(404).json({ message: "Customer not found" });
        }
        res.json(results[0]);
    });
};

export const updateCustomer = (req, res) => {
    updateCustomerService(req.params.id, req.body, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: "Customer not found or nothing to update" });
        }
        res.json({ message: "Customer updated", data: results });
    });
};

export const deleteCustomer = (req, res) => {
    deleteCustomerService(req.params.id, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: "Customer not found or already inactive" });
        }
        res.json({ message: "Customer deleted (soft)", data: results });
    });
};
