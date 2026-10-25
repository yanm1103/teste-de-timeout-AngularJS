[Acesse o teste aqui.](https://yanm1103.github.io/teste-de-timeout-AngularJS/)

## Objetivo

Demonstrar, de forma prática, como o AngularJS reage a alterações de estado feitas fora do seu contexto, evidenciando quando o digest cycle é automático e quando é necessário acioná-lo manualmente.

## Cenários testados

- Alteração de `$scope` via `setTimeout` sem `$apply`
- Alteração de `$scope` via `setTimeout` com `$apply`
- Alteração de `$scope` via `$timeout`
- Uso combinado de `$timeout` e `$apply`
- Execução direta de `$scope.$apply` durante um digest

## Conclusões

- `$timeout` executa o callback dentro do ciclo de digest do AngularJS
- O uso de `$apply` após `$timeout` é redundante
- `$apply` isolado joga o erro `digest already in progress` no console

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
