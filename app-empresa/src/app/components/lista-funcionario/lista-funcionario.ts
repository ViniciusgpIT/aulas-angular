import { Component, OnInit, signal, WritableSignal, computed } from '@angular/core';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Funcionario } from '../../models/funcionario-model';
import { Departamento } from '../../models/departamento-model';
import { FuncionarioService } from '../../services/funcionario-service';
import { DepartamentoService } from '../../services/departamento-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-funcionario',
  imports: [CommonModule, RouterLink],
  templateUrl: './lista-funcionario.html',
  styleUrl: './lista-funcionario.scss'
})
export class ListaFuncionario implements OnInit {
  funcionarios: WritableSignal<Funcionario[]> = signal([]);
  departamentos: WritableSignal<Departamento[]> = signal([]);
  carregando = signal(true);
  filtroDepartamento = signal<string | null>(null);

  funcionariosFiltrados = computed(() => {
    const filtro = this.filtroDepartamento();
    if (!filtro) return this.funcionarios();

    return this.funcionarios().filter(func =>
      func.departamentoId === filtro
    );
  });

  constructor(
    private funcionarioService: FuncionarioService,
    private departamentoService: DepartamentoService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.carregarDados();
    this.verificarFiltro();
  }

  carregarDados(): void {
    this.carregando.set(true);

    this.funcionarioService.getFuncionarios().subscribe({
      next: (data) => {
        this.funcionarios.set(data);
        this.carregarDepartamentos();
      },
      error: (error) => {
        console.error('Erro ao carregar funcionários:', error);
        this.carregando.set(false);
        Swal.fire('Erro!', 'Erro ao carregar funcionários', 'error');
      }
    });
  }

  carregarDepartamentos(): void {
    this.departamentoService.getDepartamentos().subscribe({
      next: (data) => {
        this.departamentos.set(data);
        this.carregando.set(false);
      },
      error: (error) => {
        console.error('Erro ao carregar departamentos:', error);
        this.carregando.set(false);
      }
    });
  }

  verificarFiltro(): void {
    this.route.queryParams.subscribe(params => {
      if (params['departamento']) {
        this.filtroDepartamento.set(params['departamento']);
      }
    });
  }

  getNomeDepartamento(departamentoId: string): string {
    const departamento = this.departamentos().find(dep => dep.id === departamentoId);
    return departamento ? departamento.nome : 'Departamento não encontrado';
  }

  // Corrigido: Aceita string | undefined
  editarFuncionario(id: string | undefined): void {
    if (id) {
      this.router.navigate(['/funcionarios/editar', id]);
    }
  }

  // Corrigido: Aceita string | undefined
  deletarFuncionario(id: string | undefined): void {
    if (id) {
      Swal.fire({
        title: 'Tem certeza?',
        text: 'Deseja excluir este funcionário?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sim, excluir!',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.funcionarioService.deletarFuncionario(id).subscribe({
            next: () => {
              Swal.fire('Excluído!', 'Funcionário excluído com sucesso!', 'success');
              this.carregarDados();
            },
            error: (error) => {
              console.error('Erro ao excluir funcionário:', error);
              Swal.fire('Erro!', 'Erro ao excluir funcionário.', 'error');
            }
          });
        }
      });
    }
  }

  novoFuncionario(): void {
    this.router.navigate(['/funcionarios/novo']);
  }

  // NOVO MÉTODO: Para lidar com a mudança do select
  onFiltroChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.filtroDepartamento.set(select.value || null);
  }

  limparFiltro(): void {
    this.filtroDepartamento.set(null);
    this.router.navigate(['/funcionarios']);
  }

  formatarSalario(salario: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(salario);
  }
}