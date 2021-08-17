// proceso hijo
let random_generados = {}
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

process.on('message', cant => {
    console.log(`mensaje del padre ${cant}`);

  for (let i = 0; i < cant ; i++){
    let num = getRandom(1,1000)
    random_generados[num] ? random_generados[num]++ : random_generados[num] = 1;
  }
    //console.log(random_generados)
    process.send(random_generados);
});