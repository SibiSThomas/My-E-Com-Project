package study.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import study.model.Seller;

public interface SellerRepository extends JpaRepository<Seller, Integer> {

}
