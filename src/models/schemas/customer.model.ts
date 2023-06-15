import {Schema, model} from "mongoose";

interface ICustomer {
    avatar: string;
    name: string;
    email: string;
    phone: string
}

const customerSchema = new Schema<ICustomer>({
    avatar: String,
    name: String,
    email: String,
    phone: String
})
   
   
   
export const Customer = model<ICustomer>('Customer', customerSchema);