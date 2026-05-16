import { models, model, Schema } from 'mongoose';



interface IUser {
  name: string;
  email: string;
  password: string;
}


const UserSchema: Schema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  
}
,{
  timestamps: true,
}
);

const UserModel = models.User || model<IUser>('User', UserSchema);

export default UserModel