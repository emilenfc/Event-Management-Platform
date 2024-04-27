import { z } from 'zod';

const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

const RegisterSchema = z.object({
    firstname: z.string(),
    secondName: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
});

const BookingSchema = z.object({
    numberOfTickets: z.number().min(1),
})

const EventSchema = z.object({
    title: z.string(),
    description: z.string() ,
    price: z.number(),
    date: z.string(),
    tiketsAvailable: z.string(),
    image: z.string(),
    location: z.string(),
})



export { LoginSchema, RegisterSchema, BookingSchema,EventSchema };
