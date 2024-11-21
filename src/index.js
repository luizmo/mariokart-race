const player1 = {
  nome: "Mario",
  velocidade: 4,
  manobrabilidade: 3,
  poder: 3,
  pontos: 0,
}

const player2 = {
  nome: "Luigi",
  velocidade: 3,
  manobrabilidade: 4,
  poder: 4,
  pontos: 0,
}

async function rollDice() {
  return Math.floor(Math.random() * 6) + 1
}

async function getRandomBlock() {
  let random = Math.random()
  let result 
  switch (true) {
    case random < 0.33:
      result  = "RETA"
      break
    case random < 0.66:
      result = "CURVA"  
      break  
    default:
      result = "CONFRONTO"
  }
  return result
}

async function logRollResult(charName, block, diceResult, attribute) {
  console.log(`${charName} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${diceResult + attribute}`)
}

async function playRaceEngine(char1, char2) {
  for(let round = 1; round <= 5; round++) {
    console.log(`🏁 Rodada ${round}`)

    let block = await getRandomBlock()
    console.log(`Block: ${block}`)

    let diceResult1 = await rollDice()
    let diceResult2 = await rollDice()

    let totalTestSkill1 = 0
    let totalTestSkill2 = 0

    if (block == "RETA") {
      totalTestSkill1 = diceResult1 + char1.velocidade
      totalTestSkill2 = diceResult2 + char1.velocidade
      await logRollResult(char1.nome, "velocidade", diceResult1, char1.velocidade)
      await logRollResult(char2.nome, "velocidade", diceResult2, char2.velocidade)
    }

    if (block == "CURVA") {
      totalTestSkill1 = diceResult1 + char1.manobrabilidade
      totalTestSkill2 = diceResult2 + char1.manobrabilidade
      await logRollResult(char1.nome, "manobrabilidade", diceResult1, char1.manobrabilidade)
      await logRollResult(char2.nome, "manobrabilidade", diceResult2, char2.manobrabilidade)
    }

    if (block == "CONFRONTO") {
      let powerResult1 = diceResult1 + char1.poder
      let powerResult2 = diceResult2 + char2.poder

      console.log(`${char1.nome} confrontou com ${char2.nome}! 🥊`)

      await logRollResult(char1.nome, "poder", diceResult1, char1.poder)
      await logRollResult(char2.nome, "poder", diceResult2, char2.poder)

      if (powerResult1 > powerResult2 && char2.pontos > 0) {
        console.log(`${char1.nome} venceu o confronto! ${char2.nome} perdeu 1 ponto 🐢`)
        char2.pontos--
      }

      if (powerResult2 > powerResult1 && char1.pontos > 0) {
        console.log(`${char2.nome} venceu o confronto! ${char1.nome} perdeu 1 ponto 🐢`)
        char1.pontos--
      }

      console.log(powerResult2 === powerResult1 ? "Confronto empatado! Nenhum ponto foi perdido" : "")
    }

    if ( totalTestSkill1 > totalTestSkill2) {
      console.log(`${char1.nome} marcou um ponto`)
      char1.pontos++
    } else if (totalTestSkill2 > totalTestSkill1) {
      console.log(`${char2.nome} marcou um ponto`)
      char2.pontos++
    }

    console.log('================================')
  }
}

async function declareWinner(char1, char2) {
  console.log("Resultado final:")
  console.log(`${char1.nome}: ${char1.pontos} pontos(s)`)
  console.log(`${char2.nome}: ${char2.pontos} pontos(s)`)

  if (char1.pontos > char2.pontos) {
    console.log(`\n${char1.nome} venceu a corrida! Parabéns! 🏆`)
  } else if ( char2.pontos > char1.pontos ) {
    console.log(`\n${char2.nome} venceu a corrida! Parabéns! 🏆`)
  } else {
    console.log("A corrida terminou em empate")
  }
  
}

(async function main() {
  console.log(
    `🏁🚨 Corrida entre ${player1.nome} e ${player2.nome} começando... \n`
  )
  await playRaceEngine(player1, player2)
  await declareWinner(player1, player2)
})()
