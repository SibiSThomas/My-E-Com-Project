package study.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;

import study.model.Buyer;
import study.service.BuyerService;

@RestController
@CrossOrigin
public class BuyerController {
	
	@Autowired
	private BuyerService buyerService;
	
	@GetMapping("buyer/findAll")
	public List<Buyer> findAll(){
		return buyerService.findAll();	
	}
	
	@PostMapping("buyer/login")
	public Buyer login(@RequestPart String email, String password) {
		return buyerService.buyerLogin(email,password);
	}
	@PostMapping("buyer/addBuyer")
	public Buyer addBuyer(@RequestBody Buyer buyer) {
		return buyerService.addBuyer(buyer);
	}
	
	
}
