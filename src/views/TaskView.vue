<template>
  <div class="todo-container">
    <div class="todo-header">
      <h1>To-Dos</h1>
    </div>
    <div class="todo-list">
      <div class="todo-item" v-for="task in formattedTasks" :key="task.id">
        <input type="checkbox" v-model="task.state" />
        <div class="task-details">
          <p class="task-name">{{ task.name }}</p>
          <p class="task-assignee">{{ task.description }}</p>
          <p class="task-due">{{ task.alert_time }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
export default {
  name: 'TaskView',
  data() {
    return {
      tasks: []
    };
  },
  computed: {
    formattedTasks() {
      return this.tasks.map(task => ({
        ...task,
        alert_time: this.formatDate(task.alert_time)
      }));
    }
  },
  methods: {
    formatDate(date) {
      if (date && typeof date === 'string' && date.trim() !== '') {
        if (!date.includes('Z') && !date.includes('+')) {
          date += 'Z';
        }
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const parsedDate = new Date(date);
        if (!isNaN(parsedDate)) {
          return parsedDate.toLocaleDateString(undefined, options);
        }
      }
      return 'Fecha no válida';
    }
  },
  async created() {
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

      this.tasks = response.data.tasks;
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 401) {
        this.$router.push('/');
      }
    }
  }
};
</script>