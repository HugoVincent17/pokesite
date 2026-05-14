<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next)
{
    if ($request->user() && $request->user()->is_admin == true) {
    return $next($request);
}
    return response()->json(['message' => 'Accès interdit'], 403);
}
}