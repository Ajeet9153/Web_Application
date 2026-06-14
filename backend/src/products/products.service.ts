import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  // Create a new product in the DB
  create(createProductDto: CreateProductDto) {
    const newProduct = this.productsRepository.create(createProductDto);
    return this.productsRepository.save(newProduct);
  }

  // Fetch all products from the DB
  findAll() {
    return this.productsRepository.find();
  }

  // Fetch a single product by ID
  async findOne(id: number) {
    const product = await this.productsRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  // Update a product
  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.findOne(id); // Ensure it exists first
    Object.assign(product, updateProductDto);
    return this.productsRepository.save(product);
  }

  // Delete a product
  async remove(id: number) {
    const product = await this.findOne(id);
    return this.productsRepository.remove(product);
  }
}