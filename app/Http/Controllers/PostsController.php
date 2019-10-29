<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Posts;
use App\Http\Controllers\Controller; 
use Validator;

class PostsController extends Controller
{
    public $successStatus = 200;

    public function index(){
        $posts = Posts::all();
        
        return response()->json(['success' => $posts], $this-> successStatus); 
    }

    public function store(Request $request){
        $validator = Validator::make($request->all(), [ 
            'title' => 'required', 
            'content' => 'required', 
            'user_id' => 'required'
        ]);
        if ($validator->fails()) { 
                    return response()->json(['error'=>$validator->errors()], 401);            
        }
        $post = Posts::create($request->all()); 
        $posts = posts::all();
        return response()->json(['success' => $posts], $this-> successStatus); 

    }
    public function updatepost(Request $request){

    
        $validator = Validator::make($request->all(), [ 
            'title' => 'required', 
            'content' => 'required', 
            'id'=>'required'
        ]);
        if ($validator->fails()) { 
                    return response()->json(['error'=>$validator->errors()], 401);            
        }
        $id = $request->id;
        $post = Posts::findOrFail($id);
        $post->title = $request->title;
        $post->content = $request->content;
        $post->save();

        return response()->json(['success' => $post], $this-> successStatus); 

    }
}
