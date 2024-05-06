import prismaClient from "../prismaClient";

export async function createPlaces() {
  const placesDB = await prismaClient.place.findMany()

  if (placesDB.length === 0) {
    console.log('Adicionando locais padrão')

    await addPlaces([..._places], null)

    const cinema = await getCategory('Cinema / TV', 'Filmes / Séries / Programas de TV');
    await addPlaces([..._cinema], cinema.id)

    const brasil = await getCategory('Brasil', 'Estados / Regiões / Locais do Brasil')
    await addPlaces([..._brasil], brasil.id)

    console.log('Adicionado com sucesso!')
  } else {
    console.log('Locais padrão já adicionados')
  }
}

async function addPlaces(places: Place[], categoryId: string | null) {
  for (var place of places) {

    const created = await prismaClient.place.create({
      data: {
        name: place.name,
        placeCategoryId: categoryId
      }
    })

    for (var prof of place.professions) {
      await prismaClient.profession.create({
        data: {
          name: prof.name,
          placeId: created.id,
        }
      })
    }
  }
}

async function getCategory(name: string, description: string) {
  var category = await prismaClient.placeCategory.findFirst({ where: { name: name } });
  if (category === null) {
    category = await prismaClient.placeCategory.create({
      data: {
        name: name,
        description: description
      }
    });
  }
  return category;
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
  new Place("Escritório", [
    new Profession("Chefe"),
    new Profession("Gerente"),
    new Profession("Secretária"),
    new Profession("Copeiro"),
    new Profession("Cara da TI"),
    new Profession("Faxineira"),
  ]),
  new Place("Jogo de futebol", [
    new Profession("Jogador"),
    new Profession("Torcedor"),
    new Profession("Vendedor"),
    new Profession("Gandula"),
    new Profession("Repórter"),
    new Profession("Técnico"),
    new Profession("Narrador"),
    new Profession("Juiz"),
  ]),
  new Place("Praia", [
    new Profession("Pai de família"),
    new Profession("Turistão gringo"),
    new Profession("Vendedor ambulante"),
    new Profession("Salva-vidas"),
    new Profession("Surfista"),
    new Profession("Vermelhão de sol"),
    new Profession("Cachorro praiano"),
  ]),
  new Place("Avião", [
    new Profession("Piloto"),
    new Profession("Criança berrando"),
    new Profession("Passageiro"),
    new Profession("Aeromoça"),
    new Profession("Homem Bomba"),
    new Profession("Co-piloto"),
  ]),
  new Place("Escola", [
    new Profession("Diretora"),
    new Profession("Aluno"),
    new Profession("Professor"),
    new Profession("Coordenadora"),
    new Profession("Tia da cantina"),
    new Profession("Filho da diretora"),
    new Profession("Nerd"),
  ]),
  new Place("Encontro de família", [
    new Profession("Avós"),
    new Profession("Tio do pavê"),
    new Profession("Crianças"),
    new Profession("Cachorro simpático"),
    new Profession("Dono da casa"),
  ]),
  new Place("Oficina mecânica", [
    new Profession("Borracheiro"),
    new Profession("Motorista"),
    new Profession("Mecânico"),
    new Profession("Dono"),
    new Profession("Cliente"),
    new Profession("Lavador de carro"),
  ]),
  new Place("Restaurante", [
    new Profession("Garçom"),
    new Profession("Cliente"),
    new Profession("Cozinheiro"),
    new Profession("Chef de cozinha"),
    new Profession("Recepcionista"),
    new Profession("Dono"),
  ]),
  new Place("Hospital", [
    new Profession("Médico"),
    new Profession("Enfermeira"),
    new Profession("Paciente"),
    new Profession("Parente do paciente"),
    new Profession("Cirurgião"),
    new Profession("Residente"),
  ]),
  new Place("Balada", [
    new Profession("Heterotop"),
    new Profession("Barman"),
    new Profession("Segurança"),
    new Profession("Bombado"),
    new Profession("DJ"),
    new Profession("Cara sofrendo pela ex"),
  ]),
  new Place("Casamento", [
    new Profession("Noivo/Noiva"),
    new Profession("Padre"),
    new Profession("Porta-Alianças"),
    new Profession("Fotógrafo"),
    new Profession("Pai da noiva"),
    new Profession("Penetra"),
    new Profession("Parente"),
  ]),
  new Place("Metrô", [
    new Profession("Turista"),
    new Profession("Trabalhador"),
    new Profession("Vendedor ambulante"),
    new Profession("Operador de trem"),
    new Profession("Grávida"),
    new Profession("Homem fedendo"),
  ]),
  new Place("Asilo", [
    new Profession("Parente"),
    new Profession("Idoso"),
    new Profession("Enfermeira"),
    new Profession("Zelador"),
    new Profession("Cozinheiro"),
  ]),
  new Place("Clube de Jazz", [
    new Profession("Baterista"),
    new Profession("Saxofonista"),
    new Profession("Cantor"),
    new Profession("Barman"),
    new Profession("Dançarina"),
    new Profession("Fã"),
  ]),
  new Place("Teatro", [
    new Profession("Espectador"),
    new Profession("Diretor"),
    new Profession("Ator"),
    new Profession("Músico"),
    new Profession("Figurante"),
    new Profession("Assistente de palco"),
    new Profession("Caixa"),
  ]),
  new Place("Cassino", [
    new Profession("Segurança"),
    new Profession("Gerente"),
    new Profession("Apostador"),
    new Profession("Malandro"),
    new Profession("Gerente"),
  ]),
  new Place("Circo", [
    new Profession("Mágico"),
    new Profession("Palhaço"),
    new Profession("Espectador"),
    new Profession("Malabrista"),
    new Profession("Acrobata"),
    new Profession("Caixa"),
  ]),
  new Place("Cruzeiro do Neymar", [
    new Profession("Neymar"),
    new Profession("Zé Felipe e Virginia"),
    new Profession("Mc Pipokinha"),
    new Profession("Péricles"),
    new Profession("Mc's"),
    new Profession("Blogueiras Verificadas"),
  ]),
  new Place("Delegacia de polícia", [
    new Profession("Delegado"),
    new Profession("Policial"),
    new Profession("Bandido"),
    new Profession("Meliante"),
    new Profession("Advogado"),
    new Profession("Detetive"),
    new Profession("Jornalista"),
  ]),
  new Place("Supermercado", [
    new Profession("Cliente"),
    new Profession("Caixa"),
    new Profession("Açougueiro"),
    new Profession("Faxineiro"),
    new Profession("Segurança"),
    new Profession("Repositor"),
  ]),
  new Place("Obra (Construção)", [
    new Profession("Dono do terreno"),
    new Profession("Engenheiro"),
    new Profession("Arquitero"),
    new Profession("Pedreiro"),
    new Profession("Eletricista"),
    new Profession("Invasor"),
  ]),
  new Place("Prisão", [
    new Profession("Guarda"),
    new Profession("Preso"),
    new Profession("Visitante"),
    new Profession("Advogado"),
    new Profession("Traficante"),
  ]),
  new Place("Zoológico", [
    new Profession("Visitante"),
    new Profession("Veterinário"),
    new Profession("Leão"),
    new Profession("Elefante"),
    new Profession("Girafa"),
    new Profession("Vendedor de pipoca"),
  ]),
  new Place("Corpo Humano", [
    new Profession("Cérebro"),
    new Profession("Coração"),
    new Profession("Braços"),
    new Profession("Pernas"),
    new Profession("Estomago"),
    new Profession("Pulmão"),
    new Profession("Bunda"),
    new Profession("Peito"),
  ]),
  new Place("RA's Brasília", [
    new Profession("Guará II"),
    new Profession("Sudoeste"),
    new Profession("Lago Sul"),
    new Profession("Asa Sul"),
    new Profession("Asa Norte"),
    new Profession("Ceilândia"),
    new Profession("Aguas Claras"),
    new Profession("Planaltina"),
    new Profession("Estrutural"),
    new Profession("Octogonal"),
    new Profession("Noroeste"),
  ]),
  new Place("Unb", [
    new Profession("Gays"),
    new Profession("Travesti"),
    new Profession("Comunista"),
    new Profession("Professor"),
    new Profession("Aluno"),
    new Profession("Menine"),
  ]),
  new Place("Animais", [
    new Profession("Leão"),
    new Profession("Onça"),
    new Profession("Urso"),
    new Profession("Cavalo"),
    new Profession("Baleia"),
    new Profession("Cachorro"),
    new Profession("Gato"),
    new Profession("Papagaio"),
    new Profession("Veado"),
  ]),
  new Place("Roupas", [
    new Profession("Blusa"),
    new Profession("Camisa Social"),
    new Profession("Casaco Moletom"),
    new Profession("Calça Jeans"),
    new Profession("Tênis"),
    new Profession("Boné"),
    new Profession("Óculos"),
    new Profession("Cueca"),
    new Profession("Vestido"),
    new Profession("Saia"),
  ]),
  new Place("Geladeira", [
    new Profession("Ovo"),
    new Profession("Leite"),
    new Profession("Legumes"),
    new Profession("Iogurte"),
    new Profession("Frutas"),
    new Profession("Suco"),
    new Profession("Carne"),
    new Profession("Comida velha"),
  ]),
  new Place("Celulares", [
    new Profession("Iphone 15"),
    new Profession("Motorola Bugado"),
    new Profession("Samsung Bom"),
    new Profession("Samsung Travado"),
    new Profession("Iphone velho"),
    new Profession("Nokia tijolão"),
  ]),
  new Place("Bebidas", [
    new Profession("Água"),
    new Profession("Suco de laranja"),
    new Profession("Cerveja"),
    new Profession("Vodka"),
    new Profession("Red Bull"),
    new Profession("Whisky"),
    new Profession("Refrigerante"),
    new Profession("Bananinha"),
    new Profession("Gummy"),
  ]),
  new Place("Carnaval", [
    new Profession("Gays"),
    new Profession("Mlk querendo mulher"),
    new Profession("Gummy duvidoso"),
    new Profession("Travesti"),
    new Profession("Policial"),
    new Profession("Bandido"),
    new Profession("Bêbado"),
  ]),
  new Place("Motel", [
    new Profession("Camareira"),
    new Profession("Puta"),
    new Profession("Amante"),
    new Profession("Cara que pega a amante"),
    new Profession("Recepcionista"),
    new Profession("Casal"),
  ]),
  new Place("Academia", [
    new Profession("Personal safado"),
    new Profession("Bombado"),
    new Profession("Frango"),
    new Profession("Idosa fazendo zumba"),
    new Profession("Mãe solteira siliconada"),
    new Profession("Gay da smart fit"),
  ]),
  new Place("Buteco de Esquina", [
    new Profession("Cachorro caramelo"),
    new Profession("Zé da pinga"),
    new Profession("Veio com cirrose"),
    new Profession("Mendigo"),
    new Profession("Pai de família"),
    new Profession("Desempregado"),
  ]),
];

var _cinema: Place[] = [
  new Place("Shrek (Todos os filmes)", [
    new Profession("Shrek"),
    new Profession("Burro"),
    new Profession("Fiona"),
    new Profession("Dragão"),
    new Profession("Gato de botas"),
    new Profession("Lorde Farquaad"),
    new Profession("Homem biscoito"),
  ]),
  new Place("Toy Story (Todos os Filmes)", [
    new Profession("Woody"),
    new Profession("Buzz"),
    new Profession("Andy"),
    new Profession("Sid"),
    new Profession("Sr. Cabeça de batata"),
    new Profession("Rex"),
    new Profession("Zurg"),
    new Profession("Jessie"),
  ]),
  new Place("Carros (Filme)", [
    new Profession("Relâmpago Mcqueen"),
    new Profession("Tom Mate"),
    new Profession("Sally"),
    new Profession("Doc Hudson"),
    new Profession("Chick Hicks"),
    new Profession("Luigi"),
    new Profession("Mack"),
  ]),
  new Place("Rei Leão (Todos os Filmes)", [
    new Profession("Simba"),
    new Profession("Mufasa"),
    new Profession("Scar"),
    new Profession("Timão"),
    new Profession("Pumba"),
    new Profession("Hienas"),
  ]),
  new Place("Os Vingadores", [
    new Profession("Homem de Ferro"),
    new Profession("Hulk"),
    new Profession("Capitão América"),
    new Profession("Thor"),
    new Profession("Viúva Negra"),
    new Profession("Loki"),
    new Profession("Gavião Arqueiro"),
  ]),
  new Place("Homem Aranha (Todos os Filmes)", [
    new Profession("Peter Parker"),
    new Profession("Mary Jane"),
    new Profession("Duende Verde"),
    new Profession("Homem Areia"),
    new Profession("Venon"),
    new Profession("Tia May"),
    new Profession("Tio Ben"),
    new Profession("Doutor Octopus"),
  ]),
  new Place("Todo mundo odeia o Chris", [
    new Profession("Chris"),
    new Profession("Julius"),
    new Profession("Rochelle"),
    new Profession("Greg"),
    new Profession("Caruso"),
    new Profession("Tasha"),
    new Profession("Tonya"),
  ]),
  new Place("Séries", [
    new Profession("Peaky Blinders"),
    new Profession("Breaking Bad"),
    new Profession("La casa de Papel"),
    new Profession("Round 6"),
    new Profession("Vikings"),
    new Profession("The Office"),
    new Profession("Grey's Anatomy"),
  ]),
  new Place("Personagens DC", [
    new Profession("Super Homem"),
    new Profession("Batman"),
    new Profession("Mulher Maravilha"),
    new Profession("Flash"),
    new Profession("Coringa"),
    new Profession("Lanterna Verde"),
  ]),
  new Place("Batman (Filme)", [
    new Profession("Bruce Wayne / Batman"),
    new Profession("Coringa"),
    new Profession("Duas-caras"),
    new Profession("Pinguim"),
    new Profession("Mulher Gato"),
    new Profession("Alfred"),
  ]),
  new Place("Breaking Bad", [
    new Profession("Walter White"),
    new Profession("Jesse"),
    new Profession("Hank"),
    new Profession("Gus Fring"),
    new Profession("Skyler"),
    new Profession("Walter Jr."),
    new Profession("Saul Goodman"),
  ]),
]

var _brasil: Place[] = [
  new Place("Regiões Brasil", [
    new Profession("Norte"),
    new Profession("Nordeste"),
    new Profession("Centro-Oeste"),
    new Profession("Sudeste"),
    new Profession("Sul"),
  ]),
  new Place("Estados Brasil", [
    new Profession("DF"),
    new Profession("Goiás"),
    new Profession("Minas Gerais"),
    new Profession("Bahia"),
    new Profession("Rio de Janeiro"),
    new Profession("São Paulo"),
    new Profession("Amazonas"),
    new Profession("Paraíba"),
    new Profession("Rio grande do Sul"),
  ]),
  new Place("Minas Gerais", [
    new Profession("Pãozin de Queijo"),
    new Profession("Queijo"),
    new Profession("Cafézin"),
    new Profession("Feijão Tropeiro"),
    new Profession("Mineiro"),
    new Profession("Comida boa"),
    new Profession("Uai"),
  ]),
  new Place("Rio de Janeiro", [
    new Profession("Flamengo"),
    new Profession("Bandido"),
    new Profession("Favela"),
    new Profession("Cristo Redentor"),
    new Profession("Escolas de Samba"),
    new Profession("Carioca"),
    new Profession("Turista"),
  ]),
  new Place("São Paulo", [
    new Profession("Poluição"),
    new Profession("Prédios"),
    new Profession("Otakus"),
    new Profession("Corinthians"),
    new Profession("Faria Limer"),
    new Profession("Oloco mêo"),
    new Profession("Paulista"),
  ]),
  new Place("Rio Grande do Sul", [
    new Profession("Churrasco"),
    new Profession("Grêmio"),
    new Profession("Cacetinho"),
    new Profession("Bah Tchê"),
    new Profession("Gramado"),
    new Profession("Frio"),
    new Profession("Gaúcho"),
  ]),
  new Place("Bahia", [
    new Profession("Acarajé"),
    new Profession("Capoeira"),
    new Profession("Olodum"),
    new Profession("Michael Jackson"),
    new Profession("Axé"),
    new Profession("Pelourinho"),
    new Profession("Baiano"),
  ]),
  new Place("Goiás", [
    new Profession("Sertanejo"),
    new Profession("Pequi"),
    new Profession("Pamonha"),
    new Profession("Peão de Rodeio"),
    new Profession("Caldas Novas"),
    new Profession("Goiano"),
  ]),
  new Place("Pontos Turísticos", [
    new Profession("Cristo Redentor"),
    new Profession("Pão de Açucar"),
    new Profession("Cataratas do Iguaçu"),
    new Profession("Floresta Amazônica"),
    new Profession("Fernando de Noronha"),
  ]),
];
