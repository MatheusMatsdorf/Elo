# Elo – Rede de oportunidades

Rede profissional inspirada no LinkedIn, criada para enfrentar o **desemprego no Brasil**. O projeto nasceu do artigo científico *“O Desemprego no Brasil: causas, impactos e políticas públicas de enfrentamento”* e transforma as conclusões do estudo em funcionalidades.

> Projeto desenvolvido para feira de projetos da Escola de Ensino Médio Senac Distrito Criativo, Porto Alegre – RS.

## Por que o Elo?

A taxa de desocupação no Brasil caiu para 5,6% em 2025 (IBGE), mas a informalidade, a subutilização da força de trabalho e as desigualdades de acesso ao emprego continuam altas. Jovens, mulheres, pretos e pardos e moradores do Norte e do Nordeste são os mais afetados. O Elo responde a esses problemas:

| Problema (do artigo) | Funcionalidade do Elo |
|---|---|
| Dificuldade de inserção dos jovens e primeiro emprego | Filtro de vagas **sem exigência de experiência** |
| Descompasso entre qualificação e mercado | **Cursos** ligados às habilidades que as vagas pedem |
| Desigualdades regionais | Busca por cidade e **vagas remotas** |
| Exclusão e desalento | **Mentoria solidária** e rede de apoio |

## Funcionalidades

- **Início:** feed de publicações, com apoio aos posts e opção de publicar e excluir as próprias postagens.
- **Vagas:** busca e filtros por modalidade e por experiência. As vagas são ordenadas pela **compatibilidade** entre as habilidades do usuário e as da vaga, e o site mostra o que falta desenvolver.
- **Salvas:** página própria para as vagas salvas, acessível pelo menu, pelo card lateral e pelo perfil.
- **Capacitação:** ao concluir um curso, a habilidade é adicionada ao perfil e a compatibilidade com as vagas aumenta.
- **Mentoria:** pedido de mentoria a profissionais voluntários e cadastro para ser mentor.
- **Painel:** dados do desemprego no Brasil com base no artigo (taxa anual, grupos, regiões, causas).
- **Perfil:** nome, cidade, situação (em busca, empregado, mentor), bio e habilidades.
- **Sobre:** resumo do artigo, metodologia e políticas públicas citadas.
- Tema **claro e escuro** automático, layout responsivo e dados salvos no navegador.

## Como executar

Não precisa instalar nada.

1. Baixe ou clone o repositório:
   ```bash
   git clone https://github.com/MatheusMatsdorf/elo.git
   ```
2. Abra o arquivo `index.html` no navegador.

Os três arquivos precisam ficar na mesma pasta.

## Estrutura

```
elo/
├── index.html   # estrutura da página
├── style.css    # visual (tema claro/escuro, responsivo)
├── script.js    # dados, telas e funcionalidades
└── README.md
```

## Tecnologias

HTML5, CSS3 e JavaScript puro (sem frameworks nem dependências). O armazenamento usa `localStorage`.

## Dados utilizados

Os números do **Painel** vêm do artigo, que se baseia na PNAD Contínua do IBGE:

- Desocupação média anual: 13,2% (2021), 9,3% (2022), 6,6% (2024) e 5,6% (2025).
- Subutilização em 2024: 16,2%. Informalidade: 39,0% (2024) e 38,1% (2025).
- Desocupação no 2º trimestre de 2022: 19,3% entre jovens de 18 a 24 anos, 11,6% entre mulheres, 11,3% entre pretos, 10,8% entre pardos, 7,5% entre homens e 7,3% entre brancos.
- Carteira assinada no 4º trimestre de 2024: 73,4% no Brasil, 60,3% no Norte e 58,1% no Nordeste.

As **vagas, empresas, cursos, mentores e publicações do feed são fictícios**, criados apenas para demonstração.

## Limitações

- Não há login nem banco de dados. Os dados ficam no `localStorage` do navegador e do aparelho usado.
- Os candidatos, as candidaturas e os pedidos de mentoria não são enviados a ninguém.
- O botão **Limpar dados**, no Perfil, volta o site ao estado inicial.

## Próximos passos

- Cadastro e login reais, com banco de dados.
- Vagas e cursos de fontes reais, como SINE e programas de qualificação.
- Painel atualizado automaticamente com dados do IBGE.
- Mensagens entre candidatos, mentores e empresas.

## Equipe

- [Nome do Estudante 1]
- [Nome do Estudante 2]
- [Nome do Professor Orientador]

## Licença

Projeto educacional. Defina a licença antes de publicar (por exemplo, MIT).
