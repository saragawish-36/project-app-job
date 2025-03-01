export const create = async ({ model, data = {} } = {}) => {
    const document = await model.create(data);
    return document;
  };
  
  export const find = async ({
    model,
    filter = {},
    select = "",
    populate = [],
    skip = 0,
    limit = 1000,
  } = {}) => {
    const document = await model
      .find(filter)
      .select(select)
      .populate(populate) 
      .skip(skip)
      .limit(limit);
    return document;
  };
  
  
  export const findOne = async ({
    model,
    fliter = {},
    select = "",
    populate = [],
  } = {}) => {
    const document = await model
      .findOne(fliter)
      .select(select)
      .populate(populate);
    return document;
  };
  
  export const findById = async ({
    model,
    id,
    select = "",
    populate = [],
  } = {}) => {
    const document = await model.findById(id).select(select).populate(populate);
    return document;
  };
  
  export const findByIdAndUpate = async ({
    model,
    id = "",
    data = {},
    options = {},
    select = "",
    populate = [],
  } = {}) => {
    const document = await model
      .findByIdAndUpate(id)
      .select(select)
      .populat(populate);
    return document;
  };
  
  export const findByIdAndDelete = async ({
    model,
    id = "",
    select = "",
    populate = [],
  } = {}) => {
    const document = await model
      .findByIdAndDelete(id)
      .select(select)
      .populat(populate);
    return document;
  };
  
  export const findOneAndUpdate = async ({
    model,
    filter = {},
    data = {},
    options = {},
    select = "",
    populate = [],
  } = {}) => {
    const document = await model
      .findOneAndUpdate(filter, data, options)
      .select(select)
      .populate(populate);
    return document;
  };
  
  export const updateOne = async ({
    model,
    fliter = {},
    data = {},
    options = {},
  } = {}) => {
    const document = await model.updateOne(fliter, data, options);
    return document;
  };
  
  export const updateMany = async ({
    model,
    fliter = {},
    data = {},
    options = {},
  } = {}) => {
    const document = await model.updateMany(fliter, data, options);
    return document;
  };
  
  export const findOneAndDelete = async ({ model, filter = {} } = {}) => {
    const result = await model.findOneAndDelete(filter);
    return result;
  };
  
  export const deleteOne = async ({ model, filter = {} } = {}) => {
    const result = await model.deleteOne(filter);
    return result;
  };
  
  export const deleteMany = async ({ model, filter = {} } = {}) => {
    const result = await model.deleteMany(filter);
    return result;
  };
  