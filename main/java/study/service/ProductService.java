package study.service;

import org.springframework.web.multipart.MultipartFile;

import study.model.Product;

public interface ProductService {

	Product addProduct(MultipartFile file, int sellerId, String productName, 
			int productPrice, String productColor,int productQuantity, 
			String productDescription);

	Product findById(int productId);

	Product updateProduct(MultipartFile file, int sellerId, String productName, int productPrice, String productColor,
			int productQuantity, String productDescription, int productId);

}
