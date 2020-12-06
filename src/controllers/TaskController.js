const database = require("../database/connection");

class TaskController {
    novaTarefa(request, response) {
        const { tarefa, descricao, responsavel } = request.body;

        database
            .insert({ tarefa, descricao, responsavel })
            .table("tasks")
            .then(() => {
                response.json({ message: "Tarefa criada com sucesso!" });
            })
            .catch((error) => {
                response.json(error);
            });
    }

    listarTarefas(request, response) {
        database
            .select("*")
            .table("tasks")
            .then((tarefas) => {
                response.json(tarefas);
            })
            .catch((error) => {
                response.json(error);
            });
    }

    listarUmaTarefa(request, response) {
        const id = request.params.id;

        database
            .select("*")
            .table("tasks")
            .where({ id: id })
            .then((tarefa) => {
                response.json(tarefa);
            })
            .catch((error) => {
                response.json(error);
            });
    }

    atualizarTarefa(request, response) {
        const id = request.params.id;
        const descricao = request.body.descricao;

        database
            .where({ id: id })
            .update({ descricao: descricao })
            .table("tasks")
            .then(() => {
                response.json({ message: "Tarefa atualizada com sucesso" });
            })
            .catch((error) => {
                response.json(error);
            });
    }

    removerTarefa(request, response) {
        const id = request.params.id;

        database
            .where({ id: id })
            .del()
            .table("tasks")
            .then(() => {
                response.json({ message: "Tarefa removida com sucesso" });
            })
            .catch((error) => {
                response.json(error);
            });
    }
}

module.exports = new TaskController();
