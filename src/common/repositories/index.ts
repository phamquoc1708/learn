// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as paginate from 'mongoose-paginate-v2';
import {
  Document,
  PaginateModel,
  QueryOptions,
  SaveOptions,
  FilterQuery,
  PaginateOptions,
  UpdateQuery,
} from 'mongoose';
import {
  AppException,
  ErrorResponse,
} from 'src/common/exceptions/app.exception';
import { Errors } from 'src/common/contracts/error';
import { PopulateOptions } from 'mongoose';

export abstract class AbstractRepository<T extends Document> {
  public model: PaginateModel<T>;
  constructor(model: PaginateModel<T>) {
    this.model = model;
  }

  /**
   * Get a document include select and populate
   * @param param0
   */
  public findOne({
    conditions = {},
    projection,
    populates,
    options,
  }: {
    conditions: FilterQuery<T>;
    projection?: Record<string, any> | string;
    populates?: Array<PopulateOptions>;
    options?: QueryOptions;
  }): Promise<T | undefined> {
    const query = this.model.findOne(conditions, projection, options);
    query.populate(populates);
    return query.exec();
  }

  /**
   * Get a document include select and populate, throw error if there is no item
   * @param param0
   */
  public async firstOrFail({
    conditions,
    projection,
    options,
    populates,
    error,
  }: {
    conditions: FilterQuery<T>;
    projection?: Record<string, any> | string;
    populates?: Array<PopulateOptions>;
    options?: QueryOptions;
    error?: ErrorResponse;
  }): Promise<T> {
    const entity = await this.findOne({
      conditions,
      projection,
      populates,
      options,
    });
    if (entity) {
      return entity;
    }
    if (!error) {
      error = Errors.OBJECT_NOT_FOUND;
    }
    throw new AppException(error);
  }

  /**
   * Get documents include select, populate and sort
   * @param param0
   */
  public findMany(
    {
      conditions,
      projection,
      populates,
      sort,
      options,
    }: {
      conditions: FilterQuery<T>;
      projection?: Record<string, any>;
      populates?: Array<PopulateOptions>;
      sort?: Record<string, any>;
      options?: QueryOptions;
    } = { conditions: {} },
  ): Promise<Array<T>> {
    const query = this.model.find(conditions, projection, options);
    query.populate(populates);
    if (sort) {
      query.sort(sort);
    }
    return query.exec();
  }

  /**
   * get documents based on pagination
   * @param conditions
   * @param options
   */
  paginate(conditions: FilterQuery<T>, options?: PaginateOptions) {
    return this.model.paginate(conditions, options);
  }

  /**
   * create a entity
   * @param attributes
   */
  public async create(
    payload: Record<string, any>,
    options?: SaveOptions | undefined,
  ): Promise<T> {
    const entity = new this.model(payload);
    await entity.save(options);
    return entity;
  }

  /**
   * update one entity or throw error if there is no item
   * @param conditions
   * @param payload
   */
  public async updateOneOrFail(
    conditions: FilterQuery<T>,
    payload: object,
    options?: SaveOptions,
  ): Promise<T> {
    const data = await this.firstOrFail({ conditions });
    data.set(payload);
    return data.save(options);
  }

  /**
   *
   * @param conditions
   * @param payload
   * @param options
   */
  findOneAndUpdate(
    conditions: FilterQuery<T>,
    payload: UpdateQuery<T>,
    options?: QueryOptions,
  ) {
    return this.model.findOneAndUpdate(conditions, payload, options).exec();
  }

  /**
   *
   * @param conditions
   * @param payload
   * @param options
   */
  updateMany(
    conditions: FilterQuery<T>,
    payload: UpdateQuery<T>,
    options?: QueryOptions,
  ) {
    return this.model.updateMany(conditions, payload, options).exec();
  }

  /**
   *
   * @param conditions
   * @param options
   */
  removeOne(conditions: FilterQuery<T>, options?: QueryOptions) {
    return this.model.findOneAndRemove(conditions, options).exec();
  }

  /**
   *
   * @param conditions
   * @param options
   */
  removeMany(conditions: FilterQuery<T>, options?: QueryOptions) {
    return this.model.deleteMany(conditions, options).exec();
  }
}
