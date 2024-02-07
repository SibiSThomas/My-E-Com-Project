package study.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import study.model.Product;
import study.repository.ProductRepository;
import study.service.ProductService;

@RestController
@CrossOrigin
public class ProductController {
	
	@Autowired
	private ProductService productService;
	
	@Autowired
	private ProductRepository productRepository;
	
	@PostMapping("product/add")
	public Product addProduct(@RequestPart MultipartFile file, int sellerId, String productName,
			int productPrice, String productColor, int productQuantity, String productDescription) {
				
		return productService.addProduct(file, sellerId, productName, productPrice, productColor,
						productQuantity, productDescription);
		
	}
	
	@GetMapping("product/findBySellerId/{sellerId}")
	public List<Product> findBySellerId(@PathVariable int sellerId){
		return productRepository.findBySellerId(sellerId);
		
	}
	
	@DeleteMapping("product/deleteProduct/{productId}")
	public void deleteById(@PathVariable int productId) {
		productRepository.deleteById(productId);
	}
	
	@GetMapping("product/findById/{productId}")
	public Product findProduct(@PathVariable int productId) {
		return productService.findById(productId);	
	}
	
	@PostMapping("product/updateProduct")
	public Product updateProduct(@RequestPart MultipartFile file,int sellerId, String productName,
	int productPrice, String productColor, int productQuantity, String productDescription, int productId) {
			
		return productService.updateProduct(file, sellerId, productName, productPrice, productColor,
				productQuantity, productDescription, productId);
		
	}
	@GetMapping("product/findAll")
	public List<Product> findAll(){
		return productRepository.findAll();
	}
	
	//After placing the order, quantity of a product will be reduced in the product table
	@GetMapping("product/subtractQty")
	public void subtractQty(@RequestParam int productId, int qty) {
		Product product = findProduct(productId);
		int newQty = product.getProductQuantity() - qty;
		product.setProductQuantity(newQty);
		productRepository.save(product);
	}
	
	//On Canceling an order product quantity should be increased in the product table
	@GetMapping("product/addQty")
	public void addQuantity(@RequestParam int productId, int qty) {
		Product product = findProduct(productId);
		product.setProductQuantity(product.getProductQuantity() + qty);
		productRepository.save(product);
	}
}
