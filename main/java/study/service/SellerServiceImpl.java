package study.service;

import java.util.Iterator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import study.model.Seller;
import study.repository.SellerRepository;

@Service
public class SellerServiceImpl implements SellerService {

	@Autowired
	private SellerRepository sellerRepository;
	
	@Override
	public List<Seller> findAll() {
		return sellerRepository.findAll();
	}

	@Override
	public Seller addSeller(Seller seller) {
		List<Seller> list= findAll();
		Iterator<Seller> itr = list.iterator();
		Seller s = new Seller();
		while(itr.hasNext()) {
			s = itr.next();
			if(s.getSellerEmail().equals(seller.getSellerEmail())) {
				return null;
			}
		}	
		sellerRepository.save(seller);
		seller.setSellerPassword("");
		return seller;
	}

	@Override
	public Seller sellerLogin(String sellerEmail, String sellerPassword) {
		List<Seller> list = findAll();
		Iterator<Seller> itr = list.iterator();
		Seller s = new Seller();
		while(itr.hasNext()) {
			s = itr.next();
			if(s.getSellerEmail().equals(sellerEmail) && s.getSellerPassword().equals(sellerPassword)) {
				s.setSellerPassword("");
				return s;
			}
		}
		return null;
	}
	
	

}
