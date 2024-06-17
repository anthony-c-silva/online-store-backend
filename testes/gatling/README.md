## 1- Instalar Gatling:

- Baixe Gatling do site oficial: [Gatling Downloads](https://gatling.io/download/).
- Extraia o arquivo zip em um diretório de sua escolha.

## 2- Configurar o Cenário de Teste:

- Crie um novo projeto de Gatling ou use o projeto de exemplo fornecido.
- Crie um novo script de simulação em `src/test/scala`.
  
Aqui está um exemplo de script de simulação para Gatling que simula a carga de 1000 usuários e aumenta gradualmente para 5000 usuários:
```scala
import io.gatling.core.Predef._
import io.gatling.http.Predef._
import scala.concurrent.duration._

class ScalabilityTest extends Simulation {

  val httpProtocol = http
    .baseUrl("http://localhost:3000") // URL base do sistema que você está testando
    .inferHtmlResources()
    .acceptHeader("application/json")

  val scn = scenario("Adicionar Produtos")
    .exec(
      http("Adicionar Produto")
        .post("/products")
        .header("Content-Type", "application/json")
        .body(StringBody("""{
            "name": "Produto ${counter}",
            "price": ${price},
            "description": "Descrição do produto ${counter}"
          }""")).asJson
        .check(status.is(201))
    )

  // Incrementar de 1000 para 5000 usuários gradualmente
  setUp(
    scn.inject(
      incrementUsersPerSec(10)
        .times(10)
        .eachLevelLasting(1 minute)
        .startingFrom(100 usersPerSec)
    ).protocols(httpProtocol)
  )
}

```
## 3- Executar o Teste:
  - Navegue até o diretório bin da sua instalação do Gatling.
  - Execute o script de simulação usando o comando:
```
./gatling.sh -s path.to.your.ScalabilityTest
```
Substitua path.to.your.ScalabilityTest pelo caminho do seu script de simulação, por exemplo, ScalabilityTest.

## 4- Analisar os Resultados:

- Após a execução do teste, Gatling gerará um relatório HTML na pasta `results`.
- Abra o relatório no navegador para visualizar detalhes como tempos de resposta, taxas de erro, throughput, etc.

## Dicas Adicionais:

- Ajuste os Parâmetros do Teste: Dependendo dos resultados iniciais, você pode ajustar os parâmetros do teste, como a taxa de incremento de usuários, o tempo de duração de cada nível, etc.
- Monitoramento de Recursos: Durante o teste, monitore os recursos do servidor (CPU, memória, I/O) para identificar possíveis gargalos.
- Script de Inicialização: Se necessário, você pode incluir um script de inicialização para preparar o ambiente de teste antes de iniciar o teste de carga.

## Ferramentas de Apoio:

- Grafana e Prometheus: Para monitorar em tempo real os recursos do sistema durante o teste.
- Docker: Se você estiver usando containers, o Docker pode ajudar a isolar o ambiente de teste.

## Conclusão:

Realizar um teste de escalabilidade envolve configurar um cenário de teste adequado, executar o teste e analisar os resultados para garantir que o sistema mantém o desempenho esperado sob carga crescente. Gatling oferece uma maneira eficiente e programática de definir e executar esses testes, proporcionando insights valiosos sobre a capacidade de escalabilidade do seu sistema.
