type User = {
   userId: UserId;
   fullName: FullName;
   email: Email;
   passwordHash: string;
   hashType: string;
   hashSalt: string;
   tagline: string;
   avatar: string;
};

type UserId = string
type Email = string
type FullName = string

export { User, UserId, Email, FullName }
