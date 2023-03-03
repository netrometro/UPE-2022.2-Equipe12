import Fastify from 'fastify';
import { userRoutes } from './routes/user'



// import jwt from '@fastify/jwt'
import cors from '@fastify/cors'

async function bootstrap(){
    const fastify = Fastify({
        logger: true,
    })

    await fastify.register(cors, {
        origin: true,
        })
    
    await fastify.register(userRoutes)


    await fastify.listen({port: 3333})

}

bootstrap()