import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DepartamentoService } from '../../services/departamento-service';
import { DepartamentoModelo } from '../../models/departamento-modelo';

@Component({
  selector: 'app-lista-departamentos',
  imports: [FormsModule],
  templateUrl: './lista-departamentos.html',
  styleUrl: './lista-departamentos.scss',
})
export class ListaDepartamentos {
  nomeCategoria: string = '';

  constructor(private apiDpto: DepartamentoService) { }

  criarDepartamento(): void {

    let objParaEnviar: DepartamentoModelo = {
      departamento: this.nomeCategoria
    }
    this.apiDpto.postDepartamento(objParaEnviar).subscribe({
      next: itemCriado => {
        console.log(itemCriado)
        alert('Departamento criado')
      },
      error: error => {
        console.log(error)
      }
    })

  }
}
