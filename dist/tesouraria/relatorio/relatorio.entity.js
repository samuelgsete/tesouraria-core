"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const entrada_entity_1 = require("../../shared/models/entrada.entity");
const saida_entity_1 = require("../../shared/models/saida.entity");
class Relatorio {
    constructor(values = {}) {
        this.saldoInicial = 0;
        this.saldoAtual = 0;
        this.saldoMensal = 0;
        this.totalEntradas = 0;
        this.totalSaidas = 0;
        Object.assign(this, values);
    }
    calcularSaldoDoMes() {
        this.entradas.forEach(e => {
            this.totalEntradas += e.valor;
        });
        this.saidas.forEach(s => {
            this.totalSaidas += s.valor;
        });
        this.saldoMensal = this.totalEntradas - this.totalSaidas;
    }
}
exports.Relatorio = Relatorio;
//# sourceMappingURL=relatorio.entity.js.map