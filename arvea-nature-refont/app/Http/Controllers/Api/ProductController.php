<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(): JsonResponse
    {
        $query = Product::with(['category', 'country']);

        if (request()->filled('category_id')) {
            $query->where('category_id', request('category_id'));
        }

        if (request()->filled('country_id')) {
            $query->where('country_id', request('country_id'));
        }

        if (request()->filled('status')) {
            $query->where('status', request('status'));
        }

        if (request()->filled('search')) {
            $search = request('search');
            $query->where(function ($q) use ($search) {
                $q->where('name', 'ilike', "%{$search}%")
                  ->orWhere('slug', 'ilike', "%{$search}%")
                  ->orWhere('sku', 'ilike', "%{$search}%");
            });
        }

        $products = $query->orderByDesc('id')->paginate(10);

        return response()->json([
            'success' => true,
            'message' => 'Products retrieved successfully.',
            'data' => $products,
        ]);
    }

    public function show(int $id): JsonResponse
    {
        $product = Product::with(['category', 'country'])->find($id);

        if (! $product) {
            return response()->json([
                'success' => false,
                'message' => 'Product not found.',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'Product retrieved successfully.',
            'data' => $product,
        ]);
    }

    public function store(StoreProductRequest $request): JsonResponse
    {
        $this->authorize('create', Product::class);

        $product = Product::create([
            'name' => $request->name,
            'slug' => $request->slug,
            'sku' => $request->sku,
            'short_description' => $request->short_description,
            'price' => $request->price,
            'status' => $request->status ?? 'active',
            'category_id' => $request->category_id,
            'country_id' => $request->country_id,
            'image' => $request->image,
            'alt' => $request->alt,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Product created successfully.',
            'data' => $product->load(['category', 'country']),
        ], 201);
    }

    public function update(UpdateProductRequest $request, int $id): JsonResponse
    {

        $product = Product::find($id);

        if (! $product) {
            return response()->json([
                'success' => false,
                'message' => 'Product not found.',
            ], 404);
        }

        $this->authorize('update', $product);

        $product->update($request->validated());

        return response()->json([
            'success' => true,
            'message' => 'Product updated successfully.',
            'data' => $product->load(['category', 'country']),
        ]);
    }

    public function destroy(Request $request, int $id): JsonResponse
    {

        $product = Product::find($id);

        if (! $product) {
            return response()->json([
                'success' => false,
                'message' => 'Product not found.',
            ], 404);
        }

        $this->authorize('delete', $product);

        $product->delete();

        return response()->json([
            'success' => true,
            'message' => 'Product deleted successfully.',
        ]);
    }

    public function byCategory(int $categoryId): JsonResponse
    {
        $products = Product::with(['category', 'country'])
            ->where('category_id', $categoryId)
            ->paginate(10);

        return response()->json([
            'success' => true,
            'message' => 'Products by category retrieved successfully.',
            'data' => $products,
        ]);
    }

    public function byCountry(int $countryId): JsonResponse
    {
        $products = Product::with(['category', 'country'])
            ->where('country_id', $countryId)
            ->paginate(10);

        return response()->json([
            'success' => true,
            'message' => 'Products by country retrieved successfully.',
            'data' => $products,
        ]);
    }
}