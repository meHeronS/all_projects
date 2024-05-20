document.addEventListener("DOMContentLoaded", function() {
    const taskForm = document.getElementById("task-form");
    const taskInput = document.getElementById("task-input");
    const taskList = document.getElementById("task-list");
  
    // Função para carregar tarefas do localStorage
    function loadTasks() {
      const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      tasks.forEach(function(task) {
        addTaskToList(task);
      });
    }
  
    // Função para adicionar tarefa à lista
    function addTaskToList(taskContent) {
      const li = document.createElement("li");
      li.innerHTML = `
        <span class="task-content">${taskContent}</span>
        <button class="edit-btn">Editar</button>
        <button class="remove-btn">Excluir</button>
      `;
      taskList.appendChild(li);
    }
  
    // Função para salvar tarefa no localStorage
    function saveTasks(tasks) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  
    // Função para remover tarefa da lista e do localStorage
    function removeTask(taskElement) {
      const taskContent = taskElement.querySelector(".task-content").textContent;
      const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      const index = tasks.indexOf(taskContent);
      if (index !== -1) {
        tasks.splice(index, 1);
        saveTasks(tasks); // Salva a lista atualizada no localStorage
      }
      taskElement.remove();
    }
  
    // Função para editar tarefa
    function editTask(taskElement) {
      const taskContent = taskElement.querySelector(".task-content");
      const currentTaskText = taskContent.textContent;
  
      // Cria um input para edição com o texto atual da tarefa
      const taskInput = document.createElement("input");
      taskInput.type = "text";
      taskInput.classList.add("edit-input");
      taskInput.value = currentTaskText;
  
      // Substitui o texto da tarefa pelo input de edição
      taskContent.replaceWith(taskInput);
  
      // Oculta temporariamente os botões de edição e exclusão
      const editButton = taskElement.querySelector(".edit-btn");
      const removeButton = taskElement.querySelector(".remove-btn");
      editButton.style.display = "none";
      removeButton.style.display = "none";
  
      // Adiciona um botão de "Salvar"
      const saveButton = document.createElement("button");
      saveButton.textContent = "Salvar";
      saveButton.classList.add("save-btn");
      taskElement.appendChild(saveButton);
  
      // Adiciona um evento de clique para salvar as alterações
      saveButton.addEventListener("click", function() {
        const newTaskText = taskInput.value.trim();
        if (newTaskText !== "") {
          taskContent.textContent = newTaskText;
          saveEditedTask(currentTaskText, newTaskText); // Salva as alterações no localStorage
          // Restaura os botões de edição e exclusão
          editButton.style.display = "inline";
          removeButton.style.display = "inline";
          // Remove o input de edição, o botão de salvar e o botão de cancelar
          taskInput.replaceWith(taskContent);
          saveButton.remove();
          cancelButton.remove();
        } else {
          alert("Por favor, insira um texto válido para a tarefa.");
        }
      });
  
      // Adiciona um botão de "Cancelar"
      const cancelButton = document.createElement("button");
      cancelButton.textContent = "Cancelar";
      cancelButton.classList.add("cancel-btn");
      taskElement.appendChild(cancelButton);
  
      // Adiciona um evento de clique para cancelar a edição
      cancelButton.addEventListener("click", function() {
        // Restaura o texto original da tarefa
        taskContent.textContent = currentTaskText;
        // Restaura os botões de edição e exclusão
        editButton.style.display = "inline";
        removeButton.style.display = "inline";
        // Remove o input de edição, o botão de salvar e o botão de cancelar
        taskInput.replaceWith(taskContent);
        saveButton.remove();
        cancelButton.remove();
      });
    }
  
    // Função para salvar as alterações da tarefa editada no localStorage
    function saveEditedTask(oldTaskText, newTaskText) {
      const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      const index = tasks.indexOf(oldTaskText);
      if (index !== -1) {
        tasks[index] = newTaskText;
        saveTasks(tasks); // Salva a lista atualizada no localStorage
      }
    }
  
    // Adicionar evento de envio do formulário
    taskForm.addEventListener("submit", function(event) {
      event.preventDefault();
      const taskContent = taskInput.value.trim();
      if (taskContent !== "") {
        addTaskToList(taskContent);
        saveTasks([...getStoredTasks(), taskContent]); // Salva a nova tarefa no localStorage
        taskInput.value = "";
      }
    });
  
    // Adicionar evento de clique para remover ou editar tarefa
    taskList.addEventListener("click", function(event) {
      const target = event.target;
      const taskElement = target.parentElement;
      if (target.classList.contains("remove-btn")) {
        removeTask(taskElement);
      } else if (target.classList.contains("edit-btn")) {
        editTask(taskElement);
      }
    });
  
    // Função auxiliar para obter as tarefas armazenadas no localStorage
    function getStoredTasks() {
      return JSON.parse(localStorage.getItem("tasks")) || [];
    }
  
    // Carregar tarefas ao carregar a página
    loadTasks();
  });
  