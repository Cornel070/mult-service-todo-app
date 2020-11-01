<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UserTask extends Model
{

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['description','user_id'];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    
    protected $connection = 'mysql2';
}
