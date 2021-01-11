import * as Joi from 'joi'


export const ListNodeSchema = Joi.object({
  nodeId: Joi.string()
    .pattern(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)
    .required(),
  completed: Joi.boolean()
    .required(),
  title: Joi.string()
    .required(),
  notes: Joi.string().allow(null),
  subNodes: Joi.any()
})

export const ListNodeArraySchema = Joi.array().items(ListNodeSchema)