<template>
    <div class="modal-overlay" @click.self="closeModal">
        <div class="modal">
            <h2>{{ isEdit ? 'Editar Tarea' : 'Agregar Tarea' }}</h2>
            <form @submit.prevent="submitTask">
                <div class="form-group">
                    <label for="title">Título</label>
                    <input type="text" id="title" v-model="taskData.title" required>
                </div>
                <div class="form-group">
                    <label for="description">Descripción</label>
                    <textarea id="description" v-model="taskData.description" required></textarea>
                </div>
                <div class="form-group">
                    <label for="alert-time">Hora de Alerta</label>
                    <input type="datetime-local" id="alert-time" v-model="taskData.alertTime" required>
                </div>
                <button type="submit">{{ isEdit ? 'Guardar Cambios' : 'Agregar Tarea' }}</button>
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
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal {
    background: white;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.form-group {
    margin-bottom: 10px;
}

label {
    display: block;
    margin-bottom: 5px;
}

input,
textarea {
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

button {
    margin-right: 10px;
}
</style>
  