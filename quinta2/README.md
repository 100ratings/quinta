# QUINTA 2

Versão moderna do treinador QUINTA, isolada na pasta \`quinta2/\` do mesmo repositório

## Acesso

Se o GitHub Pages estiver publicado a partir de \`main\` e da raiz do repositório:

https://100ratings.github.io/quinta/quinta2/

O aplicativo original continua em \`/quinta/\`

## Funcionalidades

- Interface responsiva monocromática, pensada primeiro para celular
- Fast Tap, toque no primeiro ou quinto objeto, ou use os botões Esquerda e Direita
- Modo Tradicional com Basic e Bounce
- Force fixo no segundo objeto da esquerda
- Português e inglês automáticos por idioma do dispositivo, com alteração manual
- Treinamento adaptativo por categorias, limites de tempo configuráveis
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
