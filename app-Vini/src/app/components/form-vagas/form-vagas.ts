import { Component, OnInit, signal, WritableSignal, computed, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

import { GestorService } from '../../services/gestor-service';
import { DepartamentoService } from '../../services/departamento-service';
import { VagasService } from '../../services/vagas-service';

import { GestorModelo } from '../../models/gestor-modelo';
import { DepartamentoModelo } from '../../models/departamento-modelo';
import { PedidoVaga } from '../../models/pedido-vaga';

@Component({
  selector: 'app-form-vagas',
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './form-vagas.html',
  styleUrl: './form-vagas.scss',
})
export class FormVagas implements OnInit {

  private route = inject(ActivatedRoute);

  requisito: string = ''

  // Signals para controle de estado
  isEditando = signal<boolean>(false);
  vagaIdEditando = signal<string | null>(null);

  // Computed signals para texto dinâmico
  textoBotao = computed(() =>
    this.isEditando() ? 'Editar Vaga' : 'Criar Vaga'
  );

  tituloFormulario = computed(() =>
    this.isEditando() ? 'Edição de Vaga' : 'Formulário de Criação de Vaga'
  );

  objPedidoVaga: PedidoVaga = {
    titulo: '',
    motivo: '',
    requisitos: [],
    quantidade: 1,
    aprovacao: 'Pendente',
    gestorId: '',
    dataSolicitacao: '',
  }

  gestorModelo: WritableSignal<GestorModelo[]> = signal([])
  departamentoModelo: WritableSignal<DepartamentoModelo[]> = signal([])

  // NOVO: Array para controlar a edição individual de cada requisito
  editandoRequisitos: boolean[] = [];
  requisitosEditaveis: string[] = [];

  constructor(
    private departamentoService: DepartamentoService,
    private gestorService: GestorService,
    private vagaServise: VagasService,
  ) { }

  ngOnInit(): void {
    this.verificarModoEdicao()
    this.carregaDepartamentos()
    this.carregarGestor()
  }

  // NOVO MÉTODO: Verificar se está em modo edição
  private verificarModoEdicao(): void {
    const idFromStorage = localStorage.getItem('id');
    const idFromRoute = this.route.snapshot.params['id'];

    const id = idFromRoute || idFromStorage;

    if (id) {
      console.log('Modo edição ativado para ID:', id);
      this.ativarModoEdicao(id);
      this.carregarPedidoPorId(id);
    } else {
      console.log('Modo criação ativado');
      this.ativarModoCriacao();
    }
  }

  adicionarRequisito(): void {
    if (this.requisito.trim()) {
      this.objPedidoVaga.requisitos.push(this.requisito.trim());
      // NOVO: Atualizar arrays de controle para o novo requisito
      this.editandoRequisitos.push(false);
      this.requisitosEditaveis.push(this.requisito.trim());
      this.requisito = '';
    }
  }

  // MÉTODO ATUALIZADO: Remover requisito
  removerRequisito(index: number): void {
    this.objPedidoVaga.requisitos.splice(index, 1);
    // NOVO: Remover também dos arrays de controle
    this.editandoRequisitos.splice(index, 1);
    this.requisitosEditaveis.splice(index, 1);
  }

  // NOVO MÉTODO: Ativar modo edição para um requisito específico
  ativarEdicaoRequisito(index: number): void {
    this.editandoRequisitos[index] = true;
    // Criar uma cópia do requisito para edição
    this.requisitosEditaveis[index] = this.objPedidoVaga.requisitos[index];
  }

  // NOVO MÉTODO: Salvar edição de um requisito específico
  salvarEdicaoRequisito(index: number): void {
    if (this.requisitosEditaveis[index].trim()) {
      this.objPedidoVaga.requisitos[index] = this.requisitosEditaveis[index].trim();
      this.editandoRequisitos[index] = false;
    }
  }

  // NOVO MÉTODO: Cancelar edição de um requisito específico
  cancelarEdicaoRequisito(index: number): void {
    this.editandoRequisitos[index] = false;
    this.requisitosEditaveis[index] = this.objPedidoVaga.requisitos[index];
  }

  carregaDepartamentos(): void {
    this.departamentoService.getDepartamento().subscribe({
      next: data => {
        this.departamentoModelo.set(data)
      }, error: error => {
        console.log(error)
      }
    })
  }

  carregarPedidoPorId(id: string): void {
    this.vagaServise.getPedidoVagaPorId(id).subscribe({
      next: data => {
        this.objPedidoVaga = data;
        console.log('Dados da vaga carregados:', data);
        // NOVO: Inicializar arrays de controle quando carrega dados existentes
        this.inicializarControlesRequisitos();
      }, error: error => {
        console.log('Erro ao carregar vaga:', error)
      }
    })
  }

  // NOVO MÉTODO: Inicializar arrays de controle para requisitos existentes
  private inicializarControlesRequisitos(): void {
    this.editandoRequisitos = [];
    this.requisitosEditaveis = [];

    // Para cada requisito existente, inicializar os controles
    this.objPedidoVaga.requisitos.forEach(requisito => {
      this.editandoRequisitos.push(false);
      this.requisitosEditaveis.push(requisito);
    });
  }

  carregarGestor(): void {
    this.gestorService.getGestor().subscribe({
      next: data2 => {
        this.gestorModelo.set(data2)
      }, error: error => {
        console.log(error)
      }
    })
  }

  // MÉTODO DINÂMICO PARA O BOTÃO
  acaoPrincipal(): void {
    if (this.isEditando()) {
      this.editarVaga();
    } else {
      this.criarVaga();
    }
  }

  criarVaga(): void {
    // Garantir que a data está preenchida
    if (!this.objPedidoVaga.dataSolicitacao) {
      this.objPedidoVaga.dataSolicitacao = new Date().toISOString().split('T')[0];
    }

    this.vagaServise.postCriarVaga(this.objPedidoVaga).subscribe({
      next: itemCriado => {
        console.log(itemCriado)
        alert('Vaga criada com sucesso!')
        this.limparFormulario()
      },
      error: error => {
        console.log(error)
        alert('Erro ao criar vaga')
      }
    })
  }

  // MÉTODO EDITAR VAGA
  editarVaga(): void {
    const id = this.vagaIdEditando();
    if (id) {
      this.vagaServise.editaVaga(id, this.objPedidoVaga).subscribe({
        next: vagaEditada => {
          console.log('Vaga editada:', vagaEditada)
          alert('Vaga editada com sucesso!')
          this.limparFormulario()
          this.ativarModoCriacao()
          localStorage.removeItem('id')
        },
        error: error => {
          console.log('Erro ao editar:', error)
          alert('Erro ao editar vaga')
        }
      })
    } else {
      console.error('ID não encontrado para edição');
      alert('Erro: ID da vaga não encontrado')
    }
  }

  // Métodos para controle do modo
  ativarModoEdicao(id: string): void {
    this.isEditando.set(true);
    this.vagaIdEditando.set(id);
    console.log('Modo edição ativado. isEditando:', this.isEditando());
  }

  ativarModoCriacao(): void {
    this.isEditando.set(false);
    this.vagaIdEditando.set(null);
    console.log('Modo criação ativado. isEditando:', this.isEditando());
  }

  // Método para limpar formulário
  public limparFormulario(): void {
    this.objPedidoVaga = {
      titulo: '',
      motivo: '',
      requisitos: [],
      quantidade: 1,
      aprovacao: 'Pendente',
      gestorId: '',
      dataSolicitacao: '',
    };
    this.requisito = '';
    // NOVO: Limpar arrays de controle
    this.editandoRequisitos = [];
    this.requisitosEditaveis = [];
  }

  limparStorage(): void {
    localStorage.clear()
  }
}