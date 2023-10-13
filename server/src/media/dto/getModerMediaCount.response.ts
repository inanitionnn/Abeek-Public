import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ReportsCountResponse } from 'src/reports/dto/reportsCount.response';

@ObjectType()
export class GetModerMediaCountResponse {
  @Field(() => ReportsCountResponse, { nullable: true })
  reportsCount: ReportsCountResponse;

  @Field(() => Int, { nullable: true })
  mediaCount: number;
}
