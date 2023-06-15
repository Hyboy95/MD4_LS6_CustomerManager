import { Customer } from "../models/schemas/customer.model";

export class CustomerController {
    static async getCreatePage(req: any, res: any) {
        res.render("create");
    }

    static async addNewCustomer(req: any, res: any) {
        try {
            let { name, email, phone } = req.body;
            let avatarUrl = '/upload/avatar.jpg';
            if (req.files) {
                let avatar = req.files.avatar;
                avatar.mv('./src/public/upload/' + avatar.name);
                avatarUrl = '/upload/' + avatar.name;
            }
            const customerNew = new Customer({ name: name, email: email, phone: phone, avatar: avatarUrl });
            const customer = await customerNew.save();
            if (customer) {
                res.redirect('/');
            } else res.render("error");
        } catch (err) {
            res.render("error");
        }
    }

    static async getListCustomer(req: any, res: any) {
        try {
            let size = 3;
            if (req.body.size) {
                size = +req.body.size;
            } else if (req.query.limit) {
                size = +req.query.limit;
            }
            let page = req.query.page ? +req.query.page : 1;
            const customerList = await Customer.find();
            let totalPage = Math.ceil(customerList.length / size);
            let offset = (page - 1) * size;
            const customers = await Customer.find().limit(size).skip(offset);;
            res.render("home", { customers: customers, totalPage: totalPage, pageCurrent: page, limit: size, totalItem: customerList.length });
        } catch (err) {
            res.render('error');
        }
    }

    static async getUpdatePage(req: any, res: any) {
        try {
            let { id, page, limit } = req.query;
            if (id && page && limit) {
                const customer = await Customer.findOne({ _id: id });
                res.render('update', { customer: customer, pageCurrent: page, limit: limit });
            } else {
                res.redirect('/');
            }
        } catch (err) {
            res.render('error');
        }
    }

    static async updateCustomer(req: any, res: any) {
        try {
            let { id, page, limit } = req.query;
            if (id && page && limit) {
                let { name, email, phone } = req.body;
                const customer = await Customer.findOne({ _id: id });
                customer.name = name;
                customer.email = email;
                customer.phone = phone;
                let avatarUrl;
                if (req.files) {
                    let avatar = req.files.avatar;
                    avatar.mv('./src/public/upload/' + avatar.name);
                    avatarUrl = '/upload/' + avatar.name;
                    customer.avatar = avatarUrl;
                }
                await customer.save();
                res.redirect(`/?page=${page}&limit=${limit}`);
            } else res.redirect('/');
        } catch (err) {
            res.render('error');
        }
    }

    static async deleteCustomer(req: any, res: any) {
        try {
            let { id, page, limit } = req.query;
            if (id && page && limit) {
                await Customer.deleteOne({_id: id});
                res.redirect(`/?page=${page}&limit=${limit}`);
            } else res.redirect('/');
        } catch (err) {
            res.render('error');
        }
    }
}