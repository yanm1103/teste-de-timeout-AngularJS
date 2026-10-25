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
            const time = new Date().toLocaleTimeString('pt-BR', { fractionalSecondDigits: 3 });
            newLogEntry.appendChild(document.createTextNode(`${time} - ${str}`));
            log.append(newLogEntry);
        }

        // 1. Código fora do Angular, sem $apply
        $scope.externalWithoutApply = function () {
            writeToLog('Clicou no botão: mudou sem apply');
            setTimeout(() => {
                $scope.value = new Date().toISOString() + ' - mudou sem apply';
                writeToLog('mudou sem apply. Note se o valor foi realmente alterado visualmente.');
            }, 100);
        };

        // 2. Código fora do Angular, com $apply
        $scope.externalWithApply = function () {
            writeToLog('Clicou no botão: mudou com apply');
            setTimeout(() => {
                $scope.$apply(() => {
                    $scope.value = new Date().toISOString() + ' - mudou com apply';
                    writeToLog('mudou com apply');
                });
            }, 100);
        };

        // 3. Código fora do Angular, usando $timeout
        $scope.externalWithTimeout = function () {
            writeToLog('Clicou no botão: mudou com $timeout');
            $timeout(() => {
                writeToLog('mudou com $timeout');
                $scope.value = new Date().toISOString() + ' - mudou com $timeout';
            }, 100);
        };

        // 4. Código fora do Angular, usando $timeout e $apply
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

        // 5. $apply forçado durante um digest (gera erro)
        $scope.forceScopeApply = function () {
            writeToLog('Forçando $scope.$apply. VERIFIQUE O CONSOLE!');
            try {
                $scope.$apply();
            } catch (e) {
                writeToLog(`❌ Erro capturado: ${e.message}`);
            }
        };

        // 6. $timeout vazio (apenas agenda um digest)
        $scope.forceTimeoutScopeApply = function () {
            writeToLog('Forçando $timeout');
            $timeout();
        };

        $scope.clearLogs = function () {
            log.innerHTML = '';
        };

        $scope.resetValue();
    });

angular.element(document).ready(function () {
    angular.bootstrap(document, ['app']);
});
