<template>
  <div class="modal-overlay" @click.self="closeModal">
    <div class="modal">
      <h2>{{ isEdit ? 'Editar una tarea' : 'Agregar una tarea' }}</h2>
      <form @submit.prevent="submitTask">
        <div class="form-group">
          <label for="title">Título</label>
          <input type="text" id="title" v-model="taskData.title" required placeholder="Aprender programación">
        </div>
        <div class="form-group">
          <label for="description">Descripción</label>
          <textarea id="description" v-model="taskData.description" required
            placeholder="Establecer un horario"></textarea>
        </div>

        <div class="form-group">
          <label for="alert-time">Hora de alerta</label>
          <input type="datetime-local" id="alert-time" v-model="taskData.alertTime" required>
        </div>

        <button type="submit">{{ isEdit ? 'Guardar' : 'Agregar tarea' }}</button>
        <button type="button" @click="closeModal">Cancelar</button>
      </form>
    </div>
  </div>
</template>
  
<script>
export default {
  props: ['task'],
  data() {
    return {
      taskData: {
        title: '',
        description: '',
        alertTime: ''
      }
    };
  },
  computed: {
    isEdit() {
      return this.task && this.task.taskId;
    }
  },
  watch: {
    task: {
      immediate: true,
      handler(newValue) {
        this.taskData = newValue ? { ...newValue } : { title: '', description: '', alertTime: '' };
      }
    }
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    submitTask() {
      if (this.isEdit) {
        this.$emit('update-task', this.taskData);
      } else {
        this.$emit('save-task', this.taskData);
      }
      this.closeModal();
    }
  }
};
</script>
  
<style scoped>
* {
  color: #fff;
}

#alert-time {
  padding: 10px;
  font-size: 16px;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  min-width: 310px;
  background: #171723;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
}

.form-group {
  margin-bottom: 22px;
}

label {
  display: block;
  margin-bottom: 5px;
  text-align: left;
  color: #b0b0cc;
}

input,
textarea {
  font-size: 16px;
  background-color: #171723;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: none;
  width: 100%;
  height: 22px;
  border-bottom: 1px solid #b0b0cc;
}

input,
textarea:focus {
  outline: none;
  border-bottom: 1px solid #b0b0cc;
}


button {
  font-size: 0.9em;
  width: 35%;
  color: #b0b0cc;
  padding: 4px;
  border: none;
  background-color: #25273c;
  margin-right: 18px;
  border-radius: 4px;
}

button[type="submit"]:hover {
  background-color: #0D6EFD;
  color: #cfcfcf;
}

button[type="button"]:hover {
  background-color: #e72222;
  color: #cfcfcf;
}
</style>
  