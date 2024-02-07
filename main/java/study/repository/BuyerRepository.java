package study.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import study.model.Buyer;

public interface BuyerRepository extends JpaRepository<Buyer, Integer> {

}
