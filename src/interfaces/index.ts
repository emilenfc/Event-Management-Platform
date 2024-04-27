export interface IEvent {
    title: string;
    description: string;
    date: Date;
    location: string;
    price: number;
    tiketsAvailable: number;
    image: string;
}

export interface IUser {
    firstName: string;
    secondName: string;
    email: string;
}