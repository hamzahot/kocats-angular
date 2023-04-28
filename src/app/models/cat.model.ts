
export interface Breed{
    raceId : number,
    name : string,
    description : string
}

export interface Cat{
    catId : number,
    name : string,
    breeds : Array<Breed>,
    photos : Array<string>,
    yearBorn : number,
    gender : string,
    is_sterilized ?: boolean
}