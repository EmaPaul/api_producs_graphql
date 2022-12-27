import { GraphQLSchema } from "graphql";
import { mergeSchemas } from "graphql-tools";
import "graphql-import-node";
import productos from './schemas/productos.graphql';
import productosResolvers from "./resolvers/productos";


export const schema: GraphQLSchema = mergeSchemas({
    schemas:[
        productos,
    ],
    resolvers:[
        productosResolvers,
    ]
})