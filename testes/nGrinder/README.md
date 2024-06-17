# Configuração do Teste de Resistência no nGrinder

## Passo 1: Instalar e Configurar nGrinder

### Instalar nGrinder:
Baixe e instale nGrinder a partir do site oficial: nGrinder.

### Iniciar o Controlador nGrinder:
Execute o controlador nGrinder, que é o ponto central de controle para todos os testes de carga.

### Configurar o Controlador:
Acesse o painel de controle do nGrinder através do navegador e configure o controlador com os agentes que serão utilizados para gerar a carga.

## Passo 2: Criar um Script de Teste
### Criar um Script de Teste:
No painel do nGrinder, crie um novo script de teste. Aqui está um exemplo de script em Groovy para o seu teste:
```groovy
import static net.grinder.script.Grinder.grinder
import static org.hamcrest.Matchers.is
import static org.junit.Assert.assertThat

import net.grinder.plugin.http.HTTPPluginControl
import net.grinder.plugin.http.HTTPRequest
import net.grinder.plugin.http.HTTPResponse
import net.grinder.script.GTest
import net.grinder.script.Grinder
import net.grinder.script.Test
import HTTPClient.NVPair

public class TestRunner {

    public static GTest test
    public static HTTPRequest request

    static {
        test = new GTest(1, "Test Products API")
        request = new HTTPRequest()
        test.record(request)
        HTTPPluginControl.getConnectionDefaults().setTimeout(60000)
    }

    public void test() {
        HTTPResponse result = request.GET("http://localhost:3000/products")
        assertThat(result.getStatusCode(), is(200))
    }
}
```
### Configurar o Script:
- Configure o script para ser executado por 500 usuários continuamente por 1 hora.
- Configure os parâmetros de teste no nGrinder para 500 usuários e 1 hora de duração.
## Passo 3: Executar o Teste

### Executar o Teste:
- Inicie o teste a partir do painel de controle do nGrinder.
- Observe os gráficos em tempo real no painel para ter uma visão geral do desempenho durante o teste.
  
### Monitoramento da Estabilidade
Para monitorar a estabilidade durante o teste, você pode usar as seguintes abordagens:

- Relatórios de nGrinder:
  - nGrinder fornece gráficos em tempo real e relatórios detalhados pós-teste que incluem métricas como tempo de resposta, taxa de erro e throughput.
  - No painel do nGrinder, você poderá visualizar a taxa de sucesso/falha das requisições e o tempo de resposta médio.

- Logs de Aplicações:
  - Verifique os logs da aplicação para identificar qualquer erro ou exceção que ocorra durante o teste.

## Monitoramento da Utilização de Recursos
Para monitorar a utilização de recursos do servidor (CPU, memória, etc.), você pode usar ferramentas de monitoramento de sistema.

## Conclusão
Para um teste de resistência usando nGrinder, você configurará nGrinder para simular 500 usuários acessando a rota `/products` continuamente por 1 hora. A estabilidade será monitorada através dos relatórios e gráficos fornecidos pelo nGrinder, e a utilização de recursos será monitorada utilizando ferramentas como `htop`, `Task Manager`, ou uma solução mais avançada como Prometheus e Grafana.

## Exemplo de Saída de nGrinder
Após executar o teste, o nGrinder fornecerá um relatório detalhado que incluirá informações como:

- **Tempo de Resposta Médio**: O tempo médio que o servidor leva para responder a uma requisição.
- **Taxa de Sucesso/Falha**: A porcentagem de requisições que foram bem-sucedidas versus aquelas que falharam.
- **Throughput**: O número de requisições por segundo que o servidor é capaz de processar.

### Relatório de nGrinder

```plaintext
+-------------------+--------+--------+-----------+-------+---------+--------+-------+-------+-------+
| Test Description  | Avg (ms)| Min (ms)| Max (ms)  | Errors| TPS     | Bytes/s| RPS   | RT    | FR  |
+-------------------+--------+--------+-----------+-------+---------+--------+-------+-------+-------+
| /products         | 2000   | 500    | 5000      | 0.1%  | 50      | 500    | 1000  | 10    | 0.5   |
+-------------------+--------+--------+-----------+-------+---------+--------+-------+-------+-------+
```

- **Avg (ms)**: Tempo de resposta médio em milissegundos.
- **Min (ms)**: Tempo de resposta mínimo.
- **Max (ms)**: Tempo de resposta máximo.
- **Errors**: Percentual de erros.
- **TPS**: Throughput em transações por segundo.
- **Bytes/s**: Taxa de transferência em bytes por segundo.

Ao analisar essas métricas e utilizar ferramentas adicionais para monitorar a utilização de recursos, você poderá avaliar a estabilidade e a utilização de recursos do seu sistema durante o teste de resistência.
