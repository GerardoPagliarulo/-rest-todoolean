/*************
 * TODOOLEAN *
 *************/
$(document).ready(function () {
    // Ref
    var newTodoInput = $('.todo-input');
    var todoBtn = $('.todo-button');
    var todoList = $('.main-list-todos');
    // API
    var myApi = 'http://157.230.17.132:3015/todos';
    // Init Handlebars
    var source = $("#todo-template").html();
    var template = Handlebars.compile(source);
    // Lettura Todos API 
    getTodo(myApi, template, todoList);
    // Creazione nuovo Todo 
    todoBtn.click(function () {
        postNewTodo(newTodoInput, myApi, template, todoList);
        newTodoInput.val('');
    });
    // Cancella Todo 
    $(document).on('click', '.fa-trash-alt', function () {
        deleteTodo($(this), myApi, template, todoList);
    });
}); // <-- End Doc Ready
/*************
 * FUNCTIONS *
 *************/
// Funzione: Lettura Todos (cRud)
function getTodo(myApi, template, todoList) {
    // Reset
    resetList(todoList);
    // Lettura Todos
    $.ajax({
        url: myApi,
        method: 'GET',
        success: function (res) {
            var todo = res 
            for (var i = 0; i < todo.length; i++) {
                var item = todo[i];
                var content = {
                    todo: item.text,
                    id: item.id
                }
                // Inserire Template
                var html = template(content);
                todoList.append(html);
            }
        },
        error: function () {
            console.log('Errore chiamata Api');
        }
    });
    /*var settings = {
        url: myApi,
        method: 'GET'
    };
    $.ajax(settings)
    .done(function (res) {
        var todo = res 
        for (var i = 0; i < todo.length; i++) {
            var item = todo[i];
            var content = {
                todo: item.text,
                id: item.id
            }
            // Inserire Template
            var html = template(content);
            todoList.append(html);
        }
    })
    .fail(function (error) {
        console.log('Errore chiamata Api', error.status);
    })
    .always( function () {
        console.log('Questo elemento viene sempre eseguito. Facoltativo');
    });*/
}
// Funzione: Creazione nuovo Todo (Crud)
function postNewTodo(input, myApi, template, todoList) {
    var newTodo = input.val().trim();
    if (newTodo !== '') {
        $.ajax({
            url: myApi,
            method: 'POST',
            data: {
                text: newTodo
            },
            success: function () {
                // Lettura Todos    
                getTodo(myApi, template, todoList);
            },
            error: function () {
                console.log('Errore chiamata Api');
            }    
        });
        /*var settings = {
            url: myApi,
            method: 'POST',
            data: {
                text: newTodo
            }
        };
        $.ajax(settings)
        .done(function () {
            // Lettura Todos    
            getTodo(myApi, template, todoList);
        })
        .fail(function (error) {
            console.log('Errore chiamata Api', error.status);
        })
        .always( function () {
            console.log('Questo elemento viene sempre eseguito. Facoltativo');
        });*/
    }
    else {
        alert('Inserisci del testo.');
    }
}
// Funzione: Cancellare Todo (cruD)
function deleteTodo(self, myApi, template, todoList) {
    var todoId = self.data('id');
    //console.log(todoId);
    $.ajax({
        url: myApi + '/' + todoId,
        method: 'DELETE',
        success: function () {
            // Lettura Todos    
            getTodo(myApi, template, todoList);
        },
        error: function () {
            console.log('Errore chiamata Api');
        }   
    }); 
    /*var settings = {
        url: myApi + '/' + todoId,
        method: 'DELETE'
    };
    $.ajax(settings)
    .done(function () {
        // Lettura Todos    
        getTodo(myApi, template, todoList);
    })
    .fail(function (error) {
        console.log('Errore chiamata Api', error.status);
    })
    .always( function () {
        console.log('Questo elemento viene sempre eseguito. Facoltativo');
    });*/
}
// Funzione: Reset list 
function resetList(element) {
    element.html('');
}