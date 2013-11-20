
$(document).ready(function() {

	//prepopulate with a few to-dos
	//include a unique ID
 	todos = [ 
	 	{
	 		name: 'Do homework 4', 
	 		done: false,
	 		id: guid()
	 	},
	 	{
	 		name: 'Create lab sample', 
	 		done: true,
	 		id: guid() 
	 	}
 	];

 	drawTodos();

 	//on form submit create a new todo and add to the todos list
 	$('#todoForm button').click(function() {
 		var title = $('#title').val();
 		if (!title) {
 			return false;
 		}
 		createTodo(title);
 		$('#title').val('');
 	});

 	//on click of delete link, remove todo from list
 	$('#todos').on('click', '.todo a.delete', function() {
 		console.log('click')
 		deleteTodo($(this).parent().attr('id'));
 		return false;
 	});

 	//on change of checkbox status, toggle whether the todo is marked complete
 	$('#todos').on('click', '.todo input[type="checkbox"]', function() {

 		var isChecked = $(this).prop('checked');
 		var id = $(this).parent().attr('id');

 		$.each(todos, function(index, item) {
			if (item.id == id) {
				item.done = isChecked;
			}
		});

		drawTodos();
	
 	});

});

function createTodo(title) {
	todos.push({name : title, done : false, id: guid()});
	drawTodos();
}

function deleteTodo(id) {
	console.log(id);
	$.each(todos, function(index, item) {
		if (item.id == id) {
			todos.splice(index, 1);
		}
	});
	drawTodos();
}

function drawTodos() {
	$('#todos').empty();
	if (todos.length > 0) {
		$.each(todos, function(index, item) {
			var checked = item.done ? 'checked' : '';

			var el = $('<div class="todo" id="' + item.id + 
				'"><span class="title">' + item.name + 
				'</span><input type="checkbox" ' + checked + 
				'><a href="#" class="delete">Remove</a></div>');

			if (item.done) {
				el.addClass('completed');
			}
			$('#todos').append(el);
		});
	} else {
		$('#todos').append("<div class='message'>There's nothing to do!</div>");
	}
	
}


/* source: http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript */
function s4() {
  return Math.floor((1 + Math.random()) * 0x10000)
             .toString(16)
             .substring(1);
};

function guid() {
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
         s4() + '-' + s4() + s4() + s4();
}
