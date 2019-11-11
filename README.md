# WAOCompareData

Dado utilizados para comparação entre dois algoritmos WebAssembly.

## Indivíduos

O indivíduo denominado "original" foi desenvolvido para experimentação do algoritmo otimizador [WebAssembly Optimizer](https://github.com/fabiomd/TCC/blob/master/README.md)

O indivíduo denominado "bestIndividual" foi gerado pelo algoritmo otimizador.

## Testes

O teste é responsável por executar o algoritmo selecionado, utilizando um dos conjuntos de dados fornecidos.

## Comando

Para realização dos teste foi utilizado o seguinte formato de comando:

```
n use 8.0.0 --expose-wasm experimentCollector.js {algorithm}.wasm {data}.txt {numberOfAvaliations}
```
