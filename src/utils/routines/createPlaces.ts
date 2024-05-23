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

    const diversos = await getCategory('Diversos', 'Qualquer coisa que você pensar');
    await addPlaces([..._diversos], diversos.id)

    console.log('Adicionado com sucesso!')
  } else {
    console.log('Locais padrão já adicionados.')
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
    new Profession("Médico"),
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
    new Profession("Contorcionista"),
    new Profession("Ator"),
  ]),
  new Place("Delegacia de polícia", [
    new Profession("Delegado"),
    new Profession("Policial"),
    new Profession("Bandido"),
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
    new Profession("Cozinheiro"),
  ]),
  new Place("Zoológico", [
    new Profession("Visitante"),
    new Profession("Veterinário"),
    new Profession("Leão"),
    new Profession("Elefante"),
    new Profession("Girafa"),
    new Profession("Vendedor de pipoca"),
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
    new Profession("Infiel"),
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
  new Place("Cruzeiro", [
    new Profession("Capitão"),
    new Profession("Chefe de Cozinha"),
    new Profession("Camareira"),
    new Profession("Animador de Festa"),
    new Profession("Tripulante"),
    new Profession("Fotógrafo"),
    new Profession("Garçom"),
    new Profession("Salva Vidas"),
  ]),
  new Place("Navio Pirata", [
    new Profession("Capitão"),
    new Profession("Marujo"),
    new Profession("Prisioneiro"),
    new Profession("Papagaio"),
    new Profession("Marinheiro"),
    new Profession("Escravo"),
  ]),
  new Place("Faculdade", [
    new Profession("Reitor"),
    new Profession("Professor"),
    new Profession("Calouro"),
    new Profession("Veterano"),
    new Profession("Lider da Atlética"),
  ]),
  new Place("Banco", [
    new Profession("Gerente"),
    new Profession("Consultor Financeiro"),
    new Profession("Cliente"),
    new Profession("Segurança"),
    new Profession("Assaltante"),
    new Profession("Caixa"),
  ]),
  new Place("Parque", [
    new Profession("Vendedor de pipoca"),
    new Profession("Patinho"),
    new Profession("Cara correndo"),
    new Profession("Ciclista"),
    new Profession("Casal com cachorro"),
    new Profession("Amigas no piquenique"),
  ]),
  new Place("Museu de Arte", [
    new Profession("Estudante"),
    new Profession("Turista"),
    new Profession("Segurança"),
    new Profession("Pintor"),
    new Profession("Fotógrafo"),
    new Profession("Artista"),
    new Profession("Caixa"),
  ]),
  new Place("Cemitério", [
    new Profession("Coveiro"),
    new Profession("Padre"),
    new Profession("Morto"),
    new Profession("Parente de luto"),
    new Profession("Ladrão de covas"),
  ]),
  new Place("Posto de Gasolina", [
    new Profession("Frentista"),
    new Profession("Cliente"),
    new Profession("Lavador de carro"),
    new Profession("Gerente"),
    new Profession("Caixa da lojinha"),
  ]),
  new Place("Show de Rock", [
    new Profession("Vocalista"),
    new Profession("Guitarrista"),
    new Profession("Baterista"),
    new Profession("Fã"),
    new Profession("Técnico de som"),
    new Profession("Vendedor de cerveja"),
    new Profession("Baixista"),
  ]),
];

var _cinema: Place[] = [
  new Place("Shrek", [
    new Profession("Shrek"),
    new Profession("Burro"),
    new Profession("Fiona"),
    new Profession("Dragão"),
    new Profession("Gato de botas"),
    new Profession("Lorde Farquaad"),
    new Profession("Biscoito"),
  ]),
  new Place("Toy Story", [
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
  new Place("Rei Leão", [
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
  new Place("Homem Aranha", [
    new Profession("Peter Parker / Homem Aranha"),
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
  new Place("Personagens Marvel", [
    new Profession("Homem-Aranha"),
    new Profession("Homem de Ferro"),
    new Profession("Hulk"),
    new Profession("Thor"),
    new Profession("Capitão América"),
    new Profession("Deadpool"),
  ]),
  new Place("Batman", [
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
  new Place("Globo", [
    new Profession("William Bonner"),
    new Profession("Luciano Hulk"),
    new Profession("Fátima Bernardes"),
    new Profession("Boninho"),
    new Profession("Ana Maria Braga"),
    new Profession("Jô Soares"),
  ]),
  new Place("SBT", [
    new Profession("Silvio Santos"),
    new Profession("Gugu"),
    new Profession("Ratinho"),
    new Profession("Celso Portiolli"),
    new Profession("Eliana"),
  ]),
]

var _brasil: Place[] = [
  new Place("Minas Gerais", [
    new Profession("Pãozin de Queijo"),
    new Profession("Queijo"),
    new Profession("Cafézin"),
    new Profession("Feijão Tropeiro"),
    new Profession("Mineiro"),
  ]),
  new Place("Rio de Janeiro", [
    new Profession("Flamenguista"),
    new Profession("Bandido"),
    new Profession("Traficante"),
    new Profession("Cristo Redentor"),
    new Profession("Sambista"),
    new Profession("Carioca"),
    new Profession("Turista"),
  ]),
  new Place("São Paulo", [
    new Profession("Otakus"),
    new Profession("Corinthiano"),
    new Profession("Faria Limer"),
    new Profession("Paulista"),
    new Profession("Chinês"),
    new Profession("Skatista"),
  ]),
  new Place("Rio Grande do Sul", [
    new Profession("Churrasco"),
    new Profession("Torcedor do Grêmio"),
    new Profession("Turista em Gramado"),
    new Profession("Cacetinho"),
    new Profession("Gaúcho"),
  ]),
  new Place("Bahia", [
    new Profession("Acarajé"),
    new Profession("Capoeirista"),
    new Profession("Olodum"),
    new Profession("Axé"),
    new Profession("Turista no Pelourinho"),
    new Profession("Baiano"),
  ]),
  new Place("Goiás", [
    new Profession("Cantor de Sertanejo"),
    new Profession("Pequi"),
    new Profession("Pamonha"),
    new Profession("Peão de Rodeio"),
    new Profession("Turista em Caldas Novas"),
    new Profession("Goiano"),
  ]),
  new Place("Amazonas", [
    new Profession("Animais"),
    new Profession("Indígena"),
    new Profession("Floresta Amazônica"),
    new Profession("Boto-cor-de-rosa"),
  ]),
  new Place("Times de Futebol", [
    new Profession("Flamengo"),
    new Profession("Corinthians"),
    new Profession("Palmeiras"),
    new Profession("Vasco"),
    new Profession("Santos"),
    new Profession("São Paulo"),
    new Profession("Fluminense"),
    new Profession("Botafogo"),
  ]),
  new Place("Presidentes", [
    new Profession("Bolsonaro"),
    new Profession("Lula"),
    new Profession("Michel Temer"),
    new Profession("Dilma"),
    new Profession("Getúlio Vargas"),
    new Profession("Juscelino Kubitschek"),
    new Profession("FHC"),
    new Profession("Fernando Collor"),
  ]),
  new Place("Filmes Brasileiros", [
    new Profession("Central do Brasil"),
    new Profession("Tropa de Elite"),
    new Profession("O Auto da Compadecida"),
    new Profession("Cidade de Deus"),
    new Profession("Carandiru"),
  ]),
  new Place("Sertanejo", [
    new Profession("Gusttavo Lima"),
    new Profession("Marilia Mendonça"),
    new Profession("Matheus E Kauan"),
    new Profession("Henrique e Juliano"),
    new Profession("Zé Neto e Cristiano"),
    new Profession("Jorge e Mateus"),
    new Profession("Wesley Safadão"),
    new Profession("Maiara e Maraisa"),
    new Profession("Simone e Simaria"),
  ]),
  new Place("Pagode", [
    new Profession("Turma do Pagode"),
    new Profession("Thiaguinho"),
    new Profession("Menos é Mais"),
    new Profession("Péricles"),
    new Profession("Ferrugem"),
    new Profession("Raça Negra"),
  ]),
  new Place("Trap/Funk", [
    new Profession("Matuê"),
    new Profession("Filipe Ret"),
    new Profession("Orochi"),
    new Profession("L7NNON"),
    new Profession("Poze"),
    new Profession("Kayblack"),
  ]),
  new Place("Cruzeiro do Neymar", [
    new Profession("Neymar"),
    new Profession("Zé Felipe e Virginia"),
    new Profession("Mc Pipokinha"),
    new Profession("Péricles"),
    new Profession("Mc's"),
    new Profession("Blogueiras Verificadas"),
  ]),
];

var _diversos: Place[] = [
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
  new Place("Loja de Roupas", [
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
  new Place("Argentina", [
    new Profession("Racistas"),
    new Profession("Parrila"),
    new Profession("Papa"),
    new Profession("Messi"),
    new Profession("Tango"),
    new Profession("Argentino"),
  ]),
  new Place("México", [
    new Profession("Nachos"),
    new Profession("Tacos"),
    new Profession("Burritos"),
    new Profession("Muro da fronteira"),
    new Profession("Guacamole"),
    new Profession("Fiesta de los Muertos"),
    new Profession("Mexicano"),
  ]),
  new Place("Portugal", [
    new Profession("Cristiano Ronaldo"),
    new Profession("Ouro Brasileiro"),
    new Profession("Bacalhau"),
    new Profession("Pastel de Belém"),
    new Profession("Português"),
  ]),
  new Place("Alemanha", [
    new Profession("Loiras"),
    new Profession("Cerveja"),
    new Profession("Chucrute"),
    new Profession("Oktoberfest"),
    new Profession("Alemão"),
    new Profession("Muro de Berlim"),
  ]),
  new Place("Estados Unidos", [
    new Profession("Mc Donalds"),
    new Profession("Obama"),
    new Profession("Trump"),
    new Profession("Americano"),
    new Profession("Dolar"),
    new Profession("Imigrante Ilegal"),
  ]),
  new Place("Céu e Inferno", [
    new Profession("Anjo"),
    new Profession("Papa"),
    new Profession("Hitler"),
    new Profession("Diabo"),
    new Profession("Osama Bin Laden"),
  ]),
  new Place("Japão", [
    new Profession("Japonês"),
    new Profession("Sushi"),
    new Profession("Privada Inteligente"),
    new Profession("Kamikaze"),
    new Profession("Robôs"),
  ]),
  new Place("China", [
    new Profession("Pastel de Flango"),
    new Profession("TikTok"),
    new Profession("Chinês"),
    new Profession("Shein"),
    new Profession("Xi Jinping"),
  ]),
  new Place("Brasil", [
    new Profession("Lula"),
    new Profession("Flamengo"),
    new Profession("Jogo do Tigrinho"),
    new Profession("Corrupção"),
    new Profession("Neymar"),
    new Profession("Blaze"),
    new Profession("Globeleza"),
  ]),
  new Place("Unb", [
    new Profession("Gays"),
    new Profession("Travesti"),
    new Profession("Professor"),
    new Profession("Aluno"),
    new Profession("Menine"),
  ]),
]