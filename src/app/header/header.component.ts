import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
// import { ProductServiceService } from '../services/product-service.service';
// import { product } from '../data-type';
// import {faHouse,faMagnifyingGlass,faShoppingCart,faTruckFast,faUser,faStore } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  menuType:string ='default';
  sellerName:string='';
  userName:string='';


  constructor(private route:Router){}
  ngOnInit(): void {

    this.route.events.subscribe((val:any)=>{
      if(val.url){
        if(localStorage.getItem('seller') && val.url.includes('Seller')){
          this.menuType='Seller';
          if(localStorage.getItem('seller')){
            let sellerStore=localStorage.getItem('seller');
            let sellerData= sellerStore && JSON.parse(sellerStore)[0];
            this.sellerName= sellerData.name;
          }
        }
        else if(localStorage.getItem('user') ){
          let userStore=localStorage.getItem('user');
          let userData= userStore && JSON.parse(userStore);
          this.userName= userData.name;
          this.menuType='user';
        }
        
        else{
          this.menuType='default';
        }
      }
    })
// to show the the value in cart dynamicaly
    let cartData=localStorage.getItem('localCart');
    if(cartData){
      // this.cartItems= JSON.parse(cartData).length
    }
  }

  logout(){
    localStorage.removeItem('seller');
    this.route.navigate(['/Home']);
  }
  userLogout(){
    localStorage.removeItem('user');
    this.route.navigate(['/Home']);
  }

  searchProduct(query:KeyboardEvent){
    if(query){
      const element= query.target as HTMLInputElement;

    }
  }

  hideSearch(){
    // this.searchResult=undefined;
  }

  submitSearch(data:string){
    console.warn(data);
    this.route.navigate([`search/${data}`])
  }
  redirectToDetails(id:number){
    this.route.navigate(['/Details/'+id])
  }

}
