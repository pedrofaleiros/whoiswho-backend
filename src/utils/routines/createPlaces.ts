import prismaClient from "../prismaClient";

export async function createPlaces() {
    const placesDB = await prismaClient.place.findMany()

    if (placesDB.length === 0) {
        console.log('Adicionando locais padrão')
        var places = [..._places]

        for (var place of places) {

            const created = await prismaClient.place.create({ data: { name: place.name } })

            for (var prof of place.professions) {
                await prismaClient.profession.create({
                    data: { name: prof.name, placeId: created.id, }
                })
            }
        }
        console.log('Adicionado com sucesso!')
    }
}

class Profession {
    name: string

    constructor(name: string) {
        this.name = name
    }
}

class Place {
    name: string
    professions: Profession[]

    constructor(name: string, professions: Profession[]) {
        this.name = name
        this.professions = professions
    }
}

var _places: Place[] = [
    new Place(
        "Escritório",
        [
            new Profession("Chefe"),
            new Profession("Gerente"),
            new Profession("Secretária"),
            new Profession("Copeiro"),
            new Profession("Cara da TI"),
            new Profession("Faxineira"),
        ],
    ),
    new Place(
        "Jogo de futebol",
        [
            new Profession("Jogador"),
            new Profession("Torcedor"),
            new Profession("Vendedor"),
            new Profession("Gandula"),
            new Profession("Repórter"),
            new Profession("Técnico"),
            new Profession("Narrador"),
        ],
    ),
    new Place(
        "Praia",
        [
            new Profession("Pai de família"),
            new Profession("Turistão gringo"),
            new Profession("Vendedor ambulante"),
            new Profession("Salva-vidas"),
            new Profession("Surfista"),
            new Profession("Vermelhão de sol"),
            new Profession("Cachorro praiano"),
        ],
    ),
    new Place(
        "Avião",
        [
            new Profession("Piloto"),
            new Profession("Criança berrando"),
            new Profession("Passageiro"),
            new Profession("Aeromoça"),
            new Profession("Homem Bomba"),
            new Profession("Co-piloto"),
        ],
    ),
    new Place(
        "Escola",
        [
            new Profession("Diretora"),
            new Profession("Aluno"),
            new Profession("Professor"),
            new Profession("Coordenadora"),
            new Profession("Tia da cantina"),
            new Profession("Filho da diretora"),
            new Profession("Nerd"),
        ],
    ),
    new Place(
        "Encontro de família",
        [
            new Profession("Avós"),
            new Profession("Tio do pavê"),
            new Profession("Crianças"),
            new Profession("Cachorro simpático"),
            new Profession("Dono da casa"),
        ],
    ),
    new Place(
        "Oficina mecânica",
        [
            new Profession("Borracheiro"),
            new Profession("Motorista"),
            new Profession("Mecânico"),
            new Profession("Dono"),
            new Profession("Cliente"),
            new Profession("Lavador de carro"),
        ],
    ),
    new Place(
        "Restaurante",
        [
            new Profession("Garçom"),
            new Profession("Cliente"),
            new Profession("Cozinheiro"),
            new Profession("Chef de cozinha"),
            new Profession("Recepcionista"),
            new Profession("Dono"),
        ],
    ),
    new Place(
        "Hospital",
        [
            new Profession("Médico"),
            new Profession("Enfermeira"),
            new Profession("Paciente"),
            new Profession("Parente do paciente"),
            new Profession("Cirurgião"),
            new Profession("Residente"),
        ],
    ),
    new Place(
        "Balada",
        [
            new Profession("Heterotop"),
            new Profession("Barman"),
            new Profession("Segurança"),
            new Profession("Bombado"),
            new Profession("DJ"),
            new Profession("Cara sofrendo pela ex"),
        ],
    ),
    new Place(
        "Casamento",
        [
            new Profession("Noivo/Noiva"),
            new Profession("Padre"),
            new Profession("Porta-Alianças"),
            new Profession("Fotógrafo"),
            new Profession("Pai da noiva"),
            new Profession("Penetra"),
            new Profession("Parente"),
        ],
    ),
    new Place(
        "Metrô",
        [
            new Profession("Turista"),
            new Profession("Trabalhador"),
            new Profession("Vendedor ambulante"),
            new Profession("Operador de trem"),
            new Profession("Grávida"),
            new Profession("Homem fedendo"),
        ],
    ),
    new Place(
        "Asilo",
        [
            new Profession("Parente"),
            new Profession("Idoso"),
            new Profession("Enfermeira"),
            new Profession("Zelador"),
            new Profession("Cozinheiro"),
        ],
    ),
    new Place(
        "Clube de Jazz",
        [
            new Profession("Baterista"),
            new Profession("Saxofonista"),
            new Profession("Cantor"),
            new Profession("Barman"),
            new Profession("Dançarina"),
            new Profession("Fã"),
        ],
    ),
    new Place(
        "Breaking Bad",
        [
            new Profession("Walter White"),
            new Profession("Jesse"),
            new Profession("Hank"),
            new Profession("Gus Fring"),
            new Profession("Skyler"),
            new Profession("Walter Jr."),
            new Profession("Saul Goodman"),
        ],
    ),
    new Place(
        "Teatro",
        [
            new Profession("Espectador"),
            new Profession("Diretor"),
            new Profession("Ator"),
            new Profession("Músico"),
            new Profession("Figurante"),
            new Profession("Assistente de palco"),
            new Profession("Caixa"),
        ],
    ),
    new Place(
        "Cassino",
        [
            new Profession("Segurança"),
            new Profession("Gerente"),
            new Profession("Apostador"),
            new Profession("Malandro"),
            new Profession("Gerente"),
        ],
    ),
    new Place(
        "Circo",
        [
            new Profession("Mágico"),
            new Profession("Palhaço"),
            new Profession("Espectador"),
            new Profession("Malabrista"),
            new Profession("Acrobata"),
            new Profession("Caixa"),
        ],
    ),
    new Place(
        "Cruzeiro do Neymar",
        [
            new Profession("Neymar"),
            new Profession("Zé Felipe e Virginia"),
            new Profession("Mc Pipokinha"),
            new Profession("Péricles"),
            new Profession("Mc's"),
            new Profession("Blogueiras Verificadas"),
        ],
    ),
    new Place(
        "Delegacia de polícia",
        [
            new Profession("Delegado"),
            new Profession("Policial"),
            new Profession("Bandido"),
            new Profession("Meliante"),
            new Profession("Advogado"),
            new Profession("Detetive"),
            new Profession("Jornalista"),
        ],
    ),
    new Place(
        "Supermercado",
        [
            new Profession("Cliente"),
            new Profession("Caixa"),
            new Profession("Açougueiro"),
            new Profession("Faxineiro"),
            new Profession("Segurança"),
            new Profession("Repositor"),
        ],
    ),
    new Place(
        "Obra (Construção)",
        [
            new Profession("Dono do terreno"),
            new Profession("Engenheiro"),
            new Profession("Arquitero"),
            new Profession("Pedreiro"),
            new Profession("Eletricista"),
            new Profession("Invasor"),
        ],
    ),
    new Place(
        "Prisão",
        [
            new Profession("Guarda"),
            new Profession("Preso"),
            new Profession("Visitante"),
            new Profession("Advogado"),
            new Profession("Traficante"),
        ],
    ),
    new Place(
        "Zoológico",
        [
            new Profession("Visitante"),
            new Profession("Veterinário"),
            new Profession("Leão"),
            new Profession("Elefante"),
            new Profession("Girafa"),
            new Profession("Vendedor de pipoca"),
        ],
    ),
];