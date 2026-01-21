<?php

namespace Tests\Feature;

use App\Models\Cart;
use App\Models\ProductCategory;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;
use App\Models\Product;

class HomeTest extends TestCase
{
    use RefreshDatabase;
    /**
     * A basic feature test example.
     */
    public function test_example(): void
    {
        $response = $this->get(route('home'));

        $response->assertStatus(200);
    }

    public function test_guest_user_redirect_to_login_when_adding_item_to_cart()
    {
        $response = $this->post("/cart/add/1");
        $response->assertRedirect(route('login', absolute: false));
    }

    public function test_auth_user_can_add_item_to_cart()
    {
        // Create user and authenticate
        $user = User::factory()->create();
        $this->actingAs($user);

        $productCategory = ProductCategory::create([
            "name" => "Test Category",
            "status" => "active"
        ]);

        // Create product (no factory version)
        $product = Product::create([
            'name' => 'Test Product',
            'image' => 'test.jpg',
            'description' => 'Test description',
            'price' => 100,
            'stock_quantity' => 5,
            'category_id' => $productCategory->id,
        ]);

        // Send request
        $response = $this->post("/cart/add/{$product->id}");

        $response->assertStatus(302);

        // Assert cart record exists
        $this->assertDatabaseHas('carts', [
            'user_id' => $user->id,
            'product_id' => $product->id,
        ]);
    }

    public function test_auth_user_can_remove_item_from_cart()
    {
        // Create user and authenticate
        $user = User::factory()->create();
        $this->actingAs($user);

        $productCategory = ProductCategory::create([
            "name" => "Test Category",
            "status" => "active"
        ]);

        // Create product (no factory version)
        $product = Product::create([
            'name' => 'Test Product',
            'image' => 'test.jpg',
            'description' => 'Test description',
            'price' => 100,
            'stock_quantity' => 5,
            'category_id' => $productCategory->id,
        ]);

        $cart = Cart::create([
            "user_id" => $user->id,
            "product_id" => $product->id,
            "quantity" => 1
        ]);

        // Send request
        $response = $this->delete("/cart/remove/{$product->id}");

        $response->assertStatus(302);

        // Assert cart record exists
        $this->assertDatabaseMissing('carts', [
            'id' => $cart->id
        ]);
    }

    public function test_auth_user_can_increase_quantity_in_cart()
    {
        // Create user and authenticate
        $user = User::factory()->create();
        $this->actingAs($user);

        $productCategory = ProductCategory::create([
            "name" => "Test Category",
            "status" => "active"
        ]);

        // Create product (no factory version)
        $product = Product::create([
            'name' => 'Test Product',
            'image' => 'test.jpg',
            'description' => 'Test description',
            'price' => 100,
            'stock_quantity' => 5,
            'category_id' => $productCategory->id,
        ]);

        $cart = Cart::create([
            "user_id" => $user->id,
            "product_id" => $product->id,
            "quantity" => 3
        ]);

        // Send request
        $response = $this->patch("/cart/update/{$product->id}", ["action" => "add"]);

        $response->assertStatus(302);

        // Assert cart record exists
        $this->assertDatabaseHas('carts', [
            'id' => $cart->id,
            'quantity' => 4
        ]);
    }

    public function test_auth_user_can_decrease_quantity_in_cart()
    {
        // Create user and authenticate
        $user = User::factory()->create();
        $this->actingAs($user);

        $productCategory = ProductCategory::create([
            "name" => "Test Category",
            "status" => "active"
        ]);

        // Create product (no factory version)
        $product = Product::create([
            'name' => 'Test Product',
            'image' => 'test.jpg',
            'description' => 'Test description',
            'price' => 100,
            'stock_quantity' => 5,
            'category_id' => $productCategory->id,
        ]);

        $cart = Cart::create([
            "user_id" => $user->id,
            "product_id" => $product->id,
            "quantity" => 3
        ]);

        // Send request
        $response = $this->patch("/cart/update/{$product->id}", ["action" => "sub"]);

        $response->assertStatus(302);

        // Assert cart record exists
        $this->assertDatabaseHas('carts', [
            'id' => $cart->id,
            'quantity' => 2
        ]);
    }

    public function test_auth_user_can_clear_cart()
    {
        // Create user and authenticate
        $user = User::factory()->create();
        $this->actingAs($user);

        $productCategory = ProductCategory::create([
            "name" => "Test Category",
            "status" => "active"
        ]);

        // Create product (no factory version)
        $product = Product::create([
            'name' => 'Test Product',
            'image' => 'test.jpg',
            'description' => 'Test description',
            'price' => 100,
            'stock_quantity' => 5,
            'category_id' => $productCategory->id,
        ]);

        $cart = Cart::create([
            "user_id" => $user->id,
            "product_id" => $product->id,
            "quantity" => 3
        ]);

        // Send request
        $response = $this->delete("/cart/clear");

        $response->assertStatus(302);

        // Assert cart record exists
        $this->assertDatabaseEmpty('carts');
    }
}
