import {Router} from "express";
import { CustomerController } from "../controllers/customer.controller";
export const customerRoutes = Router();

customerRoutes.get('/create', CustomerController.getCreatePage);
customerRoutes.post('/create', CustomerController.addNewCustomer);
customerRoutes.get('/', CustomerController.getListCustomer);
customerRoutes.post('/', CustomerController.getListCustomer);
customerRoutes.get('/update', CustomerController.getUpdatePage);
customerRoutes.post('/update', CustomerController.updateCustomer);
customerRoutes.get('/delete', CustomerController.deleteCustomer);