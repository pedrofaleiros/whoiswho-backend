import prismaClient from "../prismaClient";

export async function deleteRooms() {
    const currentDate = new Date();

    const minutes = 60 * 5;
    const time = new Date(currentDate.getTime() - minutes * 60 * 1000);

    console.log(`\n Deletando rooms criadas antes de: ${time}\n`)
    // await prismaClient.room.deleteMany({
    //     where: { createdAt: { lt: time } }
    // });
    
    const rooms = await prismaClient.room.findMany({
        // where: { createdAt: { lt: time } }
    });
    rooms.forEach(r => {
        console.log(`${r.code}: ${r.createdAt}`)
    })
}
