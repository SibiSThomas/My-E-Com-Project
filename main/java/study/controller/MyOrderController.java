package study.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import study.model.MyOrder;
import study.repository.MyOrderRepository;

@RestController
@CrossOrigin
public class MyOrderController {
	
//	@Autowired
//	private MyOrderService myOrderService;
	
	@Autowired 
	private MyOrderRepository myOrderRepository;

	@PostMapping("myOrder/add")
	public MyOrder saveOrder(@RequestBody MyOrder myOrder) {
		return myOrderRepository.save(myOrder);
		
	}
	@GetMapping("myOrder/findByBuyerId")
	public List<MyOrder> findByBuyerId(@RequestParam int buyerId){
		return myOrderRepository.findByBuyerId(buyerId);
	}
	
	@DeleteMapping("myOrder/delete")
	public void deleteOrder(@RequestParam int orderId) {
		myOrderRepository.deleteById(orderId);
	}
}
