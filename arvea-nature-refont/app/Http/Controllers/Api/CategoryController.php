<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Models\Category;
use Illuminate\Http\JsonResponse;

class CategoryController extends Controller
{
    public function index(): JsonResponse
    {
        $query = Category::with(['country']);

        if (request()->filled('status')) {
            $query->where('status', request('status'));
        }

        if (request()->filled('country_id')) {
            $query->where('country_id', request('country_id'));
        }

        if (request()->filled('search')) {
            $search = request('search');
            $query->where('name', 'ilike', "%{$search}%");
        }

        $categories = $query->orderBy('position')->paginate(10);

        return response()->json([
            'success' => true,
            'message' => 'Categories retrieved successfully.',
            'data' => $categories,
        ]);
    }

    public function show(int $id): JsonResponse
    {
        $category = Category::with(['country', 'products'])->find($id);

        if (! $category) {
            return response()->json([
                'success' => false,
                'message' => 'Category not found.',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'Category retrieved successfully.',
            'data' => $category,
        ]);
    }

    public function store(StoreCategoryRequest $request): JsonResponse
    {

        $this->authorize('create', Category::class);
 
        $category = Category::create([
            'name' => $request->name,
            'slug' => $request->slug,
            'description' => $request->description,
            'status' => $request->status ?? 'active',
            'country_id' => $request->country_id,
            'position' => $request->position ?? 0,
            'type' => $request->type,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Category created successfully.',
            'data' => $category->load('country'),
        ], 201);
    }

    public function update(UpdateCategoryRequest $request, int $id): JsonResponse
    {

        $category = Category::find($id);

        if (! $category) {
            return response()->json([
                'success' => false,
                'message' => 'Category not found.',
            ], 404);
        }

        $this->authorize('update', $category);

        $category->update($request->validated());

        return response()->json([
            'success' => true,
            'message' => 'Category updated successfully.',
            'data' => $category->load('country'),
        ]);
    }

    public function destroy(int $id): JsonResponse
    {

        $category = Category::find($id);

        if (! $category) {
            return response()->json([
                'success' => false,
                'message' => 'Category not found.',
            ], 404);
        }

        $this->authorize('delete', $category);

        if ($category->products()->exists()) {
            return response()->json([
                'success' => false,
                'message' => 'Cannot delete category because it has products.',
            ], 422);
        }

        $category->delete();

        return response()->json([
            'success' => true,
            'message' => 'Category deleted successfully.',
        ]);
    }
}