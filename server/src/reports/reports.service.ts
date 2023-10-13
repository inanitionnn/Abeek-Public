import { Inject, Injectable, Logger } from '@nestjs/common';
import { AddReportInput } from './dto';
import { SuccessResponse } from 'src/shared/dto';
import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
} from 'src/shared/errors';
import { ReportEnum } from 'src/shared/enums';
import { ReportsCountResponse } from './dto/reportsCount.response';
import { ModerReportAccountResponse } from './dto/moderReportAccount.response';
import { UsersService } from 'src/users/users.service';
import { UserMediaService } from 'src/user-media/user-media.service';
import { ModerReportNoteResponse } from './dto/moderReportNote.response';

@Injectable()
export class ReportsService {
  constructor(
    @Inject('PG_CONNECTION') private db,
    private usersService: UsersService,
    private userMediaService: UserMediaService,
  ) {}

  private readonly logger = new Logger(ReportsService.name);

  public async addReport(
    informerId: string,
    dto: AddReportInput,
  ): Promise<SuccessResponse> {
    this.logger.log('Add report (start)');
    const { reportType, mediaId, mediaType, report, userId } = dto;
    let res;
    try {
      switch (reportType) {
        case ReportEnum.account: {
          const selectReportsQuery = {
            text: `
            SELECT * FROM "reports"
            WHERE type = $1 AND "informerId" = $2 AND "userId" = $3`,
            values: [reportType, informerId, userId],
          };

          this.logger.debug(`Executing query: (selectReportsQuery)`);
          res = await this.db.query(selectReportsQuery);
          break;
        }
        case ReportEnum.media: {
          const selectReportsQuery = {
            text: `
            SELECT * FROM "reports"
            WHERE type = $1 AND "mediaId" = $2 AND "mediaType" = $3 AND "informerId" = $4`,
            values: [reportType, mediaId, mediaType, informerId],
          };

          this.logger.debug(`Executing query: (selectReportsQuery)`);
          res = await this.db.query(selectReportsQuery);
          break;
        }
        case ReportEnum.note: {
          const selectReportsQuery = {
            text: `
            SELECT * FROM "reports"
            WHERE type = $1 AND "mediaId" = $2 AND "mediaType" = $3 AND "informerId" = $4 AND "userId" = $5`,
            values: [reportType, mediaId, mediaType, informerId, userId],
          };

          this.logger.debug(`Executing query: (selectReportsQuery)`);
          res = await this.db.query(selectReportsQuery);
          break;
        }
      }
    } catch (err) {
      this.logger.error('Add report (error)', err);
      throw new InternalServerError('Add report error');
    }

    if (res.rows[0]) {
      this.logger.warn('Add report error');
      throw new BadRequestError('You have already submitted a report before');
    }

    try {
      const addReportQuery = {
        text: `
        INSERT INTO "reports" ("type", "informerId", "mediaType", "mediaId", "userId", "report")
        VALUES ($1, $2, $3, $4, $5, $6);`,
        values: [
          reportType,
          informerId,
          mediaType || null,
          mediaId || null,
          userId || null,
          report ? report.substring(0, 510) : null,
        ],
      };

      this.logger.debug(`Executing query: (addReportQuery)`);

      await this.db.query(addReportQuery);
    } catch (err) {
      this.logger.error('Add report (error)', err);
      throw new InternalServerError('Add report error');
    }
    this.logger.log('Add report (end)');
    return { success: true };
  }

  public async getReportsCount(): Promise<ReportsCountResponse> {
    try {
      this.logger.log('Get reports count (start)');
      const getReportsCountQuery = {
        text: `
        SELECT
          SUM(CASE WHEN  "type" = '${ReportEnum.account}' THEN 1 ELSE 0 END) AS account,
          SUM(CASE WHEN "type" = '${ReportEnum.media}' THEN 1 ELSE 0 END) AS media,
          SUM(CASE WHEN  "type" = '${ReportEnum.note}' THEN 1 ELSE 0 END) AS note
        FROM reports
         `,
      };

      this.logger.debug(`Executing query: (getReportsCountQuery)`);
      const reportRes = await this.db.query(getReportsCountQuery);
      this.logger.log('Get reports count (end)');
      return reportRes.rows[0];
    } catch (err) {
      this.logger.error('Get reports count (error)', err);
      throw new InternalServerError('Get reports count error');
    }
  }

  public async getModerReportNote(): Promise<ModerReportNoteResponse> {
    this.logger.log('Get moder report note (start)');
    let report;
    try {
      const getReportQuery = {
        text: `
        SELECT * FROM reports
        WHERE type = '${ReportEnum.note}'
        ORDER BY "createdAt" ASC
        LIMIT 1
         `,
      };

      this.logger.debug(`Executing query: (getReportQuery)`);
      const reportRes = await this.db.query(getReportQuery);
      report = reportRes.rows[0];
    } catch (err) {
      this.logger.error('Get moder report note (error)', err);
      throw new InternalServerError('Get note report error');
    }

    if (report === undefined) {
      this.logger.warn('Get moder report note (error)');
      throw new NotFoundError('Not fount not checked note report');
    }

    const informer = await this.usersService.getUserById(report.informerId);
    const reportedUser = await this.usersService.getUserById(report.userId);
    const userMedia = await this.userMediaService.getUserMedia(
      report.userId,
      report.mediaId,
    );
    if (!userMedia) {
      await this.deleteReport(report.id);
      throw new InternalServerError('This note was deleted');
    }
    this.logger.log('Get moder report note (end)');
    return {
      reportId: report.id,
      informerUser: informer,
      reportedUser: reportedUser,
      mediaId: userMedia.mediaId,
      note: userMedia.note,
    };
  }

  public async getModerReportAccount(): Promise<ModerReportAccountResponse> {
    this.logger.log('Get moder report account (start)');
    let report;
    try {
      const getReportQuery = {
        text: `
        SELECT * FROM reports
        WHERE type = '${ReportEnum.account}'
        ORDER BY "createdAt" ASC
        LIMIT 1
         `,
      };

      this.logger.debug(`Executing query: (getReportQuery)`);
      const reportRes = await this.db.query(getReportQuery);
      report = reportRes.rows[0];
    } catch (err) {
      this.logger.error('Get moder report account (error)', err);
      throw new InternalServerError('Get account report error');
    }

    if (report === undefined) {
      this.logger.warn('Get moder report account (error)');
      throw new NotFoundError('Not fount not checked account report');
    }

    const informer = await this.usersService.getUserById(report.informerId);
    const reportedUser = await this.usersService.getUserById(report.userId);
    this.logger.log('Get moder report account (end)');
    return {
      reportId: report.id,
      informerUser: informer,
      reportedUser: reportedUser,
    };
  }

  public async deleteReport(id: string): Promise<SuccessResponse> {
    this.logger.log('Delete report (start)');
    try {
      const deleteReportQuery = {
        text: `
        DELETE FROM "reports"
        WHERE id = $1`,
        values: [id],
      };
      this.logger.debug(`Executing query: (deleteReportQuery)`);
      await this.db.query(deleteReportQuery);
      this.logger.log('Delete report (end)');
      return { success: true };
    } catch (err) {
      this.logger.error('Delete report (error)', err);
      throw new InternalServerError('Delete report error');
    }
  }
}
