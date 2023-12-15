<template>
  <section class="todo-container">
    <div class="todo-content">
      <div class="progress-container">
        <div class="title-progress">
          <span class="custom-progress-text">{{ completedTask }}</span> DE <span class="custom-progress-text">{{ totalTask
          }}</span> TAREAS COMPLETADAS
        </div>
        <div class="progress-bar">
          <div class="progress" :style="{ width: progress + '%' }">
            {{ progress }}%
          </div>
        </div>
      </div>
      <i class="bx bx-plus-circle" @click="addTask()">
        <box-icon color="white" class="add-task" name='add-to-queue'></box-icon>
      </i>

      <div class="todo-list">
        <div class="todo-item" v-for="task in formattedTasks" :key="task.taskId">
          <div class="task-details">
            <i :class="['bx', task.state ? 'bx-checkbox' : 'bx-checkbox-checked']" @click="toggleState(task.taskId)">
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
  </section>
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
    },
    completedTask() {
      return this.tasks.filter(t => t.state).length;
    },
    totalTask() {
      return this.tasks.length;
    },
    progress() {
      if (this.totalTask === 0) return 0;
      return Math.round((this.completedTask / this.totalTask) * 100);
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
    async toggleState(taskId) {
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
          state: task.state
        }, { headers });
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
.custom-progress-text {
  color: #0D6EFD;
}

.todo-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 92vh;
}

.title-progress {
  font-size: 25px;
  font-weight: 700;
  margin-bottom: 4px;
}

.progress-bar {
  width: 100%;
  background-color: #eee;
  border-radius: 10px;
  margin-bottom: 11px;
}

.progress {
  height: 23px;
  background-color: #0D6EFD;
  border-radius: 10px;
  transition: width 0.5s ease;
}

box-icon:hover {
  cursor: pointer;
}

.add-task {
  width: 32px;
  height: 32px;
  margin-bottom: 7px;
  margin-top: -2px
}

.todo-content {
  background-color: #25273C;
  color: #ffffff;
  max-width: 700px;
  margin-bottom: 70px;
  border-radius: 8px;
  padding: 20px 20px 20px 20px;
}

.todo-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #171723;
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
}

.task-actions i {
  margin-left: 10px;
}
</style>
