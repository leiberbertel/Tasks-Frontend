<template>
  <div class="todo-container">
    <div class="todo-header">
      <h1>Tareas</h1>
      <i class="bx bx-plus-circle" @click="addTask()"><box-icon class="add-task" name='add-to-queue'></box-icon></i>
    </div>
    <div class="todo-list">
      <div class="todo-item" v-for="task in formattedTasks" :key="task.taskId">
        <div class="task-details">
          <i :class="['bx', task.state ? 'bx-check-circle' : 'bx-circle']" @click="toggleState(task.taskId)">
            <box-icon color="white" :name="task.state ? 'checkbox-checked' : 'checkbox'"></box-icon>
          </i>

          <p class="task-title">{{ task.title }}</p>
          <p class="task-description">{{ task.description }}</p>
          <p class="task-alert">{{ task.alert_time }}</p>
        </div>
        <div class="task-actions">
          <i class="bx bx-edit" @click="editTask(task.taskId)">
            <box-icon type='solid' color="white" name='edit-alt'></box-icon>
          </i>
          <i class="bx bx-trash" @click="deleteTask(task.taskId)">
            <box-icon type='solid' color="white" name='trash'></box-icon>
          </i>
        </div>
      </div>
    </div>
  </div>
  <task-modal v-if="showModal" :task="currentTask" @close="showModal = false" @save-task="saveTask"
    @update-task="updateTask">
  </task-modal>
</template>
  
<script>
export default {
  name: 'TaskView',
  data() {
    return {
      tasks: [],
      showModal: false,
      currentTask: null
    };
  },
  computed: {
    formattedTasks() {
      return this.tasks.map(task => ({
        ...task,
        alert_time: this.formatDate(task.alertTime)
      }));
    }
  },
  methods: {
    formatDate(date) {
      if (date && typeof date === 'string' && date.trim() !== '') {
        if (!date.includes('Z') && !date.includes('+')) {
          date += 'Z';
        }
        const options = {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        };
        const parsedDate = new Date(date);
        if (!isNaN(parsedDate)) {
          return parsedDate.toLocaleDateString(undefined, options);
        }
      }
      return 'Fecha no válida';
    },
    formatToDateTimeLocal(date) {
      if (date) {
        const parsedDate = new Date(date);
        if (!isNaN(parsedDate)) {
          return parsedDate.toISOString().slice(0, 16);
        }
      }
      return null;
    },
    addTask() {
      this.currentTask = null;
      this.showModal = true;
    },
    editTask(taskId) {
      this.currentTask = this.tasks.find(task => task.taskId === taskId);
      this.showModal = true;
    },
    async toggleState(taskId) { // Todo
      const task = this.tasks.find(t => t.taskId === taskId);
      if (!task) {
        console.error('No se encontró la tarea con ID:', taskId);
        return;
      }
      task.state = !task.state;

      try {
        const token = localStorage.getItem('jwtToken');
        const headers = { Authorization: `Bearer ${token}` };
        await this.$axios.patch('/api/tasks/update-state', {
          taskId: task.taskId,
          newState: task.state
        }, { headers });
        this.fetchTasks();
      } catch (error) {
        console.error('Error al editar la tarea:', error);
      }
    },
    async deleteTask(taskId) {
      try {
        const token = localStorage.getItem('jwtToken');
        const headers = { Authorization: `Bearer ${token}` };
        await this.$axios.delete(`/api/tasks/${taskId}`, { headers });
        this.fetchTasks();
      } catch (error) {
        console.error('Error al eliminar la tarea:', error);
      }
    },
    async saveTask(taskData) {
      try {
        const token = localStorage.getItem('jwtToken');
        const headers = { Authorization: `Bearer ${token}` };
        await this.$axios.post('/api/tasks', taskData, { headers });
        this.fetchTasks();
      } catch (error) {
        console.error('Error al guardar la tarea:', error);
      }
    },
    async updateTask(taskData) {
      try {
        const token = localStorage.getItem('jwtToken');
        const headers = { Authorization: `Bearer ${token}` };
        await this.$axios.put(`/api/tasks/${taskData.taskId}`, taskData, { headers });
        this.fetchTasks();
      } catch (error) {
        console.error('Error al actualizar la tarea:', error);
      }
    },
    async fetchTasks() {
      try {
        const token = localStorage.getItem('jwtToken');
        if (!token) {
          console.error('No hay token disponible');
          this.$router.push('/');
          return;
        }

        const headers = {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        };

        const response = await this.$axios.get('/api/tasks', { headers });
        this.tasks = response.data.tasks.map(task => ({
          ...task,
          alertTime: this.formatToDateTimeLocal(task.alertTime)
        }));
      } catch (error) {
        console.error('Error al obtener las tareas:', error);
        if (error.response && error.response.status === 401) {
          this.$router.push('/');
        }
      }
    }
  },
  async created() {
    this.fetchTasks();
  }
};
</script>

<style scoped>
box-icon {
  color: #ffffff;
}

box-icon:hover {
  cursor: pointer;
}

.add-task {
  width: 32px;
  height: 32px;
  margin-bottom: 9px;
  margin-top: -12px
}

h1 {
  margin-top: -4px;
}

.todo-list {
  overflow-x: auto;
}

.todo-container {
  background-color: #1f1f1f;
  color: #ffffff;
  max-width: 700px;
  margin: 0 auto;
  margin-top: 78px;
  border-radius: 8px;
  padding: 10px 20px 20px 20px;
}

.todo-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #333333;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}

.task-details {
  display: flex;
  align-items: center;
}

.task-details i {
  margin-right: 10px;
  color: #3c6e71;
  /* Color de los iconos de estado */
}

.task-actions i {
  margin-left: 10px;
  color: #ccc;
  /* Color de los iconos de acción */
}
</style>
