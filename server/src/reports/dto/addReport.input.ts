import { Field, InputType } from '@nestjs/graphql';
import { MediaEnum, ReportEnum } from 'src/shared/enums';

@InputType()
export class AddReportInput {
  @Field(() => String, { nullable: true })
  userId?: string;

  @Field(() => MediaEnum, { nullable: true })
  mediaType?: MediaEnum;

  @Field({ nullable: true })
  mediaId?: string;

  @Field(() => ReportEnum)
  reportType: ReportEnum;

  @Field(() => String, { nullable: true })
  report?: string;
}
