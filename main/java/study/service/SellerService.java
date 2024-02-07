package study.service;

import java.util.List;

import study.model.Seller;

public interface SellerService {

	List<Seller> findAll();

	Seller addSeller(Seller seller);

	Seller sellerLogin(String sellerEmail, String sellerPassword);

}
