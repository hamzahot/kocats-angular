export interface Cart{
    items : Array<CartItem> ;
}

export interface CartItem{
    imageName : string;
    name : string;
    price : number;
    quantity : number;
    id : number;
    isAction ?: boolean
    catId ?: number;
}