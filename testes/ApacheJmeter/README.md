# Configuração do Teste de Carregamento no Apache JMeter

## Instale o Apache JMeter:

1. Baixe e instale o Apache JMeter a partir do site oficial: Apache JMeter.

## Inicie o Apache JMeter:

1. Navegue até a pasta onde o JMeter foi instalado e execute o arquivo `jmeter.bat` (Windows) ou `jmeter.sh` (Linux/Mac).

## Configuração do Test Plan:

1. Abra o JMeter e crie um novo Test Plan.

## Adicionar um Thread Group:

1. Clique com o botão direito no **Test Plan** > **Add** > **Threads (Users)** > **Thread Group**.

### Configure o Thread Group:
- **Number of Threads (users)**: 1000
- **Ramp-Up Period (in seconds)**: 100 (ou um valor apropriado para evitar uma carga súbita)
- **Loop Count**: 1 (ou como desejado)

## Adicionar uma HTTP Request Defaults:

1. Clique com o botão direito no **Thread Group** > **Add** > **Config Element** > **HTTP Request Defaults**.
2. Configure o campo **Server Name or IP** com o endereço do servidor (por exemplo, `localhost` ou o IP do servidor).
3. Configure o campo **Port Number** se necessário (por exemplo, `3000`).
4. Configure o campo **Path** com `/products`.

## Adicionar uma HTTP Request:

1. Clique com o botão direito no **Thread Group** > **Add** > **Sampler** > **HTTP Request**.
2. Configure o campo **Path** com `/products`.

## Adicionar um Listener para monitorar resultados:

1. Clique com o botão direito no **Thread Group** > **Add** > **Listener** > **View Results in Table**.
2. Clique com o botão direito no **Thread Group** > **Add** > **Listener** > **Summary Report**.

## Executando o Teste de Carregamento

### Salvar o Test Plan:

1. Salve o Test Plan em um local desejado.

### Executar o Teste:

1. Clique no botão de play verde na barra de ferramentas para iniciar o teste.

## Verificando o Tempo de Resposta e a Taxa de Transferência

### Visualizar os Resultados:

1. Após a execução do teste, vá para o Listener **Summary Report** para verificar os resultados.
2. No **Summary Report**, você verá várias métricas importantes, incluindo:
   - **Throughput**: Medido em requests por segundo. Este valor mostra a taxa de transferência.
   - **Average**: O tempo de resposta médio para todas as requisições.
   - **Min**: O tempo de resposta mínimo.
   - **Max**: O tempo de resposta máximo.
   - **Std. Dev.**: O desvio padrão dos tempos de resposta.

### Exemplos de Resultados:

- **Average**: 2000 ms (2 segundos)
- **Throughput**: 50 requests/sec

## Considerações Finais

### Analisar os Resultados:

- Compare os resultados obtidos com os critérios de aceitação definidos anteriormente (ex., tempo de resposta médio < 2 segundos, throughput > 1000 requisições por minuto).
