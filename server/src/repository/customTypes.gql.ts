// import { GraphQLScalarType, GraphQLError } from 'graphql'

// const validateUuid_v4 = (value: string) => {
//   const regex = /[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}/
//   const lower = value.toLowerCase()
//   if (regex.test(lower)) {
//     return value
//   } else {
//     throw new GraphQLError('invalid uuid.v4')
//   }
// }

// const validateUuid_v4Lit = (ast: any) => {
//   const regex = /[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}/
//   const lower = ast.value.toLowerCase()
//   if (regex.test(lower)) {
//     return ast.value
//   } else {
//     throw new GraphQLError('invalid uuid.v4')
//   }
// }

// export const UserId = new GraphQLScalarType({
//   name: 'UserId',
//   serialize: validateUuid_v4,
//   parseValue: validateUuid_v4,
//   parseLiteral: validateUuid_v4Lit
// })


