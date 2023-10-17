import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Role } from '../enums/role.enum'
import { Status } from "../enums/status.enum";

@Schema()
export class User {
    @Prop()
    _id: string;

    @Prop({ type: String, enum: Role, default: Role.User })
    role: Role;

    @Prop()
    email: string;

    @Prop()
    password: string;

    @Prop()
    country: string;

    @Prop()
    school: string;

    @Prop()
    company: string;

    @Prop()
    coverUrl: string;

    @Prop()
    totalFollowers: number;

    @Prop()
    totalFollowing: number;

    @Prop()
    quote: string;

    @Prop()
    socialLinks: string;

    @Prop({ type: String, enum: Status })
    status: Status;
}

export const UserSchema = SchemaFactory.createForClass(User);