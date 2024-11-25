import { Body, Controller, Delete, Get, Param, Patch, Post, Res } from '@nestjs/common';
import { getMessageEvent } from '@app/common/utils';
import { LogicalWhereExpr } from 'ottoman';
import { Response } from 'express';

import { NormService } from './norm.service';
import { Norm, NormDto } from './norm.schema';
import { RepositoryOptions } from './norm.repository';

@Controller()
export class NormController {
  constructor(private readonly service: NormService) {}

  @Get('count')
  count(@Body('filter') filter: LogicalWhereExpr<Norm>, @Body('options') options?: RepositoryOptions) {
    return this.service.count(filter, options);
  }

  @Post()
  create(@Body('doc') doc: NormDto, @Body('options') options?: RepositoryOptions) {
    return this.service.create(doc, options);
  }

  @Post('bulk')
  createBulk(@Body('docs') docs: NormDto[], @Body('options') options?: RepositoryOptions) {
    return this.service.createBulk(docs, options);
  }

  @Get()
  find(@Body('filter') filter: LogicalWhereExpr<Norm>, @Body('options') options?: RepositoryOptions) {
    return this.service.find(filter, options);
  }

  @Get('cursor')
  cursor(@Res() res: Response, @Body('filter') filter: LogicalWhereExpr<Norm>, @Body('options') options?: RepositoryOptions) {
    // Server Sent-Event Headers
    res.setHeader('Transfer-Encoding', 'chunked');
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'private, no-cache, no-store');

    this.service.cursor(filter, options).subscribe({
      next: (data) => res.write(getMessageEvent({ id: data.id, data })),
      error: (data) => res.end(getMessageEvent({ event: 'error', data })),
      complete: () => res.end(getMessageEvent({ type: 'close', event: 'end' })),
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Body('options') options?: RepositoryOptions) {
    return this.service.findOne({ id }, options);
  }

  @Delete(':id')
  deleteOne(@Param('id') id: string) {
    return this.service.deleteOne({ id });
  }

  @Patch('bulk')
  updateBulk(
    @Body('filter') filter: LogicalWhereExpr<Norm>,
    @Body('doc') doc: Partial<NormDto>,
    @Body('options') options?: RepositoryOptions,
  ) {
    return this.service.updateBulk(filter, doc, options);
  }

  @Patch(':id')
  updateOne(@Param('id') id: string, @Body('doc') doc: Partial<NormDto>, @Body('options') options?: RepositoryOptions) {
    return this.service.updateOne({ id }, doc, options);
  }
}
