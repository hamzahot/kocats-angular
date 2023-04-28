import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name : "stringToArray"})
export class CustomStringToArrayPipe implements PipeTransform{


    transform(value: any, ...args: any[]) {
        const separator = args[0];
        const output = value.split(separator);
        return output;

    }

}