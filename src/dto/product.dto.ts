import { JsonObject, JsonProperty } from "typescript-json-serializer";

@JsonObject()
export class ProductDTO {
    @JsonProperty({ name: '_id' })
	_id?: string | undefined;

    @JsonProperty({ name: 'price' })
	name!: string;

    @JsonProperty({ name: 'price' })
	price!: number;

    @JsonProperty({ name: 'catalogID' })
	catalogID?: string;
}