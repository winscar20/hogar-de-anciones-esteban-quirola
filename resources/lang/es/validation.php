<?php
return [
    'required' => 'El campo :attribute es obligatorio.',
    'numeric' => 'El campo :attribute debe ser un número.',
    'digits_between' => 'El campo :attribute debe tener entre :min y :max dígitos.',
    'min' => [
        'numeric' => 'El campo :attribute debe ser al menos :min.',
        'string' => 'El campo :attribute debe tener al menos :min caracteres.',
    ],
    'max' => [
        'numeric' => 'El campo :attribute no debe ser mayor a :max.',
        'string' => 'El campo :attribute no debe tener más de :max caracteres.',
    ],
    'custom' => [
        'telefono' => [
            'required' => 'Por favor, ingresa tu número de teléfono.',
            'numeric' => 'El número de teléfono debe contener solo números.',
            'digits_between' => 'El número de teléfono debe tener entre 10 y 12 dígitos.',
        ],
    ],
    'attributes' => [
        'telefono' => 'número de teléfono',
        'nombres' => 'nombres completos',
    ],
];
