package study.model;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;

@Entity
public class MyOrder {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int myOrderId;
	private LocalDate orderDate;
	private String status;
	private int cartId;
	private int sellerId;
	private int buyerId;
	private int productId;
	private String productName;
	private int productPrice;
	private String productColor;
	private int orderedQuantity;
	private String productDescription;
	@Lob
	@Column(columnDefinition = "LONGBLOB", length = 999999999)
	private String productImage;
	
	public MyOrder() {}

	public MyOrder(LocalDate orderDate, String status, int cartId, int sellerId, int buyerId, int productId,
			String productName, int productPrice, String productColor, int orderedQuantity, String productDescription,
			String productImage) {
		super();
		this.orderDate = orderDate;
		this.status = status;
		this.cartId = cartId;
		this.sellerId = sellerId;
		this.buyerId = buyerId;
		this.productId = productId;
		this.productName = productName;
		this.productPrice = productPrice;
		this.productColor = productColor;
		this.orderedQuantity = orderedQuantity;
		this.productDescription = productDescription;
		this.productImage = productImage;
	}

	public LocalDate getOrderDate() {
		return orderDate;
	}

	public void setOrderDate(LocalDate orderDate) {
		this.orderDate = orderDate;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public int getCartId() {
		return cartId;
	}

	public void setCartId(int cartId) {
		this.cartId = cartId;
	}

	public int getSellerId() {
		return sellerId;
	}

	public void setSellerId(int sellerId) {
		this.sellerId = sellerId;
	}

	public int getBuyerId() {
		return buyerId;
	}

	public void setBuyerId(int buyerId) {
		this.buyerId = buyerId;
	}

	public int getProductId() {
		return productId;
	}

	public void setProductId(int productId) {
		this.productId = productId;
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

	public int getOrderedQuantity() {
		return orderedQuantity;
	}

	public void setOrderedQuantity(int orderedQuantity) {
		this.orderedQuantity = orderedQuantity;
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

	public int getMyOrderId() {
		return myOrderId;
	}
		
}
