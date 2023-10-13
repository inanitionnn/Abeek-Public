import { Logger, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ReportsService } from './reports.service';
import { CurrentUser, Roles } from 'src/auth/decorators';
import { SuccessResponse, User } from 'src/shared/dto';
import { GqlAccessGuard, ReportGuard, RolesGuard } from 'src/auth/guards';
import { AddReportInput } from './dto';
import { RolesEnum } from 'src/shared/enums';
import { ModerReportAccountResponse } from './dto/moderReportAccount.response';
import { ModerReportNoteResponse } from './dto/moderReportNote.response';

@Resolver()
export class ReportsResolver {
  constructor(private reportsService: ReportsService) {}

  private readonly logger = new Logger(ReportsResolver.name);

  @UseGuards(RolesGuard)
  @Roles(RolesEnum.Moder, RolesEnum.Admin)
  @UseGuards(GqlAccessGuard)
  @Query((returns) => ModerReportAccountResponse, { nullable: true })
  async getModerReportAccount(): Promise<ModerReportAccountResponse> {
    this.logger.log('Get moder reports...');

    const res = await this.reportsService.getModerReportAccount();
    return res;
  }

  @UseGuards(RolesGuard)
  @Roles(RolesEnum.Moder, RolesEnum.Admin)
  @UseGuards(GqlAccessGuard)
  @Mutation((returns) => SuccessResponse)
  async deleteReport(
    @Args('reportId') reportId: string,
  ): Promise<SuccessResponse> {
    this.logger.log('Get moder reports...');

    const res = await this.reportsService.deleteReport(reportId);
    return res;
  }

  @UseGuards(RolesGuard)
  @Roles(RolesEnum.Moder, RolesEnum.Admin)
  @UseGuards(GqlAccessGuard)
  @Query((returns) => ModerReportNoteResponse, { nullable: true })
  async getModerReportNote(): Promise<ModerReportNoteResponse> {
    this.logger.log('Get moder reports...');

    const res = await this.reportsService.getModerReportNote();
    console.log(res);
    return res;
  }

  @UseGuards(ReportGuard)
  @UseGuards(GqlAccessGuard)
  @Mutation((returns) => SuccessResponse, { nullable: true })
  async addReport(
    @CurrentUser() user: User,
    @Args('addReportInput') addReportInput: AddReportInput,
  ): Promise<SuccessResponse> {
    this.logger.log('Add report...');

    const res = await this.reportsService.addReport(user.id, addReportInput);
    return res;
  }
}
