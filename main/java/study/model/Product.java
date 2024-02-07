package study.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;

@Entity
public class Product {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int productId;
	private int sellerId;
	private String productName;
	private int productPrice;
	private String productColor;
	private int productQuantity;
	private String productDescription;
	@Lob
	@Column(columnDefinition = "LONGBLOB", length = 999999999)
	private String productImage;
	
	public Product() {}

	public Product(int sellerId, String productName, int productPrice, String productColor, int productQuantity,
			String productDescription, String productImage) {
		super();
		this.sellerId = sellerId;
		this.productName = productName;
		this.productPrice = productPrice;
		this.productColor = productColor;
		this.productQuantity = productQuantity;
		this.productDescription = productDescription;
		this.productImage = productImage;
	}

	public int getSellerId() {
		return sellerId;
	}

	public void setSellerId(int sellerId) {
		this.sellerId = sellerId;
	}

	public String getProductName() {
		return productName;
	}

	public void setProductName(String productName) {
		this.productName = productName;
	}

	public int getProductPrice() {
		return productPrice;
	}

	public void setProductPrice(int productPrice) {
		this.productPrice = productPrice;
	}

	public String getProductColor() {
		return productColor;
	}

	public void setProductColor(String productColor) {
		this.productColor = productColor;
	}

	public int getProductQuantity() {
		return productQuantity;
	}

	public void setProductQuantity(int productQuantity) {
		this.productQuantity = productQuantity;
	}

	public String getProductDescription() {
		return productDescription;
	}

	public void setProductDescription(String productDescription) {
		this.productDescription = productDescription;
	}

	public String getProductImage() {
		return productImage;
	}

	public void setProductImage(String productImage) {
		this.productImage = productImage;
	}

	public int getProductId() {
		return productId;
	}
}
