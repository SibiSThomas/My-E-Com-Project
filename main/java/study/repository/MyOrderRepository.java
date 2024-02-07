package study.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import study.model.MyOrder;

public interface MyOrderRepository extends JpaRepository<MyOrder, Integer> {
	
	public List<MyOrder> findByBuyerId(int buyerId);
}
