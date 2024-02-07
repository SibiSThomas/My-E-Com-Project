package study.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;

import study.model.Seller;
import study.service.SellerService;

@RestController
@CrossOrigin
public class SellerController {
	
	@Autowired
	private SellerService sellerService;
	
	@GetMapping("seller/findAll")
	public List<Seller> findAll(){
		return sellerService.findAll();
	}
	
	@PostMapping("seller/addSeller")
	public Seller addSeller(@RequestBody Seller seller) {
		return sellerService.addSeller(seller);
	}
	
	@PostMapping("seller/login")
	public Seller sellerLogin(@RequestPart String sellerEmail, String sellerPassword) {
		return sellerService.sellerLogin(sellerEmail, sellerPassword);
		
	}
}
