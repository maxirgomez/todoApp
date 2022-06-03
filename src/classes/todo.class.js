export class Todo {

    static fromJson( { id, tarea, completado } ){

        const tempTodo = new Todo( tarea );
        tempTodo.id = id;
        tempTodo.tarea = tarea;
        tempTodo.completado = completado;

        return tempTodo;

    }

    constructor( tarea ){

            this.tarea = tarea;
            this.id = new Date().getTime(); 
            this.completado = false;
            this.creado = new Date();

    }

}