import { JsonObject, JsonProperty } from 'typescript-json-serializer';
import { UserType } from '../models/user';

@JsonObject()
export class UserDTO {
	@JsonProperty({ name: '_id' })
	_id?: string | undefined;

	@JsonProperty({ name: 'userName', required: true })
	userName!: string;

	@JsonProperty({ name: 'password' })
	password?: string;

	@JsonProperty({ name: 'userType' })
	userType!: UserType;
}
