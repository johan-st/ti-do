import { UserId } from './'

export type Metadata = {
   owner: UserId;
   readers: UserId[] | null;
   writers: UserId[] | null;
   admins: UserId[] | null;
};
