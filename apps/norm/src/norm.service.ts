import { IDocument, LogicalWhereExpr } from 'ottoman';
import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

import { Norm, NormDto, NormSerializer } from './norm.schema';
import { NormRepository, RepositoryOptions } from './norm.repository';

@Injectable()
export class NormService {
  constructor(private readonly repository: NormRepository) {}

  count(filter: LogicalWhereExpr<Norm>, options?: RepositoryOptions): Promise<number> {
    return this.repository.count(filter, options);
  }

  create(doc: NormDto, options?: RepositoryOptions): Promise<IDocument<NormSerializer>> {
    return this.repository.create(doc, options);
  }

  createBulk(docs: NormDto[], options?: RepositoryOptions): Promise<IDocument<NormSerializer>[]> {
    return this.repository.createBulk(docs, options);
  }

  find(filter: LogicalWhereExpr<Norm>, options?: RepositoryOptions): Promise<IDocument<NormSerializer>[]> {
    return this.repository.find(filter, options);
  }

  cursor(filter: LogicalWhereExpr<Norm>, options?: RepositoryOptions): Observable<IDocument<NormSerializer>> {
    return this.repository.cursor(filter, options);
  }

  findOne(filter: LogicalWhereExpr<Norm>, options?: RepositoryOptions): Promise<IDocument<NormSerializer>> {
    return this.repository.findOne(filter, options);
  }

  findById(id: string, options?: RepositoryOptions): Promise<IDocument<NormSerializer>> {
    return this.repository.findById(id, options);
  }

  deleteOne(filter: LogicalWhereExpr<Norm>): Promise<IDocument<NormSerializer>> {
    return this.repository.deleteOne(filter);
  }

  deleteById(id: string): Promise<IDocument<NormSerializer>> {
    return this.repository.deleteById(id);
  }

  updateOne(
    filter: LogicalWhereExpr<Norm>,
    doc: Partial<NormDto>,
    options?: RepositoryOptions,
  ): Promise<IDocument<NormSerializer>> {
    return this.repository.updateOne(filter, doc, options);
  }

  updateById(id: string, doc: Partial<NormDto>, options?: RepositoryOptions): Promise<IDocument<NormSerializer>> {
    return this.repository.updateById(id, doc, options);
  }

  updateBulk(filter: LogicalWhereExpr<Norm>, doc: Partial<NormDto>, options?: RepositoryOptions) {
    return this.repository.updateBulk(filter, doc, options);
  }
}
