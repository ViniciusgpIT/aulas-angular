import { Component, OnInit, signal, computed, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Funcionario } from '../../models/funcionario-model';
import { Departamento } from '../../models/departamento-model';
import { FuncionarioService } from '../../services/funcionario-service';
import { DepartamentoService } from '../../services/departamento-service';

@Component({
  selector: 'app-form-func',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './form-func.html',
  styleUrl: './form-func.scss'
})
export class FormFunc implements OnInit {
  funcionarioForm: FormGroup;
  departamentos: WritableSignal<Departamento[]> = signal([]);
  isEditando = signal(false);
  funcionarioId = signal<string | null>(null);
  carregando = signal(true);

  tituloPagina = computed(() => 
    this.isEditando() ? 'Editar Funcionário' : 'Novo Funcionário'
  );

  textoBotao = computed(() => 
    this.isEditando() ? 'Atualizar' : 'Criar'
  );

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private funcionarioService: FuncionarioService,
    private departamentoService: DepartamentoService
  ) {
    this.funcionarioForm = this.criarForm();
  }

  ngOnInit(): void {
    this.carregarDepartamentos();
    this.verificarModo();
  }

  private criarForm(): FormGroup {
    return this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(2)]],
      cargo: ['', [Validators.required, Validators.minLength(2)]],
      salario: [0, [Validators.required, Validators.min(0)]],
      departamentoId: ['', Validators.required]
    });
  }

  private carregarDepartamentos(): void {
    this.departamentoService.getDepartamentos().subscribe({
      next: (data) => {
        this.departamentos.set(data);
      },
      error: (error) => {
        console.error('Erro ao carregar departamentos:', error);
        alert('Erro ao carregar departamentos');
      }
    });
  }

  private verificarModo(): void {
    const id = this.route.snapshot.params['id'];
    
    if (id) {
      this.isEditando.set(true);
      this.funcionarioId.set(id);
      this.carregarFuncionario(id);
    } else {
      this.carregando.set(false);
    }
  }

  private carregarFuncionario(id: string): void {
    this.funcionarioService.getFuncionario(id).subscribe({
      next: (funcionario) => {
        this.funcionarioForm.patchValue(funcionario);
        this.carregando.set(false);
      },
      error: (error) => {
        console.error('Erro ao carregar funcionário:', error);
        alert('Erro ao carregar funcionário.');
        this.carregando.set(false);
      }
    });
  }

  salvar(): void {
    if (this.funcionarioForm.valid) {
      if (this.isEditando() && this.funcionarioId()) {
        // Modo edição
        const funcionario: Funcionario = {
          ...this.funcionarioForm.value,
          id: this.funcionarioId()!
        };
        
        this.funcionarioService.atualizarFuncionario(this.funcionarioId()!, funcionario)
          .subscribe({
            next: () => {
              alert('Funcionário atualizado com sucesso!');
              this.router.navigate(['/funcionarios']);
            },
            error: (error) => {
              console.error('Erro ao atualizar funcionário:', error);
              alert('Erro ao atualizar funcionário.');
            }
          });
      } else {
        // Modo criação
        this.funcionarioService.criarFuncionario(this.funcionarioForm.value)
          .subscribe({
            next: () => {
              alert('Funcionário criado com sucesso!');
              this.router.navigate(['/funcionarios']);
            },
            error: (error) => {
              console.error('Erro ao criar funcionário:', error);
              alert('Erro ao criar funcionário.');
            }
          });
      }
    } else {
      this.marcarCamposComoSujos();
    }
  }

  private marcarCamposComoSujos(): void {
    Object.keys(this.funcionarioForm.controls).forEach(key => {
      this.funcionarioForm.get(key)?.markAsDirty();
    });
  }

  cancelar(): void {
    this.router.navigate(['/funcionarios']);
  }
}