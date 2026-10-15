# PRD — Doceria M&J: Backend

**Versão:** 1.2
**Data:** 15/10/2026
**Status:** escopo, tecnologias, hospedagem e autenticação definidos pelo proprietário. Restam as decisões da seção 11.3.

**Repositórios:**

- **Frontend (site):** https://github.com/joao-vitor-santosz/doceria-m-j
- **Backend (API):** repositório próprio, separado do site. Este documento é a especificação de partida dele.

Este documento é autossuficiente: as regras de negócio, as estruturas de dados e os formatos usados pelo site estão reproduzidos aqui (seções 5 e 13), para que o backend possa ser desenvolvido sem depender da leitura do código do frontend.

---

## 1. Visão geral

A Doceria M&J é uma marca de doces artesanais. O site atual é uma vitrine digital com cardápio, detalhes dos produtos, carrinho e finalização de pedidos pelo WhatsApp, tudo funcionando **sem backend**.

O backend deve permitir que o site evolua para um canal de vendas com contas de clientes, pedidos registrados e gestão pela doceria.

O backend deve **se integrar ao site existente**, sem exigir a reconstrução das telas que já funcionam.

---

## 2. Estado atual do site

### 2.1. Tecnologias do frontend

- React 19, TypeScript, Vite 8, Tailwind CSS 4 e TanStack Router.
- Site estático (SPA), sem servidor próprio, a ser hospedado na Vercel.

### 2.2. Funcionalidades existentes

| Área | Situação atual | Rota |
|---|---|---|
| Página inicial | Logo, slogan, links para cardápio, WhatsApp e Instagram | `/` |
| Cardápio | Categorias, busca e filtros | `/menu` |
| Detalhe do produto | Foto, descrição, preço, escolha de sabores/complemento, observação, quantidade | `/menu/produtos/$productId` |
| Informações | Horário, formas de pagamento, contato | `/informacoes` |
| Carrinho | Itens salvos no navegador (`localStorage`), ajuste de quantidade, remoção, subtotal | `/carrinho` |
| Finalização | Nome, celular, retirada ou delivery, endereço com ViaCEP, envio por WhatsApp | `/carrinho/finalizar` |
| Login/cadastro | **Somente a tela**, sem funcionamento. Já possui os campos nome, e-mail e senha | `/entrar` |

### 2.3. Onde estão os dados hoje (no repositório do frontend)

| Dado | Local |
|---|---|
| Produtos, preços, categorias e opções | `src/data/catalog.ts` (fixo no código) |
| Horário e formas de pagamento | `src/config/store.ts` |
| WhatsApp e redes sociais | `src/config/site.ts` |
| Carrinho | `localStorage` do navegador do cliente |
| Pedidos | Não são registrados; existem apenas como mensagem no WhatsApp |
| Clientes | Não são registrados |

### 2.4. Limitações que o backend resolve

- A doceria não tem registro dos pedidos fora do WhatsApp.
- O cliente precisa digitar seus dados e endereço a cada pedido.
- O cliente não consegue acompanhar seus pedidos.
- Alterar preço, disponibilidade ou foto exige mudar o código e publicar o site.
- A tela de login existe, mas não funciona.

---

## 3. Objetivos do backend

### Objetivos principais

1. Permitir que o cliente crie uma conta e faça login.
2. Exigir login para finalizar um pedido.
3. Registrar cada pedido no servidor, com preços validados pelo servidor.
4. Permitir que a doceria visualize e atualize o status dos pedidos.
5. Permitir que o cliente consulte o histórico e o status dos seus pedidos.

### Objetivos secundários

1. Salvar os dados do cliente (celular e endereços) para agilizar novos pedidos.
2. Permitir que a doceria gerencie o cardápio (preço, disponibilidade, fotos) sem alterar o código.

### Fora do escopo

- Login com Google ou outras redes sociais.
- Pagamento automático (Pix integrado com confirmação automática).
- Cálculo automático da taxa de entrega.
- Promoções, cupons e programa de fidelidade.
- CRM e integração com redes sociais.
- Aplicativo móvel nativo.

---

## 4. Usuários

| Perfil | Necessidades |
|---|---|
| **Cliente** | Fazer pedidos rapidamente pelo celular, não redigitar dados, acompanhar o pedido. |
| **Doceria (administração)** | Ver pedidos recebidos, confirmar, atualizar status, ajustar o cardápio. Hoje são os dois proprietários. |

---

## 5. Regras de negócio

### 5.1. Produtos

| Produto | Preço | Opções |
|---|---|---|
| Brownie Simples | R$ 8,00 | Sem opções |
| Brownie de Brigadeiro, de Ninho e Casadinho | R$ 15,00 | Um complemento: Nenhum (padrão), Morango ou KitKat, sem alterar o preço |
| Quarteto Brigadeiro | R$ 12,00 | Exatamente 4 brigadeiros, sabores repetíveis: Brigadeiro, Ninho, Casadinho, Beijinho |
| Cento de Brigadeiros | R$ 180,00 | Exatamente 100 brigadeiros, divididos entre os mesmos sabores |

Os identificadores e a estrutura completa do cardápio estão na seção 13.1.

### 5.2. Pedido

- Formas de recebimento: **retirada** ou **delivery**.
- Na retirada, o endereço da doceria é enviado ao cliente pelo WhatsApp e **nunca é exibido no site nem retornado pela API**.
- Taxa de entrega: combinada pelo WhatsApp; não é calculada no site. A doceria registra o valor combinado no painel.
- Pedido mínimo: não há.
- Pagamento: apenas Pix; a chave é enviada pela doceria depois, pelo WhatsApp.
- Horário de funcionamento: segunda a sábado, das 15h às 18h30.
- WhatsApp da doceria: (69) 99264-4083.

### 5.3. Regras que o backend deve garantir

- **O preço é sempre calculado pelo servidor**, a partir do cardápio armazenado no banco. Preços enviados pelo navegador são ignorados.
- O servidor valida as escolhas de cada item (ex.: o Quarteto precisa ter exatamente 4 brigadeiros; o Brownie Simples não aceita complemento; opções inexistentes são recusadas).
- Produtos e opções indisponíveis não podem ser pedidos.
- O pedido guarda uma **cópia** do nome, do preço e das escolhas de cada item no momento da compra, para que mudanças futuras no cardápio não alterem pedidos antigos.

---

## 6. Escopo funcional

### Fase 1 — Contas e pedidos

#### 6.1. Autenticação

- **Cadastro:** nome, e-mail e senha.
- **Login:** e-mail e senha.
- O e-mail é único (sem diferenciar maiúsculas de minúsculas) e guardado em minúsculas.
- Senha com no mínimo 8 caracteres, armazenada apenas como hash **bcrypt**.
- Sessão por **JWT**, com expiração.
- Logout.
- Limite de tentativas de login.
- Recuperação de senha por e-mail: **pendente** (seção 11.3, decisão 5).
- Mensagens de erro de login genéricas ("e-mail ou senha incorretos"), sem revelar se o e-mail existe.

#### 6.2. Perfil do cliente

- Ver e editar nome.
- **Celular:** não é pedido no cadastro. É informado na finalização do primeiro pedido, salvo na conta e reaproveitado nos pedidos seguintes. É obrigatório para pedir, pois a doceria confirma o pedido pelo WhatsApp.
- Salvar um ou mais endereços de entrega (CEP, rua, número, complemento, bairro, cidade, ponto de referência).
- Escolher um endereço salvo na finalização do pedido.
- Excluir a própria conta (seção 10.2).

#### 6.3. Pedidos (cliente)

- Ao finalizar, o pedido é **registrado no servidor** antes de abrir o WhatsApp.
- O pedido recebe um **número sequencial** (ex.: `#0042`), incluído na mensagem do WhatsApp.
- O WhatsApp continua sendo o canal de confirmação, de combinação da taxa de entrega e de envio da chave Pix.
- Histórico de pedidos com data, itens, total e status.

#### 6.4. Pedidos (doceria)

- Lista de pedidos, com os mais recentes primeiro e filtro por status.
- Detalhe do pedido: itens, escolhas, observações, cliente (nome, e-mail, celular), forma de recebimento, endereço.
- Atualização de status (seção 8), com registro de data e responsável.
- Registro da taxa de entrega combinada; o total final é recalculado.
- Acesso restrito a usuários com papel `admin`.

#### 6.5. Cardápio no banco (necessário já na Fase 1)

Para validar e calcular preços, o servidor precisa conhecer o cardápio. Na Fase 1:

- O cardápio da seção 13.1 é carregado no banco por um **seed** do Prisma, mantendo os mesmos identificadores do site.
- A API oferece a leitura do cardápio (somente leitura).
- O site continua usando o próprio arquivo `catalog.ts` para exibir o cardápio; os identificadores precisam ser iguais nos dois lados.

### Fase 2 — Gestão do cardápio

- Cadastro e edição de produtos pelo painel: nome, descrição, preço, categoria, opções.
- Marcar produto ou opção como indisponível.
- Envio e troca de fotos dos produtos (armazenamento externo, seção 11.2).
- O site passa a ler o cardápio da API em vez de `src/data/catalog.ts`.
- Edição de horário e formas de pagamento.

### Fase 3 — Evoluções futuras (não detalhadas)

- Pagamento Pix com confirmação automática.
- Taxa de entrega por bairro (tabela definida pela doceria, usando o bairro retornado pelo ViaCEP).
- Promoções e cupons.
- Notificações ao cliente sobre mudança de status.
- CRM.

---

## 7. Fluxo do pedido (Fase 1)

1. O cliente monta o carrinho (continua salvo no navegador, como hoje).
2. Ao tocar em "Finalizar pedido", se não estiver logado, é direcionado ao login/cadastro e depois volta à finalização com o carrinho intacto.
3. Nome, celular e endereços salvos são preenchidos a partir da conta. No primeiro pedido, o cliente informa o celular, que é salvo.
4. O cliente escolhe retirada ou delivery e confirma.
5. O site envia à API os itens (produto, quantidade, escolhas, observação), a forma de recebimento, o endereço (salvo ou novo) e o celular.
6. O servidor valida tudo, recalcula os preços, registra o pedido com status **Recebido** e devolve o número, os itens e o total.
7. O site abre o WhatsApp com a mensagem pronta (seção 13.3), incluindo o número do pedido, e esvazia o carrinho.
8. A doceria confirma pelo WhatsApp, combina a taxa de entrega, envia a chave Pix e atualiza o status no painel.

**Falhas:**

- Se a API não responder, o cliente vê uma mensagem clara, pode tentar de novo e tem a opção de falar diretamente pelo WhatsApp.
- Se o servidor recusar algum item (produto indisponível, escolha inválida), a resposta indica qual item foi afetado e por quê.

---

## 8. Status do pedido

| Status | Significado |
|---|---|
| Recebido | Pedido registrado no site, aguardando confirmação da doceria |
| Confirmado | Doceria confirmou pelo WhatsApp (taxa e pagamento combinados) |
| Em preparo | Doces sendo preparados |
| Pronto para retirada / Saiu para entrega | Conforme a forma de recebimento |
| Concluído | Entregue ou retirado |
| Cancelado | Cancelado pela doceria ou a pedido do cliente |

---

## 9. Modelo de dados (conceitual)

Os nomes são ilustrativos; a modelagem final será feita no schema do Prisma.

| Entidade | Principais campos |
|---|---|
| **Usuário** | id, nome, e-mail (único), hash da senha, celular (opcional até o primeiro pedido), papel (`cliente` ou `admin`), datas de criação e atualização |
| **Endereço** | id, usuário, CEP, rua, número, complemento, bairro, cidade, referência |
| **Categoria** | id, nome, descrição, ordem |
| **Produto** | id, categoria, nome, descrição, preço, foto, disponível, ordem |
| **Grupo de opções** | id, produto, título, título do resumo, modo de seleção (`single`, `multiple`, `quantity`), mínimo, máximo, obrigatório, opção padrão |
| **Opção** | id, grupo, nome, descrição, preço adicional, disponível |
| **Pedido** | id, número sequencial, usuário, status, forma de recebimento, nome e celular do cliente (cópia), endereço (cópia), subtotal, taxa de entrega, total, data |
| **Item do pedido** | id, pedido, produto, nome (cópia), preço unitário (cópia), quantidade, escolhas (cópia), observação |
| **Histórico de status** | id, pedido, status, data, responsável |

Valores monetários devem ser armazenados em **centavos (inteiro)** ou como `Decimal`, nunca como ponto flutuante.

---

## 10. Requisitos não funcionais

### 10.1. Segurança

- Senhas armazenadas apenas com hash **bcrypt**.
- Tokens **JWT** assinados com segredo forte e com tempo de expiração.
- Toda comunicação por HTTPS.
- CORS liberado apenas para o domínio do site.
- Rotas administrativas protegidas por papel (`admin`).
- O cliente só acessa os próprios pedidos, endereços e dados.
- Limite de tentativas de login.
- Validação de todos os dados no servidor (corpo, parâmetros e query), independentemente da validação do site.
- Segredos fora do código (variáveis de ambiente).
- O hash da senha nunca é retornado pela API.

### 10.2. Privacidade (LGPD)

O backend passará a armazenar dados pessoais (nome, e-mail, celular, endereço). É necessário:

- Política de privacidade publicada no site, explicando quais dados são coletados e por quê.
- Coletar apenas os dados necessários para o pedido.
- Permitir que o cliente exclua a própria conta e seus dados pessoais. Os pedidos podem ser mantidos para controle da doceria, sem vínculo com dados pessoais.
- Não exibir dados de clientes fora do painel administrativo.

### 10.3. Desempenho e custo

- Volume esperado baixo (doceria artesanal local). A solução deve priorizar **custo baixo e manutenção simples**, preferencialmente dentro dos planos gratuitos da Vercel e do Supabase.
- Respostas da API em menos de 1 segundo em condições normais.

### 10.4. Disponibilidade

- Se a API estiver indisponível, o cardápio do site continua visível, pois ainda é lido do próprio site na Fase 1.

### 10.5. Manutenção

- Código em TypeScript.
- Documentação da API gerada automaticamente (Swagger/OpenAPI), exibida com **Scalar**.
- README com instruções para rodar localmente, aplicar migrações, rodar o seed e publicar.
- Ambientes separados de desenvolvimento e produção.

---

## 11. Arquitetura e decisões

### 11.1. Decisões tomadas

| Tema | Decisão |
|---|---|
| Escopo | Propostas deste documento aprovadas (Fases 1 a 3, status da seção 8) |
| Repositório | Backend em **repositório próprio**, separado do site |
| Backend | **Node.js**, **TypeScript** e **Fastify** |
| Banco de dados | **PostgreSQL** hospedado no **Supabase**, acessado pelo **Prisma** (ORM, migrações e seed) |
| Uso do Supabase | Apenas como banco PostgreSQL e interface gráfica para consultar os dados. Autenticação e regras de negócio ficam no backend próprio (não usar Supabase Auth) |
| Autenticação | Cadastro com **nome, e-mail e senha**; login com e-mail e senha; **JWT** emitido pelo backend; senhas com **bcrypt** |
| Login | **Obrigatório** para finalizar pedidos |
| Documentação da API | **Swagger/OpenAPI**, exibido com **Scalar** |
| Hospedagem | **Vercel** (site e API) |

### 11.2. Observações técnicas

- **Fastify na Vercel:** a API roda como função serverless. Não há processo sempre ativo; tarefas em segundo plano e conexões permanentes não estão disponíveis.
- **Conexões com o banco:** funções serverless abrem muitas conexões. O Prisma deve usar o **pooler de conexões do Supabase** na aplicação (`DATABASE_URL`) e a conexão direta apenas para migrações (`DIRECT_URL`).
- **Fotos dos produtos (Fase 2):** a Vercel não guarda arquivos enviados. As fotos precisarão de armazenamento externo, como Supabase Storage ou Vercel Blob.
- **Variáveis de ambiente previstas:** `DATABASE_URL`, `DIRECT_URL`, `JWT_SECRET`, `JWT_EXPIRES_IN`, `CORS_ORIGIN` e, se adotado, as credenciais do serviço de e-mail.

### 11.3. Decisões pendentes

| # | Decisão | Opções a considerar |
|---|---|---|
| 1 | **Painel administrativo** | Dentro do site (rota protegida, ex.: `/admin`) ou em um site separado |
| 2 | **Criação da conta de administrador** | Por script (seed) ou alterando o papel do usuário manualmente pelo Supabase |
| 3 | **Onde guardar o JWT no navegador** | Cookie `httpOnly` (mais seguro; com site e API em domínios diferentes exige CORS com credenciais e cookie `SameSite=None; Secure`, ou um domínio próprio compartilhado) ou `localStorage` com cabeçalho `Authorization` (mais simples, mais exposto a scripts maliciosos) |
| 4 | **Domínio** | Endereço do site e da API (ex.: `doceriamj.com.br` e `api.doceriamj.com.br`). Um domínio próprio compartilhado facilita o uso de cookies |
| 5 | **Recuperação de senha** | Por e-mail, com link de redefinição (exige um serviço de envio, ex.: Resend ou SendGrid, ambos com plano gratuito) ou manual, pela doceria via WhatsApp, na Fase 1 |
| 6 | **Confirmação do e-mail no cadastro** | Exigir confirmação por link (depende do serviço de e-mail) ou não exigir na Fase 1 |
| 7 | **Carrinho** | Manter só no navegador ou também salvar na conta do cliente |
| 8 | **Fase 2 junto com a Fase 1** | Fazer a gestão do cardápio agora ou depois |

---

## 12. Integração com o site

### 12.1. Endpoints sugeridos (Fase 1)

Sugestão inicial; os caminhos finais serão definidos na implementação e documentados no Scalar.

| Método | Caminho | Acesso | Função |
|---|---|---|---|
| POST | `/auth/register` | Público | Cadastro (nome, e-mail, senha) |
| POST | `/auth/login` | Público | Login (e-mail, senha) |
| POST | `/auth/logout` | Cliente | Logout |
| GET | `/me` | Cliente | Dados da conta |
| PATCH | `/me` | Cliente | Editar nome e celular |
| DELETE | `/me` | Cliente | Excluir conta |
| GET / POST | `/me/addresses` | Cliente | Listar e criar endereços |
| PATCH / DELETE | `/me/addresses/:id` | Cliente | Editar e excluir endereço |
| GET | `/catalog` | Público | Categorias, produtos e opções |
| POST | `/orders` | Cliente | Criar pedido |
| GET | `/orders` | Cliente | Meus pedidos |
| GET | `/orders/:id` | Cliente | Detalhe de um pedido meu |
| GET | `/admin/orders` | Admin | Listar pedidos, com filtro por status |
| GET | `/admin/orders/:id` | Admin | Detalhe do pedido |
| PATCH | `/admin/orders/:id` | Admin | Alterar status e registrar taxa de entrega |

### 12.2. Mudanças previstas no site

| Tela | Mudança |
|---|---|
| `/entrar` | Passa a funcionar. Mantém os campos de nome, e-mail e senha; o botão "Continuar com Google" é removido |
| `/carrinho/finalizar` | Exige login, preenche nome, celular e endereços da conta e registra o pedido antes de abrir o WhatsApp |
| Mensagem do WhatsApp | Inclui o número do pedido |
| Menu inferior | "Entrar" passa a mostrar a conta do cliente quando logado |
| Novas telas | Minha conta, endereços, meus pedidos e painel administrativo |
| Cardápio (Fase 2) | Lê os produtos da API em vez de `src/data/catalog.ts` |

---

## 13. Referências do site atual

### 13.1. Cardápio e identificadores

Os identificadores abaixo são usados pelo site e devem ser mantidos no seed do banco.

**Categorias:** `brownies` (Brownies), `brigadeiros` (Brigadeiros).

| `id` do produto | Nome | Categoria | Preço | Grupos de opções |
|---|---|---|---|---|
| `brownie-brigadeiro` | Brownie de Brigadeiro | `brownies` | 15,00 | `brownie-add-ons` |
| `brownie-simples` | Brownie Simples | `brownies` | 8,00 | — |
| `brownie-ninho` | Brownie de Ninho | `brownies` | 15,00 | `brownie-add-ons` |
| `brownie-casadinho` | Brownie Casadinho | `brownies` | 15,00 | `brownie-add-ons` |
| `quarteto-brigadeiro` | Quarteto Brigadeiro | `brigadeiros` | 12,00 | `brigadeiro-box-flavors` |
| `brigadeiro-festa` | Cento de Brigadeiros para Festa | `brigadeiros` | 180,00 | `brigadeiro-party-flavors` |

| `id` do grupo | Título do resumo | Modo | Regras | Opções (`id`: nome) |
|---|---|---|---|---|
| `brownie-add-ons` | Complemento | `single` | Obrigatório; padrão `none` | `none`: Nenhum; `strawberry`: Morango; `kit-kat`: KitKat (todas sem custo adicional) |
| `brigadeiro-box-flavors` | Sabores | `quantity` | Mínimo e máximo 4 | `brigadeiro`: Brigadeiro; `ninho`: Ninho; `casadinho`: Casadinho; `beijinho`: Beijinho |
| `brigadeiro-party-flavors` | Sabores | `quantity` | Mínimo e máximo 100 | Mesmos sabores do grupo anterior |

Estrutura usada no site (`src/data/catalog.ts`):

```ts
type ProductOption = {
  id: string;
  label: string;
  description?: string;
  price: number; // preço adicional em reais
};

type ProductOptionGroup = {
  id: string;
  title: string;
  summaryTitle?: string;
  description?: string;
  required?: boolean;
  selectionMode: "single" | "multiple" | "quantity";
  minimumQuantity?: number;
  maximumQuantity?: number;
  quantityStep?: number; // apenas interface
  defaultOptionId?: string;
  options: readonly ProductOption[];
};

type Product = {
  id: string;
  name: string;
  description: string;
  price: number; // em reais
  categoryId: "brownies" | "brigadeiros";
  imageSrc?: string;
  customizationGroups?: readonly ProductOptionGroup[];
};
```

**Regras de validação das escolhas** (já aplicadas no site, devem ser repetidas no servidor):

- `quantity`: a soma das quantidades do grupo deve estar entre `minimumQuantity` e `maximumQuantity`.
- `single` ou `multiple` com `required`: ao menos uma opção selecionada; em `single`, no máximo uma.
- Preço unitário do item = preço do produto + soma de (preço da opção × quantidade da opção).

### 13.2. Item do carrinho enviado pelo site

O carrinho do site representa cada item assim, e este formato pode ser usado no corpo de `POST /orders`:

```ts
type CartItem = {
  productId: string;
  quantity: number; // inteiro, mínimo 1
  // chave "idDoGrupo:idDaOpcao" -> quantidade escolhida
  optionQuantities: Record<string, number>;
  note: string; // observação, até 180 caracteres
};
```

Exemplo de um Quarteto com 2 Ninho e 2 Beijinho:

```json
{
  "productId": "quarteto-brigadeiro",
  "quantity": 1,
  "optionQuantities": {
    "brigadeiro-box-flavors:ninho": 2,
    "brigadeiro-box-flavors:beijinho": 2
  },
  "note": ""
}
```

Dados de endereço usados hoje na finalização: `cep`, `street`, `number`, `complement`, `neighborhood`, `city`, `reference`. Forma de recebimento: `pickup` ou `delivery`.

### 13.3. Mensagem do WhatsApp

Formato atual, gerado pelo site. Com o backend, acrescenta-se o número do pedido no início.

```
Olá, Doceria M&J! Gostaria de fazer um pedido:

*Itens*
3x Brownie de Ninho - R$ 45,00
   Complemento: Morango
   Obs.: sem calda
1x Quarteto Brigadeiro - R$ 12,00
   Sabores: 2x Ninho, 2x Beijinho

*Subtotal:* R$ 57,00
*Entrega:* Delivery (taxa de entrega a combinar)
*Pagamento:* Pix

*Cliente*
Nome: Maria
Telefone: (69) 99999-0000

*Endereço de entrega*
Rua X, 12
Centro - Porto Velho - RO
CEP: 76801-059
Referência: Perto da praça
```

---

## 14. Critérios de aceite da Fase 1

- O cliente consegue se cadastrar com nome, e-mail e senha, entrar e sair.
- Não é possível criar duas contas com o mesmo e-mail.
- O cliente não consegue finalizar um pedido sem estar logado.
- O celular informado no primeiro pedido fica salvo na conta.
- Ao finalizar, o pedido aparece no painel da doceria com status **Recebido**.
- A mensagem do WhatsApp contém o número do pedido.
- O total registrado é calculado pelo servidor e confere com o cardápio.
- Um pedido com escolhas inválidas, produto inexistente ou preço adulterado é recusado.
- O cliente vê seus pedidos e o status atualizado.
- O cliente não consegue ver pedidos ou dados de outros clientes.
- A doceria consegue alterar o status de um pedido e registrar a taxa de entrega.
- A API está documentada e navegável pelo Scalar.
- A API roda na Vercel conectada ao PostgreSQL do Supabase.

---

## 15. Riscos

| Risco | Mitigação |
|---|---|
| Exigir login aumentar o abandono de pedidos | Cadastro curto (nome, e-mail e senha), sessão longa, retorno automático à finalização com o carrinho intacto |
| Cliente esquecer a senha sem recuperação disponível | Definir a recuperação de senha (seção 11.3, decisão 5) antes de publicar |
| Vazamento de dados pessoais | Requisitos de segurança e LGPD da seção 10 |
| Limites do plano gratuito da Vercel ou do Supabase | Acompanhar o uso; o volume esperado é baixo |
| Divergência entre o cardápio do site e o do banco na Fase 1 | Mesmos identificadores nos dois lados; toda mudança de preço feita nos dois até a Fase 2 |
| Pedidos registrados mas não enviados pelo WhatsApp | Status **Recebido** visível no painel, permitindo à doceria contatar o cliente |
