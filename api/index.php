<?php

use Illuminate\Contracts\Http\Kernel;
use Illuminate\Http\Request;

try {
    require __DIR__ . '/../vendor/autoload.php';

    $app = require __DIR__ . '/../bootstrap/app.php';

    $kernel = $app->make(Kernel::class);

    $request = Request::capture();

    $response = $kernel->handle($request);

    $response->send();

    $kernel->terminate($request, $response);

} catch (Throwable $e) {
    http_response_code(500);

    header('Content-Type: application/json');

    echo json_encode([
        'success' => false,
        'message' => $e->getMessage(),
        'file' => $e->getFile(),
        'line' => $e->getLine(),
        'trace' => $e->getTrace(),
    ], JSON_PRETTY_PRINT);
}