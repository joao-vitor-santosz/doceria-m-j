# CLAUDE.md — Doceria M&J

## 1. Contexto do projeto

A **Doceria M&J** é uma marca de doces artesanais criada por um casal, com o propósito de oferecer produtos de qualidade, uma apresentação cuidadosa e uma experiência de compra simples, acolhedora e confiável.

O projeto consiste em uma vitrine digital com página inicial, cardápio organizado por categorias, detalhes dos produtos e informações institucionais.

O site já está praticamente concluído. Portanto, o objetivo atual não é desenvolver um novo site, reconstruir a aplicação ou implementar todo o PRD do zero.

O objetivo é manter, compreender, revisar e aperfeiçoar o projeto existente conforme as necessidades identificadas e as solicitações do proprietário.

### Objetivos do projeto

- Apresentar a identidade da Doceria M&J de maneira profissional.
- Exibir os produtos de forma atraente e organizada.
- Facilitar a navegação pelo cardápio.
- Permitir a busca e a filtragem dos produtos.
- Apresentar corretamente preços, variações e informações comerciais.
- Garantir uma boa experiência em dispositivos móveis.
- Facilitar o contato entre clientes e a doceria.
- Manter uma base técnica organizada e preparada para evoluções futuras.

---

## 2. Regra principal: preservar o projeto existente

**O projeto já existe e está praticamente pronto. Preserve-o como prioridade.**

Antes de qualquer alteração, compreenda como a aplicação funciona atualmente.

Não trate o PRD como uma ordem para reconstruir o site. Utilize-o como referência para compreender os objetivos, as funcionalidades esperadas e as regras comerciais.

### Regras obrigatórias

1. Não reconstrua páginas ou componentes que já estejam funcionando adequadamente.
2. Não crie páginas, funcionalidades, componentes ou arquivos novos por iniciativa própria.
3. Não modifique arquivos sem uma necessidade identificada e justificada.
4. Não altere a identidade visual por preferência pessoal.
5. Não substitua a arquitetura existente apenas porque outra abordagem parece mais moderna.
6. Não instale dependências sem necessidade concreta.
7. Não altere versões de bibliotecas, configurações ou ferramentas sem uma justificativa técnica.
8. Não remova funcionalidades, estilos ou componentes existentes sem autorização ou necessidade diretamente relacionada à tarefa.
9. Não implemente funcionalidades previstas para o futuro apenas porque aparecem no PRD.
10. Não invente informações comerciais para preencher lacunas.

A prioridade é realizar mudanças pequenas, seguras, justificadas e compatíveis com o estado atual do projeto.

---

## 3. Protocolo inicial de análise

Quando iniciar uma sessão de trabalho, primeiro compreenda o contexto disponível.

Analise, conforme a necessidade:

- A estrutura de diretórios;
- Os arquivos de configuração;
- O `package.json` e os scripts disponíveis;
- As tecnologias e versões utilizadas;
- As páginas e rotas existentes;
- Os componentes compartilhados;
- Os estilos globais e locais;
- A organização dos dados dos produtos;
- A lógica de busca e filtragem;
- As regras de preços e variações;
- Os recursos de imagem e a identidade visual;
- As funcionalidades já implementadas;
- Os testes e as verificações disponíveis;
- As alterações recentes relevantes para a tarefa.

Não leia indiscriminadamente todos os arquivos se isso não for necessário. Comece pela estrutura e aprofunde a análise nas áreas relacionadas ao trabalho solicitado.

### Na primeira análise do projeto

Se o proprietário solicitar apenas uma análise inicial:

1. Examine o projeto existente.
2. Compare seu estado atual com o PRD e este documento.
3. Identifique problemas reais e possíveis inconsistências.
4. Diferencie defeitos de sugestões opcionais.
5. Apresente um diagnóstico objetivo.
6. Aguarde autorização antes de modificar arquivos.

**A análise inicial deve ser somente de leitura. Não altere nenhum arquivo nessa etapa.**

---

## 4. Fluxo de trabalho para manutenção

Sempre que receber uma solicitação de alteração, siga este processo.

### Etapa 1 — Compreender

Identifique exatamente o que foi solicitado e qual parte do projeto está envolvida.

Consulte os arquivos relevantes e entenda suas dependências antes de propor mudanças.

### Etapa 2 — Diagnosticar

Determine a causa do problema, em vez de apenas corrigir um sintoma visual.

Se houver mais de uma solução, prefira aquela que resolva o problema com o menor impacto sobre o restante do projeto.

### Etapa 3 — Definir o escopo

Estabeleça quais arquivos e comportamentos realmente precisam ser alterados.

Não amplie a tarefa para incluir melhorias não solicitadas.

Se identificar outros problemas, registre-os como observações e peça autorização antes de tratá-los, salvo quando forem diretamente necessários para concluir a tarefa.

### Etapa 4 — Implementar

Realize as alterações necessárias, preservando os padrões existentes e evitando mudanças colaterais.

Não reescreva arquivos inteiros quando uma modificação localizada for suficiente.

### Etapa 5 — Validar

Execute as verificações adequadas ao escopo, como:

- Build;
- Lint;
- Testes existentes;
- Verificação de erros;
- Conferência de responsividade;
- Validação do comportamento afetado.

Não declare que uma verificação foi realizada se ela não tiver sido executada.

### Etapa 6 — Comunicar

Ao concluir, apresente um resumo contendo:

- O que foi alterado;
- Quais arquivos foram modificados;
- Qual problema foi resolvido;
- Quais verificações foram realizadas;
- Quais pendências permaneceram, se houver.

Se não houver necessidade de alterações, explique o motivo em vez de criar trabalho artificial.

---

## 5. Controle de escopo e autorização

O proprietário define as prioridades e o escopo do desenvolvimento.

### Quando uma solicitação estiver clara

Implemente somente o necessário para atendê-la, respeitando as regras deste documento.

### Quando identificar melhorias adicionais

Não as implemente automaticamente.

Apresente a sugestão, explique brevemente seu benefício e aguarde autorização.

### Quando houver ambiguidades importantes

Pergunte antes de tomar decisões que possam afetar:

- Regras comerciais;
- Preços;
- Composição dos produtos;
- Fluxos de compra;
- Estrutura de dados;
- Navegação;
- Identidade visual;
- Dependências importantes;
- Arquitetura da aplicação.

Para decisões pequenas e reversíveis dentro do escopo autorizado, adote a solução mais simples e consistente com o projeto.

### O que não fazer sem solicitação

- Criar novas páginas;
- Adicionar um carrinho de compras;
- Implementar checkout;
- Criar um painel administrativo;
- Adicionar backend ou banco de dados;
- Implementar autenticação;
- Integrar serviços externos;
- Adicionar novas animações por preferência pessoal;
- Refazer a identidade visual;
- Migrar bibliotecas ou tecnologias;
- Reorganizar toda a estrutura de diretórios.

Essas funcionalidades só devem ser desenvolvidas quando fizerem parte de uma solicitação autorizada.

---

## 6. Identidade visual da Doceria M&J

A identidade visual deve transmitir:

- Aconchego;
- Delicadeza;
- Qualidade artesanal;
- Sofisticação;
- Proximidade;
- Confiança;
- Apetite visual.

A interface deve parecer uma marca real, cuidadosa e profissional, sem perder o caráter acolhedor de uma doceria artesanal.

### Preservação visual

Antes de alterar qualquer elemento visual, compreenda a linguagem estética já estabelecida.

Preserve, sempre que estiverem adequados:

- Paleta de cores;
- Tipografia;
- Hierarquia visual;
- Espaçamentos;
- Bordas e arredondamentos;
- Sombras;
- Composição dos cards;
- Elementos decorativos;
- Estilo das imagens;
- Padrões de navegação;
- Comportamento responsivo.

Não redesenhe a interface inteira para corrigir um detalhe.

Não altere cores, fontes ou componentes apenas porque prefere outra estética.

### Direção visual

A marca pode explorar referências de confeitaria artesanal, embalagens elegantes, fotografia editorial de alimentos e detalhes delicados.

Essas referências devem apoiar a identidade própria da Doceria M&J, sem copiar integralmente outra marca ou template.

### Cores

Se uma alteração de cores for necessária, respeite a paleta já adotada.

Tons de creme, off-white, chocolate, caramelo e bege podem ser apropriados ao universo da marca, mas não devem ser introduzidos automaticamente se a identidade atual já possuir uma direção definida.

Evite cores arbitrárias, gradientes excessivos e contrastes que prejudiquem a leitura.

### Tipografia

Preserve a combinação tipográfica existente quando ela for consistente.

Não substitua fontes ou altere indiscriminadamente os tamanhos dos títulos, descrições e preços.

Mantenha a hierarquia visual e a legibilidade.

### Fotografia dos produtos

As imagens são parte essencial da experiência da doceria.

- Preserve as imagens existentes quando estiverem corretas.
- Utilize as imagens reais fornecidas pelo proprietário.
- Mantenha a correspondência entre a imagem e o produto.
- Evite cortes que prejudiquem a compreensão do doce.
- Não substitua imagens sem necessidade.
- Não invente fotografias de produtos reais.
- Se uma imagem estiver ausente, sinalize a pendência ou utilize o mecanismo de placeholder já existente.

---

## 7. Responsividade e experiência do usuário

O projeto deve priorizar uma experiência mobile-first, considerando que muitos clientes acessarão o cardápio pelo celular.

Entretanto, ajustes responsivos devem preservar o comportamento atual nas telas em que o site já funciona corretamente.

### Aspectos a verificar

- Ausência de rolagem horizontal involuntária;
- Cards bem dimensionados;
- Textos legíveis;
- Preços fáceis de identificar;
- Botões acessíveis;
- Imagens proporcionais;
- Navegação intuitiva;
- Espaçamentos consistentes;
- Filtros e busca utilizáveis;
- Ausência de sobreposição de elementos;
- Modais compatíveis com a altura da tela;
- Layout consistente em diferentes resoluções.

### Ao corrigir problemas responsivos

1. Identifique a resolução e o componente afetados.
2. Descubra a causa do comportamento inadequado.
3. Corrija o problema de forma localizada.
4. Preserve o layout das demais resoluções.
5. Verifique se a alteração introduziu regressões.

Não faça mudanças globais de espaçamento ou tipografia para resolver um problema restrito a uma única seção.

---

## 8. Regras de negócio do cardápio

As regras comerciais abaixo devem ser respeitadas em todas as alterações.

### 8.1. Brownies

Preços definidos:

- Brownie simples: R$ 8,00.
- Brownie recheado: R$ 15,00.

As opções de complemento podem incluir:

- Morango;
- KitKat;
- Nenhum complemento.

Essas opções não alteram o preço, conforme a regra comercial definida.

Não altere preços, classificações ou composição dos produtos sem autorização.

A classificação entre brownie simples e recheado deve seguir o cadastro comercial do produto, não ser determinada automaticamente pela presença de um complemento.

### 8.2. Quarteto Brigadeiro

O Quarteto Brigadeiro deve ser apresentado como um conjunto de opções no qual o cliente escolhe os sabores desejados.

Preserve a implementação atual se ela já atender a essa regra.

Se houver necessidade de corrigir ou implementar a seleção:

- Apresente o conjunto como um único produto;
- Permita escolher entre os sabores efetivamente disponíveis;
- Respeite a quantidade de escolhas definida;
- Impeça seleções inválidas;
- Apresente um resumo das escolhas quando aplicável;
- Não invente sabores, quantidades ou preços.

O preço e a quantidade exata de brigadeiros devem ser obtidos das informações confirmadas pelo proprietário ou do cadastro existente, se confiável.

Se esses dados estiverem ausentes, solicite esclarecimento antes de definir regras comerciais.

### 8.3. Brigadeiros

A seção de brigadeiros deve ser apresentada como um único card com possibilidade de escolha de sabores.

Não divida os sabores em cards independentes se isso contrariar o comportamento comercial definido.

Preserve o fluxo existente quando estiver correto.

Não invente preços, quantidades ou restrições de seleção.

### 8.4. Consistência dos dados

Sempre que possível, utilize a fonte de dados já existente para apresentar nomes, descrições, preços, categorias e variações.

Evite duplicar informações em vários componentes.

Não migre a estrutura de dados apenas por preferência pessoal.

Se identificar inconsistências entre o cardápio e os detalhes de um produto, corrija somente o necessário para restabelecer a consistência, respeitando a fonte comercial confiável.

---

## 9. Funcionalidades existentes

O PRD é uma referência para verificar o comportamento do produto, não uma autorização para implementar automaticamente todos os requisitos.

### Página inicial

Verifique, quando relevante para a tarefa:

- Apresentação da marca;
- Nome e logo;
- Slogan ou mensagem principal;
- Navegação;
- Acesso ao cardápio;
- Contato;
- Redes sociais disponíveis.

### Cardápio

Verifique:

- Organização por categoria;
- Busca por nome;
- Busca por descrição;
- Filtragem;
- Exibição dos produtos;
- Nome, descrição e preço;
- Acesso aos detalhes;
- Estado sem resultados.

Busca e filtros devem funcionar em conjunto, caso já estejam implementados.

### Detalhes do produto

Verifique:

- Nome;
- Imagem;
- Descrição;
- Preço;
- Categoria;
- Variações e opções disponíveis.

Preserve a navegação e os padrões de apresentação existentes quando estiverem funcionando adequadamente.

### Informações institucionais

Verifique, quando aplicável:

- Endereço;
- Horário;
- Formas de pagamento;
- Contato;
- Redes sociais.

Não publique informações fictícias para preencher campos pendentes.

### Funcionalidades futuras

WhatsApp integrado, promoções, carrinho, checkout, gestão de catálogo e CRM fazem parte das possibilidades de evolução do projeto.

Não os implemente sem solicitação específica.

---

## 10. Arquitetura e tecnologias

Respeite a arquitetura e as tecnologias já utilizadas.

Não presuma que o projeto precisa de uma nova stack ou de uma reorganização estrutural.

Antes de alterar a arquitetura, verifique se a solução atual realmente impede a correção solicitada.

### Princípios técnicos

- Código legível;
- Responsabilidades bem definidas;
- Reutilização quando apropriada;
- Tipagem consistente, quando aplicável;
- Baixo acoplamento;
- Alterações pequenas;
- Dependências controladas;
- Compatibilidade com as ferramentas existentes.

### Componentes

Reutilize os componentes existentes sempre que forem adequados.

Não crie uma segunda versão de um componente que já desempenha a mesma função.

Não extraia ou divida componentes apenas para satisfazer preferências de organização.

Se um componente precisar ser modificado, avalie o impacto sobre todas as páginas que o utilizam.

### Dados

Preserve a fonte de dados atual.

Não introduza banco de dados, API ou gerenciamento de estado global se a tarefa puder ser resolvida adequadamente com a arquitetura existente.

Qualquer evolução estrutural deve ter um motivo técnico concreto e respeitar o escopo autorizado.

---

## 11. Acessibilidade, desempenho e qualidade

Acessibilidade e desempenho devem ser considerados durante as correções, sem se tornarem justificativas para reescrever partes desnecessárias do projeto.

### Acessibilidade

Quando relevante, verifique:

- HTML semântico;
- Contraste;
- Textos alternativos;
- Rótulos de campos;
- Navegação por teclado;
- Indicadores de foco;
- Semântica correta de botões e links;
- Mensagens de erro compreensíveis;
- Respeito à preferência por movimento reduzido.

### Desempenho

Priorize correções com benefício real:

- Imagens excessivamente pesadas;
- Recursos desnecessários;
- Renderizações dispensáveis;
- Carregamento inadequado;
- Mudanças bruscas de layout;
- Dependências sem utilidade.

Não introduza técnicas de otimização complexas sem uma necessidade identificada.

### SEO

Preserve os metadados existentes.

Quando a tarefa envolver SEO, verifique títulos, descrições, estrutura de cabeçalhos e dados reais da marca.

Não invente avaliações, certificações, endereço ou outras informações para melhorar o posicionamento.

---

## 12. Animações e microinterações

Preserve as animações existentes quando forem coerentes com a identidade visual e não prejudicarem a usabilidade.

Não adicione animações por iniciativa própria.

Quando solicitado a corrigir uma animação:

- Identifique o comportamento atual;
- Preserve a linguagem visual;
- Evite movimentos excessivos;
- Não atrase a interação;
- Respeite a preferência por movimento reduzido;
- Evite adicionar dependências para efeitos simples.

Animações devem complementar a experiência, não competir com os produtos.

---

## 13. Tratamento de erros e comportamento funcional

Não corrija apenas a aparência de um problema quando sua causa estiver na lógica da aplicação.

Verifique o comportamento real dos elementos afetados.

### Busca e filtros

Quando aplicável, confirme:

- Correspondência por nome e descrição;
- Compatibilidade entre busca e categoria;
- Atualização dos resultados;
- Limpeza da busca;
- Estado sem resultados.

### Seleção de produtos

Quando aplicável, confirme:

- Opções disponíveis;
- Quantidade de escolhas;
- Validações;
- Atualização do resumo;
- Consistência do preço.

### Interações

- Botões devem executar as ações previstas.
- Links devem direcionar ao destino correto.
- Formulários devem tratar os estados relevantes.
- Erros devem ser apresentados de maneira compreensível.
- Nenhuma mensagem deve afirmar que uma operação foi concluída sem confirmação real.

Não introduza novos fluxos ou comportamentos sem autorização.

---

## 14. Testes e validação das alterações

Valide as áreas diretamente afetadas por cada tarefa.

Conforme o escopo, execute:

- Build;
- Lint;
- Testes existentes;
- Verificação de erros no console;
- Testes de navegação;
- Verificação de responsividade;
- Conferência dos dados exibidos;
- Validação do comportamento dos controles.

Não modifique configurações de teste ou crie uma infraestrutura de testes inteira para corrigir um problema simples sem necessidade.

Não remova testes que estejam falhando apenas para fazer a validação passar.

Diferencie problemas preexistentes de regressões causadas pelas alterações, sempre que possível.

Se não conseguir executar uma verificação, informe isso claramente.

---

## 15. Proteção contra alterações colaterais

Antes de editar arquivos:

- Verifique as mudanças locais relevantes;
- Preserve alterações ainda não commitadas;
- Não reverta modificações do proprietário;
- Não sobrescreva trabalho existente sem autorização;
- Evite comandos destrutivos;
- Não apague arquivos sem uma justificativa necessária;
- Não faça commits automaticamente, salvo solicitação explícita.

Se o projeto estiver sob controle de versão, utilize o diff para revisar as alterações realizadas.

Ao finalizar, confirme que as mudanças ficaram restritas ao escopo autorizado.

---

## 16. Comunicação com o proprietário

O proprietário deve ter clareza sobre o que está sendo alterado e por quê.

Use comunicação objetiva, sem relatórios excessivamente longos.

Quando apresentar um diagnóstico, separe:

1. Problemas confirmados;
2. Melhorias recomendadas;
3. Sugestões opcionais;
4. Informações que dependem de confirmação.

Quando concluir uma tarefa, informe:

- Problema tratado;
- Solução aplicada;
- Arquivos afetados;
- Verificações executadas;
- Pendências restantes.

Não apresente sugestões opcionais como se fossem problemas obrigatórios.

Se a solução exigir uma mudança maior do que a solicitada, explique o motivo e peça autorização antes de prosseguir.

---

## 17. Critérios para considerar uma tarefa concluída

Uma tarefa pode ser considerada concluída quando:

- A solicitação foi atendida;
- A alteração permaneceu dentro do escopo;
- O comportamento esperado foi preservado;
- As regras comerciais foram respeitadas;
- A identidade visual permaneceu consistente;
- Não foram introduzidas regressões conhecidas;
- As verificações adequadas foram realizadas;
- As limitações restantes foram comunicadas.

Se não houver um problema real a corrigir, não crie alterações apenas para demonstrar atividade.

---

## 18. Princípio final

**A Doceria M&J já possui um projeto em andamento. O papel do Claude Code é compreender, preservar e aperfeiçoar esse projeto, não substituí-lo.**

Priorize:

- Compreensão antes da implementação;
- Diagnóstico antes da correção;
- Mudanças pequenas antes de refatorações amplas;
- Funcionalidade antes de efeitos visuais;
- Consistência antes de novidades;
- Autorização antes de ampliar o escopo.

Não invente informações comerciais.

Não implemente funcionalidades futuras sem solicitação.

Não refaça aquilo que já funciona adequadamente.

**Trabalhe com cuidado, justifique as mudanças e preserve a integridade do projeto existente.**