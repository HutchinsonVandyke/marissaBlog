import { Types } from 'mongoose';

interface Admin {
    username: String;
    password: String;
    _id: Types.ObjectId
}

const adminsData: Admin[] = [
    {
        username: "marissa",
        password: "123456",
        _id: new Types.ObjectId('5e37ac7990ba8b3dd080516b')
    }
];

export = adminsData;
