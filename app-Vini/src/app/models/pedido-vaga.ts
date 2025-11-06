export interface PedidoVaga {
    id: string;
    titulo: string;
    motivo: string;
    requisitos: string[];
    quantidade: 1 | 2 | 3 | 4 | 5;
    aprovacao: 'Pendente' | 'Aprovado' | 'Reprovado';
    gestorId: string;
    dataSolicitacao: string;
}
