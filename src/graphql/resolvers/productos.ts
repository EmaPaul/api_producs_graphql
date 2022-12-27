import { ObjectID } from 'bson';
import { IResolvers} from 'graphql-tools';
import { Db } from 'mongodb';
import {PRODUCTS_COLLECTION} from '../../mongo/collections'
const productosResolvers: IResolvers ={
    Query:{
         async getProducts(root:void, args:any, context:Db){
            try{
                return await context.collection(PRODUCTS_COLLECTION).find().toArray()
            }catch(err){
                console.log(err);
            }
        },
        async getProduct(root: void, args:any, context:Db){
            try{
                const found = await context.collection(PRODUCTS_COLLECTION)
                .findOne({
                   _id: new ObjectID(args._id)
                })
                return found
            }catch(err){
                console.log(err)
            }

        },
        async searchProducts(root:void, args:any, context:Db){
            try{
                const regex = new RegExp(args.name,'i')
                const found = await context.collection(PRODUCTS_COLLECTION).find({name: regex}).toArray()
                return found
            }catch(err:any){
                return err.message
            }
        }
    },
    Mutation:{
        async createProduct(root:void, args:any, context:Db){
            try{
                const regexp = new RegExp(args.product.name,'i')
                const exists = await context.collection(PRODUCTS_COLLECTION).findOne({name:regexp})
                if(exists){
                    throw new Error('Error Product already exist')
                }
                await context.collection(PRODUCTS_COLLECTION).insertOne(args.product)
                return "product added successfully"
            }catch(err:any){
                return err.message
            }
        },

        async editProduct(root:void, args:any, context:Db){
            try{
                const exists = await context.collection(PRODUCTS_COLLECTION).findOne({_id: new ObjectID(args._id)})
                if(exists){
                    await context.collection(PRODUCTS_COLLECTION)
                    .updateOne(
                        { _id: new ObjectID(args._id)},
                        { $set: args.product}
                    )
                    return 'Product update'
                }
                throw new Error("Product does not exists");
            }catch(err){
                console.log(err)
            }
        }
    }
}

export default productosResolvers;