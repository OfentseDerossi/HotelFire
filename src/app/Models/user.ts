export interface User{
    email:string;
    password: string;
}

export interface Booking{
    uid: string;
    name: string;
    email: string;
    phone: number;
    date1:  string;
    date2: string;
    adults: number;
    children: number;
    roomType: string;
    price: number;
}

export interface Payment{
    name:string;
    account:string;
    expiry: string;
    cvv: number;
}