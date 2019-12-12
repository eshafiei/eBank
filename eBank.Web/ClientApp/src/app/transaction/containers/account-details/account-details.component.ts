import { Component, OnInit } from '@angular/core';
import { ITransaction } from '../../interfaces/transaction.interface';
import { AccountService } from '../../../account/services/account.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss']
})
export class AccountDetailsComponent implements OnInit {
  accountTransactions: ITransaction[];
  accountId: number;
  constructor(private accountService: AccountService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.accountId = this.activatedRoute.snapshot.params.id;
  }

}
