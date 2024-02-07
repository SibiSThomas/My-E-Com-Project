package study.service;

import java.util.Iterator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import study.model.Buyer;
import study.repository.BuyerRepository;

@Service
public class BuyerServiceImpl implements BuyerService {

	@Autowired
	private BuyerRepository buyerRepository;

	@Override
	public List<Buyer> findAll() {
		return buyerRepository.findAll();
	}

	@Override
	public Buyer buyerLogin(String email, String password) {
		List<Buyer> list = findAll();
		Iterator<Buyer> itr = list.iterator();
		Buyer buyer = null;
		while (itr.hasNext()) {
			buyer = itr.next();
			if (buyer.getBuyerEmail().equals(email) && buyer.getBuyerPassword().equals(password)) {
				buyer.setBuyerPassword("");
				return buyer;
			}
		}
		return null;
	}

	@Override
	public Buyer addBuyer(Buyer buyer) {
		List<Buyer> list = findAll();
		Iterator<Buyer> itr = list.iterator();
		Buyer buyer1 = null;
		while(itr.hasNext()) {
			buyer1 = itr.next();
			if(buyer.getBuyerEmail().equals(buyer1.getBuyerEmail())) {
				return null;
			}	
		}
		buyerRepository.save(buyer);
		return buyer;
	}

}
