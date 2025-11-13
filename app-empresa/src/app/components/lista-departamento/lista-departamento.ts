import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Departamento } from '../../models/departamento-model';
import { DepartamentoService } from '../../services/departamento-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-departamento',
  imports: [CommonModule, RouterLink],
  templateUrl: './lista-departamento.html',
  styleUrl: './lista-departamento.scss'
})
export class ListaDepartamento implements OnInit {
  departamentos: WritableSignal<Departamento[]> = signal([]);
  carregando = signal(true);

  constructor(
    private departamentoService: DepartamentoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carregarDepartamentos();
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
        Swal.fire('Erro!', 'Erro ao carregar departamentos', 'error');
      }
    });
  }

  // Corrigido: Aceita string | undefined
  editarDepartamento(id: string | undefined): void {
    if (id) {
      this.router.navigate(['/departamentos/editar', id]);
    }
  }

  // Corrigido: Aceita string | undefined
  deletarDepartamento(id: string | undefined): void {
    if (id) {
      Swal.fire({
        title: 'Tem certeza?',
        text: 'Deseja excluir este departamento?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sim, excluir!',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.departamentoService.deletarDepartamento(id).subscribe({
            next: () => {
              Swal.fire('Excluído!', 'Departamento excluído com sucesso!', 'success');
              this.carregarDepartamentos();
            },
            error: (error) => {
              console.error('Erro ao excluir departamento:', error);
              Swal.fire('Erro!', 'Erro ao excluir departamento.', 'error');
            }
          });
        }
      });
    }
  }

  novoDepartamento(): void {
    this.router.navigate(['/departamentos/novo']);
  }

  // CORREÇÃO: Agora aceita string | undefined
  verFuncionarios(departamentoId: string | undefined): void {
    if (departamentoId) {
      this.router.navigate(['/funcionarios'], { 
        queryParams: { departamento: departamentoId } 
      });
    }
  }
}