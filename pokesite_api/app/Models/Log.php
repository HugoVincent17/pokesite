<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Log extends Model
{
    use HasFactory;

    // Cette ligne est OBLIGATOIRE pour autoriser l'enregistrement
    protected $fillable = ['user_name', 'action'];
}