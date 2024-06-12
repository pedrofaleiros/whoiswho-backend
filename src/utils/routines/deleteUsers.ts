import prismaClient from "../prismaClient";

export async function deleteUsers(hours: number) {
    const currentDate = new Date();

    const minutes = 60 * hours;
    const time = new Date(currentDate.getTime() - minutes * 60 * 1000);

    const users = await prismaClient.user.findMany({
        where: { lastActivity: { lt: time } },
        orderBy: { lastActivity: "asc" }
    });

    console.log(`Deletando ${users.length} usuários inativos desde: ${time}\n`)
    users.forEach(r => {
        console.log(`(${r.id}) ${r.username}: ${r.lastActivity}`)
    })

    await prismaClient.user.deleteMany({
        where: { lastActivity: { lt: time } }
    });
}
