<?php

namespace App\Http\Controllers;

use App\UserTask;
use Illuminate\Http\Request;


class UserTaskController extends Controller
{
     //function to create task for a particular user
     public function createTask(Request $request)
     {
        $task = new UserTask;

       $task->description = $request->description;
       $task->user_id = $request->user_id;
       $task->save();
       $success = true;
       return response()->json(['task'=>$task, 'success'=>$success]);
     }

     //function to show a particular user's tasks
     public function showTasks($user_id)
     {
         $tasks = UserTask::where('user_id', $user_id)->get();
        //  return tasks easily from model relationship set bewtween user model and usertask model
         return response()->json($tasks);
     }

     public function singleTask($id)
     {
        $task = UserTask::find($id);
        return response()->json($task);
     }

     public function updateTask(Request $request, $id)
     {
        $task = UserTask::find($id);
        $task->update($request->all());
        return response()->json($task);
     }

     public function taskDone($id)
     {
        $task = UserTask::find($id);
        $task->state = 'done';
        $task->save();
        return response()->json(['msg'=>$task->state]);
     }

     public function taskUndo($id)
     {
        $task = UserTask::find($id);
        $task->state = 'to do';
        $task->save();
        return response()->json(['msg'=>$task->state]);
     }

     public function deleteTask($id)
     {
         $task = UserTask::find($id);
         $task->delete();
         return response('task deleted');
     }

}
