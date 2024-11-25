import { IDocument, LogicalWhereExpr, ModelTypes, SearchConsistency, SortType, TransactionAttemptContext } from 'ottoman';
import { FieldsBaseType } from 'ottoman/lib/types/model/populate.types';
import { InjectModel } from '@app/sdk/ottoman';
import { Injectable } from '@nestjs/common';
import { from, Observable } from 'rxjs';

import { Norm, NormDto, NormSerializer } from './norm.schema';

export type RepositoryOptions = {
  // find method
  skip?: number;
  limit?: number;
  sort?: Record<string, SortType>;
  populate?: FieldsBaseType; // Not support by findById: PopulateSelectType
  select?: string | string[]; // Not support by findById: ISelectType[]
  consistency?: SearchConsistency;

  // all method's
  transactionContext?: TransactionAttemptContext;
};

@Injectable()
export class NormRepository {
  constructor(@InjectModel('norm') readonly model: ModelTypes<NormDto, NormSerializer>) {}

  count(filter: LogicalWhereExpr<Norm>, options?: RepositoryOptions): Promise<number> {
    return this.model.count(filter, options);
  }

  create(doc: NormDto, options?: RepositoryOptions): Promise<IDocument<NormSerializer>> {
    return this.model.create<NormSerializer>(doc, options);
  }

  createBulk(docs: NormDto[], options?: RepositoryOptions): Promise<IDocument<NormSerializer>[]> {
    return Promise.all(docs.map((doc) => this.model.create<NormSerializer>(doc, options)));
  }

  async find(filter: LogicalWhereExpr<Norm>, options?: RepositoryOptions): Promise<IDocument<NormSerializer>[]> {
    const result = await this.model.find(filter, options);
    return result.rows;
  }

  cursor(filter: LogicalWhereExpr<Norm>, options?: RepositoryOptions): Observable<IDocument<NormSerializer>> {
    return new Observable<IDocument<NormSerializer>>((subscriber) => {
      let skip = 0;
      while (skip < 4) {
        const temp = skip;
        from(this.model.findOne(filter, { ...options, skip })).subscribe({
          next: (doc) => subscriber.next(doc),
          error: (err) => subscriber.error(err),
          complete: () => temp === 3 && subscriber.complete(),
        });
        skip++;
      }
    });
  }

  findOne(filter: LogicalWhereExpr<Norm>, options?: RepositoryOptions): Promise<IDocument<NormSerializer>> {
    return this.model.findOne(filter, options);
  }

  findById(id: string, options?: RepositoryOptions): Promise<IDocument<NormSerializer>> {
    return this.model.findById(id, options);
  }

  deleteOne(filter: LogicalWhereExpr<Norm>): Promise<IDocument<NormSerializer>> {
    return this.model.findOneAndRemove(filter);
  }

  deleteById(id: string): Promise<IDocument<NormSerializer>> {
    return this.model.findOneAndRemove({ id });
  }

  updateOne(
    filter: LogicalWhereExpr<Norm>,
    doc: Partial<NormDto>,
    options?: RepositoryOptions,
  ): Promise<IDocument<NormSerializer>> {
    return this.model.findOneAndUpdate(filter, doc, options);
  }

  updateById(id: string, doc: Partial<NormDto>, options?: RepositoryOptions): Promise<IDocument<NormSerializer>> {
    return this.model.updateById(id, doc, options);
  }

  async updateBulk(filter: LogicalWhereExpr<Norm>, doc: Partial<NormDto>, options?: RepositoryOptions) {
    const result = await this.model.updateMany(filter, doc, options);
    return result.message.success;
  }
}
