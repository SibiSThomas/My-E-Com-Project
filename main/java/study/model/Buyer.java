package study.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Buyer {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int BuyerId;
	private String BuyerName;
	private String BuyerPassword;
	@Column(unique = true)
	private String BuyerEmail;
	private String BuyerAddress;
	private String BuyerMobile;
	
	public Buyer() {}

	public Buyer(String buyerName, String buyerPassword, String buyerEmail, String buyerAddress, String buyerMobile) {
		super();
		BuyerName = buyerName;
		BuyerPassword = buyerPassword;
		BuyerEmail = buyerEmail;
		BuyerAddress = buyerAddress;
		BuyerMobile = buyerMobile;
	}

	public String getBuyerName() {
		return BuyerName;
	}

	public void setBuyerName(String buyerName) {
		BuyerName = buyerName;
	}

	public String getBuyerPassword() {
		return BuyerPassword;
	}

	public void setBuyerPassword(String buyerPassword) {
		BuyerPassword = buyerPassword;
	}

	public String getBuyerEmail() {
		return BuyerEmail;
	}

	public void setBuyerEmail(String buyerEmail) {
		BuyerEmail = buyerEmail;
	}

	public String getBuyerAddress() {
		return BuyerAddress;
	}

	public void setBuyerAddress(String buyerAddress) {
		BuyerAddress = buyerAddress;
	}

	public String getBuyerMobile() {
		return BuyerMobile;
	}

	public void setBuyerMobile(String buyerMobile) {
		BuyerMobile = buyerMobile;
	}

	public int getBuyerId() {
		return BuyerId;
	}
	
	
}
