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

Acesse o link, utilize os botões disponíveis e observe a diferença entre a execução do código, os logs gerados e a atualização visual.
