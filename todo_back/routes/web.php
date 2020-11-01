<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
    return $router->app->version();
});
$router->group(['prefix'=>'api/v1'], function() use($router){
    // User CRUD Routes
    $router->post('/user', 'UserController@create');
    $router->get('/users', 'UserController@index');
    $router->get('/user/{id}', 'UserController@show');
    $router->put('/user/{id}', 'UserController@update');
    $router->delete('/user/{id}', 'UserController@destroy');

    // User tasks CRUD Routess
    $router->post('/user/{user_id}/task', 'UserTaskController@createTask');//create task for a user
    $router->get('/user/{user_id}/tasks', 'UserTaskController@showTasks');
    $router->get('task/{id}', 'UserTaskController@singleTask');
    $router->put('/task/{id}', 'UserTaskController@updateTask');
    $router->delete('/task/{id}', 'UserTaskController@deleteTask');
    //Check task routes
    $router->get('task/{id}/done', 'UserTaskController@taskDone');
    $router->get('task/{id}/undo', 'UserTaskController@taskUndo');
});
