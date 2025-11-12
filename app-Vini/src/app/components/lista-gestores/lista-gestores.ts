import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { GestorModelo } from '../../models/gestor-modelo';
import { DepartamentoModelo } from '../../models/departamento-modelo';


import { GestorService } from '../../services/gestor-service';
import { DepartamentoService } from '../../services/departamento-service';
@Component({
  selector: 'app-lista-gestores',
  imports: [FormsModule],
  templateUrl: './lista-gestores.html',
  styleUrl: './lista-gestores.scss',
})
export class ListaGestores implements OnInit {

  objParaEnviar: GestorModelo = {
    nome: '',
    email: '',
    cargo: '',
    departamentoId: ''
  }

  gestorModelo: WritableSignal<GestorModelo[]> = signal([])
  departamentoModelo: WritableSignal<DepartamentoModelo[]> = signal([])

  constructor(private departamentoService: DepartamentoService, private gestorService: GestorService) { }

  ngOnInit(): void {
    this.carregaDepartamentos()
    this.carregarGestor()
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
  carregarGestor(): void {
    this.gestorService.getGestor().subscribe({
      next: data2 => {
        this.gestorModelo.set(data2)
      }, error: error => {
        console.log(error)
      }

    })
  }

  trocaIdPorNome(id: string): string {

    let departamentoEncontrado = this.departamentoModelo().find(d => d.id == id)
    if (departamentoEncontrado) {
      return departamentoEncontrado.departamento
    } else {
      return 'N/A'
    }

  }

  criarGestor(): void {
    this.gestorService.postCriarGestor(this.objParaEnviar).subscribe({
      next: itemCriado => {
        this.carregarGestor()
        console.log(itemCriado)
        alert('Gestor criado')
        this.objParaEnviar.nome = ''
        this.objParaEnviar.cargo = ''
        this.objParaEnviar.email = ''
        this.objParaEnviar.departamentoId = ''
      },
      error: error => {
        console.log(error)
      }
    })
  }

}
