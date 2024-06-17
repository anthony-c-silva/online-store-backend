# Passo 1: Configurar BlazeMeter

## Criar uma conta BlazeMeter:
Se você ainda não possui uma conta, crie uma em BlazeMeter.

# Passo 2: Criar um Script de Teste

## Usando JMeter para criar o script:

### Baixar e instalar o JMeter:
Baixe a versão mais recente do Apache JMeter.

### Criar um novo Test Plan:

1. Abra o JMeter.
2. Adicione um Thread Group:
   - Clique com o botão direito em **Test Plan** > **Add** > **Threads (Users)** > **Thread Group**.

### Configurar o Thread Group:

- Defina o número de **Threads (users)** como 2000.
- Defina o **Ramp-Up Period (em segundos)** como 300 (para distribuir a carga ao longo de 5 minutos).
- Defina **Loop Count** como 1 (para executar o teste apenas uma vez).

### Adicionar um HTTP Request:

1. Clique com o botão direito no **Thread Group** > **Add** > **Sampler** > **HTTP Request**.
2. Configure a requisição HTTP:
   - Nome ou IP do servidor: `localhost` (ou o endereço do servidor que você está testando).
   - Número da porta: `3000` (ou a porta que o servidor está usando).
   - Caminho: `/products`.

### Adicionar um Listener:

1. Adicione um **View Results Tree** listener para visualizar os resultados:
   - Clique com o botão direito no **Thread Group** > **Add** > **Listener** > **View Results Tree**.

### Salvar o Test Plan:
Salve o plano de teste para uso posterior.

# Passo 3: Importar e Executar o Teste no BlazeMeter

## Login no BlazeMeter:
Faça login na sua conta BlazeMeter.

### Criar um Novo Teste:

1. Clique em **Create Test**.
2. Escolha **JMeter Test** e carregue o script JMeter que você criou.

### Configurar o Teste:

- Defina o número de usuários para 2000.
- Defina a duração do teste para 5 minutos.
- Configure os servidores de teste conforme necessário.

### Executar o Teste:
Inicie o teste e aguarde a execução.

# Passo 4: Analisar os Resultados

## Taxa de Erro:
Verifique a taxa de erro durante o pico de usuários.

- No BlazeMeter, você pode ver a taxa de erro nas métricas de resultado.
- Verifique a quantidade de respostas com status HTTP 4xx e 5xx.

## Comportamento do Sistema:
Analise como o sistema se comporta sob a carga:

- Verifique os tempos de resposta médios e máximos.
- Observe qualquer instabilidade ou falhas no sistema.
- Verifique os logs do servidor para erros ou problemas.

# Dicas Adicionais

## Escalabilidade:
Certifique-se de que o servidor que você está testando pode suportar a carga simulada de 2000 usuários.

## Monitoramento:
Use ferramentas de monitoramento do servidor para observar o uso de CPU, memória, e outros recursos durante o teste.

## Testes Repetidos:
Considere executar o teste várias vezes para obter dados consistentes.

Essa abordagem permite que você simule um pico de usuários acessando a rota `/products` por um curto período, monitorando a estabilidade e a taxa de erro do sistema.
