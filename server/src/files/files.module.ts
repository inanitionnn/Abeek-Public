import { Module, forwardRef } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesResolver } from './files.resolver';
import { FilesController } from './files.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [forwardRef(() => UsersModule)],
  exports: [FilesService],
  providers: [FilesService, FilesResolver],
  controllers: [FilesController],
})
export class FilesModule {}
