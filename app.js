angular.module('app', [])
    .controller('TestCtrl', function ($scope, $timeout) {
        const log = document.getElementById('log');

        $scope.resetValue = function () {
            $scope.value = 'Inicial';
        };

        // O registro escreve direto no DOM de propósito: assim ele aparece
        // mesmo quando a alteração acontece fora do digest do Angular.
        function writeToLog(str) {
            const newLogEntry = document.createElement('div');
            const time = new Date().toLocaleTimeString('pt-BR', {
                hour: '2-digit', minute: '2-digit', second: '2-digit', fractionalSecondDigits: 3,
            });
            newLogEntry.appendChild(document.createTextNode(`${time} | ${str}`));
            log.append(newLogEntry);
        }

        // ===== Fora do Angular (setTimeout) =====

        // 1. setTimeout sem $apply: a view não atualiza
        $scope.externalWithoutApply = function () {
            writeToLog('Clicou no botão: mudou sem apply');
            setTimeout(() => {
                $scope.value = new Date().toISOString() + ' - mudou sem apply';
                writeToLog('mudou sem apply. Note se o valor foi realmente alterado visualmente.');
            }, 100);
        };

        // 2. setTimeout com $apply: dispara um digest a partir do $rootScope
        $scope.externalWithApply = function () {
            writeToLog('Clicou no botão: mudou com apply');
            setTimeout(() => {
                $scope.$apply(() => {
                    $scope.value = new Date().toISOString() + ' - mudou com apply';
                    writeToLog('mudou com apply');
                });
            }, 100);
        };

        // 3. setTimeout com $digest: percorre só este escopo e os filhos
        $scope.externalWithDigest = function () {
            writeToLog('Clicou no botão: mudou com $digest');
            setTimeout(() => {
                $scope.value = new Date().toISOString() + ' - mudou com $digest';
                writeToLog('mudou com $digest (só este escopo e os filhos)');
                $scope.$digest();
            }, 100);
        };

        // 4. setTimeout com $evalAsync: sem digest em andamento, agenda um novo
        $scope.externalWithEvalAsync = function () {
            writeToLog('Clicou no botão: mudou com $evalAsync');
            setTimeout(() => {
                $scope.$evalAsync(() => {
                    $scope.value = new Date().toISOString() + ' - mudou com $evalAsync';
                    writeToLog('mudou com $evalAsync (digest novo agendado)');
                });
            }, 100);
        };

        // ===== Serviços do Angular =====

        // 5. $timeout: o callback já roda dentro de um digest
        $scope.externalWithTimeout = function () {
            writeToLog('Clicou no botão: mudou com $timeout');
            $timeout(() => {
                writeToLog('mudou com $timeout');
                $scope.value = new Date().toISOString() + ' - mudou com $timeout';
            }, 100);
        };

        // 6. $timeout seguido de $apply: o $apply é redundante
        $scope.externalWithTimeoutApply = function () {
            writeToLog('Clicou no botão: mudou com $timeout ➡️ $apply');
            $timeout(() => {
                writeToLog('mudou com $timeout (será chamado o $apply)');
                $scope.value = new Date().toISOString() + ' - mudou com $timeout (será chamado o $apply)';
                setTimeout(() => {
                    $scope.$apply(() => {
                        writeToLog('$apply chamado');
                    });
                }, 200);
            }, 100);
        };

        // 7. $timeout vazio: apenas agenda um digest
        $scope.forceTimeoutScopeApply = function () {
            writeToLog('Forçando $timeout');
            $timeout();
        };

        // ===== Dentro do digest (ng-click) =====

        // 8. $apply forçado durante um digest: gera erro
        $scope.forceScopeApply = function () {
            writeToLog('Forçando $scope.$apply. VERIFIQUE O CONSOLE!');
            try {
                $scope.$apply();
            } catch (e) {
                writeToLog(`❌ Erro capturado: ${e.message}`);
            }
        };

        // 9. $evalAsync durante um digest: roda no digest atual, sem erro
        $scope.forceEvalAsync = function () {
            writeToLog('Chamando $evalAsync dentro do digest');
            $scope.$evalAsync(() => {
                $scope.value = new Date().toISOString() + ' - mudou com $evalAsync no digest atual';
                writeToLog('$evalAsync executado (mesmo digest, sem erro)');
            });
            writeToLog('ng-click terminou; o $evalAsync ainda vai rodar neste digest');
        };

        // 10. $applyAsync durante um digest: agenda um $apply para daqui a ~10ms, sem erro
        $scope.forceApplyAsync = function () {
            writeToLog('Chamando $applyAsync dentro do digest');
            $scope.$applyAsync(() => {
                $scope.value = new Date().toISOString() + ' - mudou com $applyAsync';
                writeToLog('$applyAsync executado (digest novo, ~10ms depois)');
            });
            writeToLog('ng-click terminou; o $applyAsync roda em um digest futuro');
        };

        $scope.clearLogs = function () {
            log.innerHTML = '';
        };

        $scope.resetValue();
    });

angular.element(document).ready(function () {
    angular.bootstrap(document, ['app']);
});
