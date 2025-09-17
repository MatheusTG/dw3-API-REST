import { ContatoService } from "./contato.service.js";

export class ContatoController {
  // O Controller está "amarrado" à implementação do ContatoService.
  constructor(contatoService) {
    this.contatoService = contatoService;
  }

  async getContatos(request, reply) {
    const contatos = this.contatoService.getAllContatos();
    return reply.send(contatos);
  }

  async getContatoById(request, reply) {
    const { id } = request.params;
    const contato = this.contatoService.getContatoById(id);

    if (!contato) {
      return reply.code(404).send({ message: "Contato não encontrado" });
    }
    return reply.send(contato);
  }

  async getContatoByEmail(request, reply) {
    const { email } = request.query;
    let contato;
    try {
      contato = this.contatoService.getContatoByEmail(email);
    } catch (error) {
      return reply.code(404).send({ message: error.message });
    }
    return reply.send(contato);
  }

  async createContato(request, reply) {
    let novoContato;
    try {
      novoContato = this.contatoService.createContato(request.body);
    } catch (error) {
      return reply.code(400).send({ message: error.message });
    }
    return reply.code(201).send(novoContato);
  }

  async updateContato(request, reply) {
    const { id } = request.params;
    const contatoAtualizado = this.contatoService.updateContato(
      id,
      request.body
    );

    if (!contatoAtualizado) {
      return reply.code(404).send({ message: "Contato não encontrado" });
    }
    return reply.send(contatoAtualizado);
  }

  async deleteContato(request, reply) {
    const { id } = request.params;
    const sucesso = this.contatoService.deleteContato(id);

    if (!sucesso) {
      return reply.code(404).send({ message: "Contato não encontrado" });
    }
    return reply.code(204).send();
  }
}
