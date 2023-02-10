"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const client_1 = require("@prisma/client");
const cors_1 = __importDefault(require("@fastify/cors"));
const app = (0, fastify_1.default)();
const prisma = new client_1.PrismaClient;
app.register(cors_1.default);
app.get('/get-jornadas', async () => {
    const jornadas = await prisma.jornadaDeTrabalho.findMany({
        orderBy: {
            ordem: "asc"
        }
    });
    const config = await prisma.configTable.findFirst();
    return { jornadas, config };
});
app.put('/salvar', async (request, response) => {
    const body = request.body;
    const { jornada, config } = body;
    console.log(request.body);
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
    return { message: 'Recurso atualizado com sucesso', updateDia, updateConfig };
});
app.listen({
    port: 3333,
}).then(() => {
    console.log('HTTP server is running on port 3333!');
});
