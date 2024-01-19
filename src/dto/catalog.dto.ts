import { JsonObject, JsonProperty } from "typescript-json-serializer";
import { ProductDTO } from "./product.dto";

@JsonObject()
export class CatalogDTO{
    @JsonProperty({ name: '_id' })
	_id?: string | undefined;

    @JsonProperty({ name: 'sellerID', })
    sellerID!: string;

    @JsonProperty({ name: 'products' })
    products?: ProductDTO[];
}