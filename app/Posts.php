<?php

namespace App;
use App\User;

use Illuminate\Database\Eloquent\Model;


class Posts extends Model
{
    protected $table = 'posts';

    protected $primaryKey = 'id';

    protected $fillable = [
        'title', 'content','user_id'
    ];

    public function user(){
        return $this->belongsTo(User::class, 'user_id');
    }

}
