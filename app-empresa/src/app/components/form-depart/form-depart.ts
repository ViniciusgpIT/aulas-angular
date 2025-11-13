import { Component, OnInit, signal, computed } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Departamento } from '../../models/departamento-model';
import { DepartamentoService } from '../../services/departamento-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-depart',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './form-depart.html',
  styleUrl: './form-depart.scss'
})
export class FormDepart implements OnInit {
  departamentoForm: FormGroup;
  isEditando = signal(false);
  departamentoId = signal<string | null>(null);
  carregando = signal(true);

  tituloPagina = computed(() => 
    this.isEditando() ? 'Editar Departamento' : 'Novo Departamento'
  );

  textoBotao = computed(() => 
    this.isEditando() ? 'Atualizar' : 'Criar'
  );

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private departamentoService: DepartamentoService
  ) {
    this.departamentoForm = this.criarForm();
  }

  ngOnInit(): void {
    this.verificarModo();
  }

  private criarForm(): FormGroup {
    return this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(2)]],
      local: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  private verificarModo(): void {
    const id = this.route.snapshot.params['id'];
    
    if (id) {
      this.isEditando.set(true);
      this.departamentoId.set(id);
      this.carregarDepartamento(id);
    } else {
      this.carregando.set(false);
    }
  }

  private carregarDepartamento(id: string): void {
    this.departamentoService.getDepartamento(id).subscribe({
      next: (departamento) => {
        this.departamentoForm.patchValue(departamento);
        this.carregando.set(false);
      },
      error: (error) => {
        console.error('Erro ao carregar departamento:', error);
        Swal.fire('Erro!', 'Erro ao carregar departamento.', 'error');
        this.carregando.set(false);
      }
    });
  }

  salvar(): void {
    if (this.departamentoForm.valid) {
      if (this.isEditando() && this.departamentoId()) {
        // Modo edição
        const departamento: Departamento = {
          ...this.departamentoForm.value,
          id: this.departamentoId()!
        };
        
        this.departamentoService.atualizarDepartamento(this.departamentoId()!, departamento)
          .subscribe({
            next: () => {
              Swal.fire('Sucesso!', 'Departamento atualizado com sucesso!', 'success');
              this.router.navigate(['/departamentos']);
            },
            error: (error) => {
              console.error('Erro ao atualizar departamento:', error);
              Swal.fire('Erro!', 'Erro ao atualizar departamento.', 'error');
            }
          });
      } else {
        // Modo criação
        this.departamentoService.criarDepartamento(this.departamentoForm.value)
          .subscribe({
            next: () => {
              Swal.fire('Sucesso!', 'Departamento criado com sucesso!', 'success');
              this.router.navigate(['/departamentos']);
            },
            error: (error) => {
              console.error('Erro ao criar departamento:', error);
              Swal.fire('Erro!', 'Erro ao criar departamento.', 'error');
            }
          });
      }
    } else {
      this.marcarCamposComoSujos();
      Swal.fire('Atenção!', 'Preencha todos os campos obrigatórios.', 'warning');
    }
  }

  private marcarCamposComoSujos(): void {
    Object.keys(this.departamentoForm.controls).forEach(key => {
      this.departamentoForm.get(key)?.markAsDirty();
    });
  }

  cancelar(): void {
    this.router.navigate(['/departamentos']);
  }
}