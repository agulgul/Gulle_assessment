import { Component, OnInit, Renderer2, ViewChild, ElementRef, } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  
})
export class UserComponent implements OnInit {
  currentPage = 1;
  pageSize = 5;
  get_user_list: any[] = [];
  data: any[] = [];
  first = '';
  last = '';
  email = '';
  locations = '';
  number = '';
  thumbnails = '';
  
  constructor(private httpClient: HttpClient, private renderer: Renderer2, private modalRef: ElementRef){
    this.get_user_list = []
  }

  ngOnInit(): void {
    this.fetchData();
 
  }

  fetchData(){
    this.httpClient.get<any>(`https://randomuser.me/api/?page=${this.currentPage}&results=${this.pageSize}&seed=abc`).subscribe(response => {
    this.get_user_list = response.results;
    console.log('Pagination data fetched successfully:', response.results);
    console.log(this.get_user_list[2])
  });
  }

  onNextPage(){
    this.currentPage++;
    this.fetchData();
    console.log(this.currentPage);

  }

  onPrevPage(){
    this.currentPage--;
    this.fetchData();

  }

  viewData(index:number){
    this.first = this.get_user_list[index].name.first;
    this.last = this.get_user_list[index].name.last;
    this.email = this.get_user_list[index].email;
    this.number = this.get_user_list[index].phone;
    this.locations = this.get_user_list[index].location.country;
    this.thumbnails = this.get_user_list[index].picture.large;
  }

}





