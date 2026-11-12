import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  selector: 'app-consulta-cliente',
  styleUrl: './consulta-cliente.css',
  templateUrl: './consulta-cliente.html',
})
export class ConsultaCliente {

  //Instanciar o HttpClient
  private http = inject(HttpClient);

  //Atributo para armazenar a consulta dos clientes
  clientes = signal<any[]>([]);

  planos = signal<any[]>([]);
  clienteId: number = 0;

  //Formulário para pesquisa
  formConsulta = new FormGroup({
    nome: new FormControl('', [Validators.required])
  });

  formEdicao = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.minLength(8)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    cpf: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{11}$/)]),
    planoId: new FormControl('', [Validators.required])
  });

  //Função executada quando o botão SUBMIT do formulário for clicado
  consultarClientes() {
    //Requisição para o endpoint GET da API (consulta de clientes)
    this.http.get('http://localhost:8081/api/clientes?nome=' + this.formConsulta.value.nome)
      .subscribe((response) => {
        //Guardar os clientes obtidos no signal
        this.clientes.set(response as any[]);
      })
  }
  // Funcao executada quando o botao de excluir for clicado
  excluirCliente(id: number) {
    if (confirm('Deseja realmente excluir este cliente?')) {
      this.http.delete('http://localhost:8081/api/clientes/' + id)
        .subscribe((response: any) => {
          alert(response.mensagem);
          // Atualizar a lista de clientes após a exclusão
          this.consultarClientes();
        });
    }
  }

  obterCliente(id: number) {
    this.http.get('http://localhost:8081/api/planos')
      .subscribe((response) => {
        this.planos.set(response as any[]);
      });
    this.http.get('http://localhost:8081/api/clientes/' + id)
      .subscribe((response: any) => {
        this.formEdicao.patchValue(response);
        this.clienteId = id;
      });
  }

  editarCliente() {
    this.http.put('http://localhost:8081/api/clientes/' + this.clienteId, this.formEdicao.value)
      .subscribe((response: any) => {
        alert(response.mensagem);
        // Atualizar a lista de clientes após a edição
        this.consultarClientes();
      });
  }

}
