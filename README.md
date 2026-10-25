[Acesse o teste aqui.](https://yanm1103.github.io/teste-de-timeout-AngularJS/)

## Objetivo

Demonstrar, de forma prática, como o AngularJS reage a alterações de estado feitas fora do seu contexto, evidenciando quando o digest cycle é automático e quando é necessário acioná-lo manualmente.

## Cenários testados

Fora do Angular (`setTimeout`):

- Alteração de `$scope` sem `$apply`
- Alteração de `$scope` com `$apply`
- Alteração de `$scope` com `$digest`
- Alteração de `$scope` com `$evalAsync`

Serviços do Angular:

- Alteração de `$scope` via `$timeout`
- Uso combinado de `$timeout` e `$apply`
- `$timeout` vazio, só para agendar um digest

Dentro do digest (`ng-click`):

- Execução direta de `$scope.$apply`
- `$evalAsync`
- `$applyAsync`

## Conclusões

- `$timeout` executa o callback dentro do ciclo de digest do AngularJS
- O uso de `$apply` após `$timeout` é redundante
- `$apply` isolado joga o erro `digest already in progress` no console
- `$digest` atualiza a view, mas só percorre o escopo atual e os filhos
- `$evalAsync` roda no digest atual se houver um em andamento; senão, agenda um novo
- `$applyAsync` agrupa chamadas em um único `$apply` cerca de 10ms depois, sem conflitar com o digest atual

## Como utilizar

[Acesse o link](https://yanm1103.github.io/teste-de-timeout-AngularJS/), utilize os botões disponíveis e observe a diferença entre a execução do código, os logs gerados e a atualização visual.

## Estrutura

- `index.html` – página de teste (marcação)
- `styles.css` – estilos (tema claro/escuro inspirado no menu do PS2)
- `app.js` – módulo AngularJS com os cenários; o bootstrap é feito manualmente via `angular.element(document).ready`
- `theme.js` – alternância de tema claro/escuro (independente do Angular)

## Desenvolvimento

```bash
npm install
npm run lint
```

## CI

O workflow em `.github/workflows/ci.yml` roda o lint em todo push e pull request.
Em push na `main`, se o lint passar, publica o site no GitHub Pages.
