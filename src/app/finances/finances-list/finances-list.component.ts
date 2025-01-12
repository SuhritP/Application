import { Component, OnInit } from "@angular/core";
import { FinancesService } from "../finances.service";

@Component({
  selector: "ns-finances-list",
  templateUrl: "./finances-list.component.html",
  styleUrls: ["./finances-list.component.scss"]
})
export class FinancesListComponent implements OnInit {
  finances: any = [
    {
      _id: "6121200b95747d1a50838de5",
      name: "string",
      email: "string",
      phone: "string",
      organization: "string",
      amount: "1"
    }
  ];

  constructor(private financesService: FinancesService) {}

  async ngOnInit(): Promise<void> {
    this.finances = await this.financesService.getFinances();
  }
}
