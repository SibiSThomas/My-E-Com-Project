package study.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import study.model.Cart;
import study.repository.CartRepository;
import study.service.CartService;

@RestController
@CrossOrigin
public class CartController {
	
	@Autowired
	private CartService cartService;
	
	@Autowired
	private CartRepository cartRepository;
	
	@PostMapping("cart/add")
	public Cart addCart(@RequestBody Cart cart) {
		return cartService.addCart(cart);
		
	}
	
	@GetMapping("cart/findByBuyerId/{buyerId}")
	public List<Cart> findByBuyerId(@PathVariable int buyerId){
		return cartRepository.findByBuyerId(buyerId);
	} 
	
	@DeleteMapping("cart/delete/{cartId}")
	public void removeFromDBCart(@PathVariable int cartId) {
		cartRepository.deleteById(cartId);
	}
	
	@GetMapping("cart/findByBuyerIdAndProductId")
	public Cart findByBuyerIdAndProductId(@RequestParam int buyerId, int productId) {
		return cartRepository.findByBuyerIdAndProductId(buyerId, productId);
	}
	
}
