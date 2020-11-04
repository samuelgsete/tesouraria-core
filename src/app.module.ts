import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TreasuryModule } from './treasury/treasury.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/user.module';

import { Treasury } from './shared/models/treasury.entity';
import { Expense } from './shared/models/expense.entity';
import { Recipe } from './shared/models/recipe.entity';
import { Inventory} from './shared/models/inventory.entity';
import { User } from './shared/models/user.entity';
import { TransactionsModule } from './transactions/transactions.module';
import { ReportModule } from './report/report.module';
import { HistoricModule } from './historic/historic.module';
import { InventoryModule } from './inventory/inventory.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'motty.db.elephantsql.com',
      port: 5432,
      username: 'dwazdfbb',
      password: 'AGPpW6JXCWdXwiomO_7yr77F6w0xwmk3s',
      database: 'dwazdfbb',
      entities: [
        Treasury, 
        Expense,
        Recipe,
        Inventory,
        User
      ],
      synchronize: true
    }),
    TreasuryModule,
    AuthModule,
    UserModule,
    TransactionsModule,
    ReportModule,
    HistoricModule,
    InventoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}