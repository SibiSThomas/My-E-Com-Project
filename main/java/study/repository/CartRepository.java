package study.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import study.model.Cart;

public interface CartRepository extends JpaRepository<Cart, Integer> {
	
	public List<Cart> findByBuyerId(int buyerId);
	public Cart findByBuyerIdAndProductId(int buyerId, int productId);

}
