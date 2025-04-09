import { BaseRepository } from "../core/abstracts/base.repository";
import { ICategoryRepository } from "../core/interfaces/repository/ICategoryRepository";
import { Category, ICategory } from "../models/Category";

export class CategoryRepository extends BaseRepository<ICategory> implements ICategoryRepository{
    constructor() {
        super(Category);
    }
    async toggleCategoryStatus(id: string): Promise<ICategory | null> {
        return Category.findByIdAndUpdate(
            id,
        [
            {
                $set: {
                    status: {
                        $cond: { if: { $eq: ["$status", true] }, then: false, else: true }
                    }
                }
            }
        ],
        { new: true }
        );
    }

    async getAllCategories(filter:any, skip:number, limit:number, sort:any): Promise<ICategory[]> {
        return Category.find(filter).skip(skip).limit(limit).sort(sort).populate("subcategories").exec();
    }

    async getListedCategories():Promise<ICategory[] | null>{
        return await Category.find({status:true})
    }
}