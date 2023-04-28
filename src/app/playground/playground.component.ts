import { AfterViewInit, Component, OnInit } from "@angular/core";


@Component({
    selector : 'app-playground',
    templateUrl : './playground.component.html',
    styleUrls : ['./playground.component.css']
})
export class PlaygroundComponent implements OnInit, AfterViewInit {


    // data : string = "Kategorija1:Kategorija2";
    // b : boolean = false;


    // validate(email : string){
    //     const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    //     this.b = expression.test(email);
    //     console.log(this.b);
    // }

    ngOnInit(): void {
        
    }

    photos = [
        {url: '1680819014025_images (9).jpg', title: 'Cat Photo 1'},
        {url: '1680819027561_images (2).jpg', title: 'Cat Photo 2'},
        {url: '1680819047447_download (4).jpg', title: 'Cat Photo 3'},
        {url: '1680819037568_download.jpg', title: 'Cat Photo 4'},
        {url : '1680819476016_images (3).jpg', title : 'Cat Photo 5'}
      ];
      slideIndex = 1;
    
      constructor() { }


      

      ngAfterViewInit(): void {
        this.showSlides(this.slideIndex);
      }
    
      
    
      plusSlides(n: number) {
        this.showSlides(this.slideIndex += n);
      }
    
      showSlides(n: number) {
        let i;
        const slides = document.getElementsByClassName("slide");
        if (n > slides.length) {this.slideIndex = 1}
        if (n < 1) {this.slideIndex = slides.length}
        for (i = 0; i < slides.length; i++) {
            (slides[i] as HTMLElement).style.display = "none";
        }
        (slides[this.slideIndex-1] as HTMLElement).style.display = "block";
      }
    

    }

    

