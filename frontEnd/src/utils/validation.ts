import { z } from 'zod';

const LoginSchema = z.object({
    email: z.string().email({ message: 'valid email required' }),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

const RegisterSchema = z.object({
    firstName: z.string().min(2, 'Firstname required'),
    secondName: z.string().min(2, 'Secondname required'),
    email: z.string().email({ message: 'valid email required' }),
    password: z.string().min(4,'Password must be atleast 4 chracter'),
    confirmPassword: z.string().min(4),
}).superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
        ctx.addIssue({
            code: "custom",
            message: "The passwords did not match",
            path: ["confirmPassword"],
        });
    };
})

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
