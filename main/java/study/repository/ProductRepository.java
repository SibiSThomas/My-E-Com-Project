package study.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import study.model.Product;

public interface ProductRepository extends JpaRepository<Product, Integer> {
	
	public List<Product> findBySellerId(int sellerId);

}
