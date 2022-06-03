import { todoList } from "../index";
import { Todo } from "../classes/todo.class";


const divTodoList = document.querySelector('.todo-list');
const txtInput = document.querySelector('.new-todo');
const btnBorrar = document.querySelector('.clear-completed');
const ulFilters = document.querySelector('.filters');
const anchorFilter = document.querySelectorAll('.filtro');


export const crearTodoHTML = ( todo ) => {
    const htmlTodo = `
    <li class="${ ( todo.completado ) ? 'completed' : '' }" data-id="${ todo.id }">
		<div class="view">
			<input class="toggle" type="checkbox" ${ ( todo.completado ) ? 'checked' : '' } >
			<label>${todo.tarea}</label>
			    <button class="destroy"></button>
		</div>
		<input class="edit" value="Create a TodoMVC template">
	</li>`;
    const div = document.createElement('div');
    div.innerHTML = htmlTodo;
    divTodoList.append( div.firstElementChild );
    return div;
	/** Insertamos todo el html en el primer hijo del elemento que creamos, en este caso el div */
}

//Eventos
//* Input
txtInput.addEventListener( 'keyup', e => {
	if ( e.keyCode === 13 && txtInput.value.length > 0){
		const nuevoTodo = new Todo( txtInput.value );
		todoList.nuevoTodo( nuevoTodo );
		crearTodoHTML( nuevoTodo );
		txtInput.value = '';
	}
})
//* Complete todo
divTodoList.addEventListener( 'click', e => {

	const nombreElemento = e.target.localName; //input, label, btn
	const todoElemento = e.target.parentElement.parentElement;
	const todoId = todoElemento.getAttribute('data-id'); // tomamos el atributo 

	if( nombreElemento.includes('input') ){

		//Si le dan click
		todoList.marcarCompletado( todoId );
		//* Agregamos un toggle con la clase
		todoElemento.classList.toggle('completed');

	} else if ( nombreElemento.includes('button') ){

		todoList.eliminarTodo( todoId );
		divTodoList.removeChild( todoElemento );

	}
});

btnBorrar.addEventListener('click', e => {

	todoList.eliminarCompletados();

	for (let i = divTodoList.children.length - 1; i >= 0; i-- ) {
		
		const elemento = divTodoList.children[i];
		if(elemento.classList.contains('completed')){

			divTodoList.removeChild(elemento);
			
		}

	}

})

//* Filters
ulFilters.addEventListener( 'click', e => {

	const filtro = e.target.text;
	if(!filtro){ return; }

	anchorFilter.forEach( e => e.classList.remove('selected') );
	e.target.classList.add('selected');

	for(const counter of divTodoList.children){

		counter.classList.remove('hidden');
		const complete = counter.classList.contains('completed');

		switch( filtro ){
			case 'Pendientes':
				if( complete ){
					counter.classList.add('hidden');
				}
			break;

			case 'Completados':
				if( !complete ){
					counter.classList.add('hidden');
				}
			break;
		} 

	}
});