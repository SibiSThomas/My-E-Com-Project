package study.service;

import java.util.List;

import study.model.Buyer;

public interface BuyerService {

	List<Buyer> findAll();

	Buyer buyerLogin(String email, String password);

	Buyer addBuyer(Buyer buyer);

}
