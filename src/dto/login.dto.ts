import { JsonObject, JsonProperty } from 'typescript-json-serializer';

@JsonObject()
export class LoginDTO {
	@JsonProperty({ name: 'userName', required: true })
	userName!: string;

	@JsonProperty({ name: 'password', required: true })
	password?: string;
}
