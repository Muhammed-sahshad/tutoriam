import mongoose from "mongoose";
import { ICartRepository } from "../core/interfaces/repository/ICartRepository";
import { Cart, ICart } from "../models/Cart";
import { BaseRepository } from "../core/abstracts/base.repository";

export class CartRepository extends BaseRepository<ICart> implements ICartRepository{
 constructor(){
    super(Cart)
 }
    async addItemToCart(userId: string, courseId: string): Promise<ICart | null> {
        const courseObjectId = new mongoose.Types.ObjectId(courseId);

        return await Cart.findOneAndUpdate(
            { userId: new mongoose.Types.ObjectId(userId) }, 
            { $addToSet: { courses: courseObjectId } }, 
            { new: true } 
        );
    }

    
    async removeItemFromCart(userId: string, courseId: string): Promise<ICart | null> {
        const courseObjectId = new mongoose.Types.ObjectId(courseId);

        return await Cart.findOneAndUpdate(
            { userId: new mongoose.Types.ObjectId(userId) }, 
            { $pull: { courses: courseObjectId } },
            { new: true }
        );
    }

    async getCartItems(userId: string): Promise<ICart | null> {
        return await Cart.findOne({ userId: new mongoose.Types.ObjectId(userId) })
        .populate({
            path: 'courses', 
            populate: {
              path: 'instructorId', 
              model: 'User'
            }
          });
    }
}