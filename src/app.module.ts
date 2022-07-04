import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SchoolModule } from './school/school.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRoot(process.env.URL_MONGO),
        SchoolModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
