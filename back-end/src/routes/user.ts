import {FastifyInstance } from 'fastify';
import { z } from 'zod';
import { prisma } from '../lib/prisma';


export async function userRoutes(fastify:FastifyInstance){
    
    fastify.post('/user/register', async (request, reply) => {
        const createUser = z.object({
            email:z.string().email(),
            password:z.string(),
            name:z.string()

        })
            const {email, password, name} = createUser.parse(request.body)

            await prisma.user.create({
                data:{
                    email,
                    password,
                    name
                }
            })

            return reply.status(201).send()
           
    })    

}