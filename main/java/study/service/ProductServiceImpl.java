package study.service;

import java.io.IOException;
import java.util.Base64;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import study.model.Product;
import study.repository.ProductRepository;

@Service
public class ProductServiceImpl implements ProductService {

	@Autowired
	private ProductRepository productRepository;

	@Override
	public Product addProduct(MultipartFile file, int sellerId, String productName, int productPrice,
			String productColor, int productQuantity, String productDescription) {

		Product p = new Product();
		p.setSellerId(sellerId);
		p.setProductName(productName);
		p.setProductPrice(productPrice);
		p.setProductColor(productColor);
		p.setProductQuantity(productQuantity);
		p.setProductDescription(productDescription);
		try {
			String image = Base64.getEncoder().encodeToString(file.getBytes());
			p.setProductImage(image);
		} catch (IOException e) {
		}
		return productRepository.save(p);
	}

	@Override
	public Product findById(int productId) {
		Optional<Product> obj = productRepository.findById(productId);
		Product p = obj.get();
		return p;
	}

	@Override
	public Product updateProduct(MultipartFile file, int sellerId, String productName, int productPrice,
			String productColor, int productQuantity, String productDescription, int productId) {
		
		Product product = findById(productId);
		product.setSellerId(sellerId);	
		product.setProductName(productName);
		product.setProductPrice(productPrice);
		product.setProductColor(productColor);
		product.setProductQuantity(productQuantity);
		product.setProductDescription(productDescription);
		
		try {
			String image = Base64.getEncoder().encodeToString(file.getBytes());
			product.setProductImage(image);
		} catch (IOException e) {
			e.printStackTrace();
		}
		return productRepository.save(product);
	}

}
