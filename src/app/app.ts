import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CadastroCliente } from './components/cadastro-cliente/cadastro-cliente';
import { ConsultaCliente } from './components/consulta-cliente/consulta-cliente';

@Component({
  imports: [RouterOutlet, CadastroCliente, ConsultaCliente],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('web-clientes');
}
