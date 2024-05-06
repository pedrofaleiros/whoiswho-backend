import prismaClient from "../prismaClient";

export async function deleteRooms() {
    const currentDate = new Date();

    const minutes = 60 * 5; // 5 horas
    const time = new Date(currentDate.getTime() - minutes * 60 * 1000);

    
    const rooms = await prismaClient.room.findMany({
        where: { createdAt: { lt: time } },
        orderBy: {createdAt: "asc"}
    });

    console.log(`Deletando ${rooms.length} salas criadas antes de: ${time}\n`)
    rooms.forEach(r => {
        console.log(`${r.code}: ${r.createdAt}`)
    })

    await prismaClient.room.deleteMany({
        where: { createdAt: { lt: time } }
    });
}
