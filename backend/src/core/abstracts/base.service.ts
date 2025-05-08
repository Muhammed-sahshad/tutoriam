import { Document, FilterQuery } from "mongoose";
import { IBaseRepository } from "../interfaces/repository/IBaseRepository";
import { IBaseService } from "../interfaces/service/IBaseService";

export abstract class BaseService<T extends Document> implements IBaseService<T> {
  constructor(protected repository: IBaseRepository<T>) {}

  async create(data: Partial<T>): Promise<T | null> {
    return await this.repository.create(data);
  }

  async findById(id: string): Promise<T | null> {
    return await this.repository.findById(id);
  }

  async update(id: string, data: Partial<T>): Promise<T | null> {
    return await this.repository.update(id, data);
  }

  async findByIdAndUpdate(id: string, data: Partial<T>): Promise<T | null> {
    return await this.repository.findByIdAndUpdate(id, data);
  }

  async delete(id: string): Promise<T | null> {
    return await this.repository.delete(id);
  }

  async findByIdAndDelete(id: string): Promise<T | null> {
    return await this.repository.delete(id)
  }

  async find(filter:FilterQuery<T>): Promise<T[] | null> {
    return await this.repository.find(filter)
  }

  async findAll(): Promise<T[] | null> {
    return await this.repository.findAll();
  }

  async findOne(data: Partial<T>): Promise<T | null> {
    return await this.repository.findOne(data);
  }

  async toggleStatus(id:string): Promise<T | null>{
    return await this.repository.toggleStatus(id)
  }
  // async findOneAndUpadate(filter: FilterQuery<T>, data: Partial<T>): Promise<T | null>{
  //   return await this.repository.findOneAndUpdate(filter, data)
  // }

  async findWithPagination(options: {
    filter?: FilterQuery<T>;
    sort?: Record<string, 1 | -1>;
    page?: number;
    limit?: number;
    populate?: string | string[];
  }): Promise<{
    data: T[];
    totalItems: number;
    totalPages: number;
    currentPage: number;
  }> {
    return await this.repository.findWithPagination(options);
  }
  

}