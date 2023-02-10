import Fastify from 'fastify';
import { PrismaClient } from "@prisma/client"
import cors from '@fastify/cors';

const app = Fastify();
const prisma = new PrismaClient;

app.register(cors);

app.get('/get-jornadas', async () => {

    const jornadas = await prisma.jornadaDeTrabalho.findMany({
        orderBy: {
            ordem: "asc"
        }
    })

    const config = await prisma.configTable.findFirst()

    return { jornadas, config };
});

interface Jornada {
    id: string;
    ativo: boolean;
    dia: string;
    inicio: string;
    fim: string;
    ordem: number;
}

interface Config {
    id: string;
    checked: boolean;
    selectedOption: string;
}

interface Body {
    jornada: Jornada;
    config: Config;
}

app.put('/salvar', async (request, response) => {

    const body = request.body as unknown as Body;
    const { jornada, config }: Body = body

    console.log(request.body)

    const updateDia = await prisma.jornadaDeTrabalho.update({
        where: {
            id: jornada.id
        },
        data: {
            ativo: jornada.ativo,
            inicio: jornada.inicio,
            fim: jornada.fim
        },
    });

    const updateConfig = await prisma.configTable.update({
        where: {
            id: config.id
        },
        data: {
            checked: config.checked,
            selectedOption: config.selectedOption
        }
    });

    return { message: 'Recurso atualizado com sucesso', updateDia, updateConfig }

})

app.listen({
    port: 3333,
}).then(() => {
    console.log('HTTP server is running on port 3333!');
});