# QUINTA

Versão moderna do treinador QUINTA, isolada na pasta \`quinta2/\` do mesmo repositório

## Acesso

Se o GitHub Pages estiver publicado a partir de \`main\` e da raiz do repositório:

https://100ratings.github.io/quinta/quinta2/

O aplicativo original continua em \`/quinta/\`

## Treinamento adaptativo pessoal, v2.1.0

- Aprende separadamente nos modos Fast Tap e Tradicional
- Depois de 8 respostas corretas, estima o ritmo pessoal usando a mediana das 48 respostas corretas mais recentes
- Respostas erradas aumentam sempre a dificuldade do número e da categoria, independentemente do tempo
- Acertos mais lentos que o ritmo habitual aumentam a dificuldade, enquanto acertos confortáveis diminuem
- Números difíceis são agendados para revisão após alguns outros exercícios, com uma probabilidade máxima de 38% para revisões disponíveis, preservando variedade
- Categorias Basic/Bounce + Esquerda/Direita recebem peso conforme dificuldades observadas
- Não depende dos antigos limiares fixos de 3 e 5 segundos
- Quando a voz do número é utilizada, o cronômetro começa ao fim da fala, com limite de segurança para navegadores que não disparam os eventos de voz
- A cada 100 acertos acumulados, interrompe o avanço e pergunta se deseja continuar ou encerrar por agora, sem reiniciar os acertos
- Dados do novo aprendizado ficam no armazenamento existente do QUINTA, mantendo os contadores e demais preferências

## Silêncios do Azure e início de voz, v2.2.3

O ZIP original gerado pelo Azure contém até ~150 ms de silêncio no início e tipicamente de 0,85 a 1,45 segundo no fim de cada gravação

O QUINTA agora analisa o áudio decodificado, descarta automaticamente os silêncios externos com margem de segurança, e encerra a reprodução após a palavra, permitindo que o cronômetro comece no fim efetivo da fala

A preparação do canal de saída acontece quando o usuário toca ou pressiona uma tecla, para reduzir a inicialização tardia do áudio no iPhone

Os áudios já importados continuam válidos, não sendo necessário substituir o pacote para usar esse comportamento com Web Audio

Para casos em que o iOS recorra ao reprodutor MP3 tradicional, também existe um ZIP separado de MP3s otimizados, sem os longos silêncios, que pode ser importado na mesma área de configurações

## Reprodução rápida, v2.2.2

Ao abrir o QUINTA, as 102 gravações previamente importadas são decodificadas em memória, em segundo plano, usando Web Audio

Quando o número aparece, a reprodução das gravações já preparadas começa no mesmo fluxo de atualização visual, sem criar um novo tocador de MP3 a cada resposta

- Não é necessário importar novamente o pacote de MP3s já salvo no IndexedDB
- O primeiro número pode usar o reprodutor anterior enquanto as gravações são preparadas
- Quando Web Audio não está disponível, usa a reprodução MP3 anterior e, em caso de falha, a voz nativa
- No iOS, é necessário ao menos um gesto para habilitar a reprodução, devido às restrições do Safari
- Não altera o momento em que o cronômetro inicia, que continua após a fala
- Não altera o intervalo de 350 ms do Fast Tap nem as estatísticas

## Voz Humberto do Azure, v2.2.0

A voz gravada é carregada localmente no navegador sem usar chave de API ou fazer solicitações ao Azure durante o treinamento

1. Gere e salve o ZIP com os números de 1 a 100, `errou.mp3` e `mensagem_100_acertos.mp3`
2. No QUINTA, abra **Configurações > Voz > Pacote de áudios Humberto**
3. Selecione o arquivo ZIP, a importação é feita uma única vez por dispositivo
4. O app armazena os arquivos MP3 no IndexedDB e passa a usar a opção **Azure Humberto (MP3)**

- Usa MP3s para números de 1 a 100, erros e a mensagem dos 100 acertos
- Números personalizados acima de 100 continuam funcionando com a voz nativa do dispositivo
- Permite alternar entre Azure Humberto, voz nativa e treinamento silencioso
- O cronômetro do número começa após a reprodução, com alternativa de segurança quando não há áudio
- Arquivos são locais a cada aparelho/navegador e podem ser removidos em Configurações
- A chave do Azure nunca é necessária no QUINTA
- O ZIP precisa conter os MP3s na raiz, no formato ZIP sem compressão (Stored)
- Safari/iOS pode bloquear o áudio inicial antes de um gesto, toque em **Novo número** para habilitar a reprodução
- O repositório contém o importador, não os MP3s privados, cada dispositivo precisa receber o ZIP uma vez

## Funcionalidades

- Interface responsiva monocromática, pensada primeiro para celular
- Fast Tap, toque no primeiro ou quinto objeto, ou use os botões Esquerda e Direita
- Modo Tradicional com Basic e Bounce
- Force fixo no segundo objeto da esquerda
- Português e inglês automáticos por idioma do dispositivo, com alteração manual
- Treinamento adaptativo pessoal por erros, tempo relativo, categorias e números individuais
- Voz sintetizada para números e erros, com seleção da voz do navegador
- Consulta de regras para qualquer inteiro positivo
- Atalhos, ajuda, estatísticas, marcos de 100 acertos
- Armazenamento próprio \`quinta2_settings_v1\`, sem afetar dados da versão original

## Tempos e regras

- Acerto no Fast Tap: próximo número em 350 ms
- Acerto no Tradicional: próximo número em 500 ms
- Erro: mostra o resultado e aguarda Novo número
- Número par: Basic
- Número ímpar: Bounce, usar N + 1 para a regra do lado
- Começar na esquerda quando o valor considerado for 0 ou 2 (mod 8), caso contrário começar na direita

## Atualização e cache busting

A versão local é comparada com \`version.json\` por requisição sem cache ao abrir, ao voltar para o aplicativo e a cada 60 segundos

O botão **Atualizar aplicativo** só fica habilitado se \`version.json\` indicar uma versão superior à instalada

Para lançar uma atualização futura, incrementar consistentemente **todos** os seguintes valores:

1. \`VERSION\` em \`app.js\`
2. Parâmetros \`?v=...\` de \`styles.css\` e \`app.js\` em \`index.html\`
3. Campo \`version\` em \`version.json\`

Publicar \`version.json\` por último para que usuários não recebam uma indicação de atualização antes dos novos arquivos estarem disponíveis

O botão atualiza a URL da página com parâmetros \`v\` e \`t\`, forçando um novo endereço de solicitação para o HTML e, com o número novo nos links, para os recursos

Não há Service Worker nesta versão

## Arquivos

- \`index.html\`: estrutura da interface
- \`styles.css\`: visual responsivo
- \`app.js\`: métodos, treinamento, tradução, voz e atualizações
- \`version.json\`: controle de versões
- \`site.webmanifest\`: instalação como aplicativo

## Integridade

O \`index.html\` original da raiz não é modificado
