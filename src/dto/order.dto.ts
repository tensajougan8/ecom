import { JsonObject, JsonProperty } from "typescript-json-serializer";
import { ProductDTO } from "./product.dto";

@JsonObject()
export class OrderDTO {
    @JsonProperty({ name: '_id' })
	_id?: string | undefined;

	@JsonProperty({ name: 'buyerID', })
	buyerID!: string;

	@JsonProperty({ name: 'productID' })
	productID!: [string];

    @JsonProperty({ name: 'sellerID', })
	sellerID?: string;
}