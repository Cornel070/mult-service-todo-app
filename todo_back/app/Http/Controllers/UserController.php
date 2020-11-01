<?php

namespace App\Http\Controllers;

use App\User;
use App\UserTask;
use Illuminate\Http\Request;


class UserController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function index()
    {

     $users = User::all();

     return response()->json($users);

    }

     public function create(Request $request)
     {
        $user = new User;

       $user->name= $request->name;
       $user->save();
       $success = true;
       return response()->json(array($user, $success));
     }

     public function show($id)
     {
        $user = User::find($id);
        return response()->json($user);
     }

     public function update(Request $request, $id)
     {
        $user= User::find($id);

        $user->name = $request->name;
        $user->save();
        $success = true;
        return response()->json(array($user,$success));
     }

     public function destroy($id)
     {
        $user = user::find($id);
        $user->delete();

         return response()->json('user removed successfully');
     }

}
