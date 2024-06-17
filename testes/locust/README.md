# Configuração do Teste de Resistência no Locust

## Passo 1: Instalar Locust

### Instalar Locust:
Execute o seguinte comando para instalar Locust:
  ```
  pip install locust
  ```
## Passo 2: Criar um Script Locust
Criar um Script de Teste:
Crie um arquivo chamado locustfile.py e adicione o seguinte código:
```
from locust import HttpUser, task, between

class MyUser(HttpUser):
    wait_time = between(1, 5)

    @task
    def get_products(self):
        self.client.get("/products")
```
Este script define um usuário que acessa a rota /products com um intervalo de espera entre 1 a 5 segundos entre as requisições.

## Passo 3: Configurar e Executar Locust
Executar Locust:
Execute o Locust com o comando:
```
locust -f locustfile.py --headless -u 500 -r 10 --run-time 1h --host http://localhost:3000
```
### Parâmetros usados:
- -f locustfile.py: Especifica o arquivo de teste.
- --headless: Executa o teste sem a interface web.
- -u 500: Define o número de usuários.
- -r 10: Define a taxa de aumento de usuários (10 por segundo).
- --run-time 1h: Define a duração do teste (1 hora).
- --host http://localhost:3000: Define o host a ser testado.
  
### Monitoramento da Estabilidade
Para monitorar a estabilidade durante o teste, observe os seguintes aspectos:

- Taxa de Erro: Locust mostrará a taxa de erro diretamente na saída do terminal. Uma baixa taxa de erro é um indicativo de estabilidade.
- Tempo de Resposta: Locust também mostrará os tempos de resposta médios e percentis, que são indicadores importantes de estabilidade.

### Monitoramento da Utilização de Recursos

Para monitorar a utilização de recursos do servidor (CPU, memória, etc.), você pode usar ferramentas de monitoramento de sistema.

## Conclusão

Para um teste de resistência usando Locust, você configurará Locust para simular 500 usuários 
acessando a rota /products continuamente por 1 hora. Você monitorará a estabilidade através das 
métricas fornecidas pelo próprio Locust, como a taxa de erro e o tempo de resposta. Para monitorar 
a utilização de recursos do servidor, você pode usar ferramentas como htop, Task Manager, ou configurar 
um sistema de monitoramento mais avançado com Prometheus e Grafana.

## Exemplo de Saída de Locust

Após executar o teste, você verá algo parecido com isto na saída do terminal:

```
 Name                                                  # reqs      # fails  |     Avg     Min     Max  Median  |   req/s  failures/s
--------------------------------------------------------------------------------------------------------------------------------------------
 GET /products                                         180000     200 (0.11%) |     100      30     500     100  |   50.00    0.056
--------------------------------------------------------------------------------------------------------------------------------------------
 Aggregated                                            180000     200 (0.11%) |     100      30     500     100  |   50.00    0.056
```

- #. reqs: Número total de requisições.
- #. fails: Número de falhas.
- Avg: Tempo de resposta médio.
- req/s: Requisições por segundo.

  Ao analisar essas métricas, você poderá avaliar a estabilidade e a utilização de recursos durante o teste de resistência.

