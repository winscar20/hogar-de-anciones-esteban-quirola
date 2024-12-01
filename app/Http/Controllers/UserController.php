<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use App\Models\Role;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;

class UserController extends Controller
{
    public function index(Request $request) {
        $search = $request->input('search');
        $loggedUser = Auth::user();

       // Obtener resultados de la búsqueda
        $users = User::with('role')
        ->when($search, function ($query, $search) {
            return $query->where('name', 'LIKE', "%$search%")
                ->orWhere('email', 'LIKE', "%$search%");
        })
        ->when($loggedUser->role->name !== 'SuperAdmin', function ($query) use ($loggedUser) {
            $query->whereHas('role', function ($roleQuery) use ($loggedUser) {
                // Condiciones según el rol del usuario logueado
                if ($loggedUser->role->name === 'Administrativo') {
                    // Administrativo: Excluir SuperAdmin
                    $roleQuery->whereNotIn('name', ['SuperAdmin']);
                } elseif (in_array($loggedUser->role->name, ['Doctor', 'Enfermeria'])) {
                    // Doctor y Enfermería: Excluir SuperAdmin y Administrativos
                    $roleQuery->whereIn('name', ['Doctor', 'Enfermeria', 'Externo']);
                }
            });
        })
        ->where('id', '!=', $loggedUser->id) 
        ->paginate(10);

        return Inertia::render('Users/Index', [
            'users' => $users,
            'filters' => [
                'search' => $search,
            ],
        ]);
    }

    public function create() {
        $roles = Role::all();
        return Inertia::render('Users/Create', [
            'roles' => $roles,
        ]);
    }

    public function store(Request $request) {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'role' => 'required',
            'phone' => 'nullable|string|max:15',
        ]);
        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role_id' => $validated['role'],
            'phone' => $validated['phone'] ?? null,
        ]);
        return redirect()->route('users.index')->with('success', 'Usuario creado exitosamente.');
    }

    public function edit($id){
        $user = User::with('role')->findOrFail($id);
        $roles = Role::all();

        return Inertia::render('Users/Edit', [
            'user' => $user,
            'roles' => $roles,
        ]);
    }

    public function update(Request $request, $id){
        $user = User::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => "required|email|unique:users,email,{$id}",
            'password' => ['nullable', 'confirmed', Rules\Password::defaults()],
            'is_active' => 'required|boolean',
            'role_id' => 'required|exists:roles,id',
            'phone' => 'nullable|string|max:15',
        ]);

        $user->update([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'is_active' => $validated['is_active'] ? 1 : 0,
            'role_id' => $validated['role_id'],
            'phone' => $validated['phone'] ?? $user->phone,
        ]);

        if (!empty($validated['password'])) {
            $user->update([
                'password' => bcrypt($validated['password']),
            ]);
        }

        return redirect()->route('users.index')->with('success', 'Usuario actualizado exitosamente.');
    }

    public function destroy($id) {
        $user = User::findOrFail($id);
        $user->delete();
        return redirect()->route('users.index')->with('success', 'Usuario eliminado exitosamente.');
    }

    public function search(Request $request) {
        $query = $request->input('query');

        $users = User::with(['role' => function ($query) {
            $query->where('name', 'Externo');
        }])
        ->where(function ($queryBuilder) use ($query) {
            $queryBuilder->where('name', 'LIKE', "%$query%")
                ->orWhere('email', 'LIKE', "%$query%");
        })
        ->get()
        ->filter(function ($user) {
            return $user->role && $user->role->name === 'Externo';
        });
        return response()->json($users);
    }
    public function show($id)
    {
        $user = User::findOrFail($id);
        return response()->json($user);
    }
}
