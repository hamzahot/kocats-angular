import { Component, OnDestroy, OnInit, ChangeDetectorRef  } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { Cat } from "src/app/models/cat.model";
import { CartService } from "src/app/services/cart.service";
import { CatHomeService } from "src/app/services/cat.service";
import { MatSnackBar } from "@angular/material/snack-bar";



@Component({
    selector:"app-cat-profile",
    templateUrl : "./cat-view.component.html",
    styleUrls : ['./cat-view.component.css']
})
export class CatProfileComponent implements OnInit, OnDestroy{

    catSubscription : Subscription | undefined;
    cat : Cat | undefined;
    currentYear : number;

    constructor(private cartService : CartService,
        private route: ActivatedRoute,
        private catService: CatHomeService,
        private cdr: ChangeDetectorRef,
        private _snackBar : MatSnackBar
    ) {
        this.currentYear = new Date().getFullYear();
    }
    

    ngOnInit() {
        const id= parseInt(this.route.snapshot.paramMap.get('id') || '13' , 10);
        this.catSubscription = this.catService.getById(id).subscribe(data=>{
            this.cat = data;
        });
    }
    ngOnDestroy(): void {
        if (this.catSubscription) {
            this.catSubscription.unsubscribe();
          }
    }

    

    takeToVet(){
      this.cartService.addActionToCart({
        imageName : "vet.jpg",
        name : "Posjeta veterinaru za macku : " + this.cat?.name,
        price : 23.33,
        quantity : 1,
        id : 3,
        isAction : true,
        catId : this.cat?.catId
    });
    }


    feedTheCat(){
      this.cartService.addActionToCart({
        imageName : "cat-eating.jpg",
        name : "Hrana za macku : " + this.cat?.name,
        price : 23.33,
        quantity : 1,
        id : 1,
        isAction : true,
        catId : this.cat?.catId
    });
    }

    sterilizeCat(){
      if(this.cat?.is_sterilized){
        this._snackBar.open("This cat is already sterilized" , "OK" , {duration : 3000});
        return;
      }
      this.cartService.addActionToCart({
        imageName : "sterilize.jpg",
        name : "Sterilizacija za macku : " + this.cat?.name,
        price : 23.33,
        quantity : 1,
        id : 2,
        isAction : true,
        catId : this.cat?.catId
    });
    }


    
      slideIndex = 1;
    
      

      ngAfterViewInit(): void {
        this.cdr.detectChanges();
        setTimeout(() => {
          this.showSlides(this.slideIndex);
        }, 300);
        
      }
    
      
    
      plusSlides(n: number) {
        this.showSlides(this.slideIndex += n);
      }
    
      showSlides(n: number) {
        // let i;
        // const slides = document.getElementsByClassName("slide");
        // if (n > slides.length) {this.slideIndex = 1}
        // if (n < 1) {this.slideIndex = slides.length}
        // for (i = 0; i < slides.length; i++) {
        //     (slides[i] as HTMLElement).style.display = "none";
        // }
        // (slides[this.slideIndex-1] as HTMLElement).style.display = "block";


        let i;
        const slides = document.getElementsByClassName("slide");
        if (slides && n > slides.length) {this.slideIndex = 1}
        if (slides && n < 1) {this.slideIndex = slides.length}
        for (i = 0; slides && i < slides.length; i++) {
            (slides[i] as HTMLElement).style.display = "none";
        }
        if (slides && slides[this.slideIndex-1]) {
            (slides[this.slideIndex-1] as HTMLElement).style.display = "block";
        }
      }

}