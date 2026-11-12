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
  selector: 'app-cadastro-cliente',
  styleUrl: './cadastro-cliente.css',
  templateUrl: './cadastro-cliente.html',
})
export class CadastroCliente {

  //Injeção de dependência
  private http = inject(HttpClient);

  //Atributo signal para armazenar a lista de planos obtida da API
  planos = signal<any[]>([]);

  //Formulário para capturar os campos do cadastro do cliente
  formCadastro = new FormGroup({
    nome : new FormControl('', [Validators.required, Validators.minLength(8)]),
    email : new FormControl('', [Validators.required, Validators.email]),
    cpf : new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{11}$/)]),
    planoId : new FormControl('', [Validators.required])
  });

  //Função executada ao abrir o componente
  ngOnInit() {
    //Requisição GET para a API
    this.http.get('http://localhost:8081/api/planos')
      .subscribe((resposta) => { //Capturando a resposta
        //Guardar os dados da resposta no signal
        this.planos.set(resposta as any[]);
      });
  }

  //Função executada quando o botão SUBMIT do formulário for clicado
  cadastrarCliente() {
      //Requisição POST para a API
      this.http.post('http://localhost:8081/api/clientes', this.formCadastro.value)
        .subscribe((response: any) => {
            alert(response.mensagem);
            this.formCadastro.reset();
        });
  }
}
