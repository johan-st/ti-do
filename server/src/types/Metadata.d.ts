import { UserId } from './'

export type Metadata = {
   owner: UserId
   readers: UserId[]
   writers: UserId[]
   admins: UserId[]
};
