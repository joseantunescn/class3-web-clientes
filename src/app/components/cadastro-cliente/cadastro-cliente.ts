import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-cadastro-cliente',
  styleUrl: './cadastro-cliente.css',
  templateUrl: './cadastro-cliente.html',
})
export class CadastroCliente {

  private http = inject(HttpClient);

  ngOnInit() {

    this.http.get('http://localhost:8081/api/planos').subscribe((resposta) => {console.log(resposta);

    });

  }

}
